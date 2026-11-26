import { apiRequest } from "../lib/apiClient";

/** Keep endpoint details out of React components. */
export const postsApi = {
    async list({ signal } = {}) {
        const result = await apiRequest("/posts?limit=5", { signal });
        return result.posts;
    },

    create(post, { signal } = {}) {
        return apiRequest("/posts/add", {
            method: "POST",
            body: post,
            signal,
        });
    },

    update(id, changes, { method = "PATCH", signal } = {}) {
        if (!['PATCH', 'PUT'].includes(method)) {
            throw new Error("Update method must be PATCH or PUT.");
        }

        return apiRequest(`/posts/${id}`, {
            method,
            body: changes,
            signal,
        });
    },

    remove(id, { signal } = {}) {
        return apiRequest(`/posts/${id}`, {
            method: "DELETE",
            signal,
        });
    },
};
