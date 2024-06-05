
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


export const register = async (userData) => {
  // console.log(userData);
  try {
    const response = await axiosInstance.post('/auth/register', {
      username: userData.username,
      lastName: userData.lastName,
      firstName: userData.firstName,
      password: userData.password,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


// Function to send OTP to email
export const sendOtp = async (email) => {
  try {
    const response = await axiosInstance.post('/otp/send', { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to verify OTP
export const verifyOtp = async (email, otpCode) => {
  try {
    const response = await axiosInstance.post('/otp/verify', { email, otpCode });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to reset password
export const resetPassword = async (email, password, confirmPassword) => {
  try {
    const response = await axiosInstance.post('/auth/forgot-password', { email, password, confirmPassword });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};