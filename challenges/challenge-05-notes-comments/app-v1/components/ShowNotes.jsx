import { useNotes } from "../hook/useNotes.hooks";
import EditNote from "./editNote";

const ShowNotes = ({ deleteRelated, editingRelated, numberOfNotes }) => {
    const { data: notes, isLoading, error } = useNotes();

    const { deleteHandler, deleteIsPending, deleteError, deletingId } =
        deleteRelated;
    const {
        editingHandler,
        editIsPending,
        editError,
        editId,
        editNote,
        setEditNote,
        setEditingId,
    } = editingRelated;

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
                                    (editError && (
                                        <p>
                                            Error: {deleteError.message}
                                            {editError.message}
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
                                    {editId === note.id ? "Close Edit" : "Edit"}
                                </button>
                                {editId === note.id && (
                                    <EditNote
                                        editingHandler={editingHandler}
                                        editNote={editNote}
                                        setEditNote={setEditNote}
                                        note={note}
                                        editingIsPending={editIsPending}
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
