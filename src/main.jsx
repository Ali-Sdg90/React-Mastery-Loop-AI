import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TodoApp from "../challenges/challenge-01-name/app/TodoApp";
// import App from "./App.jsx";
// import TodoApp from "../challenges/challenge-01-name/app/TodoApp.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* <App /> */}
        {/* <TodoApp /> */}
        <TodoApp />
    </StrictMode>,
);
