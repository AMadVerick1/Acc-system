import axios from 'axios';

// Set up the axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include tokens if needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
