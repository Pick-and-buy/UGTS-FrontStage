import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createPayment = async (amount) => {
    try {
      const response = await axiosInstance.post(`/vnpay/create-payment?amount=${amount}&orderInfo=pay for order`);
      return response;
    } catch (error) {
      console.error('Error create payment:', error);
      throw error;
    }
  }