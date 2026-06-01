import { useState } from "react";

const NewNoteForm = ({ handleSubmit }) => {
    const [newNote, setNewNote] = useState("");

    return (
        <div>
            <h2>Add Note</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Note content"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                />

                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default NewNoteForm;
