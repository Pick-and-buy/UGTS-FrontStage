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
  Alert,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from "react";
import styles from "../css/seller.style";
import { callFetchListOrders, cancelOrderSeller, getOrdersByOrderStatus } from "../../api/order";
import { getUserByToken } from "../../api/user";
import { COLORS } from "../../constants/theme";

const Seller = ({ navigation }) => {

  const [listOrdersSeller, setListOrdersSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('All');

  //Sử dụng useFocusEffect và useCallback để mỗi khi redirect màn hình từ 1 trang khác về màn hình Seller thì sẽ tự động re-render dữ liệu
  useFocusEffect(
    useCallback(() => {
      fetchOrdersBySeller();
    }, [])
  );

  const fetchOrdersBySeller = async () => {
    setIsLoading(true);
    try {
      const res = await callFetchListOrders();
      const userData = await getUserByToken();  // Fetch user data
      //Lọc tất cả order mà có id của người tạo bài post trùng với id của user đăng nhập
      const filteredOrders = res.result.filter(order => order.post.user.id === userData.result.id);
      setListOrdersSeller(filteredOrders);
    } catch (error) {
      console.error("Error fetching Orders:", error);
    }
    setIsLoading(false);
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
        //Lọc tất cả order mà có id của người tạo bài post trùng với id của user đăng nhập
        const filteredOrders = res.result.filter(order => order.post.user.id === userData.result.id);
        setListOrdersSeller(filteredOrders);
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
      fetchOrdersBySeller();
    }
    else {
        fetchAllOrdersByOrderStatus(orderStatusName);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      Alert.alert(
        "Hủy đơn hàng",
        "Bạn có chắc chắn muốn hủy đơn hàng không?",
        [
          {
            text: "Hủy",
          },
          {
            text: "Xác Nhận",
            onPress: async () => {
              await cancelOrderSeller(orderId);
              fetchOrdersBySeller();
            },
          }
        ]
      );
    } catch (error) {
      console.error('Submit cancel buyer order: ', error);
    }
  };

  const handleSellerOrderDetail = (orderInfo) => {
    navigation.navigate("seller-order-details", { orderInfo: orderInfo });
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item?.post?.product?.images[0]?.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.itemTitle}>
          {item?.post?.title.length > 27 ? `${item?.post?.title.substring(0, 27)}...` : item?.post?.title}
        </Text>
        {/* Username: name of buyer */}
        <Text style={styles.shop}>{item?.buyer?.username}</Text>
        <Text style={styles.price}>đ{formatPrice(item?.orderDetails?.price)}</Text>

        {item?.orderDetails?.status === "PENDING" &&
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => handleCancelOrder(item?.id)}>
              <Text style={styles.cancelBtnText}>{"Hủy đơn"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => handleSellerOrderDetail(item)}>
              <Text style={styles.primaryBtnText}>{"Sắp xếp vận chuyển"}</Text>
            </TouchableOpacity>
          </View>
        }
        {item?.orderDetails?.status === "PROCESSING" &&
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.processBtn} onPress={() => handleSellerOrderDetail(item)}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white, fontSize: 14 }]}>{"Đang xử lý"}</Text>
            </TouchableOpacity>
          </View>
        }
        {item?.orderDetails?.status === "DELIVERED" &&
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.processBtn}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white, fontSize: 14 }]}>{"Đang giao hàng"}</Text>
            </TouchableOpacity>
          </View>
        }
        {item?.orderDetails?.status === "CANCELLED" &&
          <View style={styles.buttonWrapper}>
            <View style={[styles.primaryBtn, { backgroundColor: COLORS.gray2 }]}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white }]}>{"Đã hủy"}</Text>
            </View>
          </View>
        }
        {item?.orderDetails?.status === "RECEIVED" &&
          <View style={styles.buttonWrapper}>
            <View style={[styles.primaryBtn, { backgroundColor: COLORS.gray2 }]}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white }]}>{"Đã nhận hàng"}</Text>
            </View>
          </View>
        }
        {item?.orderDetails?.status === "RETURNED" &&
          <View style={styles.buttonWrapper}>
            <View style={[styles.primaryBtn, { backgroundColor: COLORS.gray2 }]}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white }]}>{"Trả hàng"}</Text>
            </View>
          </View>
        }
      </View>

    </View>
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
            {listOrdersSeller.length > 0 ? (
              <FlatList
                data={listOrdersSeller}
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

export default Seller