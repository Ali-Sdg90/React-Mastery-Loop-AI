import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReq, postReq } from "../api/api-service";

const useApiService = () => {
    const queryClient = useQueryClient();

    const invalidateNotes = () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
    };

    const noteQuery = useQuery({
        queryKey: ["notes"],
        queryFn: getReq,
    });

    const createNewNote = useMutation({
        mutationFn: postReq,
        onSuccess: invalidateNotes,
    });

    const deleteNote = useMutation({
        mutationFn: postReq,
        onSuccess: invalidateNotes,
    });

    const patchNote = useMutation({
        mutationFn: postReq,
        onSuccess: invalidateNotes,
    });

    return {
        noteQuery,
        createNewNote,
        deleteNote,
        patchNote,
    };
};

export default useApiService;
