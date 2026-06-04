const AddTodo = ({
    handleSubmit,
    inputValue,
    setInputValue,
    isPending,
    errorMsg,
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Add new Todo:
                    <input
                        type="text"
                        placeholder="write your new todo..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" disabled={isPending}>
                        {isPending ? "Adding..." : "Add"}
                    </button>
                    {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                </label>
            </form>
        </div>
    );
};

export default AddTodo;
