import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../css/notification.style';
import { useUser } from '../../context/UserContext';
import { getNotificationsByUserId, updateNotificationsReadStatus } from '../../api/user';
const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

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

    const handleNotificationRead = async (notificationId) => {
        try {
            const rs = await updateNotificationsReadStatus(notificationId);
            console.log(rs);
            fetchNotifications();
        } catch (error) {
            console.error('Error fetching notifications read:', error);
        }
    }

    const renderNotificationItem = ({ item }) => {
        const notificationTextStyle = item.read ? styles.readNotificationText : styles.unreadNotificationText;

        return (
            <TouchableOpacity style={styles.notificationItem} onPress={() => handleNotificationRead(item.notificationId)}>
                <Image
                    source={{ uri: item.userFromAvatar ? item.userFromAvatar : profile }}
                    style={styles.image}
                />
                <View style={styles.content}>
                    <Text numberOfLines={2} style={notificationTextStyle}>{item.message}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="keyboard-backspace" size={26} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thông báo của tôi</Text>
                <TouchableOpacity style={styles.checkAll} onPress={() => navigation.navigate("")}>
                    <MaterialCommunityIcons name="check-all" size={26} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={notifications.reverse()}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.notificationId}
                contentContainerStyle={styles.notificationList}
            />
        </SafeAreaView>
    );
};

export default Notification;
