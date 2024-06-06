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

const TodoTask = () => {

    const navigation = useNavigation();

    useEffect(() => {
        // console.log("List product By Brand <ProductListItemByBrand>: ", listItem);
    }, [])
    
    return (
        <View>
            <Text>ok</Text>
        </View>
    );
}

export default TodoTask;

const styles = StyleSheet.create({})

