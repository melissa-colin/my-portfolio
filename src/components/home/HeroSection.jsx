import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="min-h-screen flex items-center py-20 relative overflow-hidden">
      {/* Background particles or pattern */}
      <div className="absolute inset-0 bg-opacity-10 z-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              Mélissa Colin
            </h1>
            
            <h2 className="text-xl md:text-2xl font-medium mb-6 text-red-600 dark:text-red-500">
              {t('site.tagline')}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              {t('home.heroSubtitle')}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/projects" className="btn-primary">
                {t('home.viewProjects')} <FiArrowRight className="ml-2 inline" />
              </Link>
              <Link to="/contact" className="btn-outline">
                {t('home.learnMore')}
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="w-full h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg overflow-hidden">
                {/* This is where a profile photo would go */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                  <span className="text-lg">Profile Image</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-red-600 dark:bg-red-700 text-white p-6 rounded-lg shadow-lg">
                <p className="text-xl font-bold">21 {language === 'en' ? 'years old' : 'ans'}</p>
                <p className="text-sm">{language === 'en' ? 'Student-Engineer' : 'Élève-Ingénieure'}</p>
                <p className="text-sm">ENSEIRB-MATMECA</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-8 h-12 border-2 border-gray-400 dark:border-gray-600 rounded-full flex items-start justify-center">
            <motion.div 
              className="w-1 h-3 bg-red-600 dark:bg-red-500 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;