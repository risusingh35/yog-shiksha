// src/utils/axiosInstance.ts

import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL:"",
//    process.env.REACT_APP_API_BASE_URL, // Use your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add authorization token to headers if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error: any) => {
    // Handle global errors
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized, handle logout or refresh token
        toast.error('Unauthorized! Please log in again.');
      } else if (status === 500) {
        // Internal server error
        toast.error('Server error! Please try again later.');
      } else {
        toast.error(error.response.data.message || 'An error occurred!');
      }
    } else {
      toast.error('Network error! Please check your connection.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
