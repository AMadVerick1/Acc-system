import api from './api';

export const getBudgetOverview = async () => {
  const response = await api.get('/budget');
  return response.data;
};

export const addBudgetItem = async (budgetData) => {
  const response = await api.post('/budget', budgetData);
  return response.data;
};

export const updateBudgetItem = async (id, updateData) => {
  const response = await api.put(`/budget/${id}`, updateData);
  return response.data;
};

export const deleteBudgetItem = async (id) => {
  const response = await api.delete(`/budget/${id}`);
  return response.data;
};
