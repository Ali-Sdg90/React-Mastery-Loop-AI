import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/homePage";
import AboutPage from "../pages/AboutPage/AboutPage";
import OldAboutPage from "../pages/OldAboutPage";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/about/:id" element={<AboutPage />} />
            <Route path="/old-about/:id" element={<OldAboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default Router;
