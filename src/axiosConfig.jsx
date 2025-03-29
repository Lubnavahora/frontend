import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001', // 👈 must match your backend port
  withCredentials: true,            // (optional, for cookies/auth)
});

export default axiosInstance;
