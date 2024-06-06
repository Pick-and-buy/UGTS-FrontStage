import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    Pressable,
} from "react-native";
import { MaterialCommunityIcons, Ionicons, Feather, Entypo } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PosterProduct from "./PosterProduct";
import PosterPost from "./PosterPost";
import BottomTab from "../../navigation/BottomTab";
const Tab = createMaterialTopTabNavigator();

const PosterInformation = () => {

    const navigation = useNavigation();

    //Lấy props khi onPress
    const item = useRoute().params.posterDetail;

    useEffect(() => {
        console.log("check post <PostDetail>: ", item);
        // brand && getProductByBrand();
    }, [item])

    return (
        <View>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        name="chevron-back-outline"
                        size={35}
                        color={COLORS.primary} />
                    <Feather
                        onPress={() => console.warn('More Function')}
                        name="more-horizontal"
                        size={35}
                        color="black" />

                </View>

                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Personal Information */}
                <View style={styles.personalContainer}>
                    <View style={[styles.detailContainer, { alignItems: 'flex-start' }]}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: item?.avatar }}
                        />
                        <View style={{ gap: 5 }}>
                            <Text style={{ fontSize: 18 }}>
                                {item.name}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo name="star" size={24} color="#FEEA3B" />
                                    <Entypo name="star" size={24} color="#FEEA3B" />
                                    <Entypo name="star" size={24} color="#FEEA3B" />
                                    <Entypo name="star" size={24} color="#FEEA3B" />
                                    <Entypo name="star" size={24} color="#FEEA3B" />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 18 }}>(1234)</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <MaterialCommunityIcons name="shield-check" size={24} color="blue" />
                                <View style={{ marginLeft: 5, justifyContent: 'center' }}>
                                    <Text>
                                        Tài khoản được xác minh
                                    </Text>
                                </View>

                            </View>
                        </View>
                    </View>

                </View>

                {/* Follower */}
                <View style={styles.followerView}>
                    <Text>
                        100 <Text>người theo dõi</Text>
                    </Text>
                    <Text>
                        60 <Text>người đang theo dõi</Text>
                    </Text>
                    <TouchableOpacity
                        onPress={() => console.warn('Theo dõi')}
                        style={styles.followBtn}
                    >
                        <Text style={{ margin: 5, color: 'red' }}>Theo dõi</Text>
                    </TouchableOpacity>
                </View>

                {/* Navigate */}
                <View style={styles.navContainer}>
                    <Tab.Navigator
                        initialRouteName="product"
                        activeColor={COLORS.primary}
                        tabBarHideKeyBoard={true}
                        headerShown={false}
                        inactiveColor={COLORS.secondary}
                    >
                        <Tab.Screen
                            name="product"
                            component={PosterProduct}
                            options={{
                                tabBarStyle: styles.tabBarStyle,
                                tabBarShowLabel: false,
                                headerShown: false,
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ width: 100, marginLeft: -25 }}>
                                        <Text style={focused ? styles.tabActive : styles.tab}>
                                            Sản Phẩm
                                        </Text>
                                    </View>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="post"
                            component={PosterPost}
                            options={{
                                tabBarStyle: styles.tabBarStyle,
                                tabBarShowLabel: false,
                                headerShown: false,
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ width: 100, marginLeft: -25 }}>
                                        <Text style={focused ? styles.tabActive : styles.tab}>
                                            Bài Đăng
                                        </Text>
                                    </View>
                                ),
                            }}
                        />
                    </Tab.Navigator>
                </View>

            </View>
        </View>
    );
}

export default PosterInformation;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: COLORS.lightWhite
    },

    //Header
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 15
    },

    //Space
    shadow: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#D3D3D3',
        width: Dimensions.get('window').width,
    },

    // Personal Information
    personalContainer: {
        marginVertical: 5,
        marginHorizontal: 15,
        marginTop: 15,
    },

    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: 99,
    },

    //Follower
    followerView: {
        flexDirection: 'row',
        gap: 20,
        marginHorizontal: 15,
        marginTop: 10
    },
    followBtn: {
        borderWidth: 1,
        marginTop: -5,
        borderColor: 'red',
        borderRadius: 5
    },

    //Navigate
    navContainer: {
        width: "100%",
        height: 600,
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

