import { createContext, useEffect, useState } from "react";
import { GetCsrfToken, GetUserMe } from "../actions/authAction";
import axios from "axios";

export const UserContext = createContext();

const initialUserData = {
    id: '',
    name: '',
    email: '',
    role: '',
    createdAt: '',
    userAgent: '',
    csrfToken: '',
    isLoggedIn: false,
    isLoading: true
}

export function UserProvider({ children }) {

    const [user, setUser] = useState(initialUserData);

    const handleLogin = (data) => {
        setUser((prev) => ({ ...prev, ...data, isLoggedIn: true, isLoading: false }));
    }

    const updateUser = (data) => {
        setUser((prev) => ({ ...prev, ...data }));
    }

    const handleLogout = () => {
        const csrfToken = user.csrfToken;
        setUser({ ...initialUserData, isLoading: false, csrfToken });
    }

    useEffect(() => {
        handleAuth();
    }, []);

    const handleAuth = async () => {
        try {
            const csrfResponse = await GetCsrfToken();
            setUser((prev) => ({ ...prev, csrfToken: csrfResponse.data.data }));

            try {
                const userResponse = await GetUserMe();
                handleLogin(userResponse.data.data);
            } catch (error) {
                setUser((prev) => ({ ...prev, isLoading: false }));
            }

        } catch (error) {
            console.error('Something went wrong with Auth', error);
        } finally {
            setUser((prev) => ({ ...prev, isLoading: false }));
        }
    }

    return (
        <UserContext.Provider value={{ user, handleLogin, updateUser, handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}