# Requirements

1. Fetch a list of notes from `https://jsonplaceholder.typicode.com/posts` and display them.
2. Use a separate query for note comments with a distinct query key, such as `['comments', noteId]`.
3. Allow the user to select a note from the list and show its details in a detail panel.
4. In the detail panel, show the selected note's title and body.
5. In the detail panel, fetch and display comments for the selected note.
6. Implement adding a new note using `useMutation` and invalidating the notes query.
7. Implement editing the selected note using `useMutation` and invalidating the notes query.
8. Implement adding a comment for the selected note using `useMutation` and invalidating the comment query for that note.
9. Show loading and error states for both notes and comments queries.
10. Use at least two separate query keys in the app: one for notes and one for comments.
11. Organize data logic into custom hooks where appropriate, for example `useNotes`, `useNoteComments`, `useCreateNote`, `useEditNote`, and `useAddComment`.
12. Keep presentation code and data-fetching logic separate.

Optional bonus:

- allow deleting a note and invalidate the notes query after deletion.
- show a `selected note` placeholder when no note is chosen.
- use a note edit form with controlled inputs instead of instant-edit behavior.
