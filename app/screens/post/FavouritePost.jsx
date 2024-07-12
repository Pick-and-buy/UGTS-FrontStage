import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../css/favouritePost.style';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { COLORS } from '../../constants/theme';
const image = { uri: "https://docs.expo.dev/static/images/tutorial/background-image.png" };

const Post = ({ post }) => {
    // console.log(product.product.images[0].imageUrl);
    // console.log(product.id);
    const navigation = useNavigation();
    // console.log(post);
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
                    onPress={() => navigation.navigate('post-details', { postId: post.id, type: "buyer" })}
                >
                    <Image source={{ uri: post?.product?.images[0]?.imageUrl }} style={styles.image} />
                    <Ionicons
                        name="heart"
                        color={COLORS.primary}
                        size={28}
                        style={{
                            position: 'absolute',
                            bottom: "40%",
                            right: 4,
                        }}
                    />
                    <View style={styles.content}>
                        <Text numberOfLines={1} style={styles.title}>{post?.product?.name}</Text>
                        <Text style={styles.price}>
                            <Text style={styles.currency}>đ</Text>
                            {formattedPrice}
                        </Text>
                        <View style={styles.numberLiked}>
                            <Ionicons
                                name="heart"
                                color={COLORS.gray}
                                size={20} />
                            <Text style={{ fontSize: 18, color: COLORS.gray2, marginBottom: 2, marginLeft: 4 }}>1</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </GestureHandlerRootView>
        </View>
    );
}

export default Post;