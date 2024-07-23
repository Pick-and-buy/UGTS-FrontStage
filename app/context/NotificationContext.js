import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { getNotificationsByUserId } from '../api/user';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const { user } = useUser();
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            if (user && user.id) {
                const data = await getNotificationsByUserId(user.id);
                setNotifications(data.result);
                // console.log("Notifications fetched:", data);
            }
        } catch (error) {
            console.error('Fetching push notifications failed:', error);
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
