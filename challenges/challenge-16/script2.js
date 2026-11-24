const tasks = [
    {
        id: 1,
        title: "Fix login bug",
        completed: false,
        priority: "high",
    },
    {
        id: 2,
        title: "Update dashboard",
        completed: false,
        priority: "medium",
    },
    {
        id: 3,
        title: "Write documentation",
        completed: true,
        priority: "low",
    },
];

function updateTask(tasks, taskId, updates) {
    const selectedTask = tasks.find((task) => task.id === taskId);

    const selectedTaskUpdate = { ...selectedTask, ...updates };

    const output = tasks.map((task) => {
        if (task.id === taskId) {
            return selectedTaskUpdate;
        } else {
            return task;
        }
    });

    return output;
}

console.log(
    updateTask(tasks, 2, {
        completed: true,
        priority: "high",
    }),
);
