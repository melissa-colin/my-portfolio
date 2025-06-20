import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6 }
    },
    exit: { opacity: 0 }
  };
  
  const formVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Special function to create admin account if it doesn't exist
  const setupAdminAccount = async () => {
    try {
      setError('');
      const adminEmail = 'colin.melissa72@gmail.com';
      const adminPassword = 'Ms*Uwpi1sIr04*n';

      // Check if we can login with admin credentials
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword
      });

      if (signInError && signInError.status === 400) {
        // Admin doesn't exist yet, create it
        const { data, error } = await supabase.auth.signUp({
          email: adminEmail,
          password: adminPassword,
          options: {
            data: {
              name: 'Mélissa Colin',
              role: 'admin'
            }
          }
        });

        if (error) {
          console.error('Error creating admin account:', error.message);
          setError('Failed to create admin account: ' + error.message);
        } else {
          console.log('Admin account created successfully!');
          setEmail(adminEmail);
          setPassword(adminPassword);
          setError('Admin account created! You can now log in with the provided credentials.');
        }
      } else if (!signInError) {
        // Admin exists and login was successful
        console.log('Admin login successful!');
        await login(adminEmail, adminPassword);
      }
    } catch (err) {
      console.error('Error during admin setup:', err);
      setError('Error during admin setup: ' + (err.message || 'Unknown error'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      // Use supabase auth directly as a fallback if the context login doesn't work
      const result = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (result.error) {
        throw result.error;
      }
      
      // If successful, let the context handle the user
      await login(email, password);
      // Redirect is handled by AuthContext
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-900 px-4"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div 
        className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg"
        variants={formVariants}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Admin Login</span>
          </h1>
          <p className="text-gray-400">Access the content management system</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-900/20 border border-red-800 text-red-300 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiUser className="text-gray-500" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiLock className="text-gray-500" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 btn-primary flex justify-center items-center mb-4"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
            ) : null}
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <button
            type="button"
            onClick={setupAdminAccount}
            className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 transition-colors duration-300 rounded-lg text-white font-medium flex justify-center items-center"
          >
            Create Admin Account
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;