import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import CommentsList from "./CommentsList";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import { useNavigate, useParams } from "react-router-dom";

const AboutPage = () => {
    const [editMode, setEditMode] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

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

    return (
        <>
            <h1>About Page -- Note id: {id}</h1>

            <button onClick={() => navigate("/homepage")}>
                Go back to home page
            </button>
            <button onClick={() => setEditMode((prev) => !prev)}>
                Toggle Edit Mode ({editMode ? "Editing" : "Viewing"})
            </button>

            {editMode ? (
                <NoteEditor setEditMode={setEditMode} />
            ) : (
                <NoteViewer />
            )}

            <CommentsList />

            <AddCommentForm />
        </>
    );
};

export default AboutPage;
