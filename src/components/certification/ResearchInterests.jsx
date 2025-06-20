import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiBookOpen } from 'react-icons/fi';

// Import translations
import en from '../../data/translations/en';
import fr from '../../data/translations/fr';

const ResearchInterests = () => {
  const { language } = useLanguage();

  // Get interests from translation files
  const interests =
    language === 'fr'
      ? fr.researchinterestsList
      : en.researchinterestsList;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <FiBookOpen className="text-red-600 dark:text-red-500 text-3xl mr-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {language === 'en' ? en.researchinterests : fr.researchinterests}
            </h2>
          </div>
          
          <div className="section-bar mb-8"></div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
            {language === 'en'
              ? en.researchintro
              : fr.researchintro}
          </p>
          
          {interests && interests.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {interests.map((interest) => (
                <motion.div 
                  key={interest.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-red-600 dark:border-red-500"
                  variants={itemVariants}
                >
                  <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">
                    {interest.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 italic">
              {language === 'en'
                ? "No certification interests available at the moment."
                : "Aucun intérêt de recherche pour le moment."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResearchInterests;