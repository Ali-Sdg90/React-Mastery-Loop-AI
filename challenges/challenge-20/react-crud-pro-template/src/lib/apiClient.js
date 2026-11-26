const BASE_URL = "https://dummyjson.com";
const DEFAULT_TIMEOUT_MS = 10000;

export class ApiError extends Error {
    constructor(message, { status = 0, kind = "UNKNOWN", cause } = {}) {
        super(message, { cause });
        this.name = "ApiError";
        this.status = status;
        this.kind = kind;
    }
}

/**
 * A small Fetch client with JSON serialization, consistent HTTP errors,
 * optional authentication, cancellation, and request timeouts.
 */
export async function apiRequest(
    path,
    {
        method = "GET",
        body,
        token,
        headers = {},
        signal,
        timeoutMs = DEFAULT_TIMEOUT_MS,
    } = {},
) {
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    const combinedSignal = signal
        ? AbortSignal.any([signal, timeoutSignal])
        : timeoutSignal;

    const requestHeaders = new Headers(headers);
    const isFormData = body instanceof FormData;

    if (body !== undefined && !isFormData && !requestHeaders.has("Content-Type")) {
        requestHeaders.set("Content-Type", "application/json");
    }

    if (token) {
        requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    try {
        const response = await fetch(`${BASE_URL}${path}`, {
            method,
            headers: requestHeaders,
            body: body === undefined
                ? undefined
                : isFormData
                  ? body
                  : JSON.stringify(body),
            signal: combinedSignal,
        });

        // Read the body once, including error responses.
        const raw = response.status === 204 ? "" : await response.text();
        let payload = null;

        if (raw) {
            try {
                payload = JSON.parse(raw);
            } catch {
                if (response.ok) {
                    throw new ApiError("The server returned invalid JSON.", {
                        status: response.status,
                        kind: "PARSE",
                    });
                }
            }
        }

        // Fetch does not reject automatically for HTTP 4xx/5xx responses.
        if (!response.ok) {
            throw new ApiError(
                payload?.message || `HTTP ${response.status}: ${response.statusText}`,
                { status: response.status, kind: "HTTP" },
            );
        }

        return payload;
    } catch (error) {
        if (error instanceof ApiError) throw error;

        if (timeoutSignal.aborted) {
            throw new ApiError("The request timed out. Please try again.", {
                kind: "TIMEOUT",
                cause: error,
            });
        }

        if (signal?.aborted) {
            throw new ApiError("The request was canceled.", {
                kind: "ABORTED",
                cause: error,
            });
        }

        throw new ApiError("Network error. Check your connection.", {
            kind: "NETWORK",
            cause: error,
        });
    }
}
