const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchRecipes = async () => {
    console.log("GET Request >> ", BASE_URL);

    const response = await fetch(BASE_URL);

    if (!response.ok) {
        console.error("Error GET >> ", response.status, " >> ", response);
        throw new Error("Error getting data");
    }

    const data = await response.json();
    console.log("GET Response >> ", response.status, " >> ", data);

    return data;
};

export const createRecipe = async (newRecipe) => {
    console.log("POST Request >> ", BASE_URL, newRecipe);

    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
    });

    if (!response.ok) {
        console.error("Error POST >> ", response.status, " >> ", response);
        throw new Error("Error posting data");
    }

    const data = await response.json();
    console.log("POST Response >> ", response.status, " >> ", data);

    return data;
};

export const deleteRecipe = async (id) => {
    const url = `${BASE_URL}/${id}`;
    console.log("DELETE Request >> ", url);

    const response = await fetch(url, {
        method: "DELETE",
    });

    if (!response.ok) {
        console.error("Error DELETE >> ", response.status, " >> ", response);
        throw new Error("Error deleting data");
    }

    console.log("DELETE Response >> ", response.status, " >> ", true);
    return true;
};

export const updateRecipe = async ({ id, title }) => {
    const url = `${BASE_URL}/${id}`;
    console.log("PATCH Request >> ", url, { title });

    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        console.error("Error PATCH >> ", response.status, " >> ", response);
        throw new Error("Error updating data");
    }

    const data = await response.json();
    console.log("PATCH Response >> ", response.status, " >> ", data);

    return data;
};
