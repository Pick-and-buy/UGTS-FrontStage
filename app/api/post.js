import axiosInstance from './axiosInstance';

// export const callFetchListPost = async () => {
//   try {
//     const response = await axiosInstance.get('/posts');
//     return response;
//   } catch (error) {
//     console.error('Error fetching List Post:', error);
//       throw error;
//   }
// }

export const callFetchListPost = () => {
    return axiosInstance.get('/posts');
}

export const callFetchPostDetails = (id) => {
  return axiosInstance.get(`/posts/${id}`)
}

export const callFetchPostByBrandName = (query) => {
  return axiosInstance.get(`/posts/brands?${query}`)
}