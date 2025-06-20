import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  const { t, language } = useLanguage();
  // Animation variants for the components
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>{t('notFound.title')} | {t('site.title')}</title>
        <meta name="description" content={t('notFound.message')} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <motion.div
          className="w-full max-w-lg text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Error code */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            <h1 className="text-9xl font-bold text-white opacity-10">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-7xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                404
              </h2>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('notFound.title')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('notFound.message')}
            </p>
          </motion.div>

          {/* Button */}
          <motion.div variants={itemVariants}>
            <Link 
              to="/" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-medium text-lg rounded-md hover:from-red-700 hover:to-red-600 transition-all shadow-lg hover:shadow-red-500/30"
            >
              {t('notFound.button')}
            </Link>
          </motion.div>

          {/* Decorative elements */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              transition: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-40 h-40 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
              transition: { repeat: Infinity, duration: 10, ease: 'easeInOut' },
            }}
          />
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;