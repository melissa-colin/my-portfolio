// src/services/api.js
import axios from 'axios';

// Define the API base URL
const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
const auth = {
  // Register a new user
  register: async (name, email, password) => {
    try {
      const response = await apiClient.post('/auth/register', {
        name,
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Check if user is authenticated
  checkAuth: async (token) => {
    try {
      const response = await apiClient.get('/auth/current', {
        headers: {
          'x-auth-token': token
        }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Content services
const content = {
  // Get all content with optional filters
  getAll: async (filters = {}) => {
    try {
      const response = await apiClient.get('/content', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get content by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/content/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Create new content
  create: async (contentData) => {
    try {
      const response = await apiClient.post('/content', contentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Update content
  update: async (id, contentData) => {
    try {
      const response = await apiClient.put(`/content/${id}`, contentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete content
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/content/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get content types
  getTypes: async () => {
    try {
      const response = await apiClient.get('/content/types');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get content categories
  getCategories: async () => {
    try {
      const response = await apiClient.get('/content/categories');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get content tags
  getTags: async () => {
    try {
      const response = await apiClient.get('/content/tags');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const message = error.response.data.message || 'An error occurred';
    return { message, status: error.response.status };
  } else if (error.request) {
    // The request was made but no response was received
    return { message: 'No response from server', status: 500 };
  } else {
    // Something happened in setting up the request that triggered an Error
    return { message: error.message, status: 500 };
  }
};

// Export combined API services
const api = {
  ...auth,
  content
};

export default api;