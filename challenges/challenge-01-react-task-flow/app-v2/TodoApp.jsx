import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import "./style.scss";

const TodoApp = () => {
    const [savedTodos, setSavedTodos] = useState([]);
    const [currentTodo, setCurrentTodo] = useState("");
    const [showTodoMode, setShowTodoMode] = useState("all");

    const submitHandle = (e) => {
        e.preventDefault();

        setSavedTodos((prevState) => [
            ...prevState,
            { title: currentTodo, isComplete: false, id: Date.now() },
        ]);

        setCurrentTodo("");
    };

    useEffect(() => {
        console.log(">>", savedTodos);
    }, [savedTodos]);

    const handleToggleTodo = (id) => {
        setSavedTodos((prevState) => {
            const newState = prevState.map((baseTodo) =>
                baseTodo.id === id
                    ? {
                          ...baseTodo,
                          isComplete: !baseTodo.isComplete,
                      }
                    : baseTodo,
            );
            return newState;
        });
    };

    let filteredTodos = savedTodos;

    if (showTodoMode === "active") {
        filteredTodos = savedTodos.filter((todo) => !todo.isComplete);
    } else if (showTodoMode === "completed") {
        filteredTodos = savedTodos.filter((todo) => todo.isComplete);
    }

    return (
        <>
            <h1>1. Todo App</h1>

            <div className="todo-section">
                <form onSubmit={submitHandle} className="input-todo">
                    <label>
                        Input:{" "}
                        <input
                            type="text"
                            placeholder="enter your todo"
                            value={currentTodo}
                            onChange={(e) => setCurrentTodo(e.target.value)}
                        />
                    </label>

                    <button type="submit" disabled={!currentTodo}>
                        Add
                    </button>
                </form>

                <div className="show-todos">
                    {filteredTodos.length > 0 ? (
                        [...filteredTodos]
                            .reverse()
                            .map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    handleToggleTodo={handleToggleTodo}
                                />
                            ))
                    ) : (
                        <div>No Todo yet!</div>
                    )}
                </div>

                <div className="todo-filter-btn">
                    <div
                        onClick={() => setShowTodoMode("all")}
                        style={{
                            textDecoration:
                                showTodoMode === "all"
                                    ? "none"
                                    : "line-through",
                        }}
                    >
                        All
                    </div>
                    <div
                        onClick={() => setShowTodoMode("active")}
                        style={{
                            textDecoration:
                                showTodoMode === "active"
                                    ? "none"
                                    : "line-through",
                        }}
                    >
                        Active
                    </div>
                    <div
                        onClick={() => setShowTodoMode("completed")}
                        style={{
                            textDecoration:
                                showTodoMode === "completed"
                                    ? "none"
                                    : "line-through",
                        }}
                    >
                        Completed
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoApp;
