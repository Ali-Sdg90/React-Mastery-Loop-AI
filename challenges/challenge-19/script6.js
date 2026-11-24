async function fetchJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

async function loadDashboard() {
    const results = await Promise.allSettled([
        fetchJSON("https://jsonplaceholder.typicode.com/users"),
        fetchJSON("https://jsonplaceholder.typicode.com/posts"),
        fetchJSON("https://jsonplaceholder.typicode.com/invalid-endpoint"),
    ]);

    const [usersResult, postsResult, brokenResult] = results;

    const totalUsers =
        usersResult.status === "fulfilled" ? usersResult.value.length : 0;

    const totalPosts =
        postsResult.status === "fulfilled" ? postsResult.value.length : 0;

    const totalBroken =
        brokenResult.status === "fulfilled" ? brokenResult.value.length : 0;

    const successfulRequests = results.filter(
        (result) => result.status === "fulfilled",
    ).length;

    const failedRequests = results.filter(
        (result) => result.status === "rejected",
    ).length;

    return {
        totalUsers,
        totalPosts,
        totalBroken,
        successfulRequests,
        failedRequests,
    };
}

loadDashboard().then(console.log);
