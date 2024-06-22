import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../screens/css/favourite.style';
import { getLikedPostByUser } from '../api/post';
import FavouritePost from "./post/FavouritePost";
import { COLORS } from '../constants/theme';

const Favourite = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikedPosts();
  }, []);

  const fetchLikedPosts = async () => {
    setLoading(true);
    try {
      const response = await getLikedPostByUser("63385b9f-7518-440a-a789-d84eb8564372");
      const posts = response.data.result;
      setLikedPosts(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh mục yêu thích</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <View style={styles.row}>
              {likedPosts.map(post => (
                <FavouritePost key={post.id} post={post} />
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Favourite