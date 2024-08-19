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
export const getAllBoostedPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts/boosted-post');
    return response;
  } catch (error) {
    console.error('Error Get All Boosted Posts:', error);
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

export const createPost_Level_1 = async (formData) => {
  try {
    const token = await getAuthToken();


    const response = await fetch('http://192.168.1.9:8080/api/v1/posts/level-1', {


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

export const createPost_Level_2 = async (formData) => {
  try {
    const token = await getAuthToken();

    const response = await fetch('http://192.168.1.9:8080/api/v1/posts/level-2', {

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

export const updatePost = async (id, formData) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`http://192.168.1.9:8080/api/v1/posts/${id}`, {

      method: 'PUT',
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
export const getLikedPostByUser = async (id) => {
  try {
    const response = axiosInstance.get(`/like/liked-posts/${id}`);
    return response;
  } catch (error) {
    logger.error('Error Get Liked Post:', error);
    throw error;
  }
}
export const getPostsByBrandName = async (brandName) => {
  try {
    const response = axiosInstance.get(`/posts/brands?name=${brandName}`);
    return response;
  } catch (error) {
    logger.error('Error Get Posts By Brand Name:', error);
    throw error;
  }
}

export const getPostsByBrandLineName = async (brandLineName) => {
  try {
    const response = axiosInstance.get(`/posts/brandLine?brandLineName=${brandLineName}`);
    return response;
  } catch (error) {
    logger.error('Error Get Posts by brand line name:', error);
    throw error;
  }
}
export const getAllBrandLines = async () => {
  try {
    const response = axiosInstance.get('/brand-lines');
    return response;
  } catch (error) {
    logger.error('Error get all brand line :', error);
    throw error;
  }
}
export const getBrandLinesByBrandName = async (brandName) => {
  try {
    const response = axiosInstance.get(`/brand-lines/brand-name?brandName=${brandName}`);
    return response;
  } catch (error) {
    logger.error('Error get all brand line :', error);
    throw error;
  }
}
export const getPostsOfFollowedUser = async (followedUserId) => {
  try {
    const response = axiosInstance.get(`/posts/followedUser?followedUserId=${followedUserId}`);
    return response;
  } catch (error) {
    logger.error('Error get all post of followed user :', error);
    throw error;
  }
}


