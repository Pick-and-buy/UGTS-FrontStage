import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import { COLORS } from "../constants/theme";
import Profile from "../screens/Profile";
import Register from "../screens/register/register.jsx";
import RegisterInformation from "../screens/register/registerInormation.jsx";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: COLORS.primary,
  borderTopWidth: 0,
  elevation: 0, // This will remove the shadow on Android
  shadowOpacity: 0, // This will remove the shadow on iOS
};

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
      activeColor={COLORS.secondary}
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search" : "search"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name={focused ? "closecircle" : "closecircleo"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
