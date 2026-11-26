const API_URL = "https://dummyjson.com/posts";

const patchFunc = async (postId, changes, token) => {
    const { title, body } = changes;

    const output = {
        success: false,
        data: null,
        error: null,
    };

    if (!token) {
        return {
            success: false,
            data: null,
            error: "Missing access token",
        };
    }

    try {
        const response = await fetch(`${API_URL}/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                postId,
                title,
                body,
            }),
        });

        if (!response.ok) {
            throw new Error(`Http Error >> ${response.status}`);
        }

        const data = await response.json();

        if (data) {
            output.data = data;
            output.success = true;
            output.error = null;
        }
    } catch (error) {
        console.error("Error >>", error.message);

        output.data = null;
        output.error = error.message;
        output.success = false;
    }

    return output;
};

patchFunc(
    12,
    {
        title: "Updated from my dashboard",
        body: "New content!",
    },
    "demo-token-123",
).then(console.log);
