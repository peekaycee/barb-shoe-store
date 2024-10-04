import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://barb-shoe-store-9ik8.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login page)
      console.log('Unauthorized, logging out...');
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    // Handle other errors globally
    return Promise.reject(error);
  }
);

export default axiosInstance;
