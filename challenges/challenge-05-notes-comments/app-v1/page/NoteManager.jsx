import { useState } from "react";
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
    const [numberOfNotes, setNumberOfNotes] = useState(20);

    const createNoteMutation = useCreateNote();
    const deleteNoteMutation = useDeleteNote();
    const editNoteMutation = useEditNote();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newNote) return;

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

        if (!editNote) return;

        try {
            await editNoteMutation.mutateAsync({
                id,
                data: { title: editNote },
            });
        } finally {
            setEditingId(null);
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
                numberOfNotes={numberOfNotes}
                setNumberOfNotes={setNumberOfNotes}
            />

            <ShowNotes
                deleteRelated={{
                    deleteIsPending: deleteNoteMutation.isPending,
                    deleteError: deleteNoteMutation.error,
                    deleteHandler: deleteHandler,
                    deletingId: deletingId,
                }}
                editingRelated={{
                    editIsPending: editNoteMutation.isPending,
                    editError: editNoteMutation.error,
                    editingHandler: editingHandler,
                    editId: editingId,
                    editNote,
                    setEditNote,
                    setEditingId,
                }}
                numberOfNotes={numberOfNotes}
            />
        </div>
    );
};

export default NoteManager;
