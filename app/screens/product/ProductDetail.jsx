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
import { FontAwesome, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";

const ProductDetail = (props) => {

    //Truyền props businessList sang bên detail

    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.heading}>Product Detail</Text>
                <Text>View All</Text>
            </View>
        </View>
    );
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: 20,
        marginBottom: 10,
    },
})

