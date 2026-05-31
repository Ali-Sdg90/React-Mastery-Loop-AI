# Learning Plan (Compact)

## 🔥 Active

- [ ] Single source of truth for API + local storage
- [ ] useEffect dependency management
- [ ] Stable ID generation / consistent keys
- [ ] Toggle + persist consistency

## 🟡 In Progress

- [ ] Component composition & separation
- [ ] Custom hooks design & reuse

## 🧠 Needs Reinforcement

- [ ] useMemo / derived state
- [ ] Array iteration patterns (find/filter/map)
- [ ] Prop drilling avoidance

## ✅ Completed

- Controlled inputs
- Basic CRUD in state
- Simple API fetch & display

## **Agent Note — Ali (2026-05-31)**

- **Strengths:**
    - Comfortable with functional components and `useState` for local UI state.
    - Implements controlled forms and basic CRUD flows reliably.
    - Uses custom hooks to separate data logic (good separation of concerns).
    - Successfully integrated `useQuery` / `useMutation` via a custom `useRecipes` hook.

- **Primary practice goals:**
    - Deepen practical use of React Query mutation lifecycle: `mutation.isLoading`, `mutation.isError`, `mutation.error`, and `onError`/`onSuccess` callbacks.
    - Implement optimistic updates and rollback patterns for create/edit flows.
    - Build user-driven edit forms (collect validated input) instead of static updates.
    - Improve error recovery UX: show retry actions and clear inline error messages.

- **Concrete tasks for next sessions:**
    1.  Replace the static edit action with an inline edit form wired to `editRecipeMutation`.

2.  Use mutation state (`isLoading` / `isError`) for per-action UI instead of manual `loadingIDs` / `errorIDs`.
3.  Add optimistic updates for create/edit and implement rollback on failure.
4.  Add retry buttons and readable error messages for both queries and mutations.
5.  Fix small cross-platform issues: consistent filename casing and handler naming (`handleSubmit`).

- **Why this matters:** Mastering mutation lifecycles and optimistic updates will make CRUD UX resilient and feel fast, and replacing manual state duplication with React Query primitives simplifies code and reduces bugs.

Keep this section as the agent-facing summary so future reviewers and automated agents can immediately see strengths, concrete practice targets, and the next hands-on tasks.
