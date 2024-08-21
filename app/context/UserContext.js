import React, { createContext, useContext, useState, useEffect } from 'react';

import { getUserByToken } from "../api/user";
import { useLogin } from './LoginContext';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { isAuthenticated } = useLogin();
    // console.log("user in user context",user);
    const fetchUserData = async () => {
        try {
            const userData = await getUserByToken();
            setUser(userData.result);
            // console.log("User data fetched:", userData);
        } catch (error) {
            console.log('Fetching user data failed:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated]);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};
