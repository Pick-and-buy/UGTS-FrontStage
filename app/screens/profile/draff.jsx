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
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { Rating } from 'react-native-stock-star-rating';
import Post from "../post/Post";
import { useEffect, useState, useCallback } from "react";
import { followUser, unfollowUser, checkIfFollowing, getListsFollowers, getListsFollowing } from "../../api/user";
import { getPostsByUserId } from "../../api/post";
import styles from "../css/sellerProfile.style";

const SellerProfile = ({ navigation, route }) => {
    const { userOfPost, userIdLogged } = route.params;
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [postsOfSeller, setPostsOfSeller] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0)
    const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
    useEffect(() => {
        fetchPostsByUserId();
        if (userIdLogged) {
            checkFollowStatus();
        } else {
            // Reset follow status if user is not logged in
            setIsFollowing(false);
        }
        // Add userIdLogged to dependency array
    }, [userIdLogged]);

    const fetchFollowersCount = async () => {
        try {
            const response = await getListsFollowers(userOfPost.id);
            setFollowersCount(response.result.length);
            console.log(response.result.length);
        } catch (error) {
            console.log('Error fetching followers count:', error);
        }
    };

    const fetchFollowingCount = async () => {
        try {
            const response = await getListsFollowing(userOfPost.id);
            setFollowingCount(response.result.length);
        } catch (error) {
            console.log('Error fetching following count:', error);
        }
    };

    const fetchPostsByUserId = async () => {
        setLoading(true);
        try {
            const response = await getPostsByUserId(userOfPost.id);
            setPostsOfSeller(response?.data?.result);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const checkFollowStatus = async () => {
        try {
            const status = await checkIfFollowing(userIdLogged, userOfPost.id);
            setIsFollowing(status);
        } catch (error) {
            console.log(error);
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
                console.log('Unfollowing user...');
                const response = await unfollowUser(userIdLogged, userOfPost.id);
                console.log('Unfollow response:', response);
                setFollowersCount(prevCount => prevCount - 1);
            } else {
                console.log('Following user...');
                const response = await followUser(userIdLogged, userOfPost.id);
                console.log('Follow response:', response);
                setFollowersCount(prevCount => prevCount + 1);
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.log('Error in handleFollowToggle:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchPostsByUserId().then(() => setRefreshing(false));
        if (userIdLogged) {
            checkFollowStatus();
        }
    }, [userIdLogged]); // Add userIdLogged to dependency array

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
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: COLORS.black }}>THÔNG TIN NGƯỜI BÁN</Text>
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
                    <View style={[styles.detailContainer, { alignItems: 'flex-start' }]}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: userOfPost?.avatar ? userOfPost?.avatar : profile }}
                        />
                        <View style={{ gap: 5 }}>
                            <Text style={{ fontSize: 18 }}>
                                {userOfPost?.username}
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
                        {userIdLogged && userOfPost.id !== userIdLogged && (
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
                        {!userIdLogged && (
                            <TouchableOpacity
                                onPress={handleFollowToggle}
                                style={styles.followBtn}
                            >
                                <Text style={styles.followBtnText}>
                                    Theo dõi
                                </Text>
                            </TouchableOpacity>
                        )}
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
                            <View style={styles.row}>
                                {postsOfSeller.map(post => (
                                    <Post key={post.id} post={post} />
                                ))}
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SellerProfile;



<View style={{flexDirection: 'column', justifyContent: "center", alignItems: 'flex-start'}}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={{ fontSize: 18 }}>{postDetails?.user?.lastName} {postDetails?.user?.firstName}</Text>
                                    <View style={{
                                        backgroundColor: COLORS.primary,
                                        paddingVertical: 2,
                                        paddingHorizontal: 4,
                                        borderRadius: 4,

                                    }}>
                                        <Text style={{ color: COLORS.white }}>Ghé thăm</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'column', justifyContent: "flex-start", alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                        <Rating
                                            stars={averageRating}
                                            maxStars={5}
                                            size={16}
                                        />
                                        <Text style={{ fontSize: 12, marginLeft: 4 }}>({averageRating})</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}></View>
                                    {postDetails?.user?.isVerified === true ? (
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 40 }}>
                                            <MaterialIcons name="verified-user" size={12} color="#699BF7" style={{ marginTop: 0, marginLeft: 0 }} />
                                            <Text style={{ fontSize: 12 }}>Tài khoản đã xác minh</Text>
                                        </View>
                                    ) : (
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 40 }}>
                                            <Octicons name="unverified" size={14} color="gray" style={{ marginTop: 6, marginLeft: 10 }} />
                                            <Text style={{ fontSize: 12, marginTop: 4, marginLeft: 2 }}>Tài khoản chưa xác minh</Text>
                                        </View>
                                    )

                                    }


                                </View>
                            </View>