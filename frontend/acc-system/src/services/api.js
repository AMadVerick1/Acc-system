import axios from 'axios';

// Set up the axios instance
const api = axios.create({
  baseURL: 'https://67.202.33.127:5000',
});

export default api;