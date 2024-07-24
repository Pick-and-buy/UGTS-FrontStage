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
import { callFetchListOrders, getOrdersByOrderStatus } from "../../api/order";
import { getUserByToken } from "../../api/user";
import { COLORS } from "../../constants/theme";

const Buyer = ({ navigation }) => {

    const [listOrdersBuyer, setListOrdersBuyer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrderStatus, setSelectedOrderStatus] = useState('All');

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        setIsLoading(true);
        try {
            const res = await callFetchListOrders();
            const userData = await getUserByToken();  // Fetch user data
            //Lọc tất cả order mà có id của người mua trùng với id của user đăng nhập
            const filteredOrders = res.result.filter(order => order.buyer.id === userData.result.id);
            setListOrdersBuyer(filteredOrders);
        } catch (error) {
            console.error("Error fetching Orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllOrdersByOrderStatus = async (orderStatusName) => {
        setIsLoading(true);
        try {
            let orderStatus = "";
            if(orderStatusName === "Chờ xử lý") {
                orderStatus = "PENDING";
            } 
            else if (orderStatusName === "Đang xử lý") {
                orderStatus = "PROCESSING";
            } else if (orderStatusName === "Đang giao hàng") {
                orderStatus = "DELIVERED";
            } else if (orderStatusName === "Đã hủy") {
                orderStatus = "CANCELLED";
            } else if (orderStatusName === "Đã nhận hàng") {
                orderStatus = "RECEIVED";
            } else if (orderStatusName === "Trả lại") {
                orderStatus = "RETURNED";
            }
            const res = await getOrdersByOrderStatus(orderStatus);
            const userData = await getUserByToken(); 
            //Lọc tất cả order mà có id của người mua trùng với id của user đăng nhập
            const filteredOrders = res.result.filter(order => order.buyer.id === userData.result.id);
            setListOrdersBuyer(filteredOrders);
        } catch (error) {
            console.error("Error fetching Orders by order status:", error);
        } finally {
            setIsLoading(false);
        }
    }

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
        { id: '4', value: 'Đang giao hàng' },
        { id: '5', value: 'Đã hủy' },
        { id: '6', value: 'Đã nhận hàng' },
        { id: '7', value: 'Trả lại' },
    ]

    const handleOrderStatusPress = (orderStatusName) => {
        setSelectedOrderStatus(orderStatusName);
        if (orderStatusName === 'All') {
            fetchAllOrders();
        }
        else {
            fetchAllOrdersByOrderStatus(orderStatusName);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("buyer-order-details", { orderInfo: item })}>
            <Image source={{ uri: item?.post?.product?.images[0]?.imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.itemTitle}>
                    {item?.post?.title.length > 13 ? `${item?.post?.title.substring(0, 13)}...` : item?.post?.title}
                </Text>
                {/* Username: name of seller */}
                <Text style={styles.shop}>{item?.post?.user?.username}</Text>
                <Text style={styles.price}>đ{formatPrice(item?.orderDetails?.price)}</Text>
            </View>
            {item?.orderDetails?.status === "PENDING" &&
                <View style={styles.statusButton}>
                    <Text style={styles.statusText}>{"Chờ xử lý"}</Text>
                </View>
            }
            {item?.orderDetails?.status === "PROCESSING" &&
                <View style={[styles.statusButton, { backgroundColor: 'green' }]}>
                    <Text style={[styles.statusText, { color: COLORS.white }]}>{"Đang xử lý"}</Text>
                </View>
            }
            {item?.orderDetails?.status === "DELIVERED" &&
                <View style={styles.statusButton}>
                    <Text style={styles.statusText}>{"Đang giao hàng"}</Text>
                </View>
            }
            {item?.orderDetails?.status === "CANCELLED" &&
                <View style={[styles.statusButton, { backgroundColor: COLORS.gray2 }]}>
                    <Text style={[styles.statusText, { color: COLORS.white }]}>{"Đã hủy"}</Text>
                </View>
            }
            {item?.orderDetails?.status === "RECEIVED" &&
                <View style={[styles.statusButton, { backgroundColor: COLORS.gray2 }]}>
                    <Text style={[styles.statusText, { color: COLORS.white }]}>{"Đã nhận hàng"}</Text>
                </View>
            }
            {item?.orderDetails?.status === "RETURNED" &&
                <View style={[styles.statusButton, { backgroundColor: COLORS.gray2 }]}>
                    <Text style={[styles.statusText, { color: COLORS.white }]}>{"Trả lại"}</Text>
                </View>
            }
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
                                            selectedOrderStatus === item.value && styles.selectedOrderStatusButton
                                        ]}
                                        onPress={() => handleOrderStatusPress(item.value)}
                                    >
                                        <Text
                                            style={[
                                                styles.orderStatusButtonText,
                                                selectedOrderStatus === item.value && styles.selectedOrderStatusButtonText
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

                        {listOrdersBuyer.length > 0 ? (
                            <FlatList
                                data={listOrdersBuyer}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        ) : (
                            <View style={{
                                width: '98%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: 'auto',
                                marginTop: 50
                            }}>
                                <Text style={{ fontSize: 20 }}>No orders found</Text>
                            </View>
                        )}
                    </View>

                )
            }
        </View>
    )
}

export default Buyer