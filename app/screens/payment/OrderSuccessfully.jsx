import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import styles from '../css/orderSuccessfully.style'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { format, addDays } from 'date-fns';

const OrderSuccessfully = ({ navigation, route }) => {
    const orderInfo = route.params.orderInfo;

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
    })

    const handleOrderDetail = async () => {
        // console.log('>>> check order infor: ', orderInfo);
        navigation.navigate('buyer-order-details', { orderInfo: orderInfo });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.header}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={32} color="black" />
                </TouchableOpacity>
                <View style={styles.notification}>
                    <Ionicons name="checkmark-circle-sharp" size={100} color="#4BE289" />
                    <Text style={styles.title}>Đặt hàng thành công</Text>
                    <Text style={styles.subTitle}>
                        Đơn hàng của bạn sẽ được vận chuyển dến: {orderInfo?.orderDetails?.firstName} {orderInfo?.orderDetails?.lastName} -
                        {phoneUserOrder} - {orderInfo?.orderDetails?.address?.street}, {orderInfo?.orderDetails?.address?.district}, {orderInfo?.orderDetails?.address?.province}, {orderInfo?.orderDetails?.address?.country}
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleOrderDetail}>
                    <Ionicons name="bag-handle" size={24} color={COLORS.primary} />
                    <Text style={styles.btnText}>
                        Xem chi tiết đơn hàng
                    </Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <View style={styles.recommendation}>
                    <Text style={styles.recommendationText}>Có thể bạn cũng thích</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OrderSuccessfully