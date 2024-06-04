import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,

} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";

const HomeExplore = () => {
    return (
        <View style={styles.container}>
            <Text>
                Khám Phá
            </Text>
        </View>
    );
}


export default HomeExplore;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'red',
        width: '100%',
        height: 50,
        marginTop: 20
    },
})

