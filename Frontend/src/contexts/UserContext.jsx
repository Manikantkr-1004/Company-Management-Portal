import { createContext, useEffect, useState } from "react";
import { GetCsrfToken, GetUserMe } from "../actions/authAction";

export const UserContext = createContext();

const initialUserData = {
    id: '',
    name: '',
    email: '',
    role: '',
    createdAt: '',
    updatedAt: '',
    isLoggedIn: false,
    isLoading: true
}

export function UserProvider({ children }) {

    const [user, setUser] = useState(initialUserData);

    const handleLogin = (data) => {
        setUser((prev)=> ({...prev, ...data, isLoggedIn: true, isLoading: false}));
    }

    const handleLogout = () => {
        setUser({...initialUserData, isLoading: false});
    }

    useEffect(() => {
        handleAuth();
    }, []);

    const handleAuth = async () => {
        try {
            const [csrfResponse, userResponse] = await Promise.all([
                GetCsrfToken(),
                GetUserMe()
            ]);

            handleLogin(userResponse.data);
        } catch (error) {
            console.error('Something went wrong with Auth', error);
        } finally {
            setUser((prev) => ({...prev, isLoading: false}));
        }
    }

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}