import axios from 'axios';

// Set up the axios instance
const api = axios.create({
  baseURL: ' https://979a-67-202-33-127.ngrok-free.app',
});

export default api;