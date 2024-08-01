import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView, Alert, Clipboard } from "react-native";
import styles from "../css/buyerOrderDetails.style";
import { useFocusEffect } from '@react-navigation/native';
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { G, Line, Svg } from "react-native-svg";
import { getUserByToken } from "../../api/user";
import { format, addDays } from 'date-fns';
import { cancelOrderBuyer, updateOrderBuyer } from '../../api/order';

const BuyerOrderDetails = ({ navigation, route }) => {
  const orderInfo = route.params.orderInfo;
  const postDetails = route.params.orderInfo?.post;

  const [user, setUser] = useState(null);
  const [phoneUserOrder, setPhoneUserOrder] = useState(null);
  const [deliveryDateFrom, setDeliveryDateFrom] = useState(null);
  const [deliveryDateTo, setDeliveryDateTo] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchPhoneUserOder = async () => {
    const phoneNumber = orderInfo?.orderDetails?.phoneNumber;
    const country = orderInfo?.orderDetails?.address?.country;
    let regionCode = '';

    if (country === 'Việt Nam') {
      regionCode = '+84';
    }
    const visibleDigits = phoneNumber.slice(0, 2) + '******' + phoneNumber.slice(-2);
    setPhoneUserOrder(`(${regionCode}) ${visibleDigits}`)
  }

  const calculateDeliveryDate = () => {
    const currentDate = new Date();
    const deliveryFrom = addDays(currentDate, 2);
    const deliveryTo = addDays(currentDate, 6);
    setDeliveryDateFrom(deliveryFrom);
    setDeliveryDateTo(deliveryTo);
  };

  const fetchUserData = async () => {
    try {
      const userData = await getUserByToken();
      setUser(userData);
    } catch (error) {
      console.error('Fetching user data failed:', error);
    }
  };

  useEffect(() => {
    fetchPhoneUserOder();
    calculateDeliveryDate();
    fetchUserData();
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formattedProductPrice = formatPrice(orderInfo?.post?.product?.price);
  const shippingPrice = formatPrice(42500);
  const totalPrice = formatPrice(orderInfo?.post?.product?.price + 42500);

  // const copiedOrderId = () => {
  //   Clipboard.setString(orderInfo?.id);
  //   Alert.alert('>>> check copiedText: ', orderInfo.id)
  // };

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
        <Feather name="chevron-left" size={30} color={COLORS.primary} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Thông tin đơn hàng</Text>
      </View>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>

        <View>
          <View style={styles.ownerAddress}>
            <SimpleLineIcons name="location-pin" size={20} color="black" />
            <Text style={styles.ownerName}>
              {orderInfo?.orderDetails?.firstName} {orderInfo?.orderDetails?.lastName} {phoneUserOrder}
            </Text>
          </View>
          <View style={styles.locationDetails}>
            <Text style={styles.locationText}>
              {selectedAddress ?
                (
                  `${selectedAddress?.street}, ${selectedAddress?.district}, ${selectedAddress?.province}, ${selectedAddress?.country}`
                )
                :
                (
                  `${orderInfo?.orderDetails?.address?.addressLine}, ${orderInfo?.orderDetails?.address?.street}, ${orderInfo?.orderDetails?.address?.district}, ${orderInfo?.orderDetails?.address?.province}, ${orderInfo?.orderDetails?.address?.country}`
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
              source={{ uri: orderInfo?.post?.user?.avatar }}
            />
            <Text style={styles.sellerText}>
              {orderInfo?.post?.user?.username}
            </Text>
          </View>
          <View style={styles.product}>
            <Image
              style={styles.productImage}
              source={{ uri: orderInfo?.post?.product?.images[0]?.imageUrl }}
            />
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.productName}>
                {orderInfo?.post?.product?.name}
              </Text>
              <Text numberOfLines={1} style={styles.productDescription}>
                Color: {orderInfo?.post?.product?.color}, Size: {orderInfo?.post?.product?.size}
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
                Ngày giao hàng dự kiến: {deliveryDateFrom ? format(deliveryDateFrom, 'MMM d') : ''} - {deliveryDateTo ? format(deliveryDateTo, 'MMM d') : ''}
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
                {orderInfo?.orderDetails?.paymentMethod}
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
                  {orderInfo?.id.length > 10 ? `${orderInfo.id.substring(0, 10)}...` : orderInfo.id}
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
              onPress={() => navigation.navigate("seller-profile-navigation", { userOfPost: orderInfo?.post?.user, userIdLogged: orderInfo?.post?.id })}
            >
              <Entypo name="shop" size={24} color="black" />
              <Text style={styles.redirectBtnText}>Ghé thăm người bán</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {orderInfo?.orderDetails?.status === "CANCELLED" ? (
        <View style={styles.bottomBtn}>
          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyBtnText}>Mua Lại Sản Phẩm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.bottomBtn}>
          <TouchableOpacity style={styles.changeAddressBtn}
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
        </View>
      )
      }
    </SafeAreaView>
  )
}

export default BuyerOrderDetails