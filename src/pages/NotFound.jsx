import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FiHome, FiArrowLeft, FiSearch, FiMail } from 'react-icons/fi';
import SocialLinks from '../components/common/SocialLinks';

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

  const quickLinks = [
    { name: t('nav.home', 'Accueil'), path: '/', icon: FiHome },
    { name: t('nav.projects', 'Projets'), path: '/projects', icon: FiSearch },
    { name: t('nav.experience', 'Expérience'), path: '/experience', icon: FiArrowLeft },
    { name: t('nav.contact', 'Contact'), path: '/contact', icon: FiMail },
  ];

  return (
    <>
      <Helmet>
        <title>{t('notFound.title', 'Page non trouvée')} | {t('site.title', 'Mélissa Colin')}</title>
        <meta name="description" content={t('notFound.message', 'La page que vous recherchez n\'existe pas.')} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${window.location.origin}/404`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <motion.div
          className="w-full max-w-2xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Error code with animation */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            <motion.h1 
              className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700"
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            >
              404
            </motion.h1>
            <motion.div 
              className="absolute inset-0 text-9xl md:text-[12rem] font-black text-red-500/20"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              404
            </motion.div>
          </motion.div>

          {/* Error message */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('notFound.pageNotFound', 'Page non trouvée')}
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              {t('notFound.message', 'La page que vous recherchez n\'existe pas.')}
            </p>
            <p className="text-gray-400">
              {t('notFound.suggestion', 'Elle a peut-être été déplacée ou supprimée.')}
            </p>
          </motion.div>

          {/* Quick navigation links */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('notFound.quickLinks', 'Liens rapides')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className="flex flex-col items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-300 group"
                  >
                    <link.icon className="w-6 h-6 text-gray-400 group-hover:text-red-400 mb-2" />
                    <span className="text-gray-300 group-hover:text-white text-sm">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Search suggestion */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">
                {t('notFound.searchSuggestion', 'Que recherchez-vous ?')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('notFound.searchHelp', 'Utilisez la navigation ci-dessus ou contactez-moi directement.')}
              </p>
              <SocialLinks className="justify-center" />
            </div>
          </motion.div>

          {/* Back button */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300 mr-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              {t('notFound.goBack', 'Retour')}
            </motion.button>
            
            <Link to="/">
              <motion.button
                className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHome className="w-4 h-4 mr-2" />
                {t('notFound.goHome', 'Accueil')}
              </motion.button>
            </Link>
          </motion.div>

          {/* Fun fact or quote */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 text-sm italic">
              {t('notFound.funFact', '"L\'erreur est humaine, mais pour vraiment foirer, il faut un ordinateur." - Paul R. Ehrlich')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;