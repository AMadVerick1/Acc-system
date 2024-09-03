import api from './api';
import axios from 'axios';

export const getAllTransactions = async () => {
  const response = await axios.get(api, '/transactions');
  return response.data;
};

export const getTransactionById = async (id) => {
  const response = await axios.get(`/transactions/${id}`);
  return response.data;
};


export const createTransaction = async (transactionData) => {
  const response = await axios.post(api, '/transactions', transactionData);
  return response.data;
};

export const updateTransaction = async (id, updateData) => {
  const response = await axios.put(api, `/transactions/${id}`, updateData);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(api, `/transactions/${id}`);
  return response.data;
};
