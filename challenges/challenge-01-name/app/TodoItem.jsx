const TodoItem = (todo, index, setSavedTodos) => {
    return (
        <div className="todo-item" key={index}>
            <div
                style={{
                    textDecoration: todo.isComplete ? "line-through" : "none",
                }}
            >
                {todo.title}
            </div>

            <button
                onClick={() =>
                    setSavedTodos((prevState) => {
                        const newState = prevState.map((baseTodo) =>
                            baseTodo.title === todo.title
                                ? {
                                      ...baseTodo,
                                      isComplete: !baseTodo.isComplete,
                                  }
                                : baseTodo,
                        );
                        return newState;
                    })
                }
            >
                change state
            </button>
        </div>
    );
};

export default TodoItem;
