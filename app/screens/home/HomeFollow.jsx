import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    ActivityIndicator,
    RefreshControl, // Import RefreshControl
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import Carousel from "pinar";
import Slider from './Slider';
import { getAllPosts } from "../../api/post";
import Post from "../post/Post";

const HomeFollow = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // State for refreshing

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getAllPosts();
            const posts = response.data.result;
            setPosts(posts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    };

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Slider navigation={navigation} />

            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                <View style={styles.row}>
                    {posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

export default HomeFollow;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: "8%",
    },
    row: {
        width: "98%",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 6,
        marginHorizontal: "auto",
        marginTop: "-4%",
    },
});
