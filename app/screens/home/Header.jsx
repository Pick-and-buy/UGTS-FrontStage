import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from "../../screens/css/homeHeader.style";
import { useNotifications } from "../../context/NotificationContext";

const Header = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const { notifications } = useNotifications();
    const unreadCount = notifications.filter(notification => !notification.read).length;
    // console.log(`Number of unread notifications: ${unreadCount}`);

    const handleSearchChange = (text) => {
        setSearchQuery(text);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== '') {
            navigation.navigate('Search', { query: searchQuery });
            setSearchQuery(''); // Clear input after navigation
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.options}>
                    <View style={styles.search}>
                        <FontAwesome
                            name="search"
                            size={20}
                            color="#AFAFAE"
                        />
                        <TextInput
                            value={searchQuery}
                            onChangeText={handleSearchChange}
                            onSubmitEditing={handleSearchSubmit}
                            placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
                            placeholderTextColor="#AFAFAE"
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.option}>
                        <View style={styles.optionItem}>
                            <Ionicons
                                onPress={() => navigation.navigate("notification")}
                                name="notifications"
                                size={24}
                                color="#AFAFAE" />
                            {unreadCount > 0 && <View style={styles.notificationDot} />}
                        </View>
                        <View style={styles.optionItem}>
                            <Ionicons
                                onPress={() => navigation.navigate('todo-task')}
                                name="checkmark"
                                size={24}
                                color="#AFAFAE" />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Header;
