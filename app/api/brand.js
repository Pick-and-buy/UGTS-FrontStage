import axiosInstance from './axiosInstance';

// export const callFetchListBrands = async () => {
//   try {
//     const response = await axiosInstance.get('/brands');
//     return response;
//   } catch (error) {
//     console.error('Error fetching List Brands:', error);
//       throw error;
//   }
// }

export const callFetchListBrands = () => {
  return axiosInstance.get('/brands');
}