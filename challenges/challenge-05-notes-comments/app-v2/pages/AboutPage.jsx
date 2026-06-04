import { useNavigate, useParams } from "react-router-dom";
import { useNote, useCreateNote } from "../hooks/useNotes";
import { useEffect, useState } from "react";

const AboutPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { data, isLoading, error } = useNote(id);

    const [editMode, setEditMode] = useState(true);

    const [titleInput, setTitleInput] = useState("");
    const [bodyInput, setBodyInput] = useState("");

    const createNoteMutation = useCreateNote();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!titleInput.trim() || !bodyInput.trim()) return;

        createNoteMutation.mutate({ title: titleInput, body: bodyInput });
    };

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTitleInput(data.title);
            setBodyInput(data.body);
        }
    }, [data]);

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
        <div>
            <h1>About Page -- Note id: {id}</h1>

            <button onClick={() => setEditMode(!editMode)}>
                Toggle Edit Mode ({editMode ? "Editing" : "Viewing"})
            </button>

            <br />
            <br />

            {isLoading && <p>Loading note...</p>}

            {error && <p>Error: {error.message}</p>}

            {data &&
                (editMode ? (
                    <form>
                        <label>
                            Title:{" "}
                            <input
                                type="text"
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                        </label>

                        <br />

                        <label>
                            Body:{" "}
                            <textarea
                                value={bodyInput}
                                onChange={(e) => setBodyInput(e.target.value)}
                            />
                        </label>

                        <br />

                        <button type="submit" onClick={handleSubmit}>
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <>
                        <h1>{data.title}</h1>
                        <p>{data.body}</p>
                    </>
                ))}
        </div>
    );
};

export default AboutPage;
