import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiMail, FiMapPin, FiSend, FiPhone, FiLinkedin, FiGithub, FiMessageCircle } from 'react-icons/fi';
import { SiMedium, SiGooglescholar, SiSignal } from 'react-icons/si';


const Contact = () => {
  const { t, language } = useLanguage();

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
      {/* Hero Section with CTA */}
        <section className="bg-gray-900 dark:bg-black py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-opacity-70">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-transparent to-red-900/20 opacity-80"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            className="mt-6 text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('contact.subtitle')}
          </motion.p>

            </div>
          </div>
        </section>

      {/* Big CTA Email Button */}
      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <a
          href={`mailto:${t('contact.emailAddress')}`}
          className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-2xl font-bold rounded-full shadow-lg transition-colors"
        >
          <FiMail className="mr-3 text-3xl" />
          {t('contact.ctaMail')}
        </a>
      </motion.div>
      {/* Signal CTA + Location & Phone side by side */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Signal CTA */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
                <SiSignal className="mr-2 text-blue-500" />
                {t('contact.signalTitle')}
              </h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">{t('contact.signalText')}</p>
              <a
                href={t('contact.signalLink')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow transition-colors"
              >
                <FiMessageCircle className="mr-2 text-2xl" />
                {t('contact.signalButton')}
              </a>
            </div>
            {/* Location & Phone */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center">
                {t('contact.locationAndPhone')}
              </h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                    <FiMapPin className="text-red-600 dark:text-red-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                      {t('contact.location')}
                    </h4>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {t('contact.place')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                    <FiPhone className="text-red-600 dark:text-red-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                      {language === 'en' ? 'Phone' : 'Téléphone'}
                    </h4>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {t('contact.phone')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Socials */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">
            {t('contact.followMe')}
          </h2>
          <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
            {t('contact.socialMedia')}
          </p>
          <div className="flex justify-center space-x-8">
            <a
              href={t('contact.linkedin')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-900 shadow-lg p-7 rounded-full text-blue-700 dark:text-blue-400 hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-950 dark:hover:text-blue-300 transition-colors text-6xl"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a
              href={t('contact.github')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-900 shadow-lg p-7 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white transition-colors text-6xl"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href={t('contact.medium')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-900 shadow-lg p-7 rounded-full text-green-700 dark:text-green-400 hover:bg-green-50 hover:text-green-800 dark:hover:bg-green-950 dark:hover:text-green-300 transition-colors text-6xl"
              aria-label="Medium"
            >
              <SiMedium />
            </a>
            <a
              href={t('contact.scholar')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-900 shadow-lg p-7 rounded-full text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 hover:text-yellow-800 dark:hover:bg-yellow-950 dark:hover:text-yellow-300 transition-colors text-6xl"
              aria-label="Google Scholar"
            >
              <SiGooglescholar />
            </a>
          </div>
            </div>
          </div>
        </section>
    </motion.div>
  );
};

export default Contact;