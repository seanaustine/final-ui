import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Update with your Spring Boot backend URL

export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/simon/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/simon/posts`, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/simon/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/simon/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};