import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByToken } from "../api/user";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchUserData = async () => {
        try {
            const userData = await getUserByToken();
            setUser(userData);
            // console.log("User data fetched:", userData);
        } catch (error) {
            console.error('Fetching user data failed:', error);
        }
    };

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
        // console.log("Token status:", !!token);
    };

    useEffect(() => {
        const initialize = async () => {
            await checkToken();
            if (isAuthenticated) {
                await fetchUserData();
            }
        };
        initialize();
    }, [isAuthenticated]);

    return (
        <UserContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
};
