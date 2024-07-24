import React, { createContext, useContext, useState, useEffect } from 'react';
import { getNotificationsByUserId, updateNotificationsReadStatus } from '../api/user';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            if (user && user.id) {
                const data = await getNotificationsByUserId(user.id);
                setNotifications(data.result);
            }
        } catch (error) {
            console.error('Fetching notifications failed:', error);
        }
    };

    const markNotificationAsRead = async (notificationId) => {
        try {
            await updateNotificationsReadStatus(notificationId);
            fetchNotifications();
        } catch (error) {
            console.error('Updating notification read status failed:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchNotifications();
        }
    }, [user]);

    return (
        <NotificationContext.Provider value={{ notifications, markNotificationAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};
