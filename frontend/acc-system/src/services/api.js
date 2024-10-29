import axios from 'axios';

// Set up the axios instance
const api = axios.create({
  baseURL: 'hpacc.primaveraconcepts.com',
});

export default api;