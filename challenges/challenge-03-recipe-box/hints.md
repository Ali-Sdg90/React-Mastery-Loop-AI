Hints (progressive)

1. Start small: fetch recipes via GET and render them. Add loading and error states.

2. Optimistic updates: when the user adds/edits/deletes, update the UI immediately (optimistically), then wait for server confirmation. If it fails, revert.

3. API operations:
    - GET: `fetch('https://jsonplaceholder.typicode.com/posts')`
    - POST (add): `fetch(..., {method: 'POST', body: JSON.stringify(...)})`
    - PUT (edit): `fetch('.../{id}', {method: 'PUT', body: JSON.stringify(...)})`
    - DELETE: `fetch('.../{id}', {method: 'DELETE'})`

4. Custom hook: `useRecipesAPI` should expose `{recipes, add, edit, remove, toggleFavorite, loading, error, retry}`. Keep all fetch logic and state management inside.

5. useEffect care: avoid infinite refetch loops by managing dependencies correctly. Fetch on mount (empty dependency), refetch on explicit action (not automatic state change).

6. Error handling: catch network errors, timeouts, and invalid responses. Provide a user-facing error message and retry option.

7. Favorite toggle: add a `favorite` boolean property to each recipe object. Toggle it via PUT and update local state optimistically.

8. Derived state: use `useMemo` to compute filtered lists (e.g., favorites) and counts.

9. Stretch (optional): replace `fetch` with `axios` or introduce `React Query` for automatic caching and error retry — only after the base solution is working.
