import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import styles from "../css/buyer.style";
import { callFetchListOrders } from "../../api/order";
import { COLORS } from "../../constants/theme";

const Buyer = ({ navigation }) => {

    const orderStatus = ["Chờ xử lý", "Đang xử lý", "Giao hàng", "Hủy hàng", "Đã nhận hàng", "Trả lại"];
    const [listOrders, setListOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        setIsLoading(true);
        try {
            const res = await callFetchListOrders();
            console.log('>>> check res order: ', res.result);
            setListOrders(res.result);
        } catch (error) {
            console.error("Error fetching Orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const data = [
        { id: '1', title: 'Sneaker NIKE AIR', shop: 'Sneaker Shop', price: '$35', status: 'Process', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
        { id: '2', title: 'ADIDAS For Men', shop: 'Adidas Shop', price: '$35', status: 'Process', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
        { id: '3', title: 'Spacy fresh crab', shop: 'Waroenk kita', price: '$35', status: 'Process', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
    ];

    // const dataStatus = [
    //     {label: 'Chờ xử lý', value: 'Chờ xử lý'},
    //     {label: 'Đang xử lý', value: 'Đang xử lý'},
    //     {label: 'Giao hàng', value: 'Giao hàng'},
    //     {label: 'Hủy hàng', value: 'Hủy hàng'},
    //     {label: 'Đã nhận hàng', value: 'Đã nhận hàng'},
    //     {label: 'Trả lại', value: 'Trả lại'},
    // ]

    const renderItem = ({ item }) => (
        // <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate("buyer-order-details")}>
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item?.post?.product?.images[0]?.imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.itemTitle}>
                    {item?.post?.title.length > 15 ? `${item?.post?.title.substring(0, 15)}...` : item?.post?.title}
                </Text>
                <Text style={styles.shop}>{item?.post?.user?.username}</Text>
                <Text style={styles.price}>đ{formatPrice(item?.post?.product?.price)}</Text>
            </View>
            <View style={styles.statusButton}>
                <Text style={styles.statusText}>{item?.orderDetails?.status}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {isLoading ?
                (
                    <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
                )
                :
                (
                    <FlatList
                        data={listOrders}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                )
            }
        </View>
    )
}

export default Buyer