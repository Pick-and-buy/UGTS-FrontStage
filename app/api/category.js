import axiosInstance from './axiosInstance';

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get('/brand-lines/categories');
    return response;
  } catch (error) {
    console.log('Error Get All Category:', error);
    throw error;
  }
}

export const getAllCategoriesByBrandLineName = async (query) => {
  try {
    const response = await axiosInstance.get(`brand-lines/categories/line-name?${query}`);
    return response;
  } catch (error) {
    console.log('Error Get All Category:', error);
    throw error;
  }
}