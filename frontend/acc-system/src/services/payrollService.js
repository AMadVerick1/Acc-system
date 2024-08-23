import api from './api';

export const getAllPayrolls = async () => {
  const response = await api.get('/payroll');
  return response.data;
};

export const createPayroll = async (payrollData) => {
  const response = await api.post('/payroll', payrollData);
  return response.data;
};

export const updatePayroll = async (id, updateData) => {
  const response = await api.put(`/payroll/${id}`, updateData);
  return response.data;
};

export const deletePayroll = async (id) => {
  const response = await api.delete(`/payroll/${id}`);
  return response.data;
};
