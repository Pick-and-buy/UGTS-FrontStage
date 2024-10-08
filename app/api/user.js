import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance';
import { Alert } from 'react-native';

export const getUserByToken = async () => {
  try {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  } catch (error) {
    console.log('Error fetching user data:', error);
    throw error;
  }
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.log("Error retrieving token: ", error);
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
    console.log('Error updating user profile:', error);
    throw error;
  }
};

export const createAddress = async (userId, address) => {
  try {
    const response = await axiosInstance.post(`/users/address?userId=${userId}`, {
      country: address.country,
      province: address.city,
      district: address.province,
      street: address.district,
      addressLine: address.address
    });
    return response.data;
  } catch (error) {
    console.log('Error create user address:', error);
    throw error;
  }
};

export const updateAddress = async (userId, address, addressId) => {
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
    console.log('Error updating user address:', error);
    throw error;
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const response = await axiosInstance.delete(`/users/address?addressId=${addressId}`);
    return response.data;
  } catch (error) {
    console.log('Error delete user address:', error);
    throw error;
  }
};

export const setDefaultAddress = async (userId, addressId) => {
  try {
    const response = await axiosInstance.put(`/users/address/default?userId=${userId}&addressId=${addressId}`);
    return response.data;
  } catch (error) {
    console.log('Error set default user address:', error);
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
    const response = await axiosInstance.put(`users/${userId}/avatar`, formData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error uploading image: ", error);
    Alert.alert("Error", "Failed to upload image. Please try again.");
    throw error;  // Re-throw the error if needed for further handling
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
    console.log('Error liking the post:', error);
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
    console.log('Error unliking the post:', error);
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
    console.log('Error following user:', error);
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
    console.log('Error unfollowing user:', error);
    throw error;
  }
};

export const getListsFollowers = async (userId) => {
  try {
    console.log(userId);
    const response = await axiosInstance.get(`/followers/${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching list of followers:', error);
    throw error;
  }
};

export const getListsFollowing = async (userId) => {
  try {
    const response = await axiosInstance.get(`/following/${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching list of following:', error);
    throw error;
  }
};

export const checkIfFollowing = async (userIdLogged, userOfPostId) => {
  try {
    const followers = await getListsFollowers(userOfPostId);
    // Check if the logged-in user is in the list of followers
    return followers.result.some(follower => follower.id === userIdLogged);
  } catch (error) {
    console.log('Error checking if following:', error);
    throw error;
  }
};



export const pushNotifications = async (userId) => {
  try {
    const response = await axiosInstance.get(`/push-notifications/${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error push notifications:', error);
    throw error;
  }
};

export const getNotificationsByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/notifications/${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error get notifications:', error);
    throw error;
  }
};

export const updateNotificationsReadStatus = async (notificationId) => {
  try {
    const response = await axiosInstance.patch(`/notifications/read/${notificationId}`);
    return response.data;
  } catch (error) {
    console.log('Error update notifications read:', error);
    throw error;
  }
};

export const updateAllNotificationsReadStatus = async (userId) => {
  try {
    const response = await axiosInstance.patch(`/notifications/read-all/${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error update all notifications as read:', error);
    throw error;
  }
};

export const verifyInformation = async (user, fontData, backData, faceMatchData) => {
  try {

    const response = await axiosInstance.post(`/verify-information`, {
      userId: user?.id,
      cardId: fontData?.data[0]?.id,
      name: fontData?.data[0]?.name,
      dob: fontData?.data[0]?.dob,
      nationality: fontData?.data[0]?.nationality,
      home: fontData?.data[0]?.home,
      address: fontData?.data[0]?.address,
      doe: fontData?.data[0]?.doe,
      features: backData?.data[0]?.features,
      issueDate: backData?.data[0]?.issue_date,
      issueLoc: backData?.data[0]?.issue_loc,
      isMatch: faceMatchData?.data?.isMatch
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error verify information :', error);
    throw error;
  }
};

export const ratingUser = async (stars, comment, ratingUserId, ratedUserId, orderId) => {
  console.log(stars, comment, ratingUserId, ratedUserId);
  try {
    const response = await axiosInstance.post(`/rating`, {
      stars: stars,
      comment: comment,
      ratingUserId: ratingUserId,
      ratedUserId: ratedUserId,
      orderId: orderId
    });
    return response.data;
  } catch (error) {
    console.log('Error rating:', error);
    throw error;
  }
};
export const getRatingByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/rating/rated?ratedUserId=${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error rating:', error);
    throw error;
  }
};


