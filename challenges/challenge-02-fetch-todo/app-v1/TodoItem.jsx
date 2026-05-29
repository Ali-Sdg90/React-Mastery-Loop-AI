const TodoItem = ({ todo, handleToggleTodo }) => {
    return (
        <div className="todo-item">
            <div
                style={{
                    textDecoration: todo.isComplete ? "line-through" : "none",
                }}
            >
                {todo.title}
            </div>

            <button onClick={() => handleToggleTodo(todo.id)}>
                change state
            </button>
        </div>
    );
};

export default TodoItem;
