import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import styles from '../css/orderSuccessfully.style'
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { format, addDays } from 'date-fns';
import Post from '../post/Post';
import { getAllPosts } from '../../api/post';

const CancelSuccessfully = ({ navigation, route }) => {
    const orderInfo = route.params.orderInfo;

    const [phoneUserOrder, setPhoneUserOrder] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

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
    }, []);

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
                    <ScrollView style={{ width: '98%', marginHorizontal: 'auto', marginTop: 10 }}>
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

export default CancelSuccessfully