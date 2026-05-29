Starter notes — concepts tested:

- `useEffect` for side effects and data fetching on mount.
- `fetch` API and handling promise lifecycle (loading, success, error).
- Controlled inputs and form handling with `useState`.
- Immutable state updates for toggling and adding todos.
- Simple persistence using `localStorage`.
- UX considerations: loading indicator, error message, retry, and required counts.

Notes & tips:

- Keep the fetch logic isolated and avoid fetching on every render.
- Prefer small, testable components: `TodoList`, `TodoItem`, `AddTodoForm`.
- The challenge intentionally avoids external libraries — focus on core React patterns.
