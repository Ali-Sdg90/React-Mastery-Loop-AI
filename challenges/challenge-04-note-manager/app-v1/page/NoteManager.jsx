import { useEffect } from "react";
import { getReq } from "../api/api-service";
import CreateNewNote from "../components/NewNoteForm";
import ShowNotes from "../components/ShowNotes";
import useApiService from "../hook/useApiService";

const NoteManager = () => {
    const { noteQuery, createNewNote, deleteNote, patchNote } = useApiService();

    const handleSubmit = (e) => {
        e.preventDefault();
        const content = e.target.elements[0].value.trim();

        if (!content) return;

        console.log("New Note Content:", content);

        // createNewNote.mutate({
        //     endpoint: "/create",
        //     data: { title: content },
        // });

        e.target.elements[0].value = "";
    };

    return (
        <div>
            <h1>Note Manager</h1>

            <CreateNewNote handleSubmit={handleSubmit} />

            <ShowNotes />
        </div>
    );
};

export default NoteManager;
