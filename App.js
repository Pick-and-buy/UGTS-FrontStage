import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import BottomTab from './app/navigation/BottomTab';
import RegisterInformation from './app/screens/register/RegisterInformation';
import Login from './app/screens/Login';
import Register from './app/screens/register/Register';
import PaymentMethod from './app/screens/PaymentMethod';
import UploadPhoto from './app/screens/UploadPhoto';
const Stack = createNativeStackNavigator();
export default function App() {

  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='bottom-navigation'
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='register-navigation'
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='register-infor-navigation'
          component={RegisterInformation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='upload-photo-navigation'
          component={UploadPhoto}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='payment-method-navigation'
          component={PaymentMethod}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='login-navigation'
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
