import { useState } from "react";
import AddRecipeForm from "../components/AddRecipeForm";
import Recipes from "../components/recipes";
import useRecipes from "../hooks/useRecipes";

const RecipePage = () => {
    const {
        recipesQuery,
        createRecipeMutation,
        deleteRecipeMutation,
        editRecipeMutation,
    } = useRecipes();

    const [loadingIDs, setLoadingIDs] = useState({
        edit: null,
        delete: null,
    });
    const [errorIDs, setErrorIDs] = useState({
        edit: null,
        delete: null,
    });
    const [errors, setErrors] = useState({
        edit: null,
        delete: null,
    });

    const deletehandler = (id) => {
        setLoadingIDs((prev) => ({ ...prev, delete: id }));

        deleteRecipeMutation.mutate(id, {
            onSettled: () => {
                setLoadingIDs((prev) => ({ ...prev, delete: null }));
            },
            onError: (error) => {
                setErrorIDs((prev) => ({ ...prev, delete: id }));
                setErrors((prev) => ({ ...prev, delete: error }));
            },
            onSuccess: () => {
                setErrorIDs((prev) => ({ ...prev, delete: null }));
                setErrors((prev) => ({ ...prev, delete: null }));
            },
        });
    };

    const editHandler = (updatedRecipe) => {
        setLoadingIDs((prev) => ({ ...prev, edit: updatedRecipe.id }));

        editRecipeMutation.mutate(
            {
                id: updatedRecipe.id,
                title: updatedRecipe.title,
            },
            {
                onSettled: () => {
                    setLoadingIDs((prev) => ({ ...prev, edit: null }));
                },
                onError: (error) => {
                    setErrorIDs((prev) => ({
                        ...prev,
                        edit: updatedRecipe.id,
                    }));
                    setErrors((prev) => ({ ...prev, edit: error }));
                },
                onSuccess: () => {
                    setErrorIDs((prev) => ({ ...prev, edit: null }));
                    setErrors((prev) => ({ ...prev, edit: null }));
                },
            },
        );
    };

    const onAddRecipe = (recipeName) => {
        createRecipeMutation.mutate({ title: recipeName });
    };

    return (
        <div>
            <h1>Recipe Box</h1>

            <AddRecipeForm
                onAddRecipe={onAddRecipe}
                isPending={createRecipeMutation.isPending}
                error={createRecipeMutation.error}
            />

            {recipesQuery.isLoading && <p>Loading recipes...</p>}

            {recipesQuery.error && (
                <div>Error loading recipes: {recipesQuery.error.message} </div>
            )}

            {recipesQuery.isSuccess && (
                <Recipes
                    recipes={recipesQuery.data || []}
                    deletehandler={deletehandler}
                    editHandler={editHandler}
                    loadingIDs={loadingIDs}
                    errorIDs={errorIDs}
                    errors={errors}
                />
            )}
        </div>
    );
};

export default RecipePage;
