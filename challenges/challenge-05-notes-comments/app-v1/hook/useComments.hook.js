import { useQuery } from "@tanstack/react-query";
import { delReq, getReq, patchReq, postReq } from "../api/api-service";
import { useInvalidateMutation } from "./useInvalidateMutation";

const COMMENTS_KEY = ["comments"];

export const useComments = () => {
    return useQuery({
        queryKey: COMMENTS_KEY,
        queryFn: () => getReq("/comments"),
    });
};

export const useOneComment = () => {
    return useQuery({
        queryKey: COMMENTS_KEY,
        queryFn: (id) => getReq(`/comments/${id}`),
    });
};

export const useCreateComment = () => {
    return useInvalidateMutation(
        (data) => postReq("/comments", data),
        COMMENTS_KEY,
    );
};

export const useDeleteComment = () => {
    return useInvalidateMutation(
        (id) => delReq(`/comments/${id}`),
        COMMENTS_KEY,
    );
};

export const useEditComment = () => {
    return useInvalidateMutation(
        ({ id, data }) => patchReq(`/comments/${id}`, data),
        COMMENTS_KEY,
    );
};
