import { useEffect, useState } from "react";
import CreateNewNote from "../components/NewNoteForm";
import ShowNotes from "../components/ShowNotes";
import {
    useCreateNote,
    useDeleteNote,
    useEditNote,
} from "../hook/useNotes.hooks";

const NoteManager = () => {
    const [newNote, setNewNote] = useState("");
    const [editNote, setEditNote] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const createNoteMutation = useCreateNote();
    const deleteNoteMutation = useDeleteNote();
    const editNoteMutation = useEditNote();

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

    const editingHandler = async (e, id) => {
        e.preventDefault();

        try {
            await editNoteMutation.mutateAsync({
                id,
                data: { title: editNote },
            });
        } finally {
            setEditingId(null);
        }
    };

    useEffect(() => {
        console.log("Editing Note Content:", editNote);
    }, [editNote]);

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
                editingId={editingId}
                editingHandler={editingHandler}
                editingIsPending={editNoteMutation.isPending}
                editingError={editNoteMutation.error}
                editNote={editNote}
                setEditNote={setEditNote}
                setEditingId={setEditingId}
            />
        </div>
    );
};

export default NoteManager;
