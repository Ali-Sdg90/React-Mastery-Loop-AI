async function getPostSummary(postId) {
    try {
        const getReq = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}`,
        );

        if (!getReq.ok) {
            throw new Error(`http error >> ${getReq.status}`);
        }

        const data = await getReq.json();

        // console.log(data);

        const { id, title, body: content } = data;

        return {
            id,
            title,
            content,
        };
    } catch (error) {
        console.error(`http error >> ${error}`);
        return null;
    }
}

getPostSummary(5).then(console.log);
