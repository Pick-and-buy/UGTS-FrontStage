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
import styles from "../../screens/css/homeHeader.style"


const Header = ({ navigation }) => {

    const [listUser, setListUser] = useState([]);

    return (
        <View style={styles.container}>
            {/* Search */}
            <View style={styles.options}>
                <View style={styles.search}>
                    <FontAwesome
                        name="search"
                        size={20}
                        color="#AFAFAE"
                    // style={{marginLeft:8}}
                    />
                    <TextInput
                        placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
                        placeholderTextColor="#AFAFAE"
                    />
                </View>
                <View style={styles.option}>
                    <View style={styles.optionItem}>
                        <Ionicons
                            onPress={() => console.warn('Thông báo')}
                            name="notifications"
                            size={24}
                            color="#AFAFAE" />
                    </View>
                    <View style={styles.optionItem}>
                        <Ionicons
                            onPress={() => navigation.navigate('todo-task')}
                            name="checkmark"
                            size={24}
                            color="#AFAFAE" />
                    </View>
                </View>
            </View>

            {/* Navigate */}
            {/* <View style={styles.navContainer}>
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
            </View> */}

        </View>

    );
}

export default Header;



