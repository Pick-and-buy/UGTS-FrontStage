import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";
import { LinearGradient } from 'expo-linear-gradient';
import styles from "../css/todoTask.style";


const TodoTask = ({ navigation }) => {

    const data = [
        { id: '1', title: 'Sneaker NIKE AIR', shop: 'Sneaker Shop', price: '$35', status: 'Process', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
        { id: '2', title: 'ADIDAS For Men', shop: 'Adidas Shop', price: '$35', status: 'Process', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
        { id: '3', title: 'Spacy fresh crab', shop: 'Waroenk kita', price: '$35', status: 'Process', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.shop}>{item.shop}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
            <View style={styles.statusButton}>
                <LinearGradient
                    colors={['#53E88B', '#15BE77']}
                    style={styles.gradient}
                >
                    <Text style={styles.statusText}>{item.status}</Text>
                </LinearGradient>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Danh sách việc cần làm</Text>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

export default TodoTask;

