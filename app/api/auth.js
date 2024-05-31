
import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (phoneNumber, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { phoneNumber, password });
    const token = response.data.result.accessToken;
    const refreshToken = response.data.result.accessToken;
    // console.log(token,refreshToken);
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refreshToken');
};
