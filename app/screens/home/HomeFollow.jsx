import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getListsFollowing, getUserByToken } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Post from "../post/Post";
import { COLORS } from "../../constants/theme";
import styles from "../css/homeFollow.style";

const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const HomeFollow = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [followings, setFollowings] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserData = async () => {
        try {
            const userData = await getUserByToken();
            setUser(userData);
        } catch (error) {
            console.log('Fetching user data failed:', error);
        }
    };

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
        setLoading(false);
    };

    useEffect(() => {
        const initialize = async () => {
            await checkToken();
            if (isAuthenticated) {
                await fetchUserData();
            }
        };
        initialize();
    }, [isAuthenticated]);

    useEffect(() => {
        if (user) {
            fetchFollowings();
        }
    }, [user]);

    const fetchFollowings = async () => {
        setLoading(true);
        try {
            const response = await getListsFollowing(user?.result?.id);
            const data = transformData(response.result);
            setFollowings(data);
        } catch (error) {
            console.log('Error fetching followings:', error);
        } finally {
            setLoading(false);
        }
    };

    const transformData = (response) => {
        return response
            .map(user => ({
                id: user.id,
                username: user.username,
                avatar: user.avatar,
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                dob: user.dob,
                createdPosts: user.createdPosts.map(post => ({
                    id: post.id,
                    title: post.title,
                    description: post.description,
                    isAvailable: post.isAvailable,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                    product: post.product,
                    comments: post.comments
                }))
            }))
            .filter(user => user.createdPosts.length > 0); // Only keep users who have posts
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchFollowings();
        setRefreshing(false);
    };

    const UserProfile = ({ user }) => (
        <View style={styles.userContainer}>
            <View style={styles.userInfo}>
                <Image source={{ uri: user.avatar ? user.avatar : profile }} style={styles.avatar} />
                <Text style={styles.userName}>{user?.lastName} {user?.firstName}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('post-of-followed-user', user)}>
                <Text style={styles.viewAll}>Xem tất cả</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                followings.length === 0 ? (
                    <View style={styles.emptyMessageContainer}>
                        <Text style={styles.emptyMessage}>Hiện tại bạn chưa theo dõi người dùng nào</Text>
                    </View>
                ) : (
                    <FlatList
                        data={followings}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.posts}>
                                <UserProfile user={item} />
                                <View style={styles.row}>
                                    {item.createdPosts.slice(0, 6).map(post => (
                                        <Post key={post.id} post={post} />
                                    ))}
                                </View>
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                colors={[COLORS.primary]}
                            />
                        }
                    />
                )
            )}
        </View>
    );
};

export default HomeFollow;

