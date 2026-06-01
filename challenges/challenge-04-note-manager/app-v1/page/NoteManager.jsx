import { useState } from "react";
import CreateNewNote from "../components/NewNoteForm";
import ShowNotes from "../components/ShowNotes";
import { useCreateNote, useDeleteNote } from "../hook/useNotes.hooks";

const NoteManager = () => {
    const [newNote, setNewNote] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const createNoteMutation = useCreateNote();
    const deleteNoteMutation = useDeleteNote();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newNote) return;

        console.log("New Note Content:", newNote);

        createNoteMutation.mutate({ title: newNote });
        setNewNote("");
    };

    const deleteHandler = async (id) => {
        try {
            setDeletingId(id);
            await deleteNoteMutation.mutateAsync(id);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div>
            <h1>Note Manager</h1>

            <CreateNewNote
                handleSubmit={handleSubmit}
                newNote={newNote}
                setNewNote={setNewNote}
                isPending={createNoteMutation.isPending}
                error={createNoteMutation.error}
            />

            <ShowNotes
                deleteHandler={deleteHandler}
                deleteIsPending={deleteNoteMutation.isPending}
                deleteError={deleteNoteMutation.error}
                deletingId={deletingId}
            />
        </div>
    );
};

export default NoteManager;
