import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../css/orderSuccessfully.style'
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { format, addDays } from 'date-fns';

const CancelSuccessfully = ({ navigation, route }) => {
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

    const handleHomePage = () => {
        // console.log('>>> check order infor: ', orderInfo);
        navigation.navigate('Home');
    }

    const handleOrderDetails = () => {
        navigation.navigate('order-details', { postDetails: orderInfo.post });
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                {/* <TouchableOpacity style={styles.header} onPress={handleOrderDetails}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={32} color="black" />
                </TouchableOpacity> */}
                <View style={[styles.notification, { marginBottom: 50, gap: 10 }]}>
                    <Ionicons name="checkmark-circle-sharp" size={100} color={COLORS.primary} />
                    <Text style={styles.title}>Hủy đơn hàng thành công</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleHomePage}>
                    <FontAwesome name="home" size={26} color={COLORS.primary} />
                    <Text style={styles.btnText}>
                        Chuyển đến trang chủ
                    </Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <View style={styles.recommendation}>
                    <Text style={styles.recommendationText}>Có thể bạn cũng thích</Text>
                </View>
            </View>
        </View>
    )
}

export default CancelSuccessfully