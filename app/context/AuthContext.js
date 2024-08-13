import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByToken, sendImageToAPI } from "../api/user";
import axiosInstance from '../api/axiosInstance';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

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
        // try {
            const response = await axiosInstance.post('/auth/login', { phoneNumber, password });
            const token = response.data.result.accessToken;
            if (token) {
                await AsyncStorage.setItem('token', token);
                setIsAuthenticated(true);
                await fetchUserData();
            }
            return response;
        // } catch (error) {
        //     console.error('Login failed:', error);
        // }
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

    const updateAvatar = async (avatarUri, userId, authToken) => {
        try {
            const response = await sendImageToAPI(avatarUri, userId, authToken);
            setUser(response.result);
            return response;
        } catch (error) {
            console.error('Updating avatar failed:', error);
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
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, updateAvatar,fetchUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
