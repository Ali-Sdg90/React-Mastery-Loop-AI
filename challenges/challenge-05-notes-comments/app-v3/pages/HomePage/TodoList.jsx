import { useNavigate } from "react-router-dom";
import { useDeleteNote, useNotes } from "../../hooks/useNotes";

const TodoList = () => {
    const deleteNoteMutation = useDeleteNote();

    const {
        data: fetchData,
        isLoading: fetchIsLoading,
        error: fetchError,
    } = useNotes();

    const deleteHandler = (id) => {
        deleteNoteMutation.mutate(id);
    };

    const navigate = useNavigate();

    return (
        <div>
            {fetchIsLoading && <p>Loading todos...</p>}

            {fetchError && <p>Error: {fetchError.message}</p>}

            <ol>
                {fetchData?.map(
                    (note, index) =>
                        index < 25 && (
                            <li key={note.id}>
                                <div>
                                    {note.title}{" "}
                                    <button
                                        onClick={() =>
                                            navigate("/about/" + note.id)
                                        }
                                    >
                                        Detail
                                    </button>
                                    <button
                                        onClick={() => deleteHandler(note.id)}
                                        disabled={deleteNoteMutation.isPending}
                                    >
                                        {deleteNoteMutation.isPending
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                    {deleteNoteMutation.error && (
                                        <p>
                                            Error:{" "}
                                            {deleteNoteMutation.error.message}
                                        </p>
                                    )}
                                </div>
                            </li>
                        ),
                )}
            </ol>
        </div>
    );
};

export default TodoList;
