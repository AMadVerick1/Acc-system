// authService.js

import axios from 'axios';

const API_URL = '/api/auth';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Error registering user');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error('Error logging in');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user profile');
  }
};

export const updateUserProfile = async (updateData) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, updateData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating user profile');
  }
};
