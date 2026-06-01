# Starter Notes

This challenge tests:

- React Query query and mutation patterns (`useQuery`, `useMutation`).
- Building a controlled form for add/edit note workflows.
- Managing data state with React Query cache instead of duplicated local state.
- Handling loading and error states for both fetching and mutations.
- Component composition and separation between API logic and UI.

Suggested architecture:

- `useNotes` hook: fetch notes and expose create/update/delete mutation handlers.
- `NoteList` component: renders notes and delete/edit buttons.
- `NoteForm` component: controlled inputs for title/body plus save action.
- `App` component: coordinates query state and current note editing state.
