import { useParams } from "react-router-dom";
import { useCreateComment } from "../../hooks/useComments";

const AddCommentForm = () => {
    const createCommentMutation = useCreateComment();

    const { id } = useParams();

    const handleSubmitComment = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            comment: formData.get("comment"),
            postId: +id,
        };

        if (!data.name.trim() || !data.email.trim() || !data.comment.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        createCommentMutation.mutate(data);

        e.target.reset();
    };

    return (
        <div>
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

export default AddCommentForm;
