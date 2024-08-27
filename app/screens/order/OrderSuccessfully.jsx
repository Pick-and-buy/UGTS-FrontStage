import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import styles from '../css/orderSuccessfully.style'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { format, addDays } from 'date-fns';
import { getAllPosts } from '../../api/post';
import Post from '../post/Post';

const OrderSuccessfully = ({ navigation, route }) => {
    const orderInfo = route.params.orderInfo;
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [phoneUserOrder, setPhoneUserOrder] = useState(null);
    // console.log(posts[0]);
    
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
        fetchPosts();
    },[])


    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getAllPosts();
            let posts = response.data.result;
            //filter posts have isArchived === false
            posts = posts.filter(post => post.isArchived === false);

            setPosts(posts);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOrderDetail = async () => {
        // console.log('>>> check order infor: ', orderInfo);
        navigation.navigate('buyer-order-details', { orderInfo: orderInfo });
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.notification}>
                    <Ionicons name="checkmark-circle-sharp" size={100} color="#4BE289" />
                    <Text style={styles.title}>Đặt hàng thành công</Text>
                    <Text style={styles.subTitle}>
                        Đơn hàng của bạn sẽ được vận chuyển đến: {orderInfo?.orderDetails?.firstName} {orderInfo?.orderDetails?.lastName} -
                        {phoneUserOrder} - {orderInfo?.orderDetails?.address?.street}, {orderInfo?.orderDetails?.address?.district}, {orderInfo?.orderDetails?.address?.province}, {orderInfo?.orderDetails?.address?.country}
                    </Text>
                </View>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("bottom-navigation")}>
                        {/* <Ionicons name="bag-handle" size={24} color={COLORS.primary} /> */}
                        <Text style={styles.btnText}>
                            Trở về trang chủ
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleOrderDetail}>
                        <Ionicons name="bag-handle" size={24} color={COLORS.primary} />
                        <Text style={styles.btnText}>
                            Xem chi tiết đơn hàng
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider} />
                <View style={styles.recommendation}>
                    <Text style={styles.recommendationText}>Có thể bạn cũng thích</Text>
                    <ScrollView style={styles.posts}>
                        {loading ? (
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        ) : (
                            <View style={styles.row}>
                                {posts?.length > 0 ? (
                                    posts.map((post) => <Post key={post.id} post={post} />)
                                ) : (
                                    <Text>No posts available</Text>
                                )}
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default OrderSuccessfully