import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../css/notification.style';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const Notification = ({ navigation }) => {
    const { user } = useAuth();
    const { notifications, markNotificationAsRead } = useNotifications();

    const handleNotificationRead = async (notificationId, postId, isRead) => {
        if (!isRead) {
            await markNotificationAsRead(notificationId);
        }
        navigation.navigate('post-details', { postId: postId });
    };

    const renderNotificationItem = ({ item }) => {
        const notificationTextStyle = item.read ? styles.readNotificationText : styles.unreadNotificationText;
        return (
            <TouchableOpacity
                style={styles.notificationItem}
                onPress={() => handleNotificationRead(item.notificationId, item.postId, item.read)}
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
        </SafeAreaView>
    );
};

export default Notification;
