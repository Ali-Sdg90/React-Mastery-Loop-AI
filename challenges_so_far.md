Ali worked with react for like 1 year and shipped a few projects, but he is not an expert and has some gaps in his knowledge. you should create a challenge that is not too basic, but also not too advanced, to help him solidify his understanding and identify areas for improvement.

---

## Challenge 01 - React Task Flow - v1.0

Date: 2026-05-28

Focus: React task manager, controlled input, list filtering, and completion state

Score:

- Overall: 6/10
- React Fundamentals: 7/10
- State Management: 6/10
- Component Design: 5/10
- API Integration: 0/10

Strengths:

- Used React functional components and `useState` correctly for local state.
- Implemented a controlled input and form submission pattern.
- Added basic filtering for all / active / completed tasks.
- Kept logic inside React without external state libraries.

Weaknesses:

- Task toggling relies on matching `title` instead of a stable `id`, which breaks when duplicate titles exist.
- `TodoItem` is invoked like a plain function instead of as a React component with props.
- Missing the required active/completed task counts summary.
- The filter rendering uses nested ternaries and reverse logic, which reduces clarity and maintainability.

Key Lesson Learned:

- Use stable identifiers and proper component props to keep task state updates predictable and the component tree idiomatic.

---

## Challenge 01 - React Task Flow - v2.0

Date: 2026-05-28

Focus: Refactoring for professional component structure, proper prop design, and stable state management

Score:

- Overall: 8/10
- React Fundamentals: 8/10
- State Management: 8/10
- Component Design: 8/10
- Code Quality: 7/10
- Requirements: 7/10

Strengths:

- Successfully refactored TodoItem to be a proper React component with clean prop passing.
- Implemented stable `id` (Date.now()) for all state operations and keys.
- Toggle logic now correctly uses ID instead of title matching.
- Filtering logic is clean, extracted before JSX, and easy to understand.
- State ownership is properly centralized in parent component.
- Immutable state updates using `.map()` pattern demonstrate good React practices.
- Controlled input implementation is solid and form submission is properly handled.

Weaknesses:

- **Missing required feature:** No active/completed task counts display in UI (was in requirements).
- Filter button styling uses inline ternary logic; could be extracted to CSS classes for maintainability.
- No error handling or edge case consideration (e.g., rapid submissions, empty titles).

Hidden Issues:

- Using `Date.now()` as unique ID could theoretically create collisions if multiple tasks added in same millisecond (edge case but worth noting).
- Filter styling is functional but could be cleaner using state-based CSS classes instead of inline ternary.

Key Lesson Learned:

- Professional component structure requires separation of concerns: parent owns state logic, child components are presentational. The refactoring demonstrated strong understanding of prop drilling, immutability, and component composition.

---

## Challenge 02 - Fetch Todo

Date: 2026-05-29

Focus: Fetching todos, loading/error handling, controlled input, and local persistence

Score:

- Overall: 8/10
- React Fundamentals: 8/10
- State Management: 7/10
- Component Design: 7/10
- Code Quality: 7/10
- Requirements: 8/10

Strengths:

- Implemented custom hooks for `fetch` and `localStorage`, showing good abstraction of side-effect logic.
- Added loading and error UI with retry capability for API failures.
- Rendered fetched todos alongside user-created todos and supported filtering by all/active/completed.
- Persisted new todos to localStorage and preserved user-created edits across reloads.

Weaknesses:

- Toggling completion on fetched todos is not persisted to `localStorage`, so API items may lose state after reload or refresh.
- New todo creation uses `Date.now()` twice, which can produce mismatched IDs between the transient and persisted todo objects.
- `savedTodos` is derived from both API data and local storage state, which duplicates state and can lead to synchronization edge cases.

Key Lesson Learned:

- When combining fetched and local data, maintain a single source of truth and persist changes consistently across both external and local items.
