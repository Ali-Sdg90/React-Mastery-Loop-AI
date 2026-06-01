# Note Manager Learning Notes

This challenge practiced React Query CRUD with a focus on cache invalidation and controlled forms.

Practice next:

- Practice explicit mutation error rendering for create/edit/delete flows.
- Review React Query `useMutation` states and make sure `isError` / `error` are guarded correctly before accessing `error.message`.
- Try scoping edit form state more narrowly, so each note item owns its own edit input state instead of a single parent `editNote` state.
- Keep an eye on small conditional rendering bugs where error objects may be returned directly into JSX.
