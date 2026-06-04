import { useState } from "react";
import { useCreateNote } from "../../hooks/useNotes";

const AddTodo = () => {
    const [inputValue, setInputValue] = useState("");

    const createNoteMutation = useCreateNote();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        createNoteMutation.mutate({ title: inputValue });

        setInputValue("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Add new Todo:
                    <input
                        type="text"
                        placeholder="write your new todo..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={createNoteMutation.isPending}
                    >
                        {createNoteMutation.isPending ? "Adding..." : "Add"}
                    </button>
                    {createNoteMutation.error && (
                        <p style={{ color: "red" }}>
                            {createNoteMutation.error}
                        </p>
                    )}
                </label>
            </form>
        </div>
    );
};

export default AddTodo;
