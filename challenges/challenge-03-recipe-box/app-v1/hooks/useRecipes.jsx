import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecipe, fetchRecipes, deleteRecipe } from "../api/recipes.api";

const useRecipes = () => {
    const queryClient = useQueryClient();

    const recipesQuery = useQuery({
        queryKey: ["recipes"],
        queryFn: fetchRecipes,
    });

    const createRecipeMutation = useMutation({
        mutationFn: createRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
        },
    });

    const deleteRecipeMutation = useMutation({
        mutationFn: deleteRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
        },
    });

    return { recipesQuery, createRecipeMutation, deleteRecipeMutation };
};

export default useRecipes;
