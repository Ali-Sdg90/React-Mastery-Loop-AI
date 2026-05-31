/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TodoApp from "../challenges/01. React Task Flow/app-v2/TodoApp";
import App from "../challenges/challenge-03-recipe-box/app-v1/App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import App from "./App.jsx";
// import TodoApp from "../challenges/challenge-01-name/app/TodoApp.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* <App /> */}
        {/* <TodoApp /> */}
        <QueryClientProvider client={queryClient}>
            {/* <TodoApp /> */}
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>,
);
