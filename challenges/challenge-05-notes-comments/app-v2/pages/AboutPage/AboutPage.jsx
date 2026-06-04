import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import CommentsList from "./CommentsList";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";

const AboutPage = () => {
    const [editMode, setEditMode] = useState(false);

    return (
        <>
            {editMode ? <NoteEditor /> : <NoteViewer />}

            <button onClick={() => setEditMode((prev) => !prev)}>
                Toggle Edit Mode ({editMode ? "Editing" : "Viewing"})
            </button>

            <CommentsList />
            <AddCommentForm />
        </>
    );
};

export default AboutPage;
