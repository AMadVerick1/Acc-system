import axios from 'axios';

// Set up the axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export default api;