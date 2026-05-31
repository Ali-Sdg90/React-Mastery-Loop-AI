import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createRecipe,
    fetchRecipes,
    deleteRecipe,
    updateRecipe,
} from "../api/recipes.api";

const useRecipes = () => {
    const queryClient = useQueryClient();

    const invalidateRecipes = () => {
        queryClient.invalidateQueries({ queryKey: ["recipes"] });
    };

    const recipesQuery = useQuery({
        queryKey: ["recipes"],
        queryFn: fetchRecipes,
    });

    const createRecipeMutation = useMutation({
        mutationFn: createRecipe,
        onSuccess: invalidateRecipes,
    });

    const deleteRecipeMutation = useMutation({
        mutationFn: deleteRecipe,
        onSuccess: invalidateRecipes,
    });

    const editRecipeMutation = useMutation({
        mutationFn: updateRecipe,
        onSuccess: invalidateRecipes,
    });

    return {
        recipesQuery,
        createRecipeMutation,
        deleteRecipeMutation,
        editRecipeMutation,
    };
};

export default useRecipes;
