import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Pressable,
    TextInput,
    Alert,
    Button,
    RefreshControl,
} from "react-native";
import { Ionicons, Feather, AntDesign, MaterialIcons, Entypo, FontAwesome, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import Carousel from "../../components/carousel/Carousel";
import { getPostDetails, getComments, postComment, getLikedPostByUser } from "../../api/post";
import styles from "../css/postDetails.style";
import { Rating } from 'react-native-stock-star-rating';
import { getRatingByUserId, getUserByToken, likePost, unlikePost } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Comment from "./Comment";
import moment from "moment";
import CustomModal from "../../components/CustomModal";

const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const PostDetail = ({ navigation, route }) => {
    const { postId } = route.params;
    const [postDetails, setPostDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [comments, setComments] = useState([]);
    const [showAllComments, setShowAllComments] = useState(false);
    const data = postDetails?.product?.images || [];
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [type, setType] = useState('buyer');
    const [ratings, setRatings] = useState();
    const [averageRating, setAverageRating] = useState(0);
    const [customModalVisible, setCustomModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        detailText: '',
        confirmText: '',
        cancelText: '',
        onConfirm: () => { },
        onClose: () => { }
    });

    console.log(postId);


    useEffect(() => {
        fetchPostDetails();
        checkAuthentication();
        fetchComments();
    }, []);

    useEffect(() => {
        if (postDetails?.user?.id) {
            fetchRatings();
        }
    }, [postDetails]);

    useEffect(() => {
        if (isAuthenticated) {
            getUserData();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (userId) {
            checkIfPostIsLiked();
            if (postDetails?.user?.id === userId) {
                setType("seller");
            } else {
                setType("buyer");
            }
        }
    }, [userId, postDetails]);

    const checkAuthentication = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            setIsAuthenticated(!!token);
        } catch (error) {
            console.error("Error checking authentication status:", error);
        }
    };

    const getUserData = async () => {
        try {
            const userInfo = await getUserByToken();
            setUserId(userInfo.result.id);
            setUser(userInfo.result)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const checkIfPostIsLiked = async () => {
        try {
            const response = await getLikedPostByUser(userId);
            const likedPosts = response.data.result;
            const isPostLiked = likedPosts.some((post) => post.id === postId);
            setIsLiked(isPostLiked);
        } catch (error) {
            console.error("Error checking if post is liked:", error);
        }
    };

    const fetchPostDetails = async () => {
        try {
            const response = await getPostDetails(postId);
            const postInfo = response.data.result;
            setPostDetails(postInfo);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await getComments(postId);
            const formattedComments = response.data.map(comment => ({
                ...comment,
                timeAgo: moment(comment.createAt, 'YYYY-MM-DD HH:mm:ss').fromNow(),
            }));
            setComments(formattedComments.reverse()); // Reverse the fetched comments
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleLike = async () => {
        if (!userId) {
            setModalContent({
                title: "Đăng nhập",
                detailText: "Bạn cần đăng nhập để thêm sản phẩm vào danh mục yêu thích.",
                confirmText: "Đăng nhập",
                cancelText: "Thoát",
                onConfirm: () => {
                    setCustomModalVisible(false);
                    navigation.navigate('login-navigation');
                },
                onClose: () => {
                    setCustomModalVisible(false);
                },
            });
            setCustomModalVisible(true);
            return;
        }

        try {
            if (isLiked) {
                await unlikePost(userId, postId);
                fetchPostDetails();
            } else {
                await likePost(userId, postId);
                fetchPostDetails();
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error updating like status", error);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchPostDetails();
        await checkAuthentication();
        await fetchComments();
        setRefreshing(false);
    };

    const handlePress = () => {
        if (isAuthenticated) {
            navigation.navigate("order-details", { postDetails: postDetails });
        } else {
            setModalContent({
                title: "Đăng nhập",
                detailText: "Bạn cần đăng nhập để mua sản phẩm này.",
                confirmText: "Đăng nhập",
                cancelText: "Thoát",
                onConfirm: () => {
                    setCustomModalVisible(false);
                    navigation.navigate('login-navigation');
                },
                onClose: () => {
                    setCustomModalVisible(false);
                },
            });
            setCustomModalVisible(true);
            return;
        }
    };


    const fetchRatings = async () => {
        try {
            const response = await getRatingByUserId(postDetails?.user?.id);
            setRatings(response.result);
            calculateAverageRating(response.result);
        } catch (error) {
            console.error('Error fetching ratings in post details', error);
        }
    };

    const calculateAverageRating = (ratings) => {
        if (ratings.length === 0) return;

        const totalStars = ratings.reduce((sum, rating) => sum + rating.stars, 0);
        const average = totalStars / ratings.length;

        setAverageRating(average);
    };

    const getFieldValue = (value) => {
        return (value === "None" || value === "none" || value === null) ? "N/A" : value;
    };

    // Format the price using the helper function
    const formattedPrice = formatPrice(postDetails?.product?.price);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color={COLORS.white} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.backButton} onPress={() => { }}>
                    <AntDesign style={{ marginRight: "2%" }} name="sharealt" size={24} color={COLORS.white} />
                </TouchableOpacity> */}
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Carousel data={data} />
                <View style={styles.wrapper}>
                    <View style={styles.informationContainer}>
                        <Pressable onPress={handleLike} style={styles.like}>
                            <AntDesign
                                name={isLiked ? "heart" : "hearto"}
                                size={24}
                                color={isLiked ? "red" : "gray"}
                            />
                        </Pressable>

                        <Text style={styles.numberOfLike}>{postDetails?.likedUsers.length}</Text>

                        <Text numberOfLines={3} style={[styles.headerText, { width: "85%", textAlign: "left", fontSize: 24, marginTop: 5 }]}>{postDetails?.product?.name}</Text>
                        <View style={styles.labelWrapper}>
                            <View style={styles.label}>
                                {postDetails?.product?.verifiedLevel === 'LEVEL_1' && (
                                    <View style={styles.verified}>
                                        <Text style={styles.verifiedText}>Xác minh cấp 1</Text>
                                    </View>
                                )}
                                {postDetails?.product?.verifiedLevel === 'LEVEL_2' && (
                                    <View style={[styles.verified, { backgroundColor: '#ff8000' }]}>
                                        <Text style={styles.verifiedText}>Xác minh cấp 2</Text>
                                    </View>
                                )}
                                {postDetails?.product?.verifiedLevel === 'LEVEL_3' && (
                                    <View style={[styles.verified, { backgroundColor: '#33cc33' }]}>
                                        <Text style={styles.verifiedText}>Xác minh cấp 3</Text>
                                    </View>
                                )}
                            </View>
                            {postDetails?.boosted &&
                                <View style={styles.ads}>
                                    <AntDesign name="rocket1" size={14} color="white" />
                                    <Text style={[styles.verifiedText, { marginBottom: 1 }]}>Được trả phí để quảng cáo</Text>
                                </View>
                            }

                        </View>
                        <Text style={styles.price}>
                            <Text style={styles.currency}>đ</Text>
                            {formattedPrice}
                        </Text>
                        <View style={styles.wallet}>
                            <AntDesign name="creditcard" size={20} color="gray" />
                            <Text style={styles.walletTitle}>
                                Sử dụng ví GiaTotPay để mua hàng với giá ưu đãi
                            </Text>
                        </View>
                    </View>
                    <View style={styles.divider} />



                    <View style={styles.comment}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 10,
                        }}>Bình luận
                            <Text> ({comments.length})</Text>
                        </Text>
                        {comments && comments.slice(0, showAllComments ? comments.length : 3).map((comment, index) => (
                            <View key={index} style={styles.commentContainer}>
                                <Image source={{ uri: comment?.userImageUrl ? comment?.userImageUrl : profile }} style={styles.avatarComment} />
                                <View style={styles.commentTextContainer}>
                                    <Text style={styles.userName}>{comment?.username}</Text>
                                    <Text style={styles.commentText}>{comment?.commentContent}</Text>
                                    <Text style={styles.timeAgo}>{comment.timeAgo}</Text>
                                </View>
                            </View>
                        ))}
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {postDetails?.isAvailable ? (
                                <TouchableOpacity
                                    style={styles.commentBtnActive}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: COLORS.primary,
                                        }}>Bình luận</Text>
                                </TouchableOpacity>
                            ) : (
                                <View
                                    style={styles.commentContainerUnActive}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: COLORS.gray,
                                        }}>Bình luận</Text>
                                </View>
                            )

                            }

                            <Comment
                                visible={modalVisible}
                                onClose={() => {
                                    setModalVisible(false)
                                    fetchComments()
                                }
                                }
                                postId={postId}
                                isAuthenticated={isAuthenticated}
                                user={user}
                                navigation={navigation}
                            />
                        </View>


                    </View>
                    <View style={styles.divider} />
                    <View style={styles.description}>
                        <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
                        <View>
                            <Text style={styles.descriptionText}>
                                {showFullDescription ? postDetails?.description : `${postDetails?.description?.slice(0, 250)}...`}
                            </Text>
                            {postDetails?.description?.length > 100 && (
                                <Text style={styles.readMore} onPress={() => setShowFullDescription(!showFullDescription)}>
                                    {showFullDescription ? (
                                        <Text style={styles.seeMore}>Ẩn bớt</Text>
                                    ) : (
                                        <Text style={styles.seeMore}>Xem thêm chi tiết</Text>
                                    )}
                                </Text>
                            )}
                        </View>
                        <Text style={styles.createdTime}>{postDetails?.createdAt}</Text>
                        <View style={styles.dividerLight} />
                        <View style={styles.hashtags}>
                            <Text style={styles.tag}>#Tuisach</Text>
                            <Text style={styles.tag}>#Gucci</Text>
                            <Text style={styles.tag}>#Deocheo</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.description}>
                        <Text style={styles.descriptionTitle}>Thông tin chi tiết</Text>
                    </View>
                    {/* Thương hiệu */}
                    <View style={[styles.details, { marginTop: 4 }]}>
                        <View style={styles.left}>
                            <Text>Thương hiệu</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.brand?.name)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Tình trạng */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Tình trạng</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.condition)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Size */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Size</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.size)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Màu sắc */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Màu sắc</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.color)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Kích thước */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Kích thước</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>
                                {`${getFieldValue(postDetails?.product?.length)} x ${getFieldValue(postDetails?.product?.width)} x ${getFieldValue(postDetails?.product?.height)} cm`}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Năm sản xuất */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Năm sản xuất</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.manufactureYear)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Reference Code */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Reference Code</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.referenceCode)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Chất liệu bên ngoài */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Chất liệu bên ngoài</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.exteriorMaterial)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />
                    {/* Interior Material */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Chất liệu bên trong</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.interiorMaterial)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Accessories */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Phụ kiện</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.accessories)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Date Code */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Date Code</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.dateCode)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Serial Number */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Serial Number</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.serialNumber)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Purchased Place */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Purchased Place</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.purchasedPlace)}</Text>
                        </View>
                    </View>
                    <View style={[styles.dividerLight, { width: "96%", marginHorizontal: "auto" }]} />

                    {/* Story */}
                    <View style={[styles.details, { marginBottom: 6 }]}>
                        <View style={styles.left}>
                            <Text>Story</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{getFieldValue(postDetails?.product?.story)}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />

                    {/* Profile seller */}
                    <TouchableOpacity
                        style={styles.personalContainer}
                        onPress={() => navigation.navigate("user-profile-details", { user: postDetails?.user, userIdLogged: userId })}
                    >
                        <View style={[styles.detailContainer, { alignItems: 'flex-start', width: "100%" }]}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: postDetails?.user?.avatar ? postDetails?.user?.avatar : profile }}
                            />

                            <View style={styles.userDetails}>
                                <Text numberOfLines={1} style={{ fontSize: 18 }}>{postDetails?.user?.lastName} {postDetails?.user?.firstName}</Text>
                                <View style={styles.oneLine}>
                                    <Rating
                                        stars={averageRating}
                                        maxStars={5}
                                        size={16}
                                    />
                                    <Text style={{ fontSize: 12, marginLeft: 4, marginTop: 2 }}>({averageRating.toFixed(1)})</Text>
                                </View>
                                {postDetails?.user?.isVerified === true ? (
                                    <View style={styles.oneLine}>
                                        <MaterialIcons name="verified-user" size={12} color="#699BF7" style={{ marginTop: 0, marginLeft: 0 }} />
                                        <Text style={{ fontSize: 12 }}>Tài khoản đã xác minh</Text>
                                    </View>
                                ) : (
                                    <View style={styles.oneLine}>
                                        <Octicons name="unverified" size={14} color="gray" style={{ marginTop: 4 }} />
                                        <Text style={{ fontSize: 12, marginTop: 2, marginLeft: 2 }}>Tài khoản chưa xác minh</Text>
                                    </View>
                                )
                                }
                            </View>

                            <View style={{
                                backgroundColor: COLORS.primary,
                                paddingVertical: 6,
                                paddingHorizontal: 10,
                                borderRadius: 6,
                                right: 10,
                                marginVertical: 'auto'
                            }}>
                                <Text style={{ color: COLORS.white }}>Ghé thăm</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <View style={styles.recommended}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <MaterialIcons name="explore" size={18} color="gray" />
                            <Text style={{ color: "gray", fontSize: 16 }}> Khám phá</Text>
                        </View>
                        <View>
                            <Text>
                                Products in here
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {
                postDetails?.isAvailable && (
                    <View style={styles.bottomBtn}>
                        {type === "buyer" && (
                            <TouchableOpacity style={styles.button} onPress={handlePress}>
                                <Text style={styles.buttonText}>Mua ngay</Text>
                            </TouchableOpacity>
                        )
                        }
                        {type === "seller" && (
                            <TouchableOpacity style={styles.button}
                                onPress={() => navigation.navigate('update-post', { postId: postId })}
                            >
                                <Text style={styles.buttonText}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                        )
                        }
                    </View>

                )
            }
            <CustomModal
                visible={customModalVisible}
                onClose={modalContent.onClose}
                onConfirm={modalContent.onConfirm}
                title={modalContent.title}
                detailText={modalContent.detailText}
                confirmText={modalContent.confirmText}
                cancelText={modalContent.cancelText}
            />
        </View>
    );
};

export default PostDetail;
