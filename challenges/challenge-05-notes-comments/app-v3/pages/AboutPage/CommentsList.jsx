import { useParams } from "react-router-dom";
import { useGetComments } from "../../hooks/useComments";

const CommentsList = () => {
    const { id } = useParams();

    const {
        data: commentsData,
        isLoading: commentsIsLoading,
        error: commentsError,
    } = useGetComments(id);

    return (
        <div>
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
        </div>
    );
};

export default CommentsList;
