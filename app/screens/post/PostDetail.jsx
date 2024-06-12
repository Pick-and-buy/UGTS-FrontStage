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
import { getUserByToken, likePost, unlikePost } from "../../api/user";

const PostDetail = ({ navigation, route }) => {
    const postId = route.params;
    const [postDetails, setPostDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // State to manage the like status
    const [isLiked, setIsLiked] = useState(false);
    const [userId, setUserId] = useState(null);
    const data = postDetails?.product?.images || [];
    console.log(postId);
    useEffect(() => {
        fetchPostDetails();
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const userInfo = await getUserByToken(); // Retrieve user data from the API
            setUserId(userInfo.result.id); // Assuming the user ID is accessible under the key "id"
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
                await unlikePost(userId,postId);
            } else {
                await likePost(userId,postId);
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
                <ScrollView contentContainerStyle={styles.contentContainer}>
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
                            <View style={styles.verified}>
                                <MaterialIcons name="verified" size={14} color="green" />
                                <Text style={styles.verifiedText}>Hàng chính hãng</Text>
                            </View>
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
                            <Text>Màu sắc</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>{postDetails?.product?.color}</Text>
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

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default PostDetail;
