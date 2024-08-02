import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from '../../constants/theme';
import Following from './Following';
import Followers from './Followers';
import Appreciation from './Appreciation';
import styles from "../../screens/css/userTab.style";
import { getListsFollowers, getListsFollowing, getRatingByUserId } from '../../api/user';

const Tab = createMaterialTopTabNavigator();

const UserTab = ({ user }) => {
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    // console.log(followersCount);

    useEffect(() => {
        fetchFollowersCount();
        fetchFollowingCount();
        fetchRatingsCount();
    }, [user]);

    const fetchRatingsCount = async () => {
        try {
            const response = await getRatingByUserId(user.id);
            setRatingCount(response.result.length);
        } catch (error) {
            console.error('Error fetching followers count in user tab', error);
        }
    };

    const fetchFollowersCount = async () => {
        try {
            const response = await getListsFollowers(user.id);
            setFollowersCount(response.result.length);
        } catch (error) {
            console.error('Error fetching followers count in user tab', error);
        }
    };

    const fetchFollowingCount = async () => {
        try {
            const response = await getListsFollowing(user.id);
            setFollowingCount(response.result.length);
        } catch (error) {
            console.error('Error fetching following count in user tab', error);
        }
    };

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
                        <View style={{ width: 110, marginLeft: -40 }}>
                            <Text style={focused ? styles.tabActive : styles.tab}>
                                Đang theo dõi {followingCount}
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
                        <View style={{ width: 110, marginLeft: -40 }}>
                            <Text style={focused ? styles.tabActive : styles.tab}>
                                Người theo dõi {followersCount}
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
                        <View style={{ width: 100, marginLeft: -25 }}>
                            <Text style={focused ? styles.tabActive : styles.tab}>
                                Đánh giá {ratingCount}
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default UserTab;
