async function getDashboardStats(userId) {
    try {
        let [users, tasks] = await Promise.all([
            fetch(
                `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
            ),
            fetch(
                `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
            ),
        ]);

        // const [a, b] = await Promise.all([fetch("a"), fetch("b")]);

        if (!users.ok || !tasks.ok) {
            throw new Error(`Http Error ${users.status} ${tasks.status}`);
        }

        const usersData = await users.json();
        const tasksData = await tasks.json();

        console.log(usersData, tasksData);

        const completedTodos = tasksData.filter((task) => task.completed);

        return {
            userId,
            totalPosts: tasksData.length,
            totalTodos: tasksData.length - completedTodos.length,
            completedTodos: completedTodos.length,
        };
    } catch (error) {
        console.error(`error >> ${error}`);
        return null;
    }
}

getDashboardStats(2).then(console.log);
