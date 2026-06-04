import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>

            <AddTodo />

            <TodoList />
        </div>
    );
};

export default HomePage;
