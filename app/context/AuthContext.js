import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByToken } from "../api/user";
import { login as loginAPI } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
        if (token) {
            fetchUserData();
        }
    };

    const login = async (phoneNumber, password) => {
        try {
            const token = await loginAPI(phoneNumber, password);
            if (token) {
                await AsyncStorage.setItem('token', token);
                setIsAuthenticated(true);
                fetchUserData();
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUser(null);
    };

    const fetchUserData = async () => {
        try {
            const userData = await getUserByToken();
            setUser(userData.result);
        } catch (error) {
            console.error('Fetching user data failed:', error);
        }
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
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};
