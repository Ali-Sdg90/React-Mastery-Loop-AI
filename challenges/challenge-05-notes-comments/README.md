# Challenge 05 - Notes & Comments Manager

Build a compact React app that manages notes and note comments using React Query. This challenge is designed for the next step after your Note Manager: it requires multiple `queryKey`s and real CRUD-style flows with `useQuery` and `useMutation`.

The app should let the learner:

- fetch and render a list of notes
- select a note and fetch its comments separately
- create and edit note content
- add a comment to the selected note
- keep cache logic correct using multiple query keys

This project is intentionally small and realistic, and it should be solvable in about 3 hours.

## API Links

- Notes endpoint: `https://jsonplaceholder.typicode.com/posts`
- Single note fetching: `https://jsonplaceholder.typicode.com/posts/{id}`
- Comments by note: `https://jsonplaceholder.typicode.com/comments?postId={id}`
- Comment creation: `https://jsonplaceholder.typicode.com/comments`

> Note: JSONPlaceholder accepts POST/PUT/DELETE requests but does not persist changes permanently. Use these endpoints for practicing React Query patterns.
