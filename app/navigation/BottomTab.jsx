import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import { COLORS } from "../constants/theme";
import Register from "../screens/register/Register";
import Onboarding from "../components/Onboarding";
import CreatePost from "../screens/CreatePost";
import Favourite from "../screens/Favourite";
import styles from "./BottomTab.style";
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  // const {count, isCartLoading, error, refetch} =fetchCartCount();

  // const { cartCount, setCartCount } = useContext(CartCountContext);
  // const {login, setLogin} = useContext(LoginContext)

  // if(isCartLoading){
  //   setCartCount(count)
  // }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.primary}
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor={COLORS.secondary}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
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
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.tabActive : styles.tab}>
              <Ionicons
                name={focused ? "search" : "search"}
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
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.tabActive : styles.tab}>
              <Ionicons
                name={focused ? "camera" : "camera-outline"}
                color={focused ? COLORS.primary : COLORS.secondary}
                size={26} />
              <Text>Đăng bài</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="favourite"
        component={Favourite}
        options={{
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.tabActive : styles.tab}>
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                color={focused ? COLORS.primary : COLORS.secondary}
                size={26} />
              <Text>Yêu thích</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.tabActive : styles.tab}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={focused ? COLORS.primary : COLORS.secondary}
                size={26} />
              <Text>Tôi</Text>
            </View>
          ),
        }}
      />


    </Tab.Navigator>
  );
};

export default BottomTab;
