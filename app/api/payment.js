import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createPayment = async (amount) => {
    try {
        const response = await axiosInstance.post(`/vnpay/create-payment?amount=${amount}&orderInfo=Nap tien vao vi`);
        return response;
    } catch (error) {
        console.log('Error create payment:', error);
        throw error;
    }
}

export const getPaymentStatus = async (url) => {
    try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        console.log(token);

        // Define the URL with the amount parameter
        // const url = `http://10.0.2.2:8080/api/v1/vnpay/payment-info?${url}`;

        // Perform the fetch request
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Error creating payment');
        }

        // Parse and return the response
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error creating payment:', error);
        throw error;
    }
};

export const charge = async (walletId, amount) => {
    try {
        const response = await axiosInstance.post(`/wallets/charge?walletId=${walletId}&amount=${amount}`);
        return response;
    } catch (error) {
        console.log('Error charge payment:', error);
        throw error;
    }
}

export const payOrder = async (walletId, orderId, amount) => {
    try {
        const response = await axiosInstance.put(`/wallets/pay-order?walletId=${walletId}&orderId=${orderId}&payAmount=${amount}`);
        return response.data;
    } catch (error) {
        console.log('Error order payment:', error);
        throw error;
    }
}

export const getTransactionHistory = async () => {
    try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');

        // Perform the fetch request
        const response = await fetch('http://192.168.1.8:8080/api/v1/wallets/transaction-histories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Error get transaction history');
        }

        // Parse and return the response
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error creating payment:', error);
        throw error;
    }
}