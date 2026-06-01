const BASE_URL = import.meta.env.VITE_API_URL;

const request = async (
    endpoint = "",
    { method = "GET", data = null, headers = {}, signal } = {},
) => {
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        signal,
    };

    console.log(endpoint);

    if (data) {
        config.body = JSON.stringify(data);
    }

    if (import.meta.env.VITE_DEV) {
        console.log(`${method} >> ${BASE_URL}${endpoint}`);
        if (data) {
            console.log("Request Body:", data);
        }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    let responseData;

    try {
        responseData = await response.json();
    } catch {
        responseData = null;
    }

    if (!response.ok) {
        const message =
            responseData?.message ||
            responseData?.error ||
            `Request failed (${response.status})`;

        throw new Error(message);
    }

    if (import.meta.env.VITE_DEV) {
        console.log(`${method} Response (${response.status})`, responseData);
    }

    return responseData;
};

export const getReq = (endpoint, options = {}) =>
    request(endpoint, {
        ...options,
        method: "GET",
    });

export const postReq = (endpoint, data, options = {}) =>
    request(endpoint, {
        ...options,
        method: "POST",
        data,
    });

export const putReq = (endpoint, data, options = {}) =>
    request(endpoint, {
        ...options,
        method: "PUT",
        data,
    });

export const patchReq = (endpoint, data, options = {}) =>
    request(endpoint, {
        ...options,
        method: "PATCH",
        data,
    });

export const delReq = (endpoint, options = {}) =>
    request(endpoint, {
        ...options,
        method: "DELETE",
    });
