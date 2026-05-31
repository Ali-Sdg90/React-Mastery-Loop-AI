import { useState } from "react";

const AddRecipeForm = ({ onAddRecipe, isLoading, error }) => {
    const [recipeName, setRecipeName] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();

        if (recipeName.trim() === "") return;

        onAddRecipe(recipeName);
        setRecipeName("");
    };

    return (
        <form onSubmit={handelSubmit}>
            <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="Enter recipe name"
            />

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Recipe"}
            </button>

            {error && (
                <div style={{ color: "red" }}>Error: {error.message}</div>
            )}
        </form>
    );
};

export default AddRecipeForm;
