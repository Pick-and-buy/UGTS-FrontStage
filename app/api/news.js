import axiosInstance from './axiosInstance';


export const getAllNews = async () => {
    try {
        const response = axiosInstance.get('/news');
        return response;
    } catch (error) {
        logger.error('Error Get All News:', error);
        throw error;
    }
}
export const getNewsById = async (id) => {
    try {
        const response = axiosInstance.get(`/news/${id}`);
        return response;
    } catch (error) {
        logger.error('Error Get All News:', error);
        throw error;
    }
}

