Hints (progressive):

1. Quick start:

- Use `useEffect` with an empty dependency array to fetch on mount.
- Track `loading`, `error`, and `todos` in state.

2. If stuck with rendering:

- Ensure each list item has a stable `key`.
- Keep state updates immutable (use `.map()` and `.filter()`).

3. For adding todos:

- Use a controlled input and prevent default form submit behavior.
- Generate a safer id with `Date.now().toString() + Math.random().toString(36).slice(2)`.

4. For persistence and retry:

- Save changes to `localStorage` after state updates.
- For fetch errors, show a retry button that re-runs the fetch logic.

5. Extra guidance:

- Consider extracting fetch/persistence into a `useTodos` custom hook after core functionality works.
