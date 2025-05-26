import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password);
      // Redirect is handled by AuthContext
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
            className="w-full py-3 px-4 btn-primary flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
            ) : null}
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;