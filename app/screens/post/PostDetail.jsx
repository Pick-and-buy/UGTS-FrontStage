import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Pressable,
    SafeAreaView,
    TextInput,
} from "react-native";
import { Ionicons, Feather, AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import Carousel from "../../components/carousel/Carousel";
import { getPostDetails, getComments, postComment } from "../../api/post";
import styles from "../css/postDetails.style";
import { Rating } from 'react-native-stock-star-rating';
import { getUserByToken, likePost, unlikePost } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const PostDetail = ({ navigation, route }) => {
    const postId = route.params;
    const [postDetails, setPostDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [comments, setComments] = useState([]);
    const [showAllComments, setShowAllComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const data = postDetails?.product?.images || [];

    useEffect(() => {
        fetchPostDetails();
        checkAuthentication();
        fetchComments();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            getUserData();
        }
    }, [isAuthenticated]);

    const checkAuthentication = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            setIsAuthenticated(!!token); // Boolean check for authentication
        } catch (error) {
            console.error("Error checking authentication status:", error);
        }
    };

    const getUserData = async () => {
        try {
            const userInfo = await getUserByToken();
            setUserId(userInfo.result.id); // Set userId after fetching user information
        } catch (error) {
            console.error("Error fetching user data:", error);
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
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            alert("Comment is empty");
            return;
        } else if (!isAuthenticated) {
            alert("User is not authenticated!");
            return;
        }

        try {
            await postComment(userId, postId, newComment);
            setNewComment(""); // Clear the input field
            fetchComments(); // Fetch updated comments list
        } catch (error) {
            console.error("Error posting comment", error);
        }
    };

    const handleLike = async () => {
        if (!userId) {
            alert("User is not authenticated");
            return;
        }

        try {
            if (isLiked) {
                await unlikePost(userId, postId);
            } else {
                await likePost(userId, postId);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error updating like status", error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Feather name="chevron-left" size={30} color={COLORS.primary} onPress={() => navigation.goBack()} />
                    <Text numberOfLines={1} style={styles.headerText}>{postDetails?.product?.name}</Text>
                    <AntDesign name="sharealt" size={25} color={COLORS.primary} />
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <Carousel data={data} />
                    <View style={styles.informationContainer}>
                        <Pressable onPress={handleLike} style={styles.like}>
                            <AntDesign
                                name={isLiked ? "heart" : "hearto"}
                                size={24}
                                color={isLiked ? "red" : "gray"}
                            />
                        </Pressable>
                        <Text numberOfLines={3} style={[styles.headerText, { width: "85%" }]}>{postDetails?.product?.name}</Text>
                        <View style={styles.label}>
                            <Text style={styles.keyword}>Túi xách</Text>

                            {postDetails?.product?.isVerify ? (
                                <View style={styles.verified}>
                                    <MaterialIcons name="verified" size={14} color="green" />
                                    <Text style={styles.verifiedText}>Đã được xác minh</Text>
                                </View>
                            ) : (
                                <View style={styles.verified}>
                                    <Entypo name="circle-with-cross" size={15} color="red" />
                                    <Text style={styles.verifiedText}>Chưa được xác minh</Text>
                                </View>
                            )}

                        </View>
                        <Text style={styles.labelTransport}>Miễn phí vận chuyển</Text>
                        <Text style={styles.price}>
                            <Text style={styles.currency}>đ</Text>
                            {postDetails?.product?.price}
                        </Text>
                        <View style={styles.wallet}>
                            <AntDesign name="creditcard" size={20} color="gray" />
                            <Text style={styles.walletTitle}>
                                Sử dụng ví GIATOTPAY để mua với giá
                                <Text style={styles.walletTitlePrice}>
                                    <Text> </Text>
                                    <Text style={styles.currency}>đ</Text>
                                    260
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.comment}>
                        <View style={styles.commentInputContainer}>
                            <TextInput
                                style={styles.commentInput}
                                value={newComment}
                                onChangeText={setNewComment}
                                placeholder="Add a comment"
                            />
                            <Pressable onPress={handleCommentSubmit}>
                                <MaterialIcons name="send" size={24} color="black" />
                            </Pressable>
                        </View>
                        {/* <View style={styles.divider} /> */}
                        {comments && comments.slice(0, showAllComments ? comments.length : 2).map((comment, index) => (
                            <View key={index} style={styles.commentContainer}>
                                <Text style={styles.commentText}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {comment.username}
                                    </Text>
                                    : {comment.commentContent}
                                </Text>
                            </View>
                        ))}
                        {comments && comments.length > 2 && (
                            <Text style={styles.seeMore} onPress={() => setShowAllComments(!showAllComments)}>
                                {showAllComments ? 'Hide comments' : 'See all comments'}
                            </Text>
                        )}
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.description}>
                        <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
                        <Text style={styles.descriptionText}>
                            {showFullDescription ? postDetails?.description : `${postDetails?.description?.slice(0, 150)}...`}
                        </Text>
                        <Text style={styles.seeMore} onPress={() => setShowFullDescription(!showFullDescription)}>
                            {showFullDescription ? 'Ẩn bớt' : 'Xem thêm'}
                        </Text>
                        <Text style={styles.createdTime}>{postDetails?.createdAt}</Text>
                        <View style={styles.dividerLight} />
                        <View style={styles.hashtags}>
                            <Text style={styles.tag}>#Tuisach</Text>
                            <Text style={styles.tag}>#Gucci</Text>
                            <Text style={styles.tag}>#Deocheo</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    {/* Thương hiệu */}
                    <View style={[styles.details, { marginTop: 4 }]}>
                        <View style={styles.left}>
                            <Text>Thương hiệu</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.brand?.name.toLowerCase() === "none" ? "N/A" : postDetails?.product?.brand?.name}</Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Tình trạng */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Tình trạng</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.condition.toLowerCase() === "none" ? "N/A" : postDetails?.product?.condition}</Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />

                    {/* Size */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Size</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.size.toLowerCase() === "none" ? "N/A" : postDetails?.product?.size} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Màu sắc */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Màu sắc</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.color.toLowerCase() === "none" ? "N/A" : postDetails?.product?.color} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Kích thước */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Kích thước</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.length} x {postDetails?.product?.width} x {postDetails?.product?.height} cm</Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Năm sản xuất */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Năm sản xuất</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.manufactureYear.toLowerCase() === "none" ? "N/A" : postDetails?.product?.manufactureYear} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Reference Code */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Reference Code</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.referenceCode.toLowerCase() === "none" ? "N/A" : postDetails?.product?.referenceCode} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Exterior Material */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Chất liệu bên ngoài</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.exteriorMaterial.toLowerCase() === "none" ? " N/A" : postDetails?.product?.exteriorMaterial} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Interior Material */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Chất liệu bên trong</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.interiorMaterial.toLowerCase() === "none" ? " N/A" : postDetails?.product?.interiorMaterial} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Accessories */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Phụ kiện</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.accessories.toLowerCase() === "none" ? " N/A" : postDetails?.product?.accessories} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Date Code */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Date Code</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.dateCode.toLowerCase() === "none" ? " N/A" : postDetails?.product?.dateCode} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Serial Number */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Serial Number</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.serialNumber.toLowerCase() === "none" ? " N/A" : postDetails?.product?.serialNumber} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* Purchased Place */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Purchased Place</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.purchasedPlace.toLowerCase() === "none" ? " N/A" : postDetails?.product?.purchasedPlace} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />
                    {/* story */}
                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Story</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.story.toLowerCase() === "none" ? " N/A" : postDetails?.product?.story} </Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />

                    {/* Profile seller */}
                    <TouchableOpacity
                        style={styles.personalContainer}
                        onPress={() => navigation.navigate("seller-profile-navigation", postDetails?.user)}
                    >
                        <View style={[styles.detailContainer, { alignItems: 'flex-start' }]}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: postDetails?.user?.avatar ? postDetails?.user?.avatar : profile }}
                            />
                            <View style={{}}>
                                <Text style={{ fontSize: 18 }}>{postDetails?.user?.username}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                    <Rating
                                        stars={4.7}
                                        maxStars={5}
                                        size={16}
                                    />
                                    <Text style={{ fontSize: 12, marginLeft: 4 }}>(100)</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 40 }}>
                                        <MaterialIcons name="verified-user" size={12} color="#699BF7" style={{ marginTop: 0, marginLeft: 0 }} />
                                        <Text style={{ fontSize: 12 }}>Tài khoản đã xác minh</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.dividerLight} />
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
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default PostDetail;
