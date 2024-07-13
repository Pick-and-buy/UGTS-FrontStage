import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../css/post.style';
import { useNavigation } from '@react-navigation/native';
import Svg, { Polygon } from 'react-native-svg';
const image = { uri: "https://docs.expo.dev/static/images/tutorial/background-image.png" };

const Post = ({ post, type }) => {
    // console.log(product.product.images[0].imageUrl);
    // console.log(product.id);
    const navigation = useNavigation();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    // Format the price using the helper function
    const formattedPrice = formatPrice(post?.product?.price);

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <TouchableOpacity style={styles.wrapper}
                    onPress={() => navigation.navigate('post-details', { postId: post.id, type })}
                >
                    <ImageBackground source={{ uri: post?.product?.images[0]?.imageUrl }} style={styles.image}>
                        <View style={styles.label} >
                            <Text style={styles.labelText}>Đã bán</Text>
                        </View>
                        <Text style={styles.text}>
                            <Text style={styles.currency}>đ</Text>
                            {formattedPrice}
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>
            </GestureHandlerRootView>
        </View>
    );
}

export default Post;