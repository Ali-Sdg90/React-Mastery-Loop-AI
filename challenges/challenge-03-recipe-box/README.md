# Challenge 03 — Personal Recipe Box

Time: 1–3 hours

Build a small CRUD app called "Personal Recipe Box" that fetches recipes from a JSON API and lets the user add, edit, delete, and favorite recipes. Changes are persisted to the server. The key learning goal is to manage async API operations cleanly with proper loading/error states and update the UI optimistically.

Primary focus: API-based CRUD operations (GET, POST, PUT, DELETE), optimistic UI updates, and robust error handling.

Secondary focus: useEffect dependency management and a custom hook to encapsulate API sync logic.

Deliverables

- A working UI to view, filter (all / favorites), add, edit, delete, and toggle favorite on recipes.
- All changes (add, edit, delete, favorite toggle) persist to the API server.
- A `useRecipesAPI` custom hook (or equivalent) that handles fetching, CRUD operations, and error states.
