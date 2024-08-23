import api from './api';

export const generateReport = async (reportData) => {
  const response = await api.post('/reports', reportData);
  return response.data;
};

export const getAllReports = async () => {
  const response = await api.get('/reports');
  return response.data;
};

export const getReportById = async (id) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};
