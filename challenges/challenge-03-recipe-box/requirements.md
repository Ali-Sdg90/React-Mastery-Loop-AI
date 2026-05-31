Requirements

1. Fetch an initial list of recipes from the API endpoint: `https://jsonplaceholder.typicode.com/posts` (treat posts as recipes).
2. Render the recipes list in a single list view.
3. Allow adding new recipes via POST request; update the UI optimistically or after server confirmation.
4. Allow editing recipes via PUT request.
5. Allow deleting recipes via DELETE request.
6. Allow toggling a `favorite` flag on any recipe (stored as a custom property in the API data).
7. All user actions (add, edit, delete, favorite) persist to the API server.
8. Implement robust loading and error UI for all API operations, with retry/retry-on-failure actions.
9. Use stable IDs returned from the API; do not generate new IDs for fetched items.
10. Use a custom hook `useRecipesAPI` to encapsulate all fetch/CRUD logic; keep UI components focused and presentational.

Acceptance criteria

- App runs in the browser and meets all requirements above.
- Code uses idiomatic React hooks and immutable update patterns.
