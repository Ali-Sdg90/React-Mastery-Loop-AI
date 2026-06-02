# Starter Notes

This challenge tests:

- React Query `useQuery` for fetching lists and dependent resources
- React Query `useMutation` for create/edit actions
- Multiple query keys and cache invalidation patterns
- Controlled form inputs for note editing and comment creation
- Component composition with a list panel + detail panel

Recommended approach:

1. Create a custom hook for fetching the notes list.
2. Render the notes list and support selecting one note.
3. Add a second query hook for comments, using `['comments', noteId]`.
4. Build note create/edit mutations and invalidate `['notes']` on success.
5. Build comment mutation and invalidate `['comments', noteId]` on success.

Focus on using the structure you learned in the previous Note Manager project. This challenge is intentionally small so you can practice the exact `useQuery`/`useMutation` flow and the idea of multiple query keys in one app.
