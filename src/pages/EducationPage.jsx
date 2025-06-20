import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiMapPin, FiBookOpen } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet';

// Import translations
import en from '../data/translations/en';
import fr from '../data/translations/fr';

const EducationPage = () => {
  const { t, language } = useLanguage();

  // Select education data based on language
  const educationData =
    language === 'fr'
      ? fr.education?.list || []
      : en.education?.list || [];

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-24 pb-20"
    >
      <Helmet>
        <title>
          {t('nav.education')}
          {' | '}
          {t('home.heroTitle')}
        </title>
      </Helmet>

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
              {t('nav.education')}
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
              {language === 'fr'
                ? fr.education?.subtitle
                : en.education?.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 education-page">
        <div className="container mx-auto px-4">
          {educationData.length === 0 ? (
            <div className="text-center text-gray-500 py-32">
              <p>
                {language === 'fr'
                  ? 'Aucune formation à afficher.'
                  : 'No education to display.'}
              </p>
            </div>
          ) : (
            <motion.div
              className="space-y-12 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {educationData.map((edu) => (
                <motion.div
                  key={edu.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-800 hover:border-red-900/50 transition-colors"
                  variants={itemVariants}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-900/30 text-red-500">
                        <FiAward size={24} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                        <div className="flex items-center text-sm text-red-500 font-semibold">
                          <FiCalendar className="mr-1" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                      <div className="text-lg text-red-400 mb-2">{edu.specialization}</div>
                      {/* GPA & Rank */}
                      {(edu.gpa || edu.rank) && (
                        <div className="flex flex-wrap items-center gap-4 mb-2">
                          {edu.gpa && (
                            <span className="inline-flex items-center text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                              <span className="font-semibold mr-1">
                                {language === 'fr' ? fr.education?.gpa : en.education?.gpa}:
                              </span>
                              {edu.gpa}
                            </span>
                          )}
                          {edu.rank && (
                            <span className="inline-flex items-center text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                              <span className="font-semibold mr-1">
                                {language === 'fr' ? fr.education?.rank : en.education?.rank}:
                              </span>
                              {edu.rank}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6">
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <FiBookOpen className="mr-1" />
                          <span>{edu.institution}</span>
                        </div>
                        <span className="hidden md:block text-gray-400 dark:text-gray-600">•</span>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <FiMapPin className="mr-1" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">{edu.description}</p>
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-gray-900 dark:text-white font-semibold mb-2">
                            {language === 'fr'
                              ? 'Réalisations & Activités'
                              : 'Achievements & Activities'}
                          </h4>
                          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-1 ml-2">
                            {edu.achievements.map((achievement, index) => (
                              <li key={index} dangerouslySetInnerHTML={{ __html: achievement }} />
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {educationData.length > 0 && (
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <p className="text-gray-400">
                {language === 'fr'
                  ? fr.education?.footer
                  : en.education?.footer}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default EducationPage;