import { useQuery } from "@tanstack/react-query";
import { getReq, postReq } from "../api/api-service";
import { useInvalidateMutation } from "./useInvalidateMutation";

const QUERY_KEY = ["comments"];

export const useGetComments = (id) => {
    return useQuery({
        queryKey: [...QUERY_KEY, id],
        queryFn: () => getReq(`/comments?postId=${id}`),
    });
};

export const useCreateComment = () => {
    return useInvalidateMutation((data) => {
        return postReq("/comments", data);
    }, QUERY_KEY);
};
