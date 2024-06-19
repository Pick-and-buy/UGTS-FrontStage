
import axiosInstance from './axiosInstance';

export const getUserByToken = async () => {
  try {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
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
    console.error('Error fetching user data:', error);
    throw error;
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
    console.error('Error liking the post', error);
    throw error;
  }
};

export const unlikePost = async (userId, postId) => {
  try {
    const response = await axiosInstance.delete(`/like`, {
      userId: userId,
      postId: postId
    });
    return response.data;
  } catch (error) {
    console.error('Error unliking the post', error);
    throw error;
  }
};


// export const updateAvatar = async (userId, formData) => {
//   console.log(formData);
//   try {
//     const response = await axiosInstance.put(`/users/${userId}/avatar`, formData);
//     return response.data;
//   } catch (error) {
//     console.error('Error update avatar', error);
//     throw error;
//   }
// };


