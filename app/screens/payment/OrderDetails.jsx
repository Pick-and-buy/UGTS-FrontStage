import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import styles from "../css/orderDetails.style";
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, FontAwesome6 } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { G, Line, Svg } from "react-native-svg";
import { getUserByToken } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from 'react-native-paper';

const OrderDetails = ({ navigation, route }) => {
    const postDetails = route.params;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState('VNPay');
    const [productPrice, setProductPrice] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0);
    const [guaranteeFee, setGuaranteeFee] = useState(0);

    useEffect(() => {
        const initialize = async () => {
            await checkToken();
            if (isAuthenticated) {
                await fetchUserData();
                calculatePrices();
            } else {
                setLoading(false);
            }
        };
        initialize();
    }, [isAuthenticated]);

    const handleOrder = () => {
        console.log('Selected payment method:', checked);
    };

    const fetchUserData = async () => {
        try {
            const userData = await getUserByToken();
            setUser(userData.result);
        } catch (error) {
            console.error('Fetching user data failed:', error);
        }
    };

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
    };

    const calculatePrices = () => {
        // Example calculations, replace with your actual logic based on fetched data
        setProductPrice(postDetails?.product?.price || 0);
        setShippingPrice(42500); // Example shipping price
        setGuaranteeFee(500000); // Example guarantee fee
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const totalPrice = productPrice + shippingPrice + guaranteeFee;
    const formattedProductPrice = formatPrice(productPrice);
    const formattedShippingPrice = formatPrice(shippingPrice);
    const formattedGuaranteeFee = formatPrice(guaranteeFee);
    const formattedTotalPrice = formatPrice(totalPrice);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Feather name="chevron-left" size={30} color={COLORS.primary} onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Tổng quan đơn hàng</Text>
            </View>
            <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
                <View style={styles.address}>
                    <View style={styles.ownerAddress}>
                        <SimpleLineIcons name="location-pin" size={20} color="black" />
                        <Text style={styles.ownerName}>
                            {user?.firstName} {user?.lastName} {user?.phoneNumber}
                        </Text>
                    </View>
                    <View style={styles.locationDetails}>
                        <Text style={styles.locationText}>
                            {user?.address?.addressLine2}
                        </Text>
                        <Text style={styles.locationText}>
                            {user?.address?.addressLine1},
                            {user?.address?.street},
                            {user?.address?.district},
                            {user?.address?.province},
                            {user?.address?.country}
                        </Text>
                    </View>
                    <FontAwesome6
                        name="angle-right" size={20}
                        style={{ position: 'absolute', right: 0, top: 10 }}
                        color="gray"
                    />
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
                    <View style={styles.product}>
                        <Image
                            style={styles.productImage}
                            source={{ uri: postDetails?.product?.images[0]?.imageUrl }}
                        />
                        <View style={styles.content}>
                            <Text numberOfLines={1} style={styles.productName}>{postDetails?.product?.name}</Text>
                            <Text numberOfLines={1} style={styles.productDescription}>Color: {postDetails?.product?.color}, Size: {postDetails?.product?.size}</Text>
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
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>{formattedShippingPrice}</Text>
                        </View>
                        <View style={styles.transportFrom}>
                            <MaterialCommunityIcons name="truck-delivery-outline" size={18} color={COLORS.gray} />
                            <Text style={{ fontSize: 12, color: COLORS.gray }}>Từ Buôn Ma Thuột</Text>
                        </View>
                        <View style={styles.transportTime}>
                            <AntDesign name="clockcircleo" size={16} color={COLORS.gray} />
                            <Text style={{ fontSize: 12, color: COLORS.gray }}>Ngày giao hàng dự kiến: Jul 4 - Jul 6</Text>
                        </View>
                        <View style={styles.summary}>
                            <Text style={{ fontSize: 16 }}>1 mặt hàng, tổng cộng: {formattedTotalPrice}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.total}>
                        <Text style={styles.totalHeader}>Tóm tắt yêu cầu</Text>
                        <View style={styles.totalPrice}>
                            <View style={styles.totalLeft}>
                                <Text style={styles.totalText}>Sản phẩm</Text>
                                <Text style={styles.totalText}>Vận chuyển</Text>
                                <Text style={styles.totalText}>Phí đảm bảo</Text>
                            </View>

                            <View style={styles.totalRight}>
                                <Text style={styles.totalText}>{formattedProductPrice}đ</Text>
                                <Text style={styles.totalText}>{formattedShippingPrice}</Text>
                                <Text style={styles.totalText}>{formattedGuaranteeFee}</Text>
                            </View>
                        </View>
                        <View style={styles.totalPrice}>
                            <Text style={styles.totalHeader}>Tổng</Text>
                            <Text style={styles.totalHeader}>{formattedTotalPrice}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.paymentMethods}>
                        <Text style={styles.paymentMethodsHeader}>Phương thức thanh toán</Text>
                        <View style={{ padding: 20 }}>
                            <RadioButton.Group
                                onValueChange={newValue => setChecked(newValue)}
                                value={checked}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text>VNPay</Text>
                                    <RadioButton value="VNPay" />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text>Credit card</Text>
                                    <RadioButton value="Credit card" />
                                </View>
                            </RadioButton.Group>
                        </View>
                    </View>

                    <View style={styles.divider} />
                    <View style={styles.note}>
                        <Text>Bằng cách đặt đơn hàng, bạn đồng ý với Điều Khoản Sử Dụng và Bán Hàng của Giá Tốt và xác nhận rằng bạn đã đọc Chính sách Quyền riêng tư của Giá Tốt. Thanh toán sẽ được PIPO xử lý riêng theo Chính sách quyền riêng tư của PIPO.</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomBtn}>
                <TouchableOpacity style={styles.button} onPress={handleOrder}>
                    <Text style={styles.buttonText}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default OrderDetails;
