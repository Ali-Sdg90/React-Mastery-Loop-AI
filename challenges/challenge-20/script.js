const httpUrl = "https://jsonplaceholder.typicode.com/posts";

//  + `$id=${userId}`

async function createPost(title, body, userId) {
    try {
        const req = await fetch(httpUrl + `?userId=${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //  Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                userId,
                title,
                body,
            }),
        });

        if (!req.ok) {
            throw new Error("Http Error >>", req.status);
        }

        const data = await req.json();

        return data;
    } catch (error) {
        console.error("Error >>", error);
        return null;
    }
}

createPost("My First Post", "Hello World!", 2).then(console.log);
