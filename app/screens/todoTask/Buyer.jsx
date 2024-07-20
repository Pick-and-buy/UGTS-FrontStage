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
import styles from "../css/buyer.style";
const Buyer = ({navigation}) => {
    
    const data = [
        { id: '1', title: 'Sneaker NIKE AIR', shop: 'Sneaker Shop', price: '$35', status: 'Process', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
        { id: '2', title: 'ADIDAS For Men', shop: 'Adidas Shop', price: '$35', status: 'Process', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
        { id: '3', title: 'Spacy fresh crab', shop: 'Waroenk kita', price: '$35', status: 'Process', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate("buyer-order-details")}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.shop}>{item.shop}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
            <View style={styles.statusButton}>
                <Text style={styles.statusText}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Buyer