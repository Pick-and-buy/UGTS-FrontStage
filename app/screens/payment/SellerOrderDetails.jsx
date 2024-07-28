import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView, Alert } from "react-native";
import styles from "../css/sellerOrderDetails.style";
import { useFocusEffect } from '@react-navigation/native';
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { G, Line, Svg } from "react-native-svg";
import { getUserByToken } from "../../api/user";
import { format, addDays } from 'date-fns';
import { cancelOrderSeller, updateOrderSeller } from '../../api/order';
import OrderTracking from './OrderTracking';

const SellerOrderDetails = ({ navigation, route }) => {
    const orderInfo = route.params.orderInfo;
    // console.log('>>> check order infor: ', orderInfo);
    const [phoneUserOrder, setPhoneUserOrder] = useState(null);

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

    useEffect(() => {
        fetchPhoneUserOder();
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
                            await cancelOrderSeller(orderInfo?.id);
                            navigation.navigate('seller');
                        },
                    }
                ]
            );
        } catch (error) {
            console.error('Submit cancel buyer order: ', error);
        }
    };

    const handleTransportation = async () => {
        await updateOrderSeller(orderInfo?.id);
        navigation.navigate('seller');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Feather name="chevron-left" size={30} color={COLORS.primary} onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Thông tin đơn hàng</Text>
            </View>
            <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
                {
                    orderInfo?.orderDetails?.status !== "CANCELLED" &&
                    <View style={styles.orderTracking}>
                        <OrderTracking
                            status={orderInfo?.orderDetails?.status}
                            deliveryDateFrom={deliveryDateFrom}
                            deliveryDateTo={deliveryDateTo}
                        />
                    </View>
                }
                <View>
                    <View style={styles.ownerAddress}>
                        <SimpleLineIcons name="location-pin" size={20} color="black" />
                        <Text style={styles.ownerName}>
                            {orderInfo?.orderDetails?.firstName} {orderInfo?.orderDetails?.lastName} {phoneUserOrder}
                        </Text>
                    </View>
                    <View style={styles.locationDetails}>
                        <Text style={styles.locationText}>
                            {orderInfo?.orderDetails?.address?.addressLine ?
                                (
                                    `${orderInfo?.orderDetails?.address?.addressLine}, ${orderInfo?.orderDetails?.address?.street}, ${orderInfo?.orderDetails?.address?.district}, ${orderInfo?.orderDetails?.address?.province}, ${orderInfo?.orderDetails?.address?.country}`
                                )
                                :
                                (
                                    `${orderInfo?.orderDetails?.address?.street}, ${orderInfo?.orderDetails?.address?.district}, ${orderInfo?.orderDetails?.address?.province}, ${orderInfo?.orderDetails?.address?.country}`
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
                            source={{ uri: orderInfo?.buyer?.avatar }}
                        />
                        <Text style={styles.sellerText}>
                            {orderInfo?.buyer?.username}
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
                        <View style={styles.feePrice}>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>Tổng tiền hàng</Text>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>
                                {formattedProductPrice}đ
                            </Text>
                        </View>
                        <View style={styles.feePrice}>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>Vận chuyển</Text>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>
                                {shippingPrice}đ
                            </Text>
                        </View>
                        <View style={styles.feePrice}>
                            <Text style={{ fontSize: 16 }}>Tổng cộng</Text>
                            <Text style={{ fontSize: 16 }}>
                                {totalPrice}đ
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{ fontSize: 18 }}>Mã đơn hàng</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{ fontSize: 18 }}>
                                    {orderInfo?.id.length > 12 ? `${orderInfo.id.substring(0, 12)}...` : orderInfo.id}
                                </Text>
                                <MaterialIcons name="content-copy" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{ color: COLORS.gray }}>Thời gian đặt hàng</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{ color: COLORS.gray }}>
                                    {orderInfo?.orderDetails?.orderDate}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{ color: COLORS.gray }}>Đơn vị giao hàng</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{ color: COLORS.gray }}>
                                    J&T Express
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{ color: COLORS.gray }}>Phương thức thanh toán</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{ color: COLORS.gray }}>
                                    {orderInfo?.orderDetails?.paymentMethod}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {orderInfo?.orderDetails?.status === "PENDING" &&
                        <View style={styles.redirect}>
                            <TouchableOpacity style={styles.redirectBtn} onPress={() => { }}>
                                <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                                <Text style={styles.redirectBtnText}>Liên hệ người mua</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.redirectBtn} onPress={() => { }}>
                                <FontAwesome name="wechat" size={24} color="black" />
                                <Text style={styles.redirectBtnText}>Liên hệ hỗ trợ</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </ScrollView>
            {orderInfo?.orderDetails?.status === "PENDING" &&
                <View style={styles.bottomBtn}>
                    <TouchableOpacity style={styles.changeAddressBtn} onPress={handleCancelOrder}>
                        <Text style={styles.changeAddressBtnText}>Từ chối đơn hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTransportation}>
                        <Text style={styles.buttonText}>Sắp xếp vận chuyển</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
}

export default SellerOrderDetails;