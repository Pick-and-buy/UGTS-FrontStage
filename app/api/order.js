import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance';


export const order = async (paymentMethod, addressId, deliveryDate, receivedDate, postId) => {
    try {
        const response = await axiosInstance.post(`/orders`, {
            paymentMethod: paymentMethod,
            address: {
                id: addressId
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

export const updateOrderBuyer = async (orderInfo, selectedAddress) => {
    try {

        const response = await axiosInstance.put(`/orders/details?orderId=${orderInfo.id}`, {
            orderStatus: orderInfo?.orderDetails?.status,
            firstName: orderInfo?.orderDetails?.firstName,
            lastName: orderInfo?.orderDetails?.lastName,
            email: orderInfo?.orderDetails?.email,
            phoneNumber: orderInfo?.orderDetails?.phoneNumber,
            address: {
                street: selectedAddress?.street,
                district: selectedAddress?.district,
                province: selectedAddress?.province,
                country: selectedAddress?.country,
                addressLine: selectedAddress?.addressLine
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error update order:', error);
        throw error;
    }
};

export const cancelOrderBuyer = async (orderInfo, selectedAddress) => {
    try {

        const response = await axiosInstance.put(`/orders/details?orderId=${orderInfo.id}`, {
            orderStatus: "CANCELLED",
            firstName: orderInfo?.orderDetails?.firstName,
            lastName: orderInfo?.orderDetails?.lastName,
            email: orderInfo?.orderDetails?.email,
            phoneNumber: orderInfo?.orderDetails?.phoneNumber,
            address: {
                street: selectedAddress?.street,
                district: selectedAddress?.district,
                province: selectedAddress?.province,
                country: selectedAddress?.country,
                addressLine: selectedAddress?.addressLine
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error cancel order:', error);
        throw error;
    }
};

export const callFetchListOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching List Orders:', error);
        throw error;
    }
  }

  export const getOrderByOrderId = async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/details?orderId=${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Order By OrderId: ', error);
        throw error;
    }
  }