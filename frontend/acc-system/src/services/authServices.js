import api from './api';
import axios from 'axios';

export const getAllUsers = async () => {
  const response = await axios.get(`${api}, /auth`);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${api}  /auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${api},  /auth/login`, credentials);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axios.get(`${api}, /auth/profile`);
  return response.data;
};

export const updateUserProfile = async (updateData) => {
  const response = await axios.put(`${api}, /auth/profile`, updateData);
  return response.data;
};
