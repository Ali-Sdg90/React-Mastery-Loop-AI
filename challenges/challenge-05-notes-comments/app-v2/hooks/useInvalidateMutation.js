import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInvalidateMutation = (mutationFn, queryKey) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
};
