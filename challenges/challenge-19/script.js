async function getUserProfile(userId) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`,
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const {
            id,
            name,
            email,
            address: { city },
        } = data;

        return { id, name, email, city };
    } catch (error) {
        console.error(`Error >> ${error}`);
        return null;
    }
}

getUserProfile(2).then(console.log);
