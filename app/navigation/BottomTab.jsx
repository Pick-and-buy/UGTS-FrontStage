import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import { COLORS } from "../constants/theme";
import CreatePost from "../screens/CreatePost";
import Favourite from "../screens/Favourite";
import styles from "./BottomTab.style";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.primary}
      tabBarHideOnKeyboard={true}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.tabActive : styles.tab}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? COLORS.primary : COLORS.secondary}
                size={26}
              />
              <Text>Trang chủ</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.tabActive : styles.tab}>
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={focused ? COLORS.primary : COLORS.secondary}
                size={26}
              />
              <Text>Tìm kiếm</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Create-Post"
        component={CreatePost}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.tabActive : styles.tab}>
              <Ionicons
                name={focused ? "camera" : "camera-outline"}
                color={focused ? COLORS.primary : COLORS.secondary}
                size={26}
              />
              <Text>Đăng bài</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.tabActive : styles.tab}>
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                color={focused ? COLORS.primary : COLORS.secondary}
                size={26}
              />
              <Text>Yêu thích</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.tabActive : styles.tab}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={focused ? COLORS.primary : COLORS.secondary}
                size={26}
              />
              <Text>Tôi</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
