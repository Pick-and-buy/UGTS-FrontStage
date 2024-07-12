import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome6, SimpleLineIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../css/addressLists.style';
import { getUserByToken } from "../../api/user";

const AddressLists = ({ navigation, route }) => {
    const [user, setUser] = useState(null);
    const [addresses, setAddress] = useState(null);

    const fetchUserData = async () => {
        try {
            const userData = await getUserByToken();
            setUser(userData);
            setAddress(userData?.result.address);
        } catch (error) {
            console.error('Fetching user data failed in address lists:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [])
    );

    const maskPhoneNumber = (phoneNumber, regionCode) => {
        if (!phoneNumber) return '';
        const visibleDigits = phoneNumber.slice(0, 2) + '******' + phoneNumber.slice(-2);
        return `(${regionCode}) ${visibleDigits}`;
    };

    const AddressItem = ({ item }) => (
        <View style={styles.addressItem}>
            <View style={styles.addressHeader}>
                <Text style={styles.addressName}>{user?.result?.firstName} {user?.result?.lastName}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("update-address", { user, addressId: item?.id })}>
                    <Text style={styles.editText}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.addressPhone}>
                {maskPhoneNumber(user?.result?.phoneNumber, '+84')}
            </Text>
            <Text style={styles.addressDetails}>
                {item.addressLine}
                ,{item.street}
                ,{item.district}
                ,{item.province}
                ,{item.country}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Feather
                    style={{ marginLeft: 10 }}
                    name="chevron-left" size={30} color={COLORS.primary} onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>
                    Địa chỉ của bạn
                </Text>
            </View>
            <View style={styles.addAddressContainer}>
                <TouchableOpacity style={styles.addAddress} onPress={() => navigation.navigate("create-address", user)}>
                    <View style={styles.addAddressLeft}>
                        <AntDesign name="plus" size={20} color="gray" />
                        <Text style={{ fontSize: 16, marginLeft: 6 }}>Thêm địa chỉ</Text>
                    </View>
                    <FontAwesome6 name="angle-right" size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <FlatList
                data={addresses}
                renderItem={({ item }) => <AddressItem item={item} />}
                keyExtractor={(item) => item.id}
                estimatedItemSize={100}
            />
        </SafeAreaView>
    );
}

export default AddressLists;
