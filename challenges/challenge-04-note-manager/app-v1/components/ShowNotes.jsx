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
    numberOfNotes
}) => {
    const { data: notes, isLoading, error } = useNotes();

    return (
        <div>
            {isLoading && <p>Loading notes...</p>}

            {error && <p>Error: {error.message}</p>}

            <ol>
                {notes?.map(
                    (note, index) =>
                        index < numberOfNotes && (
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
                                {deleteError ||
                                    (editingError && (
                                        <p>
                                            Error: {deleteError.message}
                                            {editingError.message}
                                        </p>
                                    ))}
                                <button
                                    onClick={() => {
                                        setEditingId((prevState) =>
                                            prevState === note.id
                                                ? null
                                                : note.id,
                                        );
                                        setEditNote(note.title);
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
