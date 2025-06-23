import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Backend URL
  withCredentials: true, // For sending cookies if using authentication
});

export default axiosInstance;