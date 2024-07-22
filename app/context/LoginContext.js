import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginContext = createContext();

export const useLogin = () => {
    return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
        console.log("Token status:", !!token);
    };

    const login = async (token) => {
        await AsyncStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <LoginContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};
