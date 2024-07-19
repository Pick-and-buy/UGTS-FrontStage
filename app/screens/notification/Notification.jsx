import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../css/notification.style';
import { useUser } from '../../context/UserContext';
import { getNotificationsByUserId } from '../../api/user';

const Notification = ({ navigation, route }) => {
    const { user } = useUser();
    const [notifications, setNotifications] = useState([]);
    // console.log(notifications);


    useEffect(() => {
        if (user?.result?.id) {
            fetchNotifications();
        }
    }, [user]);

    const fetchNotifications = async () => {
        try {
            const notificationsData = await getNotificationsByUserId(user?.result?.id);
            setNotifications(notificationsData.result);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const renderNotificationItem = ({ item }) => {
        const notificationTextStyle = item.read ? styles.readNotificationText : styles.unreadNotificationText;

        return (
            <View style={styles.notificationItem}>
                <Image
                    source={{ uri: 'https://timbaby.net/wp-content/uploads/2022/11/anh-gai-xinh-2k5.jpg' }}
                    style={styles.image}
                />
                <View style={styles.content}>
                    <Text numberOfLines={2} style={notificationTextStyle}>{item.message}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="keyboard-backspace" size={26} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thông báo của tôi</Text>
            </View>

            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.notificationId}
                contentContainerStyle={styles.notificationList}
            />
        </SafeAreaView>
    );
};

export default Notification;
