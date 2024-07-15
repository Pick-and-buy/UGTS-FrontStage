import axiosInstance from './axiosInstance';

export const getAllBrandLines = async () => {
  try {
    const response = await axiosInstance.get('/brand-lines');
    return response;
  } catch (error) {
    console.error('Error Get All Brand Line:', error);
    throw error;
  }
}

export const getAllBrandLinesByBrandName = async (query) => {
  try {
    const response = await axiosInstance.get(`brand-lines/brand-name?${query}`);
    return response;
  } catch (error) {
    console.error('Error Get All Brand Line By Brand Name:', error);
    throw error;
  }
}