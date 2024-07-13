import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../constants/theme";
import HomeFollow from '../screens/home/HomeFollow';
import HomeExplore from '../screens/home/HomeExplore';
import styles from "./HomeTab.style";

const Tab = createMaterialTopTabNavigator();

const HomeTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="explore"
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.secondary,
                tabBarIndicatorStyle: {
                    backgroundColor: COLORS.primary
                },
                tabBarStyle: styles.tabBarStyle,
                tabBarShowLabel: false,
            }}
            style={styles.container}
        >
            <Tab.Screen
                name="explore"
                component={HomeExplore}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ width: 100, marginLeft: -30 }}>
                            <Text style={focused ? styles.tabActive : styles.tab}>
                                Dành Cho Bạn
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="follow"
                component={HomeFollow}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ width: 100, marginLeft: -30 }}>
                            <Text style={focused ? styles.tabActive : styles.tab}>
                                Đang theo dõi
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default HomeTab;
