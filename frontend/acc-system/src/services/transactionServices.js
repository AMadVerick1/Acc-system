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
        console.error(`Error fetching transaction with ID ${id}:`, error.response?.data?.message || error.message);
        throw error;
    }
};

// Create a New Transaction
export const createTransaction = async (transactionData) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/transactions/create-transaction`, transactionData);
      return response.data;
  } catch (error) {
      console.error('Error creating transaction:', error.response?.data?.message || error.message);
      throw error;
  }
};

// Update an Existing Transaction
export const updateTransaction = async (id, updateData) => {
    try {
        if (!updateData) {
            throw new Error('Update data is undefined');
        }
  
        console.log("Sending update request with data:", updateData);  // Debug log
  
        const response = await axios.put(`${API_BASE_URL}/transactions/update-transaction/${id}`, updateData);
        return response.data;
    } catch (error) {
        console.error(`Error updating transaction with ID ${id}:`, error.response?.data?.message || error.message);
        throw error;
    }
};
  
  

// Delete a Transaction
export const deleteTransaction = async (id) => {
  try {
      const response = await axios.delete(`${API_BASE_URL}/transactions/delete-transaction/${id}`);
      return response.data;
  } catch (error) {
      console.error(`Error deleting transaction with ID ${id}:`, error.response?.data?.message || error.message);
      throw error;
  }
};