
import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (phoneNumber, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { phoneNumber, password });
    const token = response.data;
    const refreshToken = response.data;
    // console.log(token,refreshToken);
    await AsyncStorage.setItem('token', JSON.stringify(token));
    await AsyncStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refreshToken');
};
