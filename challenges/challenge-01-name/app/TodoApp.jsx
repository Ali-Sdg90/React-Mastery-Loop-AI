import { useState } from "react";

const TodoApp = () => {
    const [inputValue, setInputValue] = useState("");
    const [todoList, setTodoList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValue);

        setTodoList((prevState) => [...prevState, inputValue]);

        setInputValue("");
    };

    return (
        <div>
            <h1>Todo App</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Input:{" "}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="enter your todo"
                    />
                </label>

                <button type="submit">Add</button>
            </form>

            {todoList.length > 0 ? (
                todoList.map((todoText, index) => (
                    <div key={index}>{todoText}</div>
                ))
            ) : (
                <div>No Todo yet! </div>
            )}
        </div>
    );
};

export default TodoApp;
