const NewNoteForm = ({
    handleSubmit,
    newNote,
    setNewNote,
    isPending,
    error,
}) => {
    return (
        <div>
            <h2>Add Note</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Note content"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                />

                <button type="submit" disabled={isPending}>
                    {isPending ? "Adding..." : "Add Note"}
                </button>

                {error && <p>Error: {error.message}</p>}
            </form>
        </div>
    );
};

export default NewNoteForm;
