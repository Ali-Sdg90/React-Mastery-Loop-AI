import { useParams } from "react-router-dom";
import { useEditNote, useNote } from "../../hooks/useNotes";

const NoteEditor = ({ setEditMode }) => {
    const editNoteMutation = useEditNote();

    const { id } = useParams();

    const {
        data: noteData,
        isLoading: noteIsLoading,
        error: noteError,
    } = useNote(id);

    const handleSubmitEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            title: formData.get("title"),
            body: formData.get("body"),
        };

        editNoteMutation.mutate(
            {
                id,
                data,
            },
            {
                onSuccess: () => {
                    setEditMode(false);
                },
            },
        );
    };

    return (
        <div>
            {noteIsLoading && <p>Loading note...</p>}

            {noteError && <p>Error: {noteError.message}</p>}

            {noteData && (
                <form onSubmit={handleSubmitEdit}>
                    <label>
                        Title:{" "}
                        <input
                            type="text"
                            defaultValue={noteData?.title}
                            name="title"
                        />
                    </label>

                    <br />

                    <label>
                        Body:{" "}
                        <textarea defaultValue={noteData?.body} name="body" />
                    </label>

                    <br />

                    <button type="submit" disabled={editNoteMutation.isPending}>
                        {editNoteMutation.isPending
                            ? "Saving..."
                            : "Save Changes"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default NoteEditor;
