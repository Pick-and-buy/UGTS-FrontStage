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

    // console.log(userOfPost.id);

    useEffect(() => {
        fetchPostsByUserId();
        fetchFollowersCount();
        fetchFollowingCount();
        if (userIdLogged) {
            checkFollowStatus();
        } else {
            // Reset follow status if user is not logged in
            setIsFollowing(false);
        }
    }, [userIdLogged]);

    const fetchFollowersCount = async () => {
        try {
            const response = await getListsFollowers(userOfPost.id);
            setFollowersCount(response.result.length);
            console.log(response.result.length);
        } catch (error) {
            console.error('Error fetching followers count:', error);
        }
    };

    const fetchFollowingCount = async () => {
        try {
            const response = await getListsFollowing(userOfPost.id);
            setFollowingCount(response.result.length);
        } catch (error) {
            console.error('Error fetching following count:', error);
        }
    };

    const fetchPostsByUserId = async () => {
        setLoading(true);
        try {
            const response = await getPostsByUserId(userOfPost.id);
            setPostsOfSeller(response?.data?.result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const checkFollowStatus = async () => {
        try {
            const status = await checkIfFollowing(userIdLogged, userOfPost.id);
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
            console.error('Error in handleFollowToggle:', error);
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
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.black }}>{userOfPost?.lastName} {userOfPost?.firstName}</Text>
                    <Feather
                        onPress={() => console.warn('More Function')}
                        name="more-horizontal"
                        size={35}
                        color="gray" />
                </View>
                {/* Personal Information */}
                <View style={styles.personalContainer}>
                    <View
                        style={styles.avatarTouchable}
                    >
                        <Image
                            style={styles.avatar}
                            source={{ uri: userOfPost?.avatar ? userOfPost?.avatar : profile }}
                        />
                    </View>
                    <Text style={styles.username}>
                        @{userOfPost?.username}
                    </Text>
                </View>

                {/* Follower */}
                <View style={styles.followerView}>
                    <TouchableOpacity style={styles.blockView} onPress={() => navigation.navigate('summary', { screen: 'following', user: userOfPost })}>
                        <Text style={styles.number}>
                            {followingCount}
                        </Text>
                        <Text>Đã theo dõi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blockView} onPress={() => navigation.navigate('summary', { screen: 'follower', user: userOfPost })}>
                        <Text style={styles.number}>
                            {followersCount}
                        </Text>
                        <Text>Theo dõi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blockView} onPress={() => navigation.navigate('summary', { screen: 'appreciation', user: userOfPost })}>
                        <Text style={styles.number}>
                            {55}
                        </Text>
                        <Text>Đánh giá</Text>
                    </TouchableOpacity>
                    {userOfPost.isVerified === true ? (
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
                                    <Post key={post.id} post={post} type="buyer" />
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
