import axios from 'axios';

// Set up the axios instance
const api = axios.create({
  baseURL: 'https://3.238.206.180:5000',
});

export default api;