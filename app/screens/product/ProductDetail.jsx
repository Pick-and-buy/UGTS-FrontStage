import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";

const ProductDetail = () => {

    //Lấy props khi onPress
    const product = useRoute().params.product;

    const navigation = useNavigation();

    useEffect(() => {
        console.log("check product <ProductDetail>: ", product);
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="chevron-back-outline"
                    size={35}
                    color={COLORS.primary} />
                <Text style={styles.textName}>
                    {product.category}
                </Text>
            </View>
        </View>
    );
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 20,
        padding: 20,
        paddingTop: 40
    },
    textName: {
        fontSize: 25,
        fontFamily: 'bold',
        color: COLORS.black,
        textAlign: 'center',
        paddingLeft: 85
    },
})

