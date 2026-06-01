import { useNotes } from "../hook/useNotes.hooks";

const ShowNotes = ({
    deleteHandler,
    deleteIsPending,
    deleteError,
    deletingId,
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
                            </li>
                        ),
                )}
            </ol>
        </div>
    );
};

export default ShowNotes;
