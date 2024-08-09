import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SHADOWS } from "../../constants/theme";
import Slider from './Slider';
import { getAllPosts } from "../../api/post";
import Post from "../post/Post";
import Brands from "./Brands";
import styles from "../css/homeExplore.style";

const HomeExplore = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState('All');

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getAllPosts();
            const posts = response.data.result;
            setPosts(posts);
            setFilteredPosts(posts);
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

    const filterPosts = (isAvailable) => {
        setFilter(isAvailable);
        if (isAvailable === 'All') {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(post => post.isAvailable === isAvailable));
        }
    };

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Slider navigation={navigation} />
            <Brands />

            <View style={styles.posts}>
                <Text style={styles.heading}>Bài đăng</Text>
                <View style={styles.filterContainer}>
                    <AntDesign name="filter" size={26} color="black" />
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'All' && styles.activeFilter]}
                        onPress={() => filterPosts('All')}
                    >
                        <Text style={[styles.filterButtonText, filter === 'All' ? styles.activeFilterText : styles.inactiveFilterText]}>Tất cả</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === true && styles.activeFilter]}
                        onPress={() => filterPosts(true)}
                    >
                        <Text style={[styles.filterButtonText, filter === true ? styles.activeFilterText : styles.inactiveFilterText]}>Chưa bán</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === false && styles.activeFilter]}
                        onPress={() => filterPosts(false)}
                    >
                        <Text style={[styles.filterButtonText, filter === false ? styles.activeFilterText : styles.inactiveFilterText]}>Đã bán</Text>
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                    <View style={styles.row}>
                        {filteredPosts.map(post => (
                            <Post key={post.id} post={post} />
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default HomeExplore;
