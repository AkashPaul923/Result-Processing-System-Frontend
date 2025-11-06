import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import Router from "./Router/Router.jsx";
import { TeacherProvider } from "./Auth/TeacherContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <TeacherProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </TeacherProvider>
    </StrictMode>
);
