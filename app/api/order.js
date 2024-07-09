import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance';


export const order = async () => {
    try {
        const response = await axiosInstance.post(`/orders`, {
            paymentMethod: "credit card",
            packageDate: "2022-01-01T00:00:00Z",
            deliveryDate: "2022-01-02T00:00:00Z",
            receivedDate: "2022-01-03T00:00:00Z",
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