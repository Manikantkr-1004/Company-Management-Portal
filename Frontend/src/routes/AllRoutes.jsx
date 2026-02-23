import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";

import SafeRoutes from "./SafeRoutes";
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
                <Route path="auth/login" element={<SafeRoutes roles={[]}><Login /></SafeRoutes>} />
            </Route>

            <Route path="/" element={<AuthLayout />}>
                <Route path="dashboard" element=
                    { <SafeRoutes roles={['admin', 'employee', 'client']}><Dashboard /></SafeRoutes> } />
                <Route path="projects" element=
                    { <SafeRoutes roles={['admin', 'employee', 'client']}><Projects /></SafeRoutes> } />
                <Route path="services" element=
                    { <SafeRoutes roles={['admin', 'client']}><Services /></SafeRoutes> } />
                <Route path="users" element=
                    { <SafeRoutes roles={['admin']}><User /></SafeRoutes> } />
                <Route path="messages" element=
                    { <SafeRoutes roles={['admin', 'employee', 'client']}><Message /></SafeRoutes> } />
                <Route path="profile" element=
                    { <SafeRoutes roles={['admin', 'employee', 'client']}><Profile /></SafeRoutes> } />
            </Route>

        </Routes>
    );
}
