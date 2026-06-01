const EditNote = ({
    editHandler,
    note,
    editNote,
    setEditNote,
    editingIsPending,
    editingError,
}) => {
    return (
        <form onSubmit={(e) => editHandler(e, note.id)}>
            <input
                type="text"
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                placeholder="Edit note..."
            />

            <button type="submit" disabled={editingIsPending}>
                {editingIsPending ? "Saving..." : "Save"}
            </button>

            {editingError && <p>Error: {editingError.message}</p>}
        </form>
    );
};

export default EditNote;
