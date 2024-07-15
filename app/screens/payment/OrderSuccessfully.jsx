import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../css/orderSuccessfully.style'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const OrderSuccessfully = ({ navigation, route }) => {
    // const orderInfo = route.params.orderInfo;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.header}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={32} color="black" />
                </TouchableOpacity>
                <View style={styles.notification}>
                    <Ionicons name="checkmark-circle-sharp" size={100} color="#4BE289" />
                    <Text style={styles.title}>Đặt hàng thành công</Text>
                    <Text style={styles.subTitle}>Đơn hàng của bạn sẽ được vận chuyển dến: Trần Anh Quang - (+84)56******66 - Masteri Home,Tân Xá, huyện Thạch Thất, thành phố Hà Nội, Việt Nam</Text>
                </View>
                <TouchableOpacity style={styles.button}>
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