import axios from 'axios';
import api from './api'; // Assuming api is the base URL

export const getAllAccounts = async () => {
  try {
    const response = await axios.get(`${api}/accounts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error; // Handle the error accordingly
  }
};

export const createAccount = async (accountData) => {
  try {
    const response = await axios.post(`${api}/accounts`, accountData);
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error; // Handle the error accordingly
  }
};

export const updateAccount = async (id, updateData) => {
  try {
    const response = await axios.put(`${api}/accounts/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating account:', error);
    throw error; // Handle the error accordingly
  }
};

export const deleteAccount = async (id) => {
  try {
    const response = await axios.delete(`${api}/accounts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error; // Handle the error accordingly
  }
};
