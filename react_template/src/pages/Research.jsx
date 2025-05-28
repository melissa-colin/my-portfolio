import React from 'react';
import { motion } from 'framer-motion';
import ResearchInterests from '../components/research/ResearchInterests';
import CurrentProjects from '../components/research/CurrentProjects';
import { useLanguage } from '../context/LanguageContext';
import { FiBookOpen, FiUsers } from 'react-icons/fi';

const Research = () => {
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
      className="pt-24 pb-20"
    >
      {/* Hero Section */}
      <section className="bg-gray-900 dark:bg-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-70">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-transparent to-red-900/20 opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('research.title')}
            </motion.h1>

            <motion.div 
              className="section-bar mx-auto bg-red-500"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
            
            <motion.p 
              className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('research.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Research Interests */}
      <ResearchInterests />

      {/* Current Projects */}
      <CurrentProjects />
      
      {/* Collaborations */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <FiUsers className="text-red-600 dark:text-red-500 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('research.collaborations')}
              </h2>
            </div>
            
            <div className="section-bar mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              {/* Collaboration 1 */}
              <motion.div 
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Bordeaux NeuroComputing Institute</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Collaboration on interpretable deep learning models for medical image analysis.</p>
                <a href="https://www.bordeaux-neurocampus.fr/" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-500 hover:underline">bordeaux-neurocampus.fr</a>
              </motion.div>
              
              {/* Collaboration 2 */}
              <motion.div 
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">AI Ethics Lab</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Working on developing guidelines for ethical considerations in explainable AI systems.</p>
                <a href="https://aiethicslab.com/" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-500 hover:underline">aiethicslab.com</a>
              </motion.div>
              
              {/* Collaboration 3 */}
              <motion.div 
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">INRIA Bordeaux</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Joint research on efficient self-attention mechanisms for vision transformers.</p>
                <a href="https://www.inria.fr/en/inria-centre-bordeaux" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-500 hover:underline">inria.fr/en/inria-centre-bordeaux</a>
              </motion.div>
              
              {/* Collaboration 4 */}
              <motion.div 
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">XAI Research Group</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">International collaboration on developing standardized evaluation metrics for explainable AI methods.</p>
                <a href="https://xai-research.org" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-500 hover:underline">xai-research.org</a>
              </motion.div>
            </div>
          </div>
          
          {/* Publications Link */}
          <div className="text-center mt-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <a href="/publications" className="btn-primary inline-flex items-center">
                <FiBookOpen className="mr-2" />
                {t('publications.title')}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Research;