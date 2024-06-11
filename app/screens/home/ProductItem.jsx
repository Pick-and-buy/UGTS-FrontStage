import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../css/productItem.style';

const image = { uri: "https://docs.expo.dev/static/images/tutorial/background-image.png" };

const ProductItem = ({ navigation, product }) => {
    // console.log(product.product.images[0].imageUrl);
    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <TouchableOpacity style={styles.wrapper}>
                    <ImageBackground source={{ uri: product.product.images[0].imageUrl }} style={styles.image}>
                        <Text style={styles.text}>{product.product.price}VND</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </GestureHandlerRootView>
        </View>
    );
}

export default ProductItem;
