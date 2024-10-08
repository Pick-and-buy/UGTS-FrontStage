import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import styles from "../css/orderDetails.style";
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, FontAwesome6 } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { G, Line, Svg } from "react-native-svg";
import { getUserByToken } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from 'react-native-paper';
import { format, addDays } from 'date-fns';
import { order } from '../../api/order';
import { useFocusEffect } from '@react-navigation/native';
import { payOrder } from '../../api/payment';
import CustomModal from '../../components/CustomModal';
import { useAuth } from '../../context/AuthContext';

const OrderDetails = ({ navigation, route }) => {
    const postDetails = route.params.postDetails;
    const { user: userAuth } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState('GiaTotPay');
    const [productPrice, setProductPrice] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0);
    const [deliveryDateFrom, setDeliveryDateFrom] = useState(null);
    const [deliveryDateTo, setDeliveryDateTo] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        detailText: '',
        confirmText: '',
        cancelText: '',
        onConfirm: () => { },
    });
    // console.log(user);
    useEffect(() => {
        const initialize = async () => {
            await checkToken();
            if (isAuthenticated) {
                await fetchUserData();
                calculatePrices();
                calculateDeliveryDate();
            } else {
                setLoading(false);
            }
        };
        initialize();
    }, [isAuthenticated]);

    useEffect(() => {
        navigation.setOptions({
            onSelectAddress: handleSelectAddress
        });
    }, [navigation]);

    useEffect(() => {
        if (route.params?.selectedAddress) {
            setUser(route.params.user)
            handleSelectAddress(route.params.selectedAddress);
            setSelectedAddress(route.params.selectedAddress);
        }
    }, [route.params?.selectedAddress]);

    const handleSelectAddress = (selectedAddress) => {
        setUser((prevUser) => ({
            ...prevUser,
            result: {
                ...prevUser.result,
                address: prevUser.result.address.map((address) =>
                    address.id === selectedAddress.id ? { ...address, default: true } : { ...address, default: false }
                ),
            },
        }));
    };

    const handleOrder = async () => {
        if (!selectedAddress) {
            setModalContent({
                title: 'Chưa có địa chỉ',
                detailText: 'Vui lòng thêm địa chỉ để tiếp tục mua hàng.',
                confirmText: 'Xác nhận',
                cancelText: 'Thoát',
                onConfirm: () => {
                    setModalVisible(false);
                    navigation.navigate('address-lists', { postDetails, type: 'order' });
                },
            });
            setModalVisible(true);
            return;
        }

        const totalPrice = productPrice + shippingPrice;

        try {
            if (checked === 'GiaTotPay') {
                if (userAuth.wallet.balance < totalPrice) {
                    setModalContent({
                        title: 'Số dư tài khoản không đủ',
                        detailText: 'Vui lòng nạp thêm tiền vào tài khoản để thực hiện mua hàng.',
                        confirmText: 'Xác nhận',
                        cancelText: 'Thoát',
                        onConfirm: () => {
                            setModalVisible(false)
                            navigation.navigate("add-funds", { postDetails: postDetails, type: "orderDetails" })
                        },
                    });
                    setModalVisible(true);
                } else {
                    const response = await order(checked, selectedAddress?.id, deliveryDateFrom, deliveryDateTo, postDetails?.id, shippingPrice);
                    console.log('Order placed successfully!');

                    const responsePaymentOrder = await payOrder(user.result.wallet.walletId, response.result.id, totalPrice);
                    console.log('Payment successful!', responsePaymentOrder);

                    navigation.navigate('order-successfully', { orderInfo: response.result });
                }
            }
        } catch (error) {
            console.log('Failed to place order:', error);
        }
    };

    const fetchUserData = async () => {
        try {
            const userData = await getUserByToken();
            setUser(userData);
            // Set the default address
            const defaultAddress = userData.result.address.find(address => address.default);
            setSelectedAddress(defaultAddress);
        } catch (error) {
            console.log('Fetching user data failed:', error);
        }
    };

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
    };

    const calculatePrices = () => {
        setProductPrice(postDetails?.product?.price || 0);
        setShippingPrice(50000);
    };

    const calculateDeliveryDate = () => {
        const currentDate = new Date();
        const deliveryFrom = addDays(currentDate, 3);
        const deliveryTo = addDays(currentDate, 6);
        setDeliveryDateFrom(deliveryFrom);
        setDeliveryDateTo(deliveryTo);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const formattedProductPrice = formatPrice(productPrice);
    const formattedShippingPrice = formatPrice(shippingPrice);
    const formattedTotalPrice = formatPrice(productPrice + shippingPrice);

    const maskPhoneNumber = (phoneNumber, regionCode) => {
        if (!phoneNumber) return '';
        const visibleDigits = phoneNumber.slice(0, 2) + '******' + phoneNumber.slice(-2);
        return `(${regionCode}) ${visibleDigits}`;
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Tổng quan đơn hàng</Text>
            </View>
            <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.address}
                    onPress={() => navigation.navigate('address-lists', {
                        postDetails: postDetails,
                        type: 'order'
                    })}
                >
                    {user?.result?.address?.length > 0 ? (
                        user.result.address.map((address, index) => (
                            address.default && (
                                <View key={index}>
                                    <View style={styles.ownerAddress}>
                                        <SimpleLineIcons name="location-pin" size={20} color="black" />
                                        <Text style={styles.ownerName}>
                                            {user?.result?.lastName} {user?.result?.firstName}{maskPhoneNumber(user?.result?.phoneNumber, '+84')}
                                        </Text>
                                    </View>
                                    <View style={styles.locationDetails}>
                                        <Text style={styles.locationText}>
                                            {address.addressLine ?
                                                (
                                                    `${address.addressLine}, ${address.street}, ${address.district}, ${address.province}, ${address.country}`
                                                )
                                                :
                                                (
                                                    `${address.street}, ${address.district}, ${address.province}, ${address.country}`
                                                )

                                            }
                                        </Text>
                                    </View>
                                </View>
                            )
                        ))
                    ) : (
                        <View style={[styles.locationDetails, { flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }]}>
                            <AntDesign name="plus" size={18} color="gray" style={{ marginRight: 2 }} />
                            <Text style={styles.locationText}>Thêm địa chỉ để tiếp tục mua hàng</Text>
                        </View>
                    )}
                    <FontAwesome6
                        name="angle-right" size={20}
                        style={{ position: 'absolute', right: 15, bottom: "60%" }}
                        color="gray"
                    />
                </TouchableOpacity>
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
                                <Text style={styles.currency}>₫</Text>
                                {formattedProductPrice}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.relatedInformation}>
                        <View style={styles.transport}>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>Vận chuyển tiêu chuẩn</Text>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>{formattedShippingPrice}₫</Text>
                        </View>
                        <View style={styles.transportFrom}>
                            <MaterialCommunityIcons name="truck-delivery-outline" size={18} color={COLORS.gray} />
                            <Text style={{ fontSize: 14, color: COLORS.gray, marginTop: -2 }}>Đơn vị: Nhất Tín Logistics</Text>
                        </View>
                        <View style={styles.transportTime}>
                            <AntDesign name="clockcircleo" size={16} color={COLORS.gray} />
                            <Text style={{ fontSize: 14, color: COLORS.gray, marginTop: -2 }}>Ngày giao hàng dự kiến: {deliveryDateFrom ? format(deliveryDateFrom, 'MMM d') : ''} - {deliveryDateTo ? format(deliveryDateTo, 'MMM d') : ''}</Text>
                        </View>
                        <View style={styles.summary}>
                            <Text style={{ fontSize: 16 }}>1 mặt hàng, tổng cộng: {formattedTotalPrice}₫</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.total}>
                        <Text style={styles.totalHeader}>Tóm tắt yêu cầu</Text>
                        <View style={styles.totalPrice}>
                            <View style={styles.totalLeft}>
                                <Text style={styles.totalText}>Sản phẩm</Text>
                                <Text style={styles.totalText}>Vận chuyển</Text>
                            </View>

                            <View style={styles.totalRight}>
                                <Text style={styles.totalText}>{formattedProductPrice}₫</Text>
                                <Text style={styles.totalText}>{formattedShippingPrice}₫</Text>
                            </View>
                        </View>
                        <View style={styles.totalPrice}>
                            <Text style={styles.totalHeader}>Tổng</Text>
                            <Text style={styles.totalHeader}>{formattedTotalPrice}₫</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.paymentMethods}>
                        <Text style={styles.paymentMethodsHeader}>Phương thức thanh toán</Text>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                            <RadioButton.Group
                                onValueChange={newValue => setChecked(newValue)}
                                value={checked}
                            >
                                {/* <TouchableOpacity style={styles.method} onPress={() => setChecked('COD')}>
                                    <Text style={styles.methodText}>Thanh toán khi nhận hàng</Text>
                                    <RadioButton value="COD" />
                                </TouchableOpacity> */}
                                <TouchableOpacity style={styles.method} onPress={() => setChecked('GiaTotPay')}>
                                    <View style={styles.column}>
                                        <Text style={styles.methodText}>LuxBagPay</Text>
                                        <Text style={styles.currentAmount}>Số dư hiện tại:
                                            <Text style={{ color: 'red' }}> {formatPrice(userAuth?.wallet?.balance)}₫</Text>
                                        </Text>
                                    </View>
                                    <RadioButton value="GiaTotPay" />
                                </TouchableOpacity>
                            </RadioButton.Group>
                        </View>
                    </View>

                    <View style={styles.note}>
                        <Text>Bằng cách đặt đơn hàng, bạn đồng ý với
                            <Text style={styles.highlight}> Điều Khoản Sử Dụng và Bán Hàng </Text>

                            của Giá Tốt và xác nhận rằng bạn đã đọc
                            <Text style={styles.highlight}> Chính sách Quyền riêng tư </Text>

                            của Giá Tốt. Thanh toán sẽ được PIPO xử lý riêng theo Chính sách quyền riêng tư của PIPO.</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomBtn}>
                <TouchableOpacity style={styles.button} onPress={handleOrder}>
                    <Text style={styles.buttonText}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>
            <CustomModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={modalContent.onConfirm}
                title={modalContent.title}
                detailText={modalContent.detailText}
                confirmText={modalContent.confirmText}
                cancelText={modalContent.cancelText}
            />
        </View>
    );
};

export default OrderDetails;