import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
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
import { useAuth } from '../../context/AuthContext';
import CustomModal from "../../components/CustomModal";

const Seller = ({ navigation }) => {
  const { user } = useAuth();
  const [listOrdersSeller, setListOrdersSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    detailText: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => { },
    onClose: () => { }
  });

  useFocusEffect(
    useCallback(() => {
      if (user) {
        if (selectedOrderStatus === 'All') {
          fetchOrdersBySeller();
        } else {
          fetchAllOrdersByOrderStatus(selectedOrderStatus);
        }
      }
    }, [selectedOrderStatus, user])
  );

  const fetchOrdersBySeller = async () => {
    if (!user) return; // Exit if user doesn't exist

    setIsLoading(true);
    try {
      const res = await callFetchListOrders();
      const filteredOrders = res.result.filter(order => order.post.user.id === user.id);
      setListOrdersSeller(filteredOrders);
    } catch (error) {
      console.log("Error fetching Orders:", error);
    }
    setIsLoading(false);
  };

  const fetchAllOrdersByOrderStatus = async (orderStatusName) => {
    if (!user) return; // Exit if user doesn't exist

    setIsLoading(true);
    try {
      let orderStatus = "";
      switch (orderStatusName) {
        case "Chờ xử lý":
          orderStatus = "PENDING";
          break;
        case "Đang xử lý":
          orderStatus = "PROCESSING";
          break;
        case "Đang giao hàng":
          orderStatus = "DELIVERING";
          break;
        case "Đã hủy":
          orderStatus = "CANCELLED";
          break;
        case "Đã nhận hàng":
          orderStatus = "RECEIVED";
          break;
        // case "Trả lại":
        //   orderStatus = "RETURNED";
        //   break;
        case "Hoàn thành":
          orderStatus = "COMPLETED";
          break;
        default:
          orderStatus = "";
      }
      const res = await getOrdersByOrderStatus(orderStatus);
      const userData = await getUserByToken();
      const filteredOrders = res.result.filter(order => order.post.user.id === user.id);
      setListOrdersSeller(filteredOrders);
    } catch (error) {
      console.log("Error fetching Orders by order status:", error);
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
    { id: '4', value: 'Đang giao hàng' },
    { id: '5', value: 'Đã nhận hàng' },
    { id: '6', value: 'Hoàn thành' },
    { id: '7', value: 'Đã hủy' },
    // { id: '8', value: 'Trả lại' },
  ];

  const handleOrderStatusPress = (orderStatusName) => {
    setSelectedOrderStatus(orderStatusName);
    if (orderStatusName === 'All') {
      fetchOrdersBySeller();
    } else {
      fetchAllOrdersByOrderStatus(orderStatusName);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setModalContent({
        title: "Hủy đơn hàng",
        detailText: "Bạn có chắc chắn muốn hủy đơn hàng không?",
        confirmText: "Xác Nhận",
        cancelText: "Thoát",
        onConfirm: async () => {
          setModalVisible(false);
          await cancelOrderSeller(orderId);
          fetchOrdersBySeller();
        },
      });
      setModalVisible(true);
    } catch (error) {
      console.log('Submit cancel buyer order: ', error);
    }
  };

  const handleSellerOrderDetail = (orderInfo) => {
    navigation.navigate("seller-order-details", { orderInfo: orderInfo });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSellerOrderDetail(item)}>
      <Image source={{ uri: item?.post?.product?.images[0]?.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.itemTitle}>
          {item?.post?.title}
        </Text>
        <Text style={styles.shop}>Người mua: {item?.buyer?.lastName} {item?.buyer?.firstName}</Text>
        <Text style={styles.price}>₫{formatPrice((item?.orderDetails?.price ?? 0) + (item?.orderDetails?.shippingCost ?? 0))}</Text>

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
            <TouchableOpacity style={styles.cancelBtn} onPress={() => handleCancelOrder(item?.id)}>
              <Text style={styles.cancelBtnText}>{"Hủy đơn"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.processBtn} onPress={() => handleSellerOrderDetail(item)}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white, fontSize: 12 }]}>{"Đang xử lý"}</Text>
            </TouchableOpacity>
          </View>
        }
        {item?.orderDetails?.status === "DELIVERING" &&
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.processBtn} onPress={() => handleSellerOrderDetail(item)}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white, fontSize: 12 }]}>{"Đang giao hàng"}</Text>
            </TouchableOpacity>
          </View>
        }
        {item?.orderDetails?.status === "CANCELLED" &&
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: COLORS.gray2 }]} onPress={() => handleSellerOrderDetail(item)}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white }]}>{"Đã hủy"}</Text>
            </TouchableOpacity>
          </View>
        }
        {item?.orderDetails?.status === "RECEIVED" &&
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.processBtn]} onPress={() => handleSellerOrderDetail(item)}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white }]}>{"Đã nhận hàng"}</Text>
            </TouchableOpacity>
          </View>
        }
        {item?.orderDetails?.status === "COMPLETED" &&
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.processBtn]} onPress={() => handleSellerOrderDetail(item)}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white }]}>{"Hoàn thành"}</Text>
            </TouchableOpacity>
          </View>
        }
        {/* {item?.orderDetails?.status === "RETURNED" &&
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: COLORS.gray2 }]} onPress={() => handleSellerOrderDetail(item)}>
              <Text style={[styles.cancelBtnText, { color: COLORS.white }]}>{"Trả hàng"}</Text>
            </TouchableOpacity>
          </View>
        } */}
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
          <View style={styles.wrapper}>
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
                data={listOrdersSeller.reverse()}
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
      <CustomModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        onConfirm={modalContent.onConfirm}
        title={modalContent.title}
        detailText={modalContent.detailText}
        confirmText={modalContent.confirmText}
        cancelText={modalContent.cancelText}
      />
    </View>
  )
}

export default Seller;
