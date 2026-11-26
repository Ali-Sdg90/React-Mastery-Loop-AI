import { useCallback, useEffect, useRef, useState } from "react";
import { postsApi } from "../api/postsApi";
import { useRequestLocks } from "./useRequestLocks";

const DEMO_USER_ID = 5;

/** Owns server data, lifecycle states, request concurrency, and CRUD actions. */
export function usePosts() {
    const [posts, setPosts] = useState([]);
    const [readStatus, setReadStatus] = useState("loading");
    const [isFetching, setIsFetching] = useState(false);
    const [readError, setReadError] = useState(null);
    const [actionError, setActionError] = useState(null);
    const [notice, setNotice] = useState("");

    const { runLocked, busyKeys } = useRequestLocks();
    const mountedRef = useRef(false);
    const loadedOnceRef = useRef(false);
    const activeReadRef = useRef(null);
    const dataVersionRef = useRef(0);
    const writeControllersRef = useRef(new Set());
    const localIdRef = useRef(0);

    const reload = useCallback(() => {
        // Share the in-flight GET instead of sending duplicate requests.
        if (activeReadRef.current) {
            return activeReadRef.current.promise;
        }

        const controller = new AbortController();
        const versionAtStart = dataVersionRef.current;

        setReadError(null);
        setIsFetching(true);
        if (!loadedOnceRef.current) setReadStatus("loading");

        const promise = (async () => {
            try {
                const items = await postsApi.list({ signal: controller.signal });

                // Ignore results canceled or invalidated by a later write.
                if (
                    controller.signal.aborted ||
                    versionAtStart !== dataVersionRef.current ||
                    !mountedRef.current
                ) return;

                setPosts(items);
                loadedOnceRef.current = true;
                setReadStatus("success");
            } catch (error) {
                if (controller.signal.aborted || !mountedRef.current) return;

                setReadError(error.message);
                if (!loadedOnceRef.current) setReadStatus("error");
            } finally {
                // An older request must never clear a newer request's state.
                if (activeReadRef.current?.controller === controller) {
                    activeReadRef.current = null;
                    if (mountedRef.current) setIsFetching(false);
                }
            }
        })();

        activeReadRef.current = { controller, promise };
        return promise;
    }, []);

    useEffect(() => {
        mountedRef.current = true;
        void reload();

        return () => {
            mountedRef.current = false;
            activeReadRef.current?.controller.abort();
            activeReadRef.current = null;

            // Cancel pending writes when the component unmounts.
            for (const controller of writeControllersRef.current) {
                controller.abort();
            }
        };
    }, [reload]);

    const commitChange = useCallback((updatePosts) => {
        // A pending GET could overwrite a successful mutation: invalidate it.
        dataVersionRef.current += 1;
        if (activeReadRef.current) {
            activeReadRef.current.controller.abort();
            activeReadRef.current = null;
            setIsFetching(false);
        }

        setPosts(updatePosts);
    }, []);

    const runMutation = useCallback((key, action) => {
        return runLocked(key, async () => {
            const controller = new AbortController();
            writeControllersRef.current.add(controller);
            setActionError(null);
            setNotice("");

            try {
                return await action(controller.signal);
            } catch (error) {
                if (controller.signal.aborted || !mountedRef.current) return false;
                setActionError(error.message);
                return false;
            } finally {
                writeControllersRef.current.delete(controller);
            }
        });
    }, [runLocked]);

    const createPost = useCallback(({ title, body }) => {
        return runMutation("create", async (signal) => {
            const values = { title: title.trim(), body: body.trim() };
            if (!values.title || !values.body) {
                throw new Error("Title and body are required.");
            }

            const created = await postsApi.create(
                { ...values, userId: DEMO_USER_ID },
                { signal },
            );

            if (signal.aborted || !mountedRef.current) return false;

            // DummyJSON does not persist writes; use a unique local UI ID.
            const localId = `local-${++localIdRef.current}`;
            commitChange((current) => [
                { ...created, ...values, id: localId, isLocal: true },
                ...current,
            ]);
            setNotice("Post created in this demo session.");
            return true;
        });
    }, [commitChange, runMutation]);

    const updatePost = useCallback((post, { title, body }, method = "PATCH") => {
        return runMutation(`post:${post.id}`, async (signal) => {
            const values = { title: title.trim(), body: body.trim() };
            if (!values.title || !values.body) {
                throw new Error("Title and body are required.");
            }

            // PUT sends the complete editable resource shape for this demo.
            const requestBody = method === "PUT"
                ? { ...values, userId: post.userId }
                : values;

            // Newly created records only exist locally in DummyJSON demos.
            const updated = post.isLocal
                ? requestBody
                : await postsApi.update(post.id, requestBody, { method, signal });

            if (signal.aborted || !mountedRef.current) return false;

            commitChange((current) => current.map((item) =>
                item.id === post.id
                    ? { ...item, ...updated, id: post.id }
                    : item,
            ));
            setNotice("Post updated in this demo session.");
            return true;
        });
    }, [commitChange, runMutation]);

    const removePost = useCallback((post) => {
        return runMutation(`post:${post.id}`, async (signal) => {
            if (!post.isLocal) {
                const result = await postsApi.remove(post.id, { signal });
                if (!result?.isDeleted) {
                    throw new Error("The server did not confirm the deletion.");
                }
            }

            if (signal.aborted || !mountedRef.current) return false;

            commitChange((current) => current.filter((item) => item.id !== post.id));
            setNotice("Post removed from this demo session.");
            return true;
        });
    }, [commitChange, runMutation]);

    return {
        posts,
        readStatus,
        isFetching,
        readError,
        actionError,
        notice,
        busyKeys,
        reload,
        createPost,
        updatePost,
        removePost,
    };
}
