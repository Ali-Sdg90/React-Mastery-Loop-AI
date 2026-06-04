import { useNavigate, useParams } from "react-router-dom";
import { useNote, useEditNote } from "../hooks/useNotes";
import { useEffect, useState } from "react";
import { useCreateComment, useGetComments } from "../hooks/useComments";

const AboutPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const {
        data: noteData,
        isLoading: noteIsLoading,
        error: noteError,
    } = useNote(id);

    const {
        data: commentsData,
        isLoading: commentsIsLoading,
        error: commentsError,
    } = useGetComments(id);

    const [editMode, setEditMode] = useState(false);

    const [titleInput, setTitleInput] = useState("");
    const [bodyInput, setBodyInput] = useState("");

    const editNoteMutation = useEditNote();
    const createCommentMutation = useCreateComment();

    const handleSubmitEdit = (e) => {
        e.preventDefault();

        if (!titleInput.trim() || !bodyInput.trim()) return;

        editNoteMutation.mutate(
            {
                id,
                data: {
                    title: titleInput,
                    body: bodyInput,
                },
            },
            {
                onSuccess: () => {
                    setEditMode(false);
                },
            },
        );
    };

    useEffect(() => {
        if (noteData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTitleInput(noteData.title);
            setBodyInput(noteData.body);
        }
    }, [noteData]);

    if (!id) {
        return (
            <div>
                <h1>About Page</h1>
                <p>No ID provided.</p>

                <button onClick={() => navigate("/homepage")}>
                    Go back to home page
                </button>
            </div>
        );
    }

    const handleSubmitComment = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            comment: formData.get("comment"),
            postId: +id,
        };

        createCommentMutation.mutate(data);

        e.target.reset();
    };

    return (
        <div>
            <h1>About Page -- Note id: {id}</h1>

            <button onClick={() => navigate("/homepage")}>
                Go back to home page
            </button>

            <button onClick={() => setEditMode(!editMode)}>
                Toggle Edit Mode ({editMode ? "Editing" : "Viewing"})
            </button>

            <br />
            <br />

            {noteIsLoading && <p>Loading note...</p>}

            {noteError && <p>Error: {noteError.message}</p>}

            {noteData &&
                (editMode ? (
                    <form onSubmit={handleSubmitEdit}>
                        <label>
                            Title:{" "}
                            <input
                                type="text"
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                        </label>

                        <br />

                        <label>
                            Body:{" "}
                            <textarea
                                value={bodyInput}
                                onChange={(e) => setBodyInput(e.target.value)}
                            />
                        </label>

                        <br />

                        <button
                            type="submit"
                            disabled={editNoteMutation.isPending}
                        >
                            {editNoteMutation.isPending
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </form>
                ) : (
                    <>
                        <h1>{noteData.title}</h1>
                        <p>{noteData.body}</p>
                    </>
                ))}

            <h2>Comments:</h2>

            {commentsIsLoading && <p>Loading comments...</p>}

            {commentsError && <p>Error: {commentsError.message}</p>}

            {commentsData?.map((comment) => (
                <div
                    key={comment.id}
                    style={{
                        border: "1px solid white",
                        marginBottom: "5px",
                        padding: "2px 16px",
                    }}
                >
                    <h4>Name: {comment.name}</h4>
                    <h5>Email: {comment.email}</h5>
                    <p>Comment: {comment.body}</p>
                </div>
            ))}

            <h2>Add a Comment:</h2>

            <form onSubmit={handleSubmitComment}>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>

                <br />

                <label>
                    Email:
                    <input type="email" name="email" />
                </label>

                <br />

                <label>
                    Comment:
                    <textarea name="comment" />
                </label>

                <br />

                <button
                    type="submit"
                    disabled={createCommentMutation.isPending}
                >
                    {createCommentMutation.isPending
                        ? "Adding Comment..."
                        : "Add Comment"}
                </button>

                {createCommentMutation.error && (
                    <p style={{ color: "red" }}>
                        Error: {createCommentMutation.error.message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default AboutPage;
