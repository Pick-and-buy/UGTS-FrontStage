import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    Pressable,
    SafeAreaView,
} from "react-native";
import { Ionicons, Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import Carousel from "../../components/carousel/Carousel";
import { getPostDetails } from "../../api/post";
import styles from "../css/postDetails.style";
import { Rating } from 'react-native-stock-star-rating'
import { getUserByToken, likePost, unlikePost } from "../../api/user";
const profile =
    "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const PostDetail = ({ navigation, route }) => {
    const postId = route.params;
    const [postDetails, setPostDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // State to manage the like status
    const [isLiked, setIsLiked] = useState(false);
    const [userId, setUserId] = useState(null);
    const data = postDetails?.product?.images || [];
    // console.log(postId);
    useEffect(() => {
        fetchPostDetails();
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const userInfo = await getUserByToken(); // Retrieve user data from the API
            setUserId(userInfo.result.id);
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


    const handleLike = async () => {
        if (!userId) {
            console.error("User is not authenticated");
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

                            {postDetails?.product?.isVerify &&
                                <View style={styles.verified}>
                                    <MaterialIcons name="verified" size={14} color="green" />
                                    <Text style={styles.verifiedText}>Hàng chính hãng</Text>
                                </View>
                            }

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
                        <Text>Comment in here</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.description}>
                        <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
                        <Text style={styles.descriptionText}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facilis amet incidunt quod quis, est pariatur commodi esse cumque inventore repudiandae perspiciatis soluta reprehenderit, tempore illum asperiores voluptate et. Consequatur.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facilis amet incidunt quod quis, est pariatur commodi esse cumque inventore repudiandae perspiciatis soluta reprehenderit, tempore illum asperiores voluptate et. Consequatur.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facilis amet incidunt quod quis, est pariatur commodi esse cumque inventore repudiandae perspiciatis soluta reprehenderit, tempore illum asperiores voluptate et. Consequatur.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facilis amet incidunt quod quis, est pariatur commodi esse cumque inventore repudiandae perspiciatis soluta reprehenderit, tempore illum asperiores voluptate et. Consequatur.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facilis amet incidunt quod quis, est pariatur commodi esse cumque inventore repudiandae perspiciatis soluta reprehenderit, tempore illum asperiores voluptate et. Consequatur.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facilis amet incidunt quod quis, est pariatur commodi esse cumque inventore repudiandae perspiciatis soluta reprehenderit, tempore illum asperiores voluptate et. Consequatur.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facilis amet incidunt quod quis, est pariatur commodi esse cumque inventore repudiandae perspiciatis soluta reprehenderit, tempore illum asperiores voluptate et. Consequatur.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facilis amet incidunt quod quis, est pariatur commodi esse cumque inventore repudiandae perspiciatis soluta reprehenderit, tempore illum asperiores voluptate et. Consequatur.
                            {postDetails?.description}
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

                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Thương hiệu</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.brand?.name}</Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />

                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Vật liệu</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.material}</Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />


                    <View style={styles.details}>
                        <View style={styles.left}>
                            <Text>Tình trạng</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.condition}</Text>
                        </View>
                    </View>
                    <View style={styles.dividerLight} />


                    {/* Personal Information */}
                    <TouchableOpacity style={styles.personalContainer}>
                        <View style={[styles.detailContainer, { alignItems: 'flex-start' }]}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: profile }}
                            />
                            <View style={{}}>
                                <Text style={{ fontSize: 18 }}>
                                    Tên ở đây
                                </Text>
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

                    {/* Post recommend */}
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
