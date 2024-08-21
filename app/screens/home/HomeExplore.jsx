import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SHADOWS } from "../../constants/theme";
import Slider from './Slider';
import { getAllBoostedPosts, getAllPosts } from "../../api/post";
import Post from "../post/Post";
import Brands from "./Brands";
import styles from "../css/homeExplore.style";
import { useFocusEffect } from "@react-navigation/native";

const HomeExplore = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [boostedPosts, setBoostedPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState('All');

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getAllPosts();
            let posts = response.data.result;

            // Sort posts to have boosted posts at the top
            posts = posts.sort((a, b) => b.boosted - a.boosted);

            setPosts(posts);
            setFilteredPosts(posts);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    };

    const filterPosts = (filterType) => {
        setFilter(filterType);
        if (filterType === 'All') {
            setFilteredPosts(posts);
        } else if (filterType === 'Hot') {
            setFilteredPosts(posts.filter(post => post.boosted));
        } else {
            setFilteredPosts(posts.filter(post => post.isAvailable === filterType));
        }
    };

    const renderFilterItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.filterButton, filter === item.value && styles.activeFilter]}
            onPress={() => filterPosts(item.value)}
        >
            <Text
                style={[
                    styles.filterButtonText,
                    filter === item.value ? styles.activeFilterText : styles.inactiveFilterText,
                ]}
            >
                {item.label}
            </Text>
        </TouchableOpacity>
    );

    const filterOptions = [
        { label: 'Tất cả', value: 'All' },
        { label: 'Nổi bật', value: 'Hot' },
        { label: 'Chưa bán', value: true },
        { label: 'Đã bán', value: false },
    ];

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
                    <FlatList
                        horizontal
                        data={filterOptions}
                        renderItem={renderFilterItem}
                        keyExtractor={(item) => item.value.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 10, justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                            height:50,
                            marginLeft:-10
                        }}
                    />
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
