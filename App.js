import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import BottomTab from './app/navigation/BottomTab';
import RegisterInformation from './app/screens/register/RegisterInformation';
import ProductDetail from './app/screens/brand/ProductDetail';
import BrandDetail from './app/screens/brand/BrandDetail';
import Login from './app/screens/Login';
import Register from './app/screens/register/Register';
import PaymentMethod from './app/screens/PaymentMethod';
import UploadPhoto from './app/screens/UploadPhoto';
import SetLocation from './app/screens/SetLocation';
import Congratulations from './app/screens/Congratulations';
import Home from './app/screens/Home';
import ViaMethodForgotPassword from './app/screens/forgot password/ViaMethodForgotPassword';
import ForgotPasswordInformation from './app/screens/forgot password/ForgotPasswordInformation';
import OTPVerification from './app/screens/forgot password/OTPVerification';
import ResetPassword from './app/screens/forgot password/ResetPassword';
import PostDetail from './app/screens/post/PostDetail';
import Onboarding from './app/components/Onboarding';
import PosterInformation from './app/screens/posterInformation/PosterInformation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './app/screens/Profile';
import UserProfile from './app/screens/profile/UserProfile';
import { LoginContext } from './app/context/LoginContext';
import TodoTask from './app/screens/todoTask/todoTask';
import ChangePassword from './app/screens/change password/ChangePassword';
import UpdateProfile from './app/screens/profile/UpdateProfile';
import ListBrandHomePage from './app/screens/brand/ListBrandHomePage';

const Stack = createNativeStackNavigator();
export default function App() {
  const [login, setLogin] = useState(null);

  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  const checkIsAppFirstLaunched = async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    console.log("checkIsAppFirstLaunched: ", appData);
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem("isAppFirstLaunched", "false");
    } else {
      setIsAppFirstLaunched(false);
    }
  }

  useEffect(() => {
    checkIsAppFirstLaunched();
  }, []);

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
    isAppFirstLaunched !== null && (
      <NavigationContainer>
        <Stack.Navigator>
          {isAppFirstLaunched && <Stack.Screen
            name='onboarding-navigation'
            component={Onboarding}
            options={{ headerShown: false }}
          />}

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
            name='set-location-navigation'
            component={SetLocation}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='payment-method-navigation'
            component={PaymentMethod}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='congrats-navigation'
            component={Congratulations}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='login-navigation'
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='forgot-password-navigation'
            component={ViaMethodForgotPassword}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='info-method-navigation'
            component={ForgotPasswordInformation}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='otp-navigation'
            component={OTPVerification}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='reset-password-navigation'
            component={ResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='home-navigation'
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='profile-navigation'
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='brand-detail'
            component={BrandDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='product-detail'
            component={ProductDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='post-detail'
            component={PostDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='poster-information'
            component={PosterInformation}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='user-profile'
            component={UserProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='change-password'
            component={ChangePassword}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='update-profile'
            component={UpdateProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='todo-task'
            component={TodoTask}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='list-all-brand'
            component={ListBrandHomePage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )


  );
}
