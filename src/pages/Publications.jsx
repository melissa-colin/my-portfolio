import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiBookOpen, FiDownload } from 'react-icons/fi';
import SEOHead from '../components/SEOHead';

const Publications = () => {
  const { t, language } = useLanguage();

  // Get publications list from translations
  const publications = t('publications.list') || [];

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <SEOHead pageType="publications" />
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
              {t('publications.title')}
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
              {t('publications.subtitle')}
            </motion.p>
              </div>
            </div>
          </section>
          
          {/* Publications List */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
            {publications.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                {t('publications.noPublications')}
              </div>
            ) : (
              Object.entries(
                publications.reduce((acc, pub) => {
              acc[pub.type] = acc[pub.type] || [];
              acc[pub.type].push(pub);
              return acc;
                }, {})
              ).map(([type, pubs]) => (
                <div key={type} className="mb-12">
              <div className="flex items-center mb-8">
                <FiBookOpen className="text-red-600 dark:text-red-500 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {type}
                </h2>
              </div>
              <div className="section-bar mb-8"></div>
              <motion.div 
                className="space-y-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                transition: {
                  staggerChildren: 0.2
                }
                  }
                }}
              >
                {pubs.map(pub => (
                  <motion.div 
                key={pub.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                variants={itemVariants}
                  >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {pub.authors} • {pub.venue} • {pub.year}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {pub.abstract}
                  </p>
                  <div className="flex items-center">
                    <a 
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-600 dark:text-red-500 hover:underline mr-4"
                    >
                  <FiBookOpen className="mr-2" />
                  {t('publications.viewPaper')}
                    </a>
                    {/* Optionally add download link if you have PDFs */}
                    {/* <a 
                  href={pub.pdfUrl}
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500"
                    >
                  <FiDownload className="mr-2" />
                  {language === 'en' ? 'Download PDF' : 'Télécharger le PDF'}
                    </a> */}
                  </div>
                </div>
                  </motion.div>
                ))}
              </motion.div>
                </div>
              ))
            )}
              </div>
            </div>
          </section>
      </motion.div>
    </>
  );
};

export default Publications;