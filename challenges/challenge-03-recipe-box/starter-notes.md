Starter notes

Concepts tested

- Async API operations (GET, POST, PUT, DELETE) and request-response patterns
- `useEffect` dependency management and side-effect control
- Custom hook design for encapsulating API logic (`useRecipesAPI`)
- Optimistic updates and rollback on error
- Immutable array updates (`map`, `filter`, `find`)
- `useMemo` for derived state and counts
- Component composition: keep UI components presentational and delegate API operations to the hook

Suggested file layout

- `challenge-03-recipe-box/`
    - `README.md`, `requirements.md`, `hints.md`, `starter-notes.md`
    - (app files go into `src/` if you scaffold)

API endpoint

- Base URL: `https://jsonplaceholder.typicode.com/posts`
- Treat `posts` as `recipes` for this challenge
- Each recipe: `{id, title, body (description), userId, favorite (optional)}`

Quick approach

1. Create `useRecipesAPI` that fetches recipes on mount via GET.
2. Keep one `recipes` state array that reflects the server state.
3. On user action (add/edit/delete/favorite), optimistically update local state first, then send the request.
4. Expose functions: `add(recipe)`, `edit(id, updates)`, `remove(id)`, `toggleFavorite(id)`.
5. Return `{recipes, add, edit, remove, toggleFavorite, loading, error, retry}`.

Do not overcomplicate: focus on correct API operations and error handling rather than styling.
