import axiosInstance from './axiosInstance';

export const callFetchListBrands = async () => {
  try {
    const response = await axiosInstance.get('/brands');
    return response;
  } catch (error) {
    console.log('Error fetching List Brands:', error);
      throw error;
  }
}

