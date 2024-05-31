import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    Pressable,
} from "react-native";
import { MaterialCommunityIcons, Ionicons, Feather, Entypo } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";

const PosterProduct = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={{textAlign: 'center'}}>Product</Text>
        </ScrollView>
    );
}

export default PosterProduct;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'red',
        marginVertical: 20,
    }
})

