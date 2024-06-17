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

// export const callFetchPostDetails = (id) => {
//   return axiosInstance.get(`/posts/${id}`)
// }

export const callFetchPostByBrandName = (query) => {
  return axiosInstance.get(`/posts/brands?${query}`)
}

export const createPost = async (
  title, brandName, productName, brandLineName, condition, category, exteriorColor,
  interiorColor, size, width, height, length, referenceCode, manufactureYear, material, accessories, dateCode,
  serialNumber, purchasedPlace, story, description, price
) => {
  try {
    const response = axiosInstance.post('/posts', {
      title, brandName, productName, brandLineName, condition, category, exteriorColor,
      interiorColor, size, width, height, length, referenceCode, manufactureYear, material, accessories, dateCode,
      serialNumber, purchasedPlace, story, description, price
    })
    return response;
  } catch (error) {
    console.error('Error Create PostS:', error);
    throw error;
  }
}