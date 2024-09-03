import api from './api';
import axios from 'axios';

export const generateReport = async (reportData) => {
  const response = await axios.post(`${api}, /reports`, reportData);
  return response.data;
};

export const getAllReports = async () => {
  const response = await axios.get(`${api}, /reports`);
  return response.data;
};

export const getReportById = async (id) => {
  const response = await axios.get(`${api}, /reports/${id}`);
  return response.data;
};
