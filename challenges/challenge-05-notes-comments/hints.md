# Hints

## Getting started

- Use React Query's `useQuery` to fetch the note list.
- Use a second `useQuery` for comments, with a query key that includes the note id.
- When the selected note changes, the comment query should refetch for the new id.

## Query keys

- A good pattern is:
    - `['notes']` for the notes list
    - `['comments', selectedNoteId]` for comments of one note
- This keeps cache entries separate and lets React Query manage them individually.

## Mutations

- Use `useMutation` for create/edit actions.
- Pass `onSuccess` or `invalidateQueries` to update the cache after mutation.
- Example: `queryClient.invalidateQueries(['notes'])` after a note edit.

## Component structure

- Keep the list UI separate from the detail panel.
- A custom hook can encapsulate all note data logic and another can handle comment data.
- Example hook names:
    - `useNotes`
    - `useNoteComments`
    - `useCreateNote`
    - `useEditNote`
    - `useAddComment`

## Small scope tips

- Start with the notes list first, then add the detail panel.
- Add comment fetching only after the selected note view works.
- Keep the app simple: one selected note, a form for note editing, and one form for adding comments.
