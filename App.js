import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import BottomTab from './app/navigation/BottomTab';
import RegisterInformation from './app/screens/register/RegisterInformation';
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
import { LoginContext, LoginProvider } from './app/context/LoginContext';
import ChangePassword from './app/screens/change password/ChangePassword';
import UpdateProfile from './app/screens/profile/UpdateProfile';
import News from './app/screens/news/News';
import Slider from './app/screens/home/Slider';
import Search from './app/screens/Search';
import SellerProfile from './app/screens/profile/SellerProfile';
import UserProfile from './app/screens/profile/UserProfile';
import ListBrands from './app/screens/brand/ListBrands';
import ListsPostOfBrandLine from './app/screens/brand/ListsPostOfBrandLine';
import OrderDetails from './app/screens/payment/OrderDetails';
import AddressLists from './app/screens/address/AddressLists';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import UpdateAddress from './app/screens/address/UpdateAddress';
import TodoTask from './app/screens/todoTask/TodoTask';
import CreateAddress from './app/screens/address/CreateAddress';
import OrderSuccessfully from './app/screens/payment/OrderSuccessfully';
import CancelSuccessfully from './app/screens/payment/CancelSuccessfully';
import BuyerOrderDetails from './app/screens/payment/BuyerOrderDetails';
import UpdatePost from './app/screens/post/UpdatePost';
import PostsOfFollowedUser from './app/screens/post/PostsOfFollowedUser';
import GetIDScreen from './app/screens/verify/Onboarding/GetIDScreen';
import TakeSelfieScreen from './app/screens/verify/Onboarding/TakeSelfieScreen';
import ScanIDScreen from './app/screens/verify/Onboarding/ScanIDScreen';
import FaceMatch from './app/screens/verify/FaceMatch';
import ScanBackIDScreen from './app/screens/verify/ScanBackIDScreen';
import ScanFontIDScreen from './app/screens/verify/ScanFontIDScreen';
import AddRating from './app/screens/payment/AddRating';

import Notification from './app/screens/notification/Notification';
import { NotificationProvider } from './app/context/NotificationContext';

import { UserProvider } from './app/context/UserContext';
import SellerOrderDetails from './app/screens/payment/SellerOrderDetails';


import { AuthProvider } from './app/context/AuthContext';
import OrderTracking from './app/screens/payment/OrderTracking';
import Following from './app/screens/profile/Following';
import Followers from './app/screens/profile/Followers';
import Appreciation from './app/screens/profile/Appreciation';
import Summary from './app/screens/profile/Summary';
import CreatePostGuide from './app/screens/post/CreatePostGuide';

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <NotificationProvider>
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
                  name='post-details'
                  component={PostDetail}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='poster-information'
                  component={PosterInformation}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name='user-profile-details'
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
                  component={ListBrands}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='news-navigation'
                  component={News}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='post-of-followed-user'
                  component={PostsOfFollowedUser}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='slider-navigation'
                  component={Slider}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='search-navigation'
                  component={Search}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='seller-profile-navigation'
                  component={SellerProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='lists-post-brand-line'
                  component={ListsPostOfBrandLine}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='order-details'
                  component={OrderDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='order-successfully'
                  component={OrderSuccessfully}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='buyer-order-details'
                  component={BuyerOrderDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='address-lists'
                  component={AddressLists}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='create-address'
                  component={CreateAddress}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='update-address'
                  component={UpdateAddress}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="GetID"
                  component={GetIDScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TakeSelfie"
                  component={TakeSelfieScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ScanID"
                  component={ScanIDScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ScanBackID"
                  component={ScanBackIDScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ScanFontID"
                  component={ScanFontIDScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="FaceMatch"
                  component={FaceMatch}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="notification"
                  component={Notification}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="cancel-successfully"
                  component={CancelSuccessfully}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="update-post"
                  component={UpdatePost}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='seller-order-details'
                  component={SellerOrderDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='order-tracking'
                  component={OrderTracking}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='summary'
                  component={Summary}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='start-rating'
                  component={AddRating}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='following'
                  component={Following}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='followers'
                  component={Followers}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='appreciation'
                  component={Appreciation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='create-post-guide'
                  component={CreatePostGuide}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </NotificationProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    )


  );
}
