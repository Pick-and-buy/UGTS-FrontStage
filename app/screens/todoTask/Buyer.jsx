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
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import styles from "../css/buyer.style";
import { callFetchListOrders, getOrderByOrderId } from "../../api/order";
import { COLORS } from "../../constants/theme";

const Buyer = ({ navigation }) => {

    const orderStatus = ["Chờ xử lý", "Đang xử lý", "Giao hàng", "Hủy hàng", "Đã nhận hàng", "Trả lại"];
    const [listOrders, setListOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrderStatus, setSelectedOrderStatus] = useState('All');

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

    const dataStatus = [
        { id: '1', value: 'All' },
        { id: '2', value: 'Chờ xử lý' },
        { id: '3', value: 'Đang xử lý' },
        { id: '4', value: 'Giao hàng' },
        { id: '5', value: 'Hủy hàng' },
        { id: '6', value: 'Đã nhận hàng' },
        { id: '7', value: 'Trả lại' },
    ]

    const handleOrderStatusPress = (orderStatusName) => {
        setSelectedOrderStatus(orderStatusName);
        if (orderStatusName === 'All') {
            fetchAllOrders();
        } 
        //else {
        //     fetchAllOrdersByOrderStatus(orderStatusName);
        // }
    };

    const renderItem = ({ item }) => (
         <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate("buyer-order-details", { orderInfo: item })}>
            <Image source={{ uri: item?.post?.product?.images[0]?.imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.itemTitle}>
                    {item?.post?.title.length > 13 ? `${item?.post?.title.substring(0, 13)}...` : item?.post?.title}
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
                    <View>
                        <View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                marginLeft: "3%",
                                marginVertical: 10,
                                gap: 5
                            }}>
                                <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: "bold" }}>Order Status</Text>
                                <AntDesign name="filter" size={16} color="black" />
                            </View>
                            <FlatList
                                data={dataStatus}
                                horizontal
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.orderStatusButton,
                                            setSelectedOrderStatus === item.value && styles.selectedOrderStatusButton
                                        ]}
                                        onPress={() => handleOrderStatusPress(item.value)}
                                    >
                                        <Text
                                            style={[
                                                styles.orderStatusButtonText,
                                                setSelectedOrderStatus === item.value && styles.selectedOrderStatusButtonText
                                            ]}
                                        >
                                            {item.value}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.orderStatusList}
                            />
                        </View>
                        <FlatList
                            data={listOrders}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>

                )
            }
        </View>
    )
}

export default Buyer