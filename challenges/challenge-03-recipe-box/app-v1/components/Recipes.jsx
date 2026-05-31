const Recipes = ({
    recipes,
    deletehandler,
    editHandler,
    loadingIDs,
    errorIDs,
    errors,
}) => {
    return (
        <ol>
            {recipes.map((recipe) => (
                <li key={recipe.id}>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <div>{recipe.title}</div>

                        <button onClick={() => deletehandler(recipe.id)}>
                            {loadingIDs.delete === recipe.id
                                ? "Deleting..."
                                : "Delete"}
                        </button>

                        <button
                            onClick={() =>
                                editHandler({
                                    id: recipe.id,
                                    title: "Updated Title",
                                })
                            }
                        >
                            {loadingIDs.edit === recipe.id
                                ? "Editing..."
                                : "Edit"}
                        </button>

                        {errorIDs.delete === recipe.id && (
                            <div style={{ color: "red" }}>
                                Error Delete: {errors.delete.message}
                            </div>
                        )}
                        {errorIDs.edit === recipe.id && (
                            <div style={{ color: "red" }}>
                                Error Edit: {errors.edit.message}
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    );
};

export default Recipes;
