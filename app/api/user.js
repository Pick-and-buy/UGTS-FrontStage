
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