import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance';


export const order = async (paymentMethod, addressId, deliveryDate, receivedDate, postId, shippingCost) => {
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
            },
            shippingCost: shippingCost,
        });
        return response.data;
    } catch (error) {
        console.log('Error order:', error);
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
            },
            post: {
                id: orderInfo?.post?.id
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error update order:', error);
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
            },
            post: {
                id: orderInfo?.post?.id
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error cancel order:', error);
        throw error;
    }
};

export const callFetchListOrders = async () => {
    try {
        const response = await axiosInstance.get('/orders');
        return response.data;
    } catch (error) {
        console.log('Error fetching List Orders:', error);
        throw error;
    }
}

export const getOrderByOrderId = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/orders/details?orderId=${orderId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching Order By OrderId: ', error);
        throw error;
    }
}

export const getOrdersByOrderStatus = async (orderStatus) => {
    try {
        const response = await axiosInstance.get(`/orders/status?orderStatus=${orderStatus}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching Orders By Order Status: ', error);
        throw error;
    }
}

export const cancelOrderSeller = async (orderId) => {
    try {

        const response = await axiosInstance.put(`/orders?orderId=${orderId}`, {
            orderStatus: "CANCELLED",
        });
        return response.data;
    } catch (error) {
        console.log('Error cancel order:', error);
        throw error;
    }
};

export const updateOrderSeller = async (orderId) => {
    try {

        const response = await axiosInstance.put(`/orders?orderId=${orderId}`, {
            orderStatus: "PROCESSING",
        });
        return response.data;
    } catch (error) {
        console.log('Error update order:', error);
        throw error;
    }
};

export const uploadReceivePackageVideoByBuyer = async (orderId, formData) => {
    try {
        const token = await getAuthToken();
        const response = await fetch(`http://192.168.1.10:8080/api/v1/orders/package-video?orderId=${orderId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
        });
        return response;
    } catch (error) {
        console.log('Error Update Receive Package Video:', error);
        throw error;
    }
};

export const uploadPackageVideoBySeller = async (orderId, formData) => {
    try {
        const token = await getAuthToken();
        const response = await fetch(`http://192.168.1.10:8080/api/v1/orders/package-video?orderId=${orderId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
        });
        return response;
    } catch (error) {
        console.log('Error Update Receive Package Video:', error);
        throw error;
    }
};

const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.log("Error retrieving token: ", error);
    }
};