import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../css/post.style';
import { useNavigation } from '@react-navigation/native';

const image = { uri: "https://docs.expo.dev/static/images/tutorial/background-image.png" };

const Post = ({ post }) => {
    // console.log(product.product.images[0].imageUrl);
    // console.log(product.id);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <TouchableOpacity style={styles.wrapper}
                    onPress={() => navigation.navigate('post-details', post.id)}
                >
                    <ImageBackground source={{ uri: post?.product?.images[0]?.imageUrl }} style={styles.image}>
                        <Text style={styles.text}>
                            <Text style={styles.currency}>đ</Text>
                            {post?.product?.price}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </GestureHandlerRootView>
        </View>
    );
}

export default Post;