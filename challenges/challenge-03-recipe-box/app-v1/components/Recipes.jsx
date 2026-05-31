const Recipes = ({ recipes, deletehandler }) => {
    return (
        <ol>
            {recipes.map((recipe) => (
                <li
                    key={recipe.id}
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <div>{recipe.title}</div>
                    <button onClick={() => deletehandler(recipe.id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ol>
    );
};

export default Recipes;
