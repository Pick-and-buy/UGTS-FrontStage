import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts');
    return response;
  } catch (error) {
    console.error('Error Get All Posts:', error);
    throw error;
  }
}

export const getPostDetails = async (id) => {
  try {
    const response = axiosInstance.get(`/posts/${id}`)
    return response;
  } catch (error) {
    console.error('Error Get Post Details:', error);
    throw error;
  }
}


export const getComments = async (id) => {
  try {
    const response = axiosInstance.get(`/comments/${id}`)
    return response;
  } catch (error) {
    console.error('Error Get Post Details:', error);
    throw error;
  }
}

export const callFetchPostByBrandName = (query) => {
  return axiosInstance.get(`/posts/brands?${query}`)
}

export const createPost = async (formData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post('/posts', formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error('Error Create Post:', error);
    throw error;
  }
}