import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = async (userData) => {
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

export const sendOtp = async (email) => {
    try {
        const response = await axiosInstance.post('/otp/send', { email });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verifyOtp = async (email, otpCode) => {
    try {
        const response = await axiosInstance.post('/otp/verify', { email, otpCode });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const resetPassword = async (email, password, confirmPassword) => {
    try {
        const response = await axiosInstance.post('/auth/forgot-password', { email, password, confirmPassword });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const changePassword = async (userId, oldPassword, newPassword) => {
    try {
        const response = await axiosInstance.post(`/auth/change-password/${userId}`, { oldPassword, newPassword });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const sendOtpToSMS = async (phoneNumber) => {
    try {
        const response = await axiosInstance.post('/otp/send-sms-otp', {
            phoneNumber: phoneNumber
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verifyOtpFromSMS = async (phoneNumber, otpCode) => {
    try {
        const response = await axiosInstance.post('/otp/verify-sms-otp', { otpCode: otpCode, phoneNumber: phoneNumber });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};