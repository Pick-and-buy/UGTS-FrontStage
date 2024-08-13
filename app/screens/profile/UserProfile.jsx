import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Alert
} from "react-native";
import { MaterialCommunityIcons, Feather, AntDesign, Octicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import Post from "../post/Post";
import { checkIfFollowing, followUser, getListsFollowers, getListsFollowing, getRatingByUserId, unfollowUser } from "../../api/user";
import styles from "../css/UserProfile.style"; // Unified style
import { getPostsByUserId } from "../../api/post";

const UserProfile = ({ navigation, route }) => {
  const { user, userIdLogged } = route.params || {};
  const isMyProfile = user?.id === userIdLogged || userIdLogged === undefined;
  const isSellerProfile = !isMyProfile;

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const profileImage = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

  useEffect(() => {
    fetchFollowersCount();
    fetchFollowingCount();
    fetchRating();
    fetchPostsByUserId();

    if (isSellerProfile && userIdLogged) {
      checkFollowStatus();
    }
  }, [userIdLogged]);

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
      console.error('Error fetching rating:', error);
    }
  };

  const fetchPostsByUserId = async () => {
    setLoading(true);
    try {
      const response = await getPostsByUserId(user.id);
      setPosts(response?.data?.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async () => {
    try {
      const status = await checkIfFollowing(userIdLogged, user.id);
      setIsFollowing(status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollowToggle = async () => {
    if (!userIdLogged) {
      Alert.alert(
        "Đăng nhập",
        "Bạn cần đăng nhập để theo dõi người bán.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Đăng nhập",
            onPress: () => navigation.navigate('login-navigation')
          }
        ]
      );
      return;
    }

    try {
      setLoading(true);
      if (isFollowing) {
        const response = await unfollowUser(userIdLogged, user.id);
        console.log(response);
        setFollowersCount(prevCount => prevCount - 1);
      } else {
        const response = await followUser(userIdLogged, user.id);
        console.log(response);
        setFollowersCount(prevCount => prevCount + 1);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error in handleFollowToggle:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFollowersCount();
    fetchFollowingCount();
    fetchRating();
    fetchPostsByUserId().then(() => setRefreshing(false));

    if (isSellerProfile && userIdLogged) {
      checkFollowStatus();
    }
  }, [userIdLogged]);

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
            onPress={() => navigation.navigate(isSellerProfile ? 'upload-photo-navigation' : 'update-profile', user)}
          >
            <Image
              style={styles.avatar}
              source={{ uri: user?.avatar ? user?.avatar : profileImage }}
            />
            {!isSellerProfile && (
              <View style={styles.editIcon}>
                <AntDesign name="pluscircle" size={24} color="#06bcee" />
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.username}>
            @{user?.username}
          </Text>
        </View>

        {/* Follower */}
        <View style={styles.followerView}>
          <TouchableOpacity style={styles.blockView} onPress={() => navigation.navigate('summary', { screen: 'following', user: user })}>
            <Text style={styles.number}>
              {followingCount}
            </Text>
            <Text>Đã theo dõi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockView} onPress={() => navigation.navigate('summary', { screen: 'follower', user: user })}>
            <Text style={styles.number}>
              {followersCount}
            </Text>
            <Text>Theo dõi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockView} onPress={() => navigation.navigate('summary', { screen: 'appreciation', user: user })}>
            <Text style={styles.number}>
              {ratingCount}
            </Text>
            <Text>Đánh giá</Text>
          </TouchableOpacity>
          {user?.isVerified === true ? (
            <View style={styles.blockView}>
              <MaterialIcons name="verified-user" size={19} color="#699BF7" style={{ marginTop: 6 }} />
              <Text>Đã xác minh</Text>
            </View>
          ) : (
            <View style={styles.blockView}>
              <Octicons name="unverified" size={19} color="gray" style={{ marginTop: 6 }} />
              <Text>Chưa xác minh</Text>
            </View>
          )}
        </View>

        {/* Button */}
        <View style={styles.buttonWrapper}>
          {isMyProfile ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('update-profile', user)}
              style={styles.editBtn}
            >
              <Text style={styles.editText}>Sửa hồ sơ</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleFollowToggle}
              style={[
                styles.followBtn,
                isFollowing && styles.followingBtn
              ]}
            >
              <Text style={[
                styles.followBtnText,
                isFollowing && styles.followingBtnText
              ]}>
                {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* User product */}
        <View style={styles.containerPost}>
          <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sản phẩm</Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary]}
              />
            }
          >
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              posts.length > 0 ? (
                <View style={styles.row}>
                  {posts.map(post => (
                    <Post key={post.id} post={post} type={isSellerProfile ? "buyer" : "seller"} />
                  ))}
                </View>
              ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 16, color: 'gray' }}>
                    {isSellerProfile ? "Người bán chưa có sản phẩm nào" : "Bạn chưa có sản phẩm nào"}
                  </Text>
                </View>
              )
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default UserProfile;
