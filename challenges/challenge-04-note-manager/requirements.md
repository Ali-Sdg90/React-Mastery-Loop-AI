# Requirements

1. Fetch notes from an API using React Query `useQuery`.
2. Display a list of notes with title.
3. Show loading and error states for the initial query.
4. Add a new note through a controlled form.
5. Edit an existing note using a user-driven form and save changes via React Query `useMutation`.
6. Delete notes with a mutation action.
7. Show clear loading and error feedback for each mutation action.
8. Invalidate or refresh the query after successful mutations so the list stays up to date.
9. Avoid duplicate local state for note list data; rely on React Query cache and query invalidation.
10. Keep components small and separate data logic from presentation.
