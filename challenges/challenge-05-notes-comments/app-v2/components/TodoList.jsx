import { useNavigate } from "react-router-dom";

const TodoList = ({ fetchSet, deleteSet }) => {
    const { fetchData, fetchIsLoading, fetchError } = fetchSet;
    const { deleteHandler, deleteIsPending, deleteError } = deleteSet;

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
                                        disabled={deleteIsPending}
                                    >
                                        {deleteIsPending
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                    {deleteError && (
                                        <p>Error: {deleteError.message}</p>
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
