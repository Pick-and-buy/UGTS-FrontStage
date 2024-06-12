import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
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

const PostDetail = ({ navigation, route }) => {
    const productId = route.params;
    const [postDetails, setPostDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // console.log(product.product.images[0].imageUrl);
    const data = postDetails?.product?.images || [];
    useEffect(() => {
        fetchPostDetails();
    }, []);

    const fetchPostDetails = async () => {
        try {
            const response = await getPostDetails(productId);
            const postInfo = response.data.result;
            setPostDetails(postInfo);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // const data = [
    //     { id: "01", uri: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg', title: "a" },
    //     { id: "02", uri: 'https://soliloquywp.com/wp-content/uploads/2016/09/How-to-Add-a-Homepage-Slider-in-WordPress.png', title: "b" },
    //     { id: "03", uri: 'https://www.searchenginejournal.com/wp-content/uploads/2019/10/25-of-the-best-examples-of-home-pages-5dc504205de2e.png', title: "c" },
    //     { id: "04", uri: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg', title: "d" },
    // ];

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
                        <View style={styles.like}>
                            <AntDesign name="hearto" size={24} color="gray" />
                        </View>
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
