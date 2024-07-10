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
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { Rating } from 'react-native-stock-star-rating';
import styles from "../css/UserProfile.style";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import { getListsFollowers, getListsFollowing } from "../../api/user";

const UserProfile = ({ navigation, route }) => {
  const { user, createdPosts } = route.params;
  const [loading, setLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const profile =
    "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
  // console.log(user.result.id);
  useEffect(() => {
    fetchFollowersCount();
    fetchFollowingCount();
  }, []);

  const fetchFollowersCount = async () => {
    try {
      const response = await getListsFollowers(user.result.id);
      setFollowersCount(response.result.length);
      // console.log(response.result.length);
    } catch (error) {
      console.error('Error fetching followers count:', error);
    }
  };

  const fetchFollowingCount = async () => {
    try {
      const response = await getListsFollowing(user.result.id);
      setFollowingCount(response.result.length);
    } catch (error) {
      console.error('Error fetching following count:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="chevron-back-outline"
            size={30}
            color={COLORS.gray} />
          <Text style={{ fontSize: 24, fontWeight: "bold", color: COLORS.black }}>THÔNG TIN CỦA BẠN</Text>
          <Feather
            onPress={() => console.warn('More Function')}
            name="more-horizontal"
            size={35}
            color="gray" />
        </View>

        <View style={styles.shadow}>
          {/* Tạo Khoảng Trống */}
        </View>

        {/* Personal Information */}
        <View style={styles.personalContainer}>
          <View style={[styles.detailContainer, { alignItems: 'flex-start', position: 'relative' }]}>
            <TouchableOpacity
              style={styles.avatarTouchable}
              onPress={() => navigation.navigate('upload-photo-navigation', user)}
            >
              <Image
                style={styles.avatar}
                source={{ uri: user?.result?.avatar ? user?.result?.avatar : profile }}
              />
              <View style={styles.editIcon}>
                <Feather name="edit" size={24} color={COLORS.primary} />
              </View>
            </TouchableOpacity>
            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 18 }}>
                {user?.result?.username}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Rating
                  stars={4.7}
                  maxStars={5}
                  size={16}
                />
                <Text style={{ fontSize: 12, marginLeft: 4, marginTop: 4 }}>(100)</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MaterialIcons name="verified-user" size={16} color="#699BF7" style={{ marginTop: 0, marginLeft: 0 }} />
                <Text style={{ fontSize: 12 }}>Tài khoản đã xác minh</Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('update-profile', user)}
              style={styles.followBtn}
            >
              <Text style={{ margin: 5, color: COLORS.primary }}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Follower */}
        <View style={styles.followerView}>
          <Text>
            {followersCount}<Text> người theo dõi</Text>
          </Text>
          <Text>
            {followingCount}<Text> người đang theo dõi</Text>
          </Text>
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
              <View style={styles.row}>
                {createdPosts.map(post => (
                  <Post key={post.id} post={post} type="seller"/>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UserProfile;
