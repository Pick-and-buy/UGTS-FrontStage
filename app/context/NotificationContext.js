import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { pushNotifications } from '../api/user';

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
                const data = await pushNotifications(user.id);
                setNotifications(data);
                console.log("Notifications fetched:", data);
            }
        } catch (error) {
            console.error('Fetching push notifications failed:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchNotifications(); // Fetch notifications initially
            const interval = setInterval(fetchNotifications, 1000); // Fetch notifications every second

            return () => clearInterval(interval); // Clear interval on component unmount
        }
    }, [user]);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
