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

const Header = () => {

    const [listUser, setListUser] = useState([]);

    return (
        <View style={styles.container}>
            {/* Search */}
            <View style={styles.searchContainer}>
                <View style={[styles.search, { backgroundColor: '#EFEFEF', borderRadius: 5, width: '75%' }]}>
                    <Ionicons
                        name="search-outline"
                        size={24}
                        color="#656565" />
                    <TextInput
                        keyboardType='default'
                        placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
                    />
                </View>
                <View style={styles.search}>
                    <View style={styles.notification}>
                        <Ionicons
                            onPress={() => console.warn('Thông báo')}
                            name="notifications"
                            size={24}
                            color="#828282" />
                    </View>
                    <View style={styles.notification}>
                        <Ionicons
                            onPress={() => console.warn('Todo List')}
                            name="checkmark"
                            size={24}
                            color="#828282" />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 10,
        marginBottom: 20,
        height: 150,
        backgroundColor: COLORS.lightWhite
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    notification: {
        borderWidth: 1,
        borderRadius: 99,
        backgroundColor: '#E2E2E2',
        borderColor: '#E2E2E2'
    },



    
})

