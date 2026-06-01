const NewNoteForm = ({
    handleSubmit,
    newNote,
    setNewNote,
    isPending,
    error,
    numberOfNotes,
    setNumberOfNotes,
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

                <p>
                    Number of results:{" "}
                    <input
                        type="number"
                        min={10}
                        max={100}
                        value={numberOfNotes}
                        onChange={(e) =>
                            setNumberOfNotes(parseInt(e.target.value) || 10)
                        }
                    />
                </p>

                {error && <p>Error: {error.message}</p>}
            </form>
        </div>
    );
};

export default NewNoteForm;
