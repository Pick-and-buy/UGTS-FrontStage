import React from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { Ionicons, Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome6, SimpleLineIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import styles from '../css/addressLists.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
const AddressLists = ({ navigation, route }) => {
    const user = route.params;

    // console.log(user.result);

    // const AddressItem = ({ item }) => (
    //     <View style={styles.addressItem}>
    //         <View style={styles.addressHeader}>
    //             <Text style={styles.addressName}>{item?.address.addressLine1}</Text>
    //             <TouchableOpacity onPress={() => { }}>
    //                 <Text style={styles.editText}>Chỉnh sửa</Text>
    //             </TouchableOpacity>
    //         </View>
    //         <Text style={styles.addressPhone}>{item.phone}</Text>
    //         <Text style={styles.addressDetails}>{item.address}</Text>
    //     </View>
    // );


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
                <TouchableOpacity style={styles.addAddress}>
                    <View style={styles.addAddressLeft}>
                        <AntDesign name="plus" size={20} color="gray" />
                        <Text style={{ fontSize: 16, marginLeft: 6 }}>Thêm địa chỉ</Text>
                    </View>
                    <FontAwesome6 name="angle-right" size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            {/* <FlatList
                data={addresses}
                renderItem={({ item }) => <AddressItem item={item} />}
                keyExtractor={(item) => item.id}
                estimatedItemSize={100}
            /> */}

            <View style={styles.addressItem}>
                <View style={styles.addressHeader}>
                    <Text style={styles.addressName}>{user?.result?.firstName} {user?.result?.lastName}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("update-address")}>
                        <Text style={styles.editText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.addressPhone}>{user?.result?.phoneNumber}</Text>
                <Text style={styles.addressDetails}>
                    {user?.result?.address?.addressLine2}
                    ,{user?.result?.address?.street}
                    ,{user?.result?.address?.district}
                    ,{user?.result?.address?.province}
                    ,{user?.result?.address?.country}
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default AddressLists