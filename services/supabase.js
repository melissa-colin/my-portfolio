// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://alqsqumttplwmxrqndlt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFscXNxdW10dHBsd214cnFuZGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTMwMTUsImV4cCI6MjAzNTA2OTAxNX0.cqVa1Z86VNzxQWXXs-_ZiQeGqHxDGkgLKfq7MGqd0Z0';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication services
export const authService = {
  // Sign up a new user
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name || '',
          role: 'user' // Default role
        }
      }
    });
    
    if (error) throw error;
    return data;
  },
  
  // Sign in user
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },
  
  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  
  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },
  
  // Get current user
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
  
  // Update user data
  updateUser: async (userData) => {
    const { data, error } = await supabase.auth.updateUser({
      data: userData
    });
    
    if (error) throw error;
    return data;
  }
};

// Content services
export const contentService = {
  // Get all content with optional filters
  getAll: async (filters = {}) => {
    let query = supabase
      .from('content')
      .select('*');
    
    // Apply filters
    if (filters.type) query = query.eq('type', filters.type);
    if (filters.language) query = query.eq('language', filters.language);
    if (filters.category) query = query.eq('category', filters.category);
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.tag) query = query.contains('tags', [filters.tag]);
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query with pagination
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(startIndex, startIndex + limit - 1)
      .limit(limit);
    
    if (error) throw error;
    
    // Get total count for pagination
    const { count: total, error: countError } = await supabase
      .from('content')
      .select('*', { count: 'exact', head: true });
    
    if (countError) throw countError;
    
    return {
      success: true,
      count: data.length,
      total: total || 0,
      pagination: {
        current: page,
        totalPages: Math.ceil((total || 0) / limit)
      },
      data
    };
  },
  
  // Get content by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      data
    };
  },
  
  // Create new content
  create: async (contentData) => {
    const { data, error } = await supabase
      .from('content')
      .insert([{
        ...contentData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data[0]
    };
  },
  
  // Update content
  update: async (id, contentData) => {
    const { data, error } = await supabase
      .from('content')
      .update({
        ...contentData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data[0]
    };
  },
  
  // Delete content
  delete: async (id) => {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return {
      success: true,
      data: {}
    };
  },
  
  // Get content types
  getTypes: async () => {
    // In Supabase we need to use a view or a distinct query
    const { data, error } = await supabase
      .from('content')
      .select('type')
      .distinct();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data.map(item => item.type)
    };
  },
  
  // Get content categories
  getCategories: async () => {
    const { data, error } = await supabase
      .from('content')
      .select('category')
      .distinct();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data.map(item => item.category).filter(Boolean)
    };
  },
  
  // Get content tags
  getTags: async () => {
    // For arrays in Supabase, we need to use a different approach
    const { data, error } = await supabase
      .from('content')
      .select('tags');
    
    if (error) throw error;
    
    // Extract unique tags from all tag arrays
    const allTags = data
      .flatMap(item => item.tags || [])
      .filter(Boolean);
    
    const uniqueTags = [...new Set(allTags)];
    
    return {
      success: true,
      data: uniqueTags
    };
  }
};

export default {
  supabase,
  auth: authService,
  content: contentService
};