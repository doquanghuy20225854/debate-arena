import axios from 'axios';

// If REACT_APP_API_URL is not set, fallback to localhost:3000 (backend)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
});

export default api;
