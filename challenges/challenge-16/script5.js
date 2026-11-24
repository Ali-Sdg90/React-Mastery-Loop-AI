const project = {
    id: 1,
    name: "Portfolio",
    settings: {
        theme: "dark",
        notifications: true,
    },
    tasks: [
        {
            id: 101,
            title: "Build homepage",
            completed: true,
            details: {
                priority: "high",
                estimatedHours: 8,
            },
        },
        {
            id: 102,
            title: "Improve SEO",
            completed: false,
            details: {
                priority: "medium",
                estimatedHours: 5,
            },
        },
        {
            id: 103,
            title: "Write project stories",
            completed: false,
            details: {
                priority: "low",
                estimatedHours: 12,
            },
        },
    ],
};

function updateProjectTask(project, taskId, updates) {
    const selectedTask = project.tasks.find((task) => task.id === taskId);

    // console.log(selectedTask);

    const newSelectedTask = {
        ...selectedTask,
        completed: updates.completed,
        details: {
            ...selectedTask.details,
            ...updates.details,
        },
    };

    console.log(newSelectedTask);

    return {
        ...project,
        tasks: [...project.tasks, newSelectedTask],
    };
}

const updatedProject = updateProjectTask(project, 102, {
    completed: true,
    details: {
        priority: "high",
    },
});

console.log(updatedProject);
