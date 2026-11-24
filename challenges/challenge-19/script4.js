const dashboard = {
    name: "My Todo Dashboard",
    settings: {
        theme: "dark",
        lastUserId: null,
    },
    todos: [],
};

const setNewMeta = {
    source: "api",
    highlighted: false,
};

async function loadTodos(dashboard, userId, highlightId) {
    try {
        const reqTodos = await fetch(
            `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
        );

        if (!reqTodos.ok) {
            throw new Error(`Http Error ${reqTodos.status}`);
        }

        const todos = await reqTodos.json();

        console.log("todos >> ", todos);

        const newTodos = todos.map((todo) => {
            return {
                ...todo,
                meta: { ...setNewMeta },
            };
        });

        console.log("newTodos >> ", newTodos);

        const updateHighlight = newTodos.map((newTodo) => {
            if (newTodo.id !== highlightId) {
                return newTodo;
            } else {
                return {
                    ...newTodo,
                    meta: {
                        ...newTodo.meta,
                        highlighted: true,
                    },
                };
            }
        });

        console.log("updateHighlight >> ", updateHighlight);

        const isSpecialTaskExist = updateHighlight.some(
            (task) => task?.meta?.highlighted === true,
        );

        console.log("isSpecialTaskExist >> ", isSpecialTaskExist);

        const unHighlightedTasks = updateHighlight.filter(
            (task) => task?.meta?.highlighted === false,
        );

        const unHighlightedTasksCount = unHighlightedTasks.length;

        console.log("unHighlightedTasksCount >> ", unHighlightedTasksCount);

        return {
            ...dashboard,
            settings: {
                ...dashboard.settings,
                lastUserId: userId,
            },
            todos: updateHighlight,
            incompleteCount: unHighlightedTasksCount,
            hasHighlighted: true,
        };
    } catch (error) {
        console.error(`error >> ${error}`);
        return null;
    }
}

loadTodos(dashboard, 2, 22).then(console.log);

const calc = async () => {
    const result = await loadTodos(dashboard, 2, 22);

    console.log(result.settings.lastUserId === 2);
    // true

    console.log(result.todos.find((t) => t.id === 22)?.meta.highlighted);
    // true

    console.log(result.todos.filter((t) => t.meta.highlighted).length);
    // 1

    console.log(result !== dashboard);
    // true

    console.log(result.settings !== dashboard.settings);
    // true

    console.log(dashboard.settings.lastUserId === null);
    // true
};
calc();
