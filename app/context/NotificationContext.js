import React, { createContext, useContext, useState, useEffect } from 'react';
import { getNotificationsByUserId, updateAllNotificationsReadStatus, updateNotificationsReadStatus } from '../api/user';
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
            console.log('Fetching notifications failed:', error);
        }
    };

    const markNotificationAsRead = async (notificationId) => {
        try {
            await updateNotificationsReadStatus(notificationId);
            fetchNotifications();
        } catch (error) {
            console.log('Updating notification read status failed:', error);
        }
    };

    const markAllNotificationAsRead = async (userId) => {
        try {
            await updateAllNotificationsReadStatus(userId);
            fetchNotifications();
        } catch (error) {
            console.log('Updating notification read all status failed:', error);
        }
    };

    useEffect(() => {
        let interval;
        if (user) {
            fetchNotifications();
            interval = setInterval(fetchNotifications, 1000); // Update every second
        }
        return () => {
            if (interval) {
                clearInterval(interval); // Clean up interval on unmount
            }
        };
    }, [user]);

    return (
        <NotificationContext.Provider value={{ notifications, markNotificationAsRead, markAllNotificationAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};
