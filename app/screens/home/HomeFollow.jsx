import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import Carousel from "pinar";
import Slider from './Slider';
import Brands from './Brands';
import ProductList from './ProductList';

const HomeFollow = () => {

    return (
        <View>
            <Slider />
            <View style={styles.container}>
                <Brands />
                <ProductList />
            </View>

        </View>
    );
}


export default HomeFollow;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginRight: 20
    },

})

