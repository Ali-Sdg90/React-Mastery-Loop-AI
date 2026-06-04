import { useState } from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useCreateNote, useDeleteNote, useNotes } from "../hooks/useNotes";

const HomePage = () => {
    const [inputValue, setInputValue] = useState("");

    const createNoteMutation = useCreateNote();
    const deleteNoteMutation = useDeleteNote();

    const {
        data: fetchData,
        isLoading: fetchIsLoading,
        error: fetchError,
    } = useNotes();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        createNoteMutation.mutate({ title: inputValue });

        setInputValue("");
    };

    const deleteHandler = (id) => {
        deleteNoteMutation.mutate(id);
    };

    return (
        <div>
            <h1>Home Page</h1>

            <AddTodo
                handleSubmit={handleSubmit}
                inputValue={inputValue}
                setInputValue={setInputValue}
                isPending={createNoteMutation.isPending}
                errorMsg={createNoteMutation.error}
            />

            <TodoList
                fetchSet={{ fetchData, fetchIsLoading, fetchError }}
                deleteSet={{
                    deleteHandler,
                    deleteIsPending: createNoteMutation.isPending,
                    deleteError: createNoteMutation.error,
                }}
            />
        </div>
    );
};

export default HomePage;
