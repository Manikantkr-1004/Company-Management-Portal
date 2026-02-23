import { createContext, useState } from "react";

export const UserContext = createContext();

const initialUserData = {
    id: '',
    name: '',
    email: '',
    role: '',
    isLoggedIn: false,
    isLoading: false
}

export function UserProvider({ children }) {

    const [user, setUser] = useState(initialUserData);

    const handleLogin = (data) => {
        setUser({...data, isLoggedIn: true});
    }

    const handleLogout = () => {
        setUser(initialUserData);
    }

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}