- Fetch initial todos from `https://jsonplaceholder.typicode.com/todos?_limit=6` when the app mounts.
- Show a clear loading indicator while fetching.
- If fetch fails, display an error message and provide a retry button.
- Render the list of todos with their title and completion state.
- Implement adding a new todo using a controlled input and form submit.
- Toggle todo completion; update UI immediately.
- Display active and completed counts in the UI (required).
- Persist user-created and toggled changes to `localStorage` so reloads keep local edits.
- Use stable identifiers for new todos (avoid relying solely on title).
- Do NOT add backend code or new libraries; use plain `fetch` and browser APIs only.

Optional (extra credit):

- Extract fetch and persistence logic into a custom hook.
- Implement a small retry/backoff UI for repeated failures.
