import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  const { t } = useLanguage();

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl w-full text-center">
        <h1 className="text-9xl font-bold text-red-600 dark:text-red-500">404</h1>
        
        <h2 className="text-3xl font-bold mt-4 mb-6 text-gray-900 dark:text-white">
          {t('notFound.title')}
        </h2>
        
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          {t('notFound.message')}
        </p>
        
        <Link to="/" className="btn-primary inline-flex items-center">
          <FiArrowLeft className="mr-2" />
          {t('notFound.button')}
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;