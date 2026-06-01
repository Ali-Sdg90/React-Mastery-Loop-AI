# Hints

- Use a single custom hook such as `useNotes` to encapsulate `useQuery` and mutation hooks.
- Keep the note list data in React Query cache and avoid copying it into another state variable.
- For the edit flow, show the selected note fields in the input form and update only when the user submits.
- Use `isLoading`, `isError`, `error`, and `isSuccess` from React Query to render mutation state.
- After a successful create/update/delete, call `queryClient.invalidateQueries('notes')` or the equivalent query invalidation method.
- If a mutation fails, show a specific error message and allow the user to retry the action.
- Build the UI so note creation and editing share the same form component if possible.
