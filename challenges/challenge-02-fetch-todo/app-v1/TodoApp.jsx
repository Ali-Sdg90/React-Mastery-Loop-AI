import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import "./style.scss";
import useFetch from "./useFetch";
import useLocalStorage from "./useLocalStorage";

// Correct API LINK
const API_LINK = "https://jsonplaceholder.typicode.com/todos?_limit=6";

// Broken API LINK
// const API_LINK = "https://jsonplacehlder.typicode.com/todos?_limit=6";

const TodoApp = () => {
    const [currentTodo, setCurrentTodo] = useState("");
    const [showTodoMode, setShowTodoMode] = useState("all");
    const [savedTodos, setSavedTodos] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const [localTodos, setLocalTodos] = useLocalStorage("2.todos", []);

    const {
        isLoading,
        errorMsg,
        data: fetchData,
    } = useFetch(API_LINK, refresh);

    useEffect(() => {
        const formattedAPI = fetchData?.map((todo) => {
            return {
                title: todo.title,
                id: todo.id,
                isComplete: todo.completed,
                userCreated: false,
            };
        });

        const allTodos = [...(formattedAPI ?? []), ...localTodos];

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSavedTodos(allTodos);
    }, [fetchData, localTodos]);

    const submitHandle = (e) => {
        e.preventDefault();

        setSavedTodos((prevState) => [
            ...prevState,
            {
                title: currentTodo,
                isComplete: false,
                id: Date.now(),
                userCreated: true,
            },
        ]);
        setLocalTodos((prevState) => [
            ...prevState,
            {
                title: currentTodo,
                isComplete: false,
                id: Date.now(),
                userCreated: true,
            },
        ]);

        setCurrentTodo("");
    };

    useEffect(() => {
        console.log("savedTodos >>", savedTodos);
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

        setLocalTodos((prevState) => {
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
            <h1>2. Todo App - Fetch</h1>

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

                {isLoading ? (
                    <div>Loading...</div>
                ) : errorMsg ? (
                    <div>
                        Error: {errorMsg}{" "}
                        <button
                            onClick={() =>
                                setRefresh((prevState) => !prevState)
                            }
                        >
                            Try again
                        </button>
                    </div>
                ) : (
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
                )}

                <div className="todo-filter-btn">
                    <div
                        onClick={() => setShowTodoMode("all")}
                        className={
                            showTodoMode === "all"
                                ? "active-mode"
                                : "disable-mode"
                        }
                    >
                        All ({savedTodos.length})
                    </div>
                    <div
                        onClick={() => setShowTodoMode("active")}
                        className={
                            showTodoMode === "active"
                                ? "active-mode"
                                : "disable-mode"
                        }
                    >
                        Active (
                        {savedTodos.filter((todo) => !todo.isComplete).length})
                    </div>
                    <div
                        onClick={() => setShowTodoMode("completed")}
                        className={
                            showTodoMode === "completed"
                                ? "active-mode"
                                : "disable-mode"
                        }
                    >
                        Completed (
                        {savedTodos.filter((todo) => todo.isComplete).length})
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoApp;
