import axios from 'axios';

const baseURL = 'https://master.d1ett1tvi16xqx.amplifyapp.com/';

// Get Budget Overview
export const getBudgetOverview = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-budget-items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching budget overview:', error);
    throw error;
  }
};

// Add a new Budget Item
export const addBudgetItem = async (budgetData) => {
  try {
    const response = await axios.post(`${baseURL}/add-budget-item`, budgetData);
    return response.data;
  } catch (error) {
    console.error('Error adding budget item:', error);
    throw error;
  }
};

// Update an existing Budget Item
export const updateBudgetItem = async (id, updateData) => {
  try {
    const response = await axios.put(`${baseURL}/update-budget-item/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating budget item:', error);
    throw error;
  }
};

// Delete a Budget Item
export const deleteBudgetItem = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/delete-budget-item/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting budget item:', error);
    throw error;
  }
};
