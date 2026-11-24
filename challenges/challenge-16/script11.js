const board = {
    name: "Sprint 12",
    columns: [
        {
            id: "todo",
            title: "To Do",
            tasks: [
                {
                    id: 1,
                    title: "Fix navbar",
                    meta: {
                        priority: "medium",
                        points: 3,
                    },
                },
                {
                    id: 2,
                    title: "Add search",
                    meta: {
                        priority: "low",
                        points: 5,
                    },
                },
            ],
        },
        {
            id: "progress",
            title: "In Progress",
            tasks: [
                {
                    id: 3,
                    title: "Build dashboard",
                    meta: {
                        priority: "high",
                        points: 8,
                    },
                },
            ],
        },
    ],
};

// function updateTaskPriority(board, taskId, newPriority) {
//     return {
//         ...board,
//         columns: board.columns.map((column) => {
//             return {
//                 ...column,
//                 tasks: column.tasks.map((task) => {
//                     if (task.id !== taskId) {
//                         return {
//                             ...task,
//                             meta: {
//                                 ...task.meta,
//                             },
//                         };
//                     } else {
//                         return {
//                             ...task,
//                             meta: {
//                                 ...task.meta,
//                                 priority: newPriority,
//                             },
//                         };
//                     }
//                 }),
//             };
//         }),
//     };
// }

function updateTaskPriority(board, taskId, newPriority) {
    const taskExists = board.columns.some((column) =>
        column.tasks.some((task) => task.id === taskId),
    );

    if (!taskExists) {
        return board;
    }

    return {
        ...board,
        columns: board.columns.map((column) => {
            const hasTask = column.tasks.some((task) => task.id === taskId);

            if (!hasTask) {
                return column;
            }

            return {
                ...column,
                tasks: column.tasks.map((task) => {
                    if (task.id !== taskId) {
                        return task;
                    }

                    return {
                        ...task,
                        meta: {
                            ...task.meta,
                            priority: newPriority,
                        },
                    };
                }),
            };
        }),
    };
}

const result = updateTaskPriority(board, 2, "high");

console.log(result);
