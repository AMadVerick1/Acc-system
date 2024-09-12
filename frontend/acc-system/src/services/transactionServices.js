import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 

// Get All Transactions
export const getAllTransactions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/transactions/get-transactions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all transactions:', error);
        throw error;
    }
};

// Get Transaction by ID
export const getTransactionById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/transactions/get-transaction/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching transaction with ID ${id}:`, error);
        throw error;
    }
};
// Create a New Transaction
export const createTransaction = async (transactionData) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/transactions/create-transaction`, transactionData);
      return response.data;
  } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
  }
};

// Update an Existing Transaction
export const updateTransaction = async (id, updateData) => {
  try {
      const response = await axios.put(`${API_BASE_URL}/transactions/update-transaction/${id}`, updateData);
      return response.data;
  } catch (error) {
      console.error(`Error updating transaction with ID ${id}:`, error);
      throw error;
  }
};

// Delete a Transaction
export const deleteTransaction = async (id) => {
  try {
      const response = await axios.delete(`${API_BASE_URL}/transactions/delete-transaction/${id}`);
      return response.data;
  } catch (error) {
      console.error(`Error deleting transaction with ID ${id}:`, error);
      throw error;
  }
};
