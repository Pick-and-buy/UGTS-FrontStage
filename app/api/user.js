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
    console.error('Error updating user profile:', error);
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
