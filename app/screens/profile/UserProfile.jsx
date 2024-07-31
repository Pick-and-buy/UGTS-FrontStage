import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { Rating } from 'react-native-stock-star-rating';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import styles from "../css/UserProfile.style";
import Post from "../post/Post";
import { getListsFollowers, getListsFollowing, getRatingByUserId } from "../../api/user";
import { useAuth } from "../../context/AuthContext";
const UserProfile = ({ navigation }) => {
  const { user } = useAuth();
  const createdPosts = user.createdPosts;
  const [loading, setLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

  useEffect(() => {
    fetchFollowersCount();
    fetchFollowingCount();
    fetchRating();
  }, []);

  const fetchFollowersCount = async () => {
    try {
      const response = await getListsFollowers(user.id);
      setFollowersCount(response.result.length);
    } catch (error) {
      console.error('Error fetching followers count:', error);
    }
  };

  const fetchFollowingCount = async () => {
    try {
      const response = await getListsFollowing(user.id);
      setFollowingCount(response.result.length);
    } catch (error) {
      console.error('Error fetching following count:', error);
    }
  };

  const fetchRating = async () => {
    try {
      const response = await getRatingByUserId(user.id);
      setRatingCount(response.result.length);
    } catch (error) {
      console.error('Error fetching following count:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.black }}>{user?.lastName} {user?.firstName}</Text>
          <Feather
            onPress={() => console.warn('More Function')}
            name="more-horizontal"
            size={35}
            color="gray" />
        </View>

        {/* Personal Information */}
        <View style={styles.personalContainer}>
          <TouchableOpacity
            style={styles.avatarTouchable}
            onPress={() => navigation.navigate('upload-photo-navigation', user)}
          >
            <Image
              style={styles.avatar}
              source={{ uri: user?.avatar ? user?.avatar : profile }}
            />
            <View style={styles.editIcon}>
              <AntDesign name="pluscircle" size={24} color="#06bcee" />
            </View>
          </TouchableOpacity>
          <Text style={styles.username}>
            @{user?.username}
          </Text>
        </View>

        {/* Follower */}
        <View style={styles.followerView}>
          <View style={styles.blockView}>
            <Text style={styles.number}>
              {followingCount}
            </Text>
            <Text>Đã theo dõi</Text>
          </View>
          <View style={styles.blockView}>
            <Text style={styles.number}>
              {followersCount}
            </Text>
            <Text>Theo dõi</Text>
          </View>
          <View style={styles.blockView}>
            <Text style={styles.number}>
              {ratingCount}
            </Text>
            <Text>Đánh giá</Text>
          </View>
          {user.verified === true ? (
            <View style={styles.blockView}>
              <MaterialIcons name="verified-user" size={19} color="#699BF7" style={{ marginTop: 6 }} />
              <Text>Đã xác minh</Text>
            </View>
          ) : (
            <View style={styles.blockView}>
              <Octicons name="unverified" size={19} color="gray" style={{ marginTop: 6 }} />
              <Text>Chưa xác minh</Text>
            </View>
          )

          }

        </View>
        {/* Button */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate('update-profile', user)}
            style={styles.followBtn}
          >
            <Text style={styles.btnText}>Sửa hồ sơ</Text>
          </TouchableOpacity>
        </View>
        {/* User product */}
        <View style={styles.containerPost}>
          <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sản phẩm</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              createdPosts.length > 0 ? (
                <View style={styles.row}>
                  {createdPosts.map(post => (
                    <Post key={post.id} post={post} type="seller" />
                  ))}
                </View>
              ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 16, color: 'gray' }}>Bạn chưa có sản phẩm nào</Text>
                </View>
              )
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UserProfile;
