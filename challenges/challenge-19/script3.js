async function getUserWithPosts(userId) {
    try {
        const req = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`,
        );

        if (!req.ok) {
            throw new Error(`http error >> ${req.status}`);
        }

        const data = await req.json();

        // console.log(data);

        const { name, email } = data;

        const userId2 = data.id;

        const postsReq = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId2}`,
        );

        if (!postsReq.ok) {
            throw new Error(`http error >> ${postsReq.status}`);
        }

        const posts = await postsReq.json();

        const postsOutput = posts.map((post) => {
            return {
                id: post.id,
                title: post.title,
            };
        });

        // console.log(postsOutput);

        return {
            user: {
                id: userId,
                name,
                email,
            },
            posts: postsOutput,
            totalPosts: postsOutput.length,
        };
    } catch (error) {
        console.error(`http error >> ${error}`);
        return null;
    }
}

getUserWithPosts(2).then(console.log);
