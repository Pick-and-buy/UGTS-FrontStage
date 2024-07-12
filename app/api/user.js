import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance';
import { Alert } from 'react-native';

export const getUserByToken = async () => {
  try {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error("Error retrieving token: ", error);
  }
};

export const updateProfile = async (userId, profile) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, {
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      email: profile.email,
      dob: profile.dateOfBirth.toLocaleDateString("en-CA")
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const updateAddress = async (userId, address,addressId) => {
  try {
    const response = await axiosInstance.put(`/users/address?userId=${userId}&addressId=${addressId}`, {
      country: address.country,
      province: address.city,
      district: address.province,
      street: address.district,
      addressLine: address.address
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user address:', error);
    throw error;
  }
};

export const sendImageToAPI = async (imageUri, userId, authToken) => {
  if (!imageUri) return;

  const formData = new FormData();
  const fileName = imageUri.split('/').pop();
  formData.append('avatar', {
    uri: imageUri,
    name: fileName,
    type: 'image/jpeg'
  });

  try {
    const response = await fetch(`http://10.0.2.2:8080/api/v1/users/${userId}/avatar`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Network request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    Alert.alert("Success", "Image uploaded successfully!");

  } catch (error) {
    console.error("Error uploading image: ", error);
    Alert.alert("Error", "Failed to upload image. Please try again.");
  }
};

export const likePost = async (userId, postId) => {
  try {
    const response = await axiosInstance.post(`/like`, {
      userId: userId,
      postId: postId
    });
    return response.data;
  } catch (error) {
    console.error('Error liking the post:', error);
    throw error;
  }
};

export const unlikePost = async (userId, postId) => {
  try {
    const response = await axiosInstance.delete(`/like`, {
      data: {
        userId: userId,
        postId: postId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error unliking the post:', error);
    throw error;
  }
};

export const followUser = async (userId, targetUserId) => {
  try {
    const response = await axiosInstance.post(`/follow`, {
      userId: userId,
      targetUserId: targetUserId
    });
    return response.data;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

export const unfollowUser = async (userId, targetUserId) => {
  try {
    const response = await axiosInstance.delete(`/unfollow`, {
      data: {
        userId: userId,
        targetUserId: targetUserId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};

export const getListsFollowers = async (userId) => {
  try {
    console.log(userId);
    const response = await axiosInstance.get(`/followers/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching list of followers:', error);
    throw error;
  }
};

export const getListsFollowing = async (userId) => {
  try {
    const response = await axiosInstance.get(`/following/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching list of following:', error);
    throw error;
  }
};

export const checkIfFollowing = async (userIdLogged, userOfPostId) => {
  try {
    const followers = await getListsFollowers(userOfPostId);
    // Check if the logged-in user is in the list of followers
    return followers.result.some(follower => follower.id === userIdLogged);
  } catch (error) {
    console.error('Error checking if following:', error);
    throw error;
  }
};
