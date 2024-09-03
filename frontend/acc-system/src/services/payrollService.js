import api from './api';
import axios from 'axios';

export const getAllPayrolls = async () => {
  const response = await axios.get(`${api}, /payroll`);
  return response.data;
};

export const createPayroll = async (payrollData) => {
  const response = await axios.post(`${api}, /payroll`, payrollData);
  return response.data;
};

export const updatePayroll = async (id, updateData) => {
  const response = await axios.put(`${api}, /payroll/${id}`, updateData);
  return response.data;
};

export const deletePayroll = async (id) => {
  const response = await axios.delete(`${api}, /payroll/${id}`);
  return response.data;
};
