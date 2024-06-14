
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'http://10.0.2.2:8080/api/v1/', // replace with your API base URL
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
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const token = await AsyncStorage.getItem('token');
            const response = await axiosInstance.post('/auth/refresh-token', { token: token });
            const { refreshToken } = response.data;
            await AsyncStorage.setItem('refreshToken', refreshToken);
            axiosInstance.defaults.headers.Authorization = `Bearer ${refreshToken}`;
            originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const axiosInstance = axios.create({
//     baseURL: 'http://10.0.2.2:8080/api/v1/', // replace with your API base URL
// });

// axiosInstance.interceptors.request.use(
//     async (config) => {
//         const token = await AsyncStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const refreshToken = await AsyncStorage.getItem('refreshToken');
//             const response = await axiosInstance.post('/auth/refresh-token', { token: refreshToken });
//             const { token } = response.data;
//             await AsyncStorage.setItem('token', token);
//             axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return axiosInstance(originalRequest);
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;
