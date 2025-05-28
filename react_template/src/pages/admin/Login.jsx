import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiLogIn, FiAlertCircle } from 'react-icons/fi';

const Login = () => {
  const { login, error, loading } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [formError, setFormError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    setFormError(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setFormError(language === 'en' ? 'Please provide both email and password' : 'Veuillez fournir un email et un mot de passe');
      return;
    }
    
    try {
      await login(formData.email, formData.password);
      navigate('/admin');
    } catch (err) {
      setFormError(err.message || (language === 'en' ? 'Failed to login' : 'Échec de la connexion'));
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-red-600 dark:bg-red-800 py-6 px-6">
          <Link to="/" className="text-white text-sm hover:underline inline-block mb-4">
            {language === 'en' ? '← Back to Website' : '← Retour au Site'}
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {language === 'en' ? 'Admin Login' : 'Connexion Admin'}
          </h1>
          <p className="text-red-100 mt-2">
            {language === 'en' ? 'Access the content management system' : 'Accéder au système de gestion de contenu'}
          </p>
        </div>
        
        <div className="py-8 px-6">
          {(formError || error) && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md flex items-start">
              <FiAlertCircle className="mt-1 mr-2 flex-shrink-0" />
              <span>{formError || error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === 'en' ? 'Email Address' : 'Adresse Email'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={language === 'en' ? 'Enter your email' : 'Entrez votre email'}
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {language === 'en' ? 'Password' : 'Mot de passe'}
                </label>
                <span className="text-sm text-red-600 dark:text-red-400 hover:underline cursor-pointer">
                  {language === 'en' ? 'Forgot password?' : 'Mot de passe oublié?'}
                </span>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={language === 'en' ? 'Enter your password' : 'Entrez votre mot de passe'}
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                    {language === 'en' ? 'Loading...' : 'Chargement...'}
                  </>
                ) : (
                  <>
                    <FiLogIn className="mr-2" />
                    {language === 'en' ? 'Sign In' : 'Connexion'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;