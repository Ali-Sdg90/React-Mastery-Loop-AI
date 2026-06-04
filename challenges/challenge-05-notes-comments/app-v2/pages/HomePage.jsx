import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

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
