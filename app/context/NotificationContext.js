import React, { createContext, useContext, useState, useEffect } from 'react';
import { getNotificationsByUserId } from '../api/user';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    console.log("user in noti context", user);
    const fetchNotifications = async () => {
        try {
            if (user && user.id) {
                const data = await getNotificationsByUserId(user.id);
                setNotifications(data.result);
                // console.log("Notifications fetched:", data);
            }
        } catch (error) {
            console.error('Fetching notifications failed:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchNotifications();
        }
    }, [user]);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
