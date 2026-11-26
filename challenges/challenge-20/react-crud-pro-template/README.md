# React CRUD Pro Template

A complete, dependency-light Vite + React + Fetch CRUD exercise. No Axios or TanStack Query required.

## Run

```bash
npm install
npm run dev -- --host 127.0.0.1
```

Open http://127.0.0.1:5173.

You can also copy the `src` files into an existing React + Vite project. Adjust imports if needed.

## Architecture

- `src/lib/apiClient.js`: HTTP transport, JSON, HTTP status errors, timeouts, optional bearer token, cancellation.
- `src/api/postsApi.js`: endpoint-specific requests (GET/POST/PATCH/PUT/DELETE).
- `src/hooks/useRequestLocks.js`: independent lock per action key ("create", "post:12").
- `src/hooks/usePosts.js`: request lifecycles, in-flight GET deduplication, stale read invalidation, CRUD, feedback.
- `src/App.jsx`: input forms, disabled controls, per-row progress, retry, and accessible feedback.

## Important demo limitations

DummyJSON **simulates** POST, PUT, PATCH and DELETE without persisting server changes. The UI applies successful changes locally. Newly created posts get stable, unique `local-*` IDs, and edits/deletes for these local records are performed locally. Editing or deleting original seeded posts sends a genuine (simulated) PATCH/PUT/DELETE request to DummyJSON. Reload resets the list to its server sample data.

The template deliberately avoids a fake auth token. To use a real API, inject authentication from a legitimate auth flow into the `apiRequest({ token })` option; never hardcode private tokens in client code. Adapt the PUT body to the full resource shape expected by your backend.

## Behaviors to study

1. Initial loading (`readStatus`), refreshing (`isFetching`), and showing stale data with a read error.
2. HTTP errors versus network errors. Fetch resolves for 4xx/5xx and needs `response.ok` checks.
3. Timeout and explicit cancellation, via `AbortSignal.timeout()` and `AbortSignal.any()`.
4. GET deduplication: multiple calls while loading share the same promise.
5. Write locking: repeated submits are ignored for the same key, while independent post IDs can be edited/deleted concurrently.
6. Stale read avoidance: after a successful mutation, an in-flight GET is canceled so it cannot overwrite new local data.
7. Clean unmount: pending fetches are canceled; works with React Strict Mode effect setup/cleanup.
8. Server-confirmed updates use immutable changes to local React state.
9. Errors from GET and writes are shown separately.

## What isn't covered

This template does not implement query-cache persistence, real user authentication, offline mutation queues, optimistic updates with rollbacks, pagination reconciliation, tests, or cross-tab synchronization. In a larger real-world app, consider TanStack Query for much of the server-state lifecycle and server-side idempotency keys for sensitive writes. UI locks only prevent duplicates in the current component instance.
