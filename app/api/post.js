import axiosInstance from './axiosInstance';

export const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts');
    return response;
  } catch (error) {
    console.error('Error Get All Posts:', error);
    throw error;
  }
}

// export const callFetchListPost = () => {
//     return axiosInstance.get('/posts');
// }

export const callFetchPostDetails = (id) => {
  return axiosInstance.get(`/posts/${id}`)
}

export const callFetchPostByBrandName = (query) => {
  return axiosInstance.get(`/posts/brands?${query}`)
}