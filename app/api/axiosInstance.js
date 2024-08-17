
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({


    baseURL: 'http://192.168.1.8:8080/api/v1/', // replace with your API base URL




    // headers: {
    //     'Content-Type': 'application/json',
    // }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        if (originalConfig.baseURL !== "/auth/login" && err.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const response = await instance.post("/auth/refresh-token", {
                        refreshToken: AsyncStorage.getItem('token')
                    });

                    const { accessToken } = response.data;
                    AsyncStorage.setItem('token', accessToken);

                    return instance(originalConfig);
                } catch (error) {
                    return Promise.reject(error);
                }
            }

        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
