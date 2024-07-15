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
import styles from "../css/seller.style";

const Seller = () => {
  const data = [
    { id: '1', title: 'Sneaker NIKE AIR', shop: 'Sneaker Shop', price: '$35', status: 'Sắp xếp vận chuyển', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
    { id: '2', title: 'ADIDAS For Men', shop: 'Adidas Shop', price: '$35', status: 'Sắp xếp vận chuyển', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
    { id: '3', title: 'Spacy fresh craba', shop: 'Waroenk kita', price: '$35', status: 'Sắp xếp vận chuyển', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.shop}>{item.shop}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>{"Hủy đơn"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>{item.status}</Text>
        </TouchableOpacity>
      </View>
      </View>

    </View>
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

export default Seller