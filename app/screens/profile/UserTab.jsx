import { View, Text } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from '../../constants/theme';
import Following from './Following';
import Followers from './Followers';
import Appreciation from './Appreciation';
import styles from "../../screens/css/userTab.style";

const Tab = createMaterialTopTabNavigator();

const UserTab = ({ user }) => {
    return (
        <Tab.Navigator
            initialRouteName="following"
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
                name="following"
                component={Following}
                initialParams={{ user }}
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
            <Tab.Screen
                name="follower"
                component={Followers}
                initialParams={{ user }}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ width: 100, marginLeft: -30 }}>
                            <Text style={focused ? styles.tabActive : styles.tab}>
                                Người theo dõi
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="appreciation"
                component={Appreciation}
                initialParams={{ user }}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ width: 100, marginLeft: -30 }}>
                            <Text style={focused ? styles.tabActive : styles.tab}>
                                Đánh giá
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default UserTab;
