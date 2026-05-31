import AddRecipeForm from "../components/AddRecipeForm";
import Recipes from "../components/recipes";
import useRecipes from "../hooks/useRecipes";

const RecipePage = () => {
    const { recipesQuery, createRecipeMutation, deleteRecipeMutation } =
        useRecipes();

    const onAddRecipe = (recipeName) => {
        createRecipeMutation.mutate({ title: recipeName });
    };

    return (
        <div>
            <h1>Recipe Box</h1>

            <AddRecipeForm
                onAddRecipe={onAddRecipe}
                isLoading={createRecipeMutation.isLoading}
                error={createRecipeMutation.error}
            />

            {recipesQuery.isLoading && <p>Loading recipes...</p>}

            {recipesQuery.error && (
                <div>Error loading recipes: {recipesQuery.error.message} </div>
            )}

            {recipesQuery.isSuccess && (
                <Recipes
                    recipes={recipesQuery.data || []}
                    deletehandler={deleteRecipeMutation.mutate}
                />
            )}
        </div>
    );
};

export default RecipePage;
