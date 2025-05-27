// src/utils/createAdmin.js
import { authService } from '../services/supabase';

/**
 * Creates an admin user in Supabase
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 */
const createAdmin = async (email, password) => {
  try {
    console.log('Creating admin account...');
    const userData = { name: 'Mélissa Colin', role: 'admin' };
    
    const data = await authService.signUp(email, password, userData);
    
    console.log('Admin account created successfully!');
    console.log('User ID:', data.user.id);
    console.log('Email:', data.user.email);
    
    return { success: true, data };
  } catch (error) {
    console.error('Error creating admin account:', error.message);
    return { success: false, error: error.message };
  }
};

// Execute with the provided credentials
createAdmin('colin.melissa72@gmail.com', 'Ms*Uwpi1sIr04*n')
  .then(result => {
    if (result.success) {
      console.log('Admin registration complete!');
    } else {
      console.error('Failed to register admin:', result.error);
    }
  })
  .catch(err => {
    console.error('Unexpected error:', err);
  });
