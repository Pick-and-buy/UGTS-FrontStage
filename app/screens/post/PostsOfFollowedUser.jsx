import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons, Entypo } from '@expo/vector-icons';
import styles from '../css/postsOfFollowedUser.style';
import { COLORS } from '../../constants/theme';
import Post from './Post';
import { ActivityIndicator } from 'react-native-paper';
import { getPostsOfFollowedUser } from '../../api/post';

const PostsOfFollowedUser = ({ navigation, route }) => {
  const user = route.params;
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getPostsOfFollowedUser(user?.id);
      const posts = response.data.result;
      setPosts(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[COLORS.primary]}
        />
      }
    >
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.header}>
          <MaterialCommunityIcons name="keyboard-backspace" size={32} color="black" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <Text style={styles.heading}>Bài đăng của {user?.lastName} {user?.firstName}</Text>
      </View>
      <View style={styles.posts}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View style={styles.row}>
            {posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PostsOfFollowedUser;
