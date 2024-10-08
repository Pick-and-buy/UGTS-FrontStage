import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../css/notification.style';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { getOrderByOrderId } from '../../api/order';
const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const Notification = ({ navigation }) => {
    const { user } = useAuth();
    const { notifications, markNotificationAsRead, markAllNotificationAsRead } = useNotifications();

    const fetchOrderInfo = async (orderId) => {
        try {
            const data = await getOrderByOrderId(orderId);
            return data.result;
        } catch (error) {
            console.log('Fetching order data by order id failed:', error);
            return null;
        }
    };

    const handleNotificationRead = async (notificationId, notificationType, postId, orderId, userFromId, isRead,userToId) => {
        if (!isRead) {
            await markNotificationAsRead(notificationId);
        }

        if (notificationType === 'LIKE' || notificationType === 'COMMENT' || notificationType === 'POST_VERIFY') {
            navigation.navigate('post-details', { postId: postId });
        } else if (notificationType === 'BUY' || notificationType === 'RATE') {
            const orderInfo = await fetchOrderInfo(orderId);
            if (orderInfo) {
                if (userFromId === user.id) {
                    navigation.navigate('buyer-order-details', { orderInfo: orderInfo });
                } 
                 
                if(userToId === user.id) {
                    navigation.navigate('seller-order-details', { orderInfo: orderInfo });
                }
            }
        }
    };

    const handleAllNotificationRead = async () => {
        if (user) {
            await markAllNotificationAsRead(user.id);
        }
    };

    const renderNotificationItem = ({ item }) => {
        const notificationTextStyle = item.read ? styles.readNotificationText : styles.unreadNotificationText;
        return (
            <TouchableOpacity
                style={styles.notificationItem}
                onPress={() => handleNotificationRead(item.notificationId, item.notificationType, item.postId, item.orderId, item.userFromId, item.read, item.userToId)}
            >
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
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thông báo của tôi</Text>
                <TouchableOpacity style={styles.checkAll} onPress={handleAllNotificationRead}>
                    <MaterialCommunityIcons name="check-all" size={26} color="black" />
                </TouchableOpacity>
            </View>

            {user ? (
                notifications.length > 0 ? (
                    <FlatList
                        data={notifications.reverse()}
                        renderItem={renderNotificationItem}
                        keyExtractor={(item) => item.notificationId.toString()}
                        contentContainerStyle={styles.notificationList}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Hiện tại bạn chưa có thông báo nào</Text>
                    </View>
                )
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Đăng nhập để nhận thông báo của bạn</Text>
                </View>
            )}
        </View>
    );
};

export default Notification;
