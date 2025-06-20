// src/services/api.js
import { authService, contentService } from './supabase';

// Legacy imports for compatibility
import axios from 'axios';

// Define a dummy API URL for legacy code compatibility
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Authentication services - Using Supabase
const auth = {
  // Register a new user
  register: async (name, email, password) => {
    try {
      const data = await authService.signUp(email, password, { name });
      if (data.session?.access_token) {
        localStorage.setItem('token', data.session.access_token);
      }
      return {
        success: true,
        token: data.session?.access_token,
        user: {
          id: data.user.id,
          name: name,
          email: data.user.email,
          role: 'user'
        }
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const data = await authService.signIn(email, password);
      if (data.session?.access_token) {
        localStorage.setItem('token', data.session.access_token);
      }
      return {
        success: true,
        token: data.session?.access_token,
        user: {
          id: data.user.id,
          name: data.user.user_metadata?.name || '',
          email: data.user.email,
          role: data.user.user_metadata?.role || 'user'
        }
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Check if user is authenticated
  checkAuth: async (token) => {
    try {
      const user = await authService.getUser();
      if (!user) return { success: false, message: 'User not found' };
      
      return {
        success: true,
        user: {
          id: user.id,
          name: user.user_metadata?.name || '',
          email: user.email,
          role: user.user_metadata?.role || 'user'
        }
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Content services - Using Supabase
const content = {
  // Get all content with optional filters
  getAll: async (filters = {}) => {
    try {
      return await contentService.getAll(filters);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get content by ID
  getById: async (id) => {
    try {
      return await contentService.getById(id);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Create new content
  create: async (contentData) => {
    try {
      return await contentService.create(contentData);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Update content
  update: async (id, contentData) => {
    try {
      return await contentService.update(id, contentData);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete content
  delete: async (id) => {
    try {
      return await contentService.delete(id);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get content types
  getTypes: async () => {
    try {
      return await contentService.getTypes();
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get content categories
  getCategories: async () => {
    try {
      return await contentService.getCategories();
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get content tags
  getTags: async () => {
    try {
      return await contentService.getTags();
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