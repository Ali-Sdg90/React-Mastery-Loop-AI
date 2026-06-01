import { useNotes } from "../hook/useNotes.hooks";
import EditNote from "./editNote";

const ShowNotes = ({
    deleteHandler,
    deleteIsPending,
    deleteError,
    deletingId,
    editingId,
    editNote,
    setEditNote,
    editingIsPending,
    editingError,
    editingHandler,
    setEditingId,
}) => {
    const { data: notes, isLoading, error } = useNotes();

    return (
        <div>
            {isLoading && <p>Loading notes...</p>}

            {error && <p>Error: {error.message}</p>}

            <ol>
                {notes?.map(
                    (note, index) =>
                        index < 20 && (
                            <li key={note.id}>
                                {note.title} -{" "}
                                <button
                                    onClick={() => deleteHandler(note.id)}
                                    disabled={
                                        deleteIsPending &&
                                        note.id === deletingId
                                    }
                                >
                                    {deleteIsPending && note.id === deletingId
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                                {deleteError && (
                                    <p>Error: {deleteError.message}</p>
                                )}
                                <button
                                    onClick={() => {
                                        setEditingId((prevState) =>
                                            prevState === note.id
                                                ? null
                                                : note.id,
                                        );
                                    }}
                                >
                                    {editingId === note.id
                                        ? "Close Edit"
                                        : "Edit"}
                                </button>
                                {editingId === note.id && (
                                    <EditNote
                                        editHandler={editingHandler}
                                        editNote={editNote}
                                        setEditNote={setEditNote}
                                        note={note}
                                        editingIsPending={editingIsPending}
                                        editingError={editingError}
                                    />
                                )}
                            </li>
                        ),
                )}
            </ol>
        </div>
    );
};

export default ShowNotes;
