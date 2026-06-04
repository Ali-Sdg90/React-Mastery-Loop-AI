import { useParams } from "react-router-dom";
import { useNote } from "../../hooks/useNotes";

const NoteViewer = () => {
    const { id } = useParams();

    const {
        data: noteData,
        isLoading: noteIsLoading,
        error: noteError,
    } = useNote(id);

    if (noteIsLoading) {
        return <p>Loading data...</p>;
    }

    if (noteError) {
        return <p>Error: {noteError.message}</p>;
    }

    return (
        noteData && (
            <div>
                <h1>{noteData.title}</h1>
                <p>{noteData.body}</p>
            </div>
        )
    );
};

export default NoteViewer;
