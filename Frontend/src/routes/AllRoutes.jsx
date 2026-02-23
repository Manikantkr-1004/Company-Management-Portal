import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";

import ProtectedRoutes from "./ProtectedRoutes";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Services from "../pages/Services";
import User from "../pages/User";
import Message from "../pages/Message";
import Profile from "../pages/Profile";

export default function AllRoutes() {


    return (
        <Routes>

            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="auth/login" element={<Login />} />
            </Route>

            <Route path="/" element={
                <ProtectedRoutes>
                    <AuthLayout />
                </ProtectedRoutes>
            }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route path="services" element={<Services />} />
                <Route path="users" element={<User />} />
                <Route path="messages" element={<Message />} />
                <Route path="profile" element={<Profile />} />
            </Route>

        </Routes>
    );
}
