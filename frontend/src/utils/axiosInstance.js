import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://campus-echo-backend.onrender.com/api', // Backend URL
  withCredentials: true, // For sending cookies if using authentication
});

export default axiosInstance;