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
    // console.log(productId);

    const [postDetails, setPostDetails] = useState([]);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        fetchPostDetails()
    }, [])

    const fetchPostDetails = async () => {
        try {
            const response = await getPostDetails(productId);
            // console.log(response.data.result);
            const postInfo = response.data.result
            setPostDetails(postInfo);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const data = [
        {
            id: "01",
            uri: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg',
            title: "a"

        },
        {
            id: "02",
            uri: 'https://soliloquywp.com/wp-content/uploads/2016/09/How-to-Add-a-Homepage-Slider-in-WordPress.png',
            title: "b"
        },
        {
            id: "03",
            uri: 'https://www.searchenginejournal.com/wp-content/uploads/2019/10/25-of-the-best-examples-of-home-pages-5dc504205de2e.png',
            title: "c"
        },
        {
            id: "04",
            uri: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg',
            title: "d"
        },
    ]


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {/* Header */}
                <View style={styles.header}>
                    <Feather name="chevron-left" size={28} color={COLORS.primary} onPress={() => navigation.goBack()} />
                    <Text numberOfLines={1} style={styles.headerText}>{postDetails?.product?.name}</Text>
                    <AntDesign name="sharealt" size={28} color={COLORS.primary} />
                </View>
                <ScrollView style={styles.contentContainer}>
                    <Carousel
                        data={data}
                    />

                    <View style={styles.informationContainer}>
                        <View style={styles.like}>
                            <AntDesign name="hearto" size={24} color="gray" />
                        </View>
                        <Text numberOfLines={3} style={[styles.headerText, { width: "85%" }]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, at ratione nulla nostrum minus itaque quasi consectetur magni sit necessitatibus cum. Deleniti, veniam delectus facilis fugit unde inventore soluta placeat!  </Text>

                        <View style={styles.label}>
                            <Text style={styles.keyword}>Túi xách</Text>
                            <View style={styles.verified}>
                                <MaterialIcons name="verified" size={14} color="green" />
                                <Text style={styles.verifiedText}>
                                    Hàng chính hãng
                                </Text>
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
                                    3000</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />
                </ScrollView>

            </View>
        </SafeAreaView>
    );
}

export default PostDetail;


