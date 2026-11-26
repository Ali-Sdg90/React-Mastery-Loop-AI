import { useEffect, useState } from "react";

import useRequestLock from "./useRequestLock";

const token = 1234;

const App = () => {
    const runGetLocked = useRequestLock();

    const [input, setInput] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [getObj, setGetObj] = useState({
        data: [],
        error: null,
        loading: true,
    });
    const [postObj, setPostObj] = useState({
        data: [],
        error: null,
        loading: false,
    });
    const [patchObj, setPatchObj] = useState({
        data: [],
        error: null,
        loading: false,
    });
    const [deleteObj, setDeleteObj] = useState({
        data: [],
        error: null,
        loading: false,
    });

    useEffect(() => {
        getReq();
    }, []);

    const reloadData = () => {
        getReq(true);
    };

    const getReq = async (isRefreshing = false) => {
        return runGetLocked(async () => {
            setGetObj((prevState) => ({
                ...prevState,
                error: null,
            }));

            if (!getObj.data?.length) {
                setGetObj((prevState) => ({
                    ...prevState,
                    loading: true,
                }));
            }

            if (isRefreshing) {
                setIsRefreshing(true);
            }

            try {
                const response = await fetch(
                    "https://dummyjson.com/posts?limit=5",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error(`Http GET Error >> ${response.status}`);
                }

                const data = await response.json();

                setGetObj((prevState) => ({ ...prevState, data: data.posts }));
            } catch (error) {
                console.error(`Error GET >> ${error}`);
                setGetObj((prevState) => ({
                    ...prevState,
                    error: error.message,
                }));
            } finally {
                setGetObj((prevState) => ({ ...prevState, loading: false }));
                setIsRefreshing(false);
            }
        });
    };

    const addTodo = async () => {
        setPostObj((prevState) => ({
            ...prevState,
            loading: true,
            error: null,
        }));

        try {
            const response = await fetch("https://dummyjson.com/posts/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: input,
                    body: "hello i am body",
                    userId: 5,
                }),
            });

            if (!response.ok) {
                throw new Error(`Http POST Error >> ${response.status}`);
            }

            const data = await response.json();

            setPostObj((prevState) => ({ ...prevState, data: data }));

            console.log("DATA >>", data);

            getReq();
        } catch (error) {
            console.error(`Error POST >> ${error}`);

            setPostObj((prevState) => ({
                ...prevState,
                error: error.message,
            }));
        } finally {
            setPostObj((prevState) => ({ ...prevState, loading: false }));
        }
    };

    const patchFunc = async (id) => {
        setPatchObj((prevState) => ({ ...prevState, loading: true }));

        try {
            const response = await fetch(`https://dummyjson.com/posts/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: input,
                    body: "hello i am body",
                }),
            });

            if (!response.ok) {
                throw new Error(`Http PATCH Error >> ${response.status}`);
            }

            const data = await response.json();

            setPatchObj((prevState) => ({ ...prevState, data: data }));

            console.log("DATA >>", data);

            getReq();
        } catch (error) {
            console.error(`Error PATCH >> ${error}`);

            setPatchObj((prevState) => ({
                ...prevState,
                error: error.message,
            }));
        } finally {
            setPatchObj((prevState) => ({ ...prevState, loading: false }));
        }
    };

    const deleteFunc = async (id) => {
        setDeleteObj((prevState) => ({ ...prevState, loading: true }));

        try {
            const response = await fetch(`https://dummyjson.com/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Http Delete Error >> ${response.status}`);
            }

            const data = await response.json();

            setDeleteObj((prevState) => ({ ...prevState, data: data }));

            console.log("DATA >>", data);

            getReq();
        } catch (error) {
            console.error(`Error Delete >> ${error}`);

            setDeleteObj((prevState) => ({
                ...prevState,
                error: error.message,
            }));
        } finally {
            setDeleteObj((prevState) => ({ ...prevState, loading: false }));
        }
    };

    return (
        <div>
            <h1>Todo App</h1>

            <button disabled={isRefreshing} onClick={() => reloadData()}>
                {isRefreshing ? "Reloading..." : "Reload"}
            </button>
            <br />
            <br />

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => addTodo()}>Add</button>

            {postObj.loading ? (
                <h2>Adding...</h2>
            ) : postObj.data?.id ? (
                (() => {
                    console.log("INLINE >> ", postObj.data);
                    return <span> - yay</span>;
                })()
            ) : (
                postObj.error &&
                (() => {
                    console.log("INLINE >> ", postObj.error);

                    return <span> - Nay</span>;
                })()
            )}

            {getObj?.loading ? (
                <h2>Loading...</h2>
            ) : (
                getObj.data?.length &&
                getObj?.data.map((todo) => (
                    <div key={todo.id}>
                        <hr />
                        <div>Title: {todo.title}</div>
                        <div>
                            Body:{" "}
                            {todo.body
                                .split("")
                                .map((char, index) => {
                                    if (index < 50) {
                                        return char;
                                    }
                                })
                                .join("") + todo.body.slice(50, 100)}
                        </div>
                        <button onClick={() => patchFunc(todo.id)}>
                            Patch
                        </button>
                        <button onClick={() => deleteFunc(todo.id)}>
                            Delete
                        </button>
                        <hr />
                    </div>
                ))
            )}

            {getObj.error && (
                <h2>
                    Error {">>"} {getObj.error}
                </h2>
            )}

            {deleteObj.error && (
                <h2>
                    Delete Error {">>"}, {deleteObj.error}
                </h2>
            )}
            {patchObj.error && (
                <h2>
                    Patch Error {">>"}, {patchObj.error}
                </h2>
            )}
        </div>
    );
};

export default App;
