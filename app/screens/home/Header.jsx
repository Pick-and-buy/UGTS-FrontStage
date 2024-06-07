import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    SafeAreaView,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { useNavigation } from '@react-navigation/native';
import HomeFollow from "./HomeFollow";
import HomeExplore from "./HomeExplore";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

const Header = () => {

    const [listUser, setListUser] = useState([]);
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            {/* Search */}
            <View style={styles.searchContainer}>
                <View style={[styles.search, { backgroundColor: '#EFEFEF', borderRadius: 5, width: '75%' }]}>
                    <Ionicons
                        name="search-outline"
                        size={24}
                        color="#656565" />
                    <TextInput
                        style={{ paddingRight: 15 }}
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
                            onPress={() => navigation.navigate('todo-task')}
                            name="checkmark"
                            size={24}
                            color="#828282" />
                    </View>
                </View>
            </View>

            {/* Navigate */}
            <View style={styles.navContainer}>
                <Tab.Navigator
                    initialRouteName="follow"
                    activeColor={COLORS.primary}
                    tabBarHideKeyBoard={true}
                    headerShown={false}
                    inactiveColor={COLORS.secondary}
                >
                    <Tab.Screen
                        name="follow"
                        component={HomeFollow}
                        options={{
                            tabBarStyle: styles.tabBarStyle,
                            tabBarShowLabel: false,
                            headerShown: false,
                            tabBarIcon: ({ focused }) => (
                                <View style={{ width: 100, marginLeft: -30 }}>
                                    <Text style={focused ? styles.tabActive : styles.tab}>
                                        Theo Dõi
                                    </Text>
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="explore"
                        component={HomeExplore}
                        options={{
                            tabBarStyle: styles.tabBarStyle,
                            tabBarShowLabel: false,
                            headerShown: false,
                            tabBarIcon: ({ focused }) => (
                                <View style={{ width: 100, marginLeft: -30 }}>
                                    <Text style={focused ? styles.tabActive : styles.tab}>
                                        Khám Phá
                                    </Text>
                                </View>
                            ),
                        }}
                    />
                </Tab.Navigator>
            </View>

        </ScrollView>

    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 10,
        marginBottom: 20,
        backgroundColor: COLORS.lightWhite
    },
    //Search
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

    //Navigate
    navContainer: {
        marginTop: 15,
        width: Dimensions.get('window').width,
        height: 1500,
    },
    tabBarStyle: {
        marginTop: 10,
        width: "100%",
        elevation: 0, // This will remove the shadow on Android
        shadowOpacity: 0, // This will remove the shadow on iOS
    },
    tabActive: {
        fontSize: 18,
        fontFamily: 'bold',
        color: 'red',
    },
    tab: {
        fontSize: 18,
        fontFamily: 'bold',
        color: 'black',
    },


})

