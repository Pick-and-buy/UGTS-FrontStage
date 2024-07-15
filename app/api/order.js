import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance';


export const order = async (paymentMethod,addressId,deliveryDate,receivedDate,postId) => {
    try {
        const response = await axiosInstance.post(`/orders`, {
            paymentMethod: paymentMethod,
            address: {
                id:addressId
            },
            packageDate: new Date(),
            deliveryDate: deliveryDate,
            receivedDate: receivedDate,
            post: {
                id: postId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error order:', error);
        throw error;
    }
};