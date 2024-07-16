import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getListsFollowing, getUserByToken } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Post from "../post/Post";
import { COLORS } from "../../constants/theme";
const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
const HomeExplore = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [followings, setFollowings] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [numColumns, setNumColumns] = useState(3); // State for number of columns

    const fetchUserData = async () => {
        try {
            const userData = await getUserByToken();
            setUser(userData);
        } catch (error) {
            console.error('Fetching user data failed:', error);
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
        try {
            const response = await getListsFollowing(user?.result?.id);
            const data = transformData(response.result);
            setFollowings(data);
        } catch (error) {
            console.error('Error fetching followings:', error);
        }
    };

    const transformData = (response) => {
        return response.map(user => ({
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
        }));
    };

    const UserProfile = ({ user }) => (
        <View style={styles.userContainer}>
            <Image source={{ uri: user.avatar ? user.avatar : profile }} style={styles.avatar} />
            <Text style={styles.userName}>{user.username}</Text>
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={followings}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.posts}>
                    <UserProfile user={item}/>
                    {loading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : (
                        <View style={styles.row}>
                            {item.createdPosts.map(post => (
                                <Post key={post.id} post={post} />
                            ))}
                        </View>
                    )}
                </View>
            )}
        />
    );
};

export default HomeExplore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    posts: {
        width: '98%',
        marginHorizontal: "auto",
        marginTop:15
    },
    row: {
        width: "100%",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 6,
        marginHorizontal: "auto",

    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:6
    },
    avatar: {
        width: 25,
        height: 25,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
