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
    const response = axiosInstance.get(`/comments/${id}`);
    return response;
  } catch (error) {
    logger.error('Error Get Comments:', error);
    throw error;
  }
}

export const postComment = async (userId, postId, commentContent) => {
  // console.log(userId, postId, commentContent);
  try {
    const response = axiosInstance.post("/comments", {
      userId: userId,
      postId: postId,
      commentContent: commentContent
    })
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
    const token = await getAuthToken();
    const response = await fetch('http://10.0.2.2:8080/api/v1/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    });
    return response;
  } catch (error) {
    console.error('Error Create Post:', error);
  }
}

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error("Error retrieving token: ", error);
  }
};

export const searchPostsByTitle = async (title) => {
  try {
    const response = axiosInstance.get(`/posts/search/${title}`);
    return response;
  } catch (error) {
    logger.error('Error Get Posts by title:', error);
    throw error;
  }
}

export const getPostsByUserId = async (id) => {
  try {
    const response = axiosInstance.get(`/posts/user?id=${id}`);
    return response;
  } catch (error) {
    logger.error('Error Get PosComments:', error);
    throw error;
  }
}