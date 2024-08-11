import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView, Alert } from "react-native";
import styles from "../css/buyerOrderDetails.style";
import { useFocusEffect } from '@react-navigation/native';
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { G, Line, Svg } from "react-native-svg";
import { getUserByToken } from "../../api/user";
import { format, addDays } from 'date-fns';
import { cancelOrderBuyer, getOrderByOrderId, updateOrderBuyer } from '../../api/order';
import OrderTracking from './OrderTracking';
import * as Clipboard from 'expo-clipboard';
import AddRating from './AddRating';

const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const BuyerOrderDetails = ({ navigation, route }) => {
  const orderInfo = route.params.orderInfo;
  // const [user, setUser] = useState(null);
  const [updatedOrderInfo, setUpdatedOrderInfo] = useState();
  const [phoneUserOrder, setPhoneUserOrder] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddRating, setShowAddRating] = useState(false);
  useEffect(() => {
    if (orderInfo) {
      fetchOrderInfo();
    }
  }, [orderInfo]);

  useEffect(() => {
    if (updatedOrderInfo) {
      fetchPhoneUserOder();
    }
  }, [updatedOrderInfo]);

  const fetchOrderInfo = async () => {
    try {
      const data = await getOrderByOrderId(orderInfo.id);
      setUpdatedOrderInfo(data.result);
    } catch (error) {
      console.error('Fetching order data by order id failed:', error);
    }
  }

  const fetchPhoneUserOder = async () => {
    const phoneNumber = updatedOrderInfo?.orderDetails?.phoneNumber;
    const country = updatedOrderInfo?.orderDetails?.address?.country;
    let regionCode = '';

    if (country === 'Việt Nam') {
      regionCode = '+84';
    }
    const visibleDigits = phoneNumber.slice(0, 2) + '******' + phoneNumber.slice(-2);
    setPhoneUserOrder(`(${regionCode}) ${visibleDigits}`)
  }


  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formattedProductPrice = formatPrice(updatedOrderInfo?.post?.product?.price);
  const shippingPrice = formatPrice(42500);
  const totalPrice = formatPrice(updatedOrderInfo?.post?.product?.price + 42500);


  const copiedOrderId = () => {
    Clipboard.setString(updatedOrderInfo?.id);
    // Alert.alert('>>> check copiedText: ', orderInfo.id)
  };


  useFocusEffect(
    useCallback(() => {
      if (route.params?.selectedAddress) {
        setSelectedAddress(route.params.selectedAddress);
        handleUpdateOrder(route.params.selectedAddress);
      }
    }, [route.params?.selectedAddress])
  );

  const handleUpdateOrder = async (newAddress) => {
    try {
      await updateOrderBuyer(orderInfo, newAddress || selectedAddress);
      alert('Update Order Successfully')
    } catch (error) {
      console.error('Submit update buyer order', error);
    }
  };

  const handleCancelOrder = async () => {
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
              await cancelOrderBuyer(orderInfo, selectedAddress);
              navigation.navigate('cancel-successfully', { orderInfo: orderInfo });
            },
          }
        ]
      );
    } catch (error) {
      console.error('Submit cancel buyer order: ', error);
    }
  };

  console.log('>>>> check order: ', orderInfo.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thông tin đơn hàng</Text>
      </View>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {
          updatedOrderInfo?.orderDetails?.status !== "CANCELLED" &&
          <View style={styles.orderTracking}>
            <OrderTracking
              status={updatedOrderInfo?.orderDetails?.status}
              orderDate={updatedOrderInfo?.orderDetails?.orderDate}
              deliveryDateFrom={updatedOrderInfo?.orderDetails?.deliveryDate}
              deliveryDateTo={updatedOrderInfo?.orderDetails?.receivedDate}
            />
          </View>
        }
        <View>
          <View style={styles.ownerAddress}>
            <SimpleLineIcons name="location-pin" size={20} color="black" />
            <Text style={styles.ownerName}>
              {updatedOrderInfo?.orderDetails?.firstName} {updatedOrderInfo?.orderDetails?.lastName} {phoneUserOrder}
            </Text>
          </View>
          <View style={styles.locationDetails}>
            <Text style={styles.locationText}>
              {selectedAddress ?
                (
                  `${selectedAddress?.addressLine},${selectedAddress?.street}, ${selectedAddress?.district}, ${selectedAddress?.province}, ${selectedAddress?.country}`
                )
                :
                (
                  `${updatedOrderInfo?.orderDetails?.address?.addressLine}, ${updatedOrderInfo?.orderDetails?.address?.street}, ${updatedOrderInfo?.orderDetails?.address?.district}, ${updatedOrderInfo?.orderDetails?.address?.province}, ${updatedOrderInfo?.orderDetails?.address?.country}`
                )
              }
            </Text>
          </View>
        </View>
        <View style={styles.slanted}>
          <Svg height="20" width="100%">
            <G transform="rotate(0)">
              <Line x1="0" y1="20" x2="100%" y2="20" stroke="red" strokeWidth="2" />
              <Line x1="0" y1="20" x2="100%" y2="20" stroke="cyan" strokeWidth="2" strokeDasharray="10" />
            </G>
          </Svg>
        </View>

        <View style={styles.information}>
          <View style={styles.seller}>
            <Image
              style={styles.sellerImage}
              source={{ uri: updatedOrderInfo?.post?.user?.avatar ? updatedOrderInfo?.post?.user?.avatar : profile }}
            />
            <Text style={styles.sellerText}>
              {updatedOrderInfo?.post?.user?.username} (Người bán)
            </Text>
          </View>
          <View style={styles.product}>
            <Image
              style={styles.productImage}
              source={{ uri: updatedOrderInfo?.post?.product?.images[0]?.imageUrl }}
            />
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.productName}>
                {updatedOrderInfo?.post?.product?.name}
              </Text>
              <Text numberOfLines={1} style={styles.productDescription}>
                Color: {updatedOrderInfo?.post?.product?.color}, Size: {updatedOrderInfo?.post?.product?.size}
              </Text>
              <View style={styles.label}>
                <View style={styles.verifiedLabel}>
                  <MaterialIcons name="verified" size={14} color="#FFBB00" />
                  <Text style={{ fontSize: 12 }}>Đã xác minh</Text>
                </View>
                <View style={styles.returnLabel}>
                  <AntDesign name="retweet" size={14} color="#FFBB00" />
                  <Text style={{ fontSize: 12 }}>Trả hàng miễn phí</Text>
                </View>
              </View>
              <Text style={styles.price}>
                <Text style={styles.currency}>đ</Text>
                {formattedProductPrice}
              </Text>
            </View>
          </View>

          <View style={styles.relatedInformation}>
            <View style={styles.transport}>
              <Text style={{ fontSize: 16, color: COLORS.gray }}>Vận chuyển tiêu chuẩn</Text>
              <Text style={{ fontSize: 16, color: COLORS.gray }}>
                {shippingPrice}đ
              </Text>
            </View>
            <View style={styles.transportFrom}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={18} color={COLORS.gray} />
              <Text style={{ fontSize: 12, color: COLORS.gray }}>Từ Hà Nội</Text>
            </View>
            <View style={styles.transportTime}>
              <AntDesign name="clockcircleo" size={16} color={COLORS.gray} />
              <Text style={{ fontSize: 12, color: COLORS.gray }}>
                Ngày giao hàng dự kiến: {updatedOrderInfo?.orderDetails?.deliveryDate ? format(updatedOrderInfo?.orderDetails?.deliveryDate, 'MMM d') : ''} - {updatedOrderInfo?.orderDetails?.receivedDate ? format(updatedOrderInfo?.orderDetails?.receivedDate, 'MMM d') : ''}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.total}>
            <Text style={styles.totalHeader}>Thông tin đặt hàng</Text>
            <View style={styles.totalPrice}>
              <View style={styles.totalLeft}>
                <Text style={styles.totalText}>Sản phẩm</Text>
                <Text style={styles.totalText}>Vận chuyển</Text>
              </View>

              <View style={styles.totalRight}>
                <Text style={styles.totalText}>
                  {formattedProductPrice}đ
                </Text>
                <Text style={styles.totalText}>
                  {shippingPrice}đ
                </Text>
              </View>
            </View>
            <View style={styles.totalPrice}>
              <Text style={styles.totalHeader}>Tổng</Text>
              <Text style={styles.totalHeader}>
                {totalPrice}đ
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentMethods}>
            <Text style={styles.paymentMethodsHeader}>Phương thức thanh toán</Text>
            <View>
              {/* List phương thức thanh toán in here*/}
              <Text>
                {updatedOrderInfo?.orderDetails?.paymentMethod}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.specification}>
            <View style={styles.left}>
              <Text style={{ fontSize: 18 }}>ID đơn hàng</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity style={styles.orderId} onPress={() => {}}>
                <Text style={{ fontSize: 18 }}>
                  {updatedOrderInfo?.id.length > 10 ? `${orderInfo.id.substring(0, 10)}...` : orderInfo.id}
                </Text>
                <MaterialIcons name="content-copy" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.redirect}>
            <TouchableOpacity style={styles.redirectBtn} onPress={() => { }}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
              <Text style={styles.redirectBtnText}>Liên hệ người bán</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.redirectBtn}
              onPress={() => navigation.navigate("seller-profile-navigation", { userOfPost: updatedOrderInfo?.post?.user, userIdLogged: updatedOrderInfo?.post?.id })}
            >
              <Entypo name="shop" size={24} color="black" />
              <Text style={styles.redirectBtnText}>Ghé thăm người bán</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        {updatedOrderInfo?.orderDetails?.status === "RECEIVED" && !showAddRating &&
          <>
            <View style={styles.confirm}>
              <Text style={styles.confirmText}>
                Vui lòng chỉ ấn "Đã nhận được hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có vấn để nào.
              </Text>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setShowAddRating(true)}
              >
                <Text style={styles.confirmTextButton}>Đã nhận được hàng</Text>
              </TouchableOpacity>
            </View>
          </>
        }

        {showAddRating && <AddRating navigation={navigation} orderInfo={updatedOrderInfo} />}

      </ScrollView>

      {updatedOrderInfo?.orderDetails?.status !== "DELIVERING" && updatedOrderInfo?.orderDetails?.status !== "RECEIVED" && (
        <View style={styles.bottomBtn}>
          {updatedOrderInfo?.orderDetails?.status === "CANCELLED" ? (
            <TouchableOpacity style={styles.buyBtn}>
              <Text style={styles.buyBtnText}>Mua Lại Sản Phẩm</Text>
            </TouchableOpacity>
          ) : updatedOrderInfo?.orderDetails?.status === "PENDING" || updatedOrderInfo?.orderDetails?.status === "PROCESSING" ? (
            <>
              <TouchableOpacity
                style={styles.changeAddressBtn}
                onPress={() => navigation.navigate('address-lists', {
                  orderInfo,
                  type: 'buyer-change-address'
                })}
              >
                <Text style={styles.changeAddressBtnText}>Thay đổi địa chỉ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCancelOrder}>
                <Text style={styles.buttonText}>Hủy đơn hàng</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      )}


    </SafeAreaView>
  )
}

export default BuyerOrderDetails