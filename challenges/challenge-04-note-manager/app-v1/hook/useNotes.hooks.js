import { useQuery } from "@tanstack/react-query";
import { delReq, getReq, patchReq, postReq } from "../api/api-service";
import { useInvalidateMutation } from "./useInvalidateMutation";

const NOTES_KEY = ["notes"];

export const useNotes = () => {
    return useQuery({
        queryKey: NOTES_KEY,
        queryFn: () => getReq("/posts"),
    });
};

export const useCreateNote = () => {
    return useInvalidateMutation((data) => postReq("/posts", data), NOTES_KEY);
};

export const useDeleteNote = () => {
    return useInvalidateMutation((id) => delReq(`/posts/${id}`), NOTES_KEY);
};

export const useEditNote = () => {
    return useInvalidateMutation(
        ({ id, data }) => patchReq(`/posts/${id}`, data),
        NOTES_KEY,
    );
};
