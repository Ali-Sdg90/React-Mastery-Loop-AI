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

---

## Challenge 03 - Recipe Box - v1.0

Date: 2026-05-31

Focus: API CRUD with React Query, custom hooks, and UI state handling

Score:

- Overall: 7/10
- React Fundamentals: 8/10
- State Management: 7/10
- Component Design: 7/10
- Code Quality: 7/10
- Requirements: 7/10

Strengths:

- Used idiomatic functional components and custom hooks to separate UI from API logic.
- Implemented React Query for fetch and mutation flows with automatic cache invalidation.
- Added loading/error UI for initial fetch and mutation actions.
- Kept presentational components focused, and the `useRecipes` hook encapsulated API operations.

Weaknesses:

- Edit flow is not user-driven: the UI updates recipe titles with a static "Updated Title" instead of an editable form.
- Retry/retry-on-failure actions are not implemented for failed API requests.
- Some manual local state for mutation loading/error tracking duplicates React Query capabilities and adds complexity.

Key Lesson Learned:

- Practice building full CRUD UX with real edit forms and explicit retry/error handling on React Query mutations and queries.

---

## Challenge 03 - Recipe Box - v1.1

Date: 2026-05-31

Focus: API CRUD with React Query, custom hooks, mutation UX and error handling

Score:

- Overall: 8/10
- React Fundamentals: 8/10
- State Management: 7/10
- Component Design: 7/10
- Code Quality: 7/10
- Requirements: 7/10
- API Integration: 8/10

Strengths:

- Clear separation of concerns: `useRecipes` encapsulates data logic and React Query usage.
- Uses `useQuery` and `useMutation` idiomatically with cache invalidation on success.
- Presentational components (`AddRecipeForm`, `Recipes`) focus on UI and props.
- Reasonable loading and error states for initial fetch and mutation flows.

Weaknesses:

- Edit flow is not implemented as a user-driven form — the edit button applies a static title instead of collecting user input.
- Some local state duplicates React Query's mutation state (manual `loadingIDs` / `errorIDs`) leading to extra complexity.
- Minor bugs/portability issues: inconsistent import casing for `Recipes` and use of `createRecipeMutation.isPending` (React Query exposes `isLoading` / `isError`, not `isPending`).
- No retry UI or optimistic update patterns; error recovery UX is missing.

Hidden Issues:

- Import path casing (`import Recipes from "../components/recipes"`) will work on Windows but breaks on case-sensitive systems; prefer exact filename casing.
- Prop/handler naming typos (e.g., `handelSubmit`) are small but reduce clarity and indicate attention areas.
- `loadingIDs` and `errorIDs` duplicate mutation status tracking that React Query already provides (use `mutation.isLoading` / `mutation.isError` and mutation context instead).

Key Lesson Learned:

- Reinforce React Query mutation patterns (use `isLoading`/`isError`, optimistic updates, and `onError` retry UI) and implement full edit forms to complete CRUD UX.

---

## Challenge 04 - Note Manager - v1.0

Date: 2026-06-01

Focus: React Query CRUD with controlled forms and cache invalidation

Score:

- Overall: 8/10
- React Fundamentals: 8/10
- State Management: 9/10
- Component Design: 8/10
- Code Quality: 7/10
- Requirements: 8/10
- API Integration: 8/10

Strengths:

- Used `useQuery` and `useMutation` to keep the note list in sync with API data.
- Kept data logic inside custom hooks and presentation in separate components.
- Implemented add, edit, and delete note flows with query invalidation.
- Avoided duplicate local list state by relying on React Query cache.

Weaknesses:

- Error rendering in `ShowNotes` is flawed and can crash when one mutation error is undefined.
- Mutation errors are not displayed separately per action, which reduces clarity.
- Edit form state is shared globally rather than scoped to each note item.

Key Lesson Learned:

- Keep mutation error handling explicit and safe in UI components, and avoid chained error rendering expressions that can return raw objects or access undefined properties.

---

## Challenge 05 - Notes Comments

Date: 2026-06-05

Focus: Multi-query React Query patterns, advanced routing, and scalable project structure

Score:

- Overall: 9/10
- React Fundamentals: 9/10
- State Management: 9/10
- Component Design: 8/10
- Code Quality: 8/10
- Requirements: 10/10
- API Integration: 9/10

Strengths:

- **Excellent evolution in project structure** — Moved from flat component layout to organized pages with grouped components. This is a professional-grade organization that scales well.
- **Mastered multi-query patterns** — Properly implemented distinct query keys (`['notes']` and `['comments', noteId]`) with selective invalidation. Each mutation invalidates only its relevant cache.
- **Clean hook abstraction** — `useInvalidateMutation` encapsulates the mutation + cache invalidation pattern elegantly, reducing boilerplate across all CRUD hooks.
- **React Router integration** — Correctly uses URL params (`/about/:id`) for note selection, making state URL-driven and shareable.
- **Complete CRUD coverage** — Implemented create, read, edit, delete for notes plus create and read for comments. Bonus delete feature working properly.
- **Consistent state management** — All data flows through React Query, eliminating duplicate local state that plagued Challenge 04.
- **FormData API usage** — Shows modern form handling technique in `NoteEditor` and `AddCommentForm`.
- **Loading and error states** — Present and consistent across all components for both queries and mutations.

Weaknesses:

- **Error rendering inconsistency** — `createNoteMutation.error` in `AddTodo` renders Error object directly (may not display); other places use `.message` pattern. Should standardize error handling across all components.
- **Uncontrolled inputs in NoteEditor** — Uses `defaultValue` instead of controlled `value + onChange` pattern. Works but inconsistent with Challenge 04's best practice approach.
- **Alert validation in AddCommentForm** — Validation uses `alert()` instead of in-form error feedback for better UX.
- **TodoList delete mutation error display** — Error state is global (not per-item), so deleting item B will show/clear errors for all delete operations, confusing the user about which item failed.
- **Confusing page naming** — `HomePage` is actually a notes list, `AboutPage` is actually a note detail page. Should rename to `NotesPage` and `NoteDetailPage` for code clarity.

Hidden Issues:

- Error messages passed to components are Error objects; rendering should use `.message` property consistently to avoid `[object Object]` display.
- The `useInvalidateMutation` hook doesn't expose mutation state (isPending, isError) separately for per-item UI feedback.
- Comment form validation could benefit from showing validation errors in-form rather than using alerts.

Key Lesson Learned:

- Project structure directly impacts maintainability and scalability. You've successfully moved from a monolithic approach to a pages-based architecture, which is the right pattern for SPA applications. Multiple query keys with selective cache invalidation is the correct pattern for complex data flows.
