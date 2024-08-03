import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../constants/theme";
import HomeFollow from '../screens/home/HomeFollow';
import Buyer from '../screens/todoTask/Buyer';
import Seller from '../screens/todoTask/Seller';
import styles from "./TodoTaskTab.style";

const Tab = createMaterialTopTabNavigator();

const TodoTaskTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="buyer"
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
                name="buyer"
                component={Buyer}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ width: 100, marginLeft: -30 }}>
                            <Text style={focused ? styles.tabActive : styles.tab}>
                                Danh mục mua
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="seller"
                component={Seller}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ width: 100, marginLeft: -30 }}>
                            <Text style={focused ? styles.tabActive : styles.tab}>
                                Danh mục bán
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default TodoTaskTab;
