import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import styles from '../screens/css/favourite.style';
import { getLikedPostByUser } from '../api/post';
import FavouritePost from "./post/FavouritePost";
import { COLORS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByToken } from '../api/user';

const Favourite = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await checkToken();
      if (isAuthenticated) {
        await fetchUserData();
      } else {
        setLoading(false);
      }
    };
    initialize();
  }, [isAuthenticated]);

  const fetchUserData = async () => {
    try {
      const userData = await getUserByToken();
      setUser(userData.result);
      await fetchLikedPosts(userData.result.id); // Fetch liked posts after setting user data
    } catch (error) {
      console.error('Fetching user data failed:', error);
    }
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  const fetchLikedPosts = async (userId) => {
    setLoading(true);
    try {
      const response = await getLikedPostByUser(userId);
      const posts = response.data.result;
      setLikedPosts(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    if (!isAuthenticated || !user?.id) return;
    setRefreshing(true);
    try {
      await fetchLikedPosts(user.id);
    } finally {
      setRefreshing(false);
    }
  }, [isAuthenticated, user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh mục yêu thích</Text>
      </View>
      <ScrollView
        style={styles.content}
        refreshControl={
          isAuthenticated ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : null
        }
      >
        <View style={styles.row}>
          {loading ? (
            <ActivityIndicator style={{ flex: 1 }} size="large" color={COLORS.primary} />
          ) : isAuthenticated ? (
            likedPosts.length > 0 ? (
              likedPosts.map(post => (
                <FavouritePost key={post.id} post={post} />
              ))
            ) : (
              <Text style={styles.emptyMessage}>Không có sản phẩm trong danh mục yêu thích</Text>
            )
          ) : (
            <Text style={styles.loginPrompt}>Vui lòng đăng nhập để xem danh mục yêu thích</Text>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default Favourite;
