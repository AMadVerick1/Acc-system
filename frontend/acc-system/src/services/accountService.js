import api from './api';

export const getAllAccounts = async () => {
  const response = await api.get('/accounts');
  return response.data;
};

export const createAccount = async (accountData) => {
  const response = await api.post('/accounts', accountData);
  return response.data;
};

export const updateAccount = async (id, updateData) => {
  const response = await api.put(`/accounts/${id}`, updateData);
  return response.data;
};

export const deleteAccount = async (id) => {
  const response = await api.delete(`/accounts/${id}`);
  return response.data;
};
