import { useState } from "react";
import { usePosts } from "./hooks/usePosts";
import "./App.css";

export default function App() {
    const {
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
    } = usePosts();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const [updateMethod, setUpdateMethod] = useState("PATCH");

    const isCreating = busyKeys.has("create");
    const isFirstLoad = readStatus === "loading";
    const hasPendingWrite = busyKeys.size > 0;

    async function handleCreate(event) {
        event.preventDefault();
        const success = await createPost({ title, body });
        if (success) {
            setTitle("");
            setBody("");
        }
    }

    function beginEdit(post) {
        setEditingId(post.id);
        setEditTitle(post.title);
        setEditBody(post.body);
        setUpdateMethod("PATCH");
    }

    async function handleUpdate(event, post) {
        event.preventDefault();
        const success = await updatePost(
            post,
            { title: editTitle, body: editBody },
            updateMethod,
        );
        if (success) setEditingId(null);
    }

    async function handleDelete(post) {
        if (!window.confirm(`Delete “${post.title}”?`)) return;
        await removePost(post);
    }

    return (
        <main className="app-shell">
            <header className="app-header">
                <div>
                    <p className="eyebrow">React + Fetch · CRUD Mastery</p>
                    <h1>Posts Manager</h1>
                    <p className="muted">A practical API and request-state template</p>
                </div>
                <button
                    type="button"
                    className="secondary"
                    onClick={() => void reload()}
                    disabled={isFetching || hasPendingWrite}
                >
                    {isFetching ? "Refreshing…" : "Reload posts"}
                </button>
            </header>

            <div className="demo-note" role="note">
                DummyJSON does not persist changes. New, edited, and deleted posts
                are updated in the UI only; Reload restores server data.
            </div>

            <section className="panel" aria-labelledby="create-heading">
                <div className="section-heading">
                    <h2 id="create-heading">Create a post</h2>
                    <span className="muted">POST /posts/add</span>
                </div>
                <form onSubmit={handleCreate} className="stack">
                    <label htmlFor="new-title">Title</label>
                    <input
                        id="new-title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="A thoughtful title"
                        required
                        maxLength={150}
                    />
                    <label htmlFor="new-body">Body</label>
                    <textarea
                        id="new-body"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        placeholder="Write your post…"
                        rows={3}
                        required
                    />
                    <div className="action-row">
                        <button
                            type="submit"
                            disabled={isCreating || isFirstLoad}
                        >
                            {isCreating ? "Creating…" : "Create post"}
                        </button>
                    </div>
                </form>
            </section>

            {/* Request errors are independent from existing data. */}
            {readError && (
                <div className="message error" role="alert">
                    <span>Could not load posts: {readError}</span>
                    <button
                        type="button"
                        className="secondary small"
                        onClick={() => void reload()}
                        disabled={isFetching}
                    >
                        Retry
                    </button>
                </div>
            )}
            {actionError && <p className="message error" role="alert">{actionError}</p>}
            {notice && <p className="message success" role="status">{notice}</p>}

            <section className="panel" aria-labelledby="posts-heading">
                <div className="section-heading">
                    <h2 id="posts-heading">Posts</h2>
                    <span className="muted">
                        {posts.length} shown {isFetching && !isFirstLoad ? "· Updating…" : ""}
                    </span>
                </div>

                {isFirstLoad && <p role="status">Loading posts…</p>}
                {!isFirstLoad && posts.length === 0 && !readError && (
                    <p className="muted">No posts to show.</p>
                )}

                <div className="posts-grid">
                    {posts.map((post) => {
                        const isBusy = busyKeys.has(`post:${post.id}`);
                        const isEditing = editingId === post.id;

                        return (
                            <article className="post-card" key={post.id}>
                                {isEditing ? (
                                    <form
                                        className="stack"
                                        onSubmit={(event) => handleUpdate(event, post)}
                                    >
                                        <label htmlFor={`title-${post.id}`}>Title</label>
                                        <input
                                            id={`title-${post.id}`}
                                            value={editTitle}
                                            onChange={(event) => setEditTitle(event.target.value)}
                                            required
                                        />
                                        <label htmlFor={`body-${post.id}`}>Body</label>
                                        <textarea
                                            id={`body-${post.id}`}
                                            value={editBody}
                                            onChange={(event) => setEditBody(event.target.value)}
                                            rows={3}
                                            required
                                        />
                                        <label htmlFor="update-method">Update method</label>
                                        <select
                                            id="update-method"
                                            value={updateMethod}
                                            onChange={(event) => setUpdateMethod(event.target.value)}
                                        >
                                            <option value="PATCH">PATCH — partial update</option>
                                            <option value="PUT">PUT — full replacement</option>
                                        </select>
                                        <div className="action-row">
                                            <button type="submit" disabled={isBusy}>
                                                {isBusy ? "Saving…" : `Save (${updateMethod})`}
                                            </button>
                                            <button
                                                type="button"
                                                className="secondary"
                                                disabled={isBusy}
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="post-topline">
                                            <span>#{post.id}</span>
                                            {post.isLocal && <span className="tag">Local demo</span>}
                                        </div>
                                        <h3>{post.title}</h3>
                                        <p>{post.body}</p>
                                        <div className="action-row">
                                            <button
                                                type="button"
                                                className="secondary"
                                                disabled={isBusy || editingId !== null}
                                                onClick={() => beginEdit(post)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="danger"
                                                disabled={isBusy}
                                                onClick={() => void handleDelete(post)}
                                            >
                                                {isBusy ? "Working…" : "Delete"}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
