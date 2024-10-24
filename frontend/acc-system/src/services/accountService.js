import axios from 'axios';

const API_BASE_URL = 'http://acc-backend.us-east-1.elasticbeanstalk.com/'; 

export const getAllAccounts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/get-accounts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error.message);
    throw error; 
  }
};

export const getAccount = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/get-account/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching account:', error.message);
    throw error; 
  }
};

export const createAccount = async (accountData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/accounts/create-account`, accountData);
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error.message);
    throw error; 
  }
};

export const updateAccount = async (id, updateData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/accounts/update-account/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating account:', error.message);
    throw error; 
  }
};

export const deleteAccount = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/accounts/delete-account/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error.message);
    throw error; 
  }
};
