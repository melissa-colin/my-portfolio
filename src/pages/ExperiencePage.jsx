import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiExternalLink, FiCalendar, FiMapPin, FiCheckSquare, FiSquare } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet';
import OptimizedImage from '../components/common/OptimizedImage';

const ExperiencePage = () => {
  const { t, language } = useLanguage();
  const experiences = t('experience.list') || [];
  const noExperienceText = t('experience.noExperience') || "No experience available.";
  const pageTitle = t('experience.pageTitle') || (language === 'en' ? 'Professional Experience' : 'Expérience Professionnelle');
  const pageSubtitle = t('experience.pageSubtitle') || '';
  const moreInfo = t('experience.moreInfo') || '';

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const [hoveredId, setHoveredId] = useState(null);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // --- FILTRE PAR TYPE ---
  // Récupère tous les types uniques présents dans les expériences
  const allTypes = useMemo(() => {
    const types = experiences.map(exp => exp.type).filter(Boolean);
    return Array.from(new Set(types));
  }, [experiences]);

  // State pour les types sélectionnés (sélection multiple)
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Fonction de gestion de sélection/déselection
  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Filtrage des expériences selon les types sélectionnés
  const filteredExperiences = useMemo(() => {
    if (selectedTypes.length === 0) return experiences;
    return experiences.filter(exp => selectedTypes.includes(exp.type));
  }, [experiences, selectedTypes]);

  return (
    <>
      <Helmet>
        <title>{pageTitle} | {t('home.heroTitle')}</title>
      </Helmet>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pt-24 pb-20"
      >
        {/* Hero Section */}
        <section className="bg-gray-900 dark:bg-black py-16 relative overflow-hidden exp-page">
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
                {pageTitle}
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
                {pageSubtitle}
              </motion.p>
            </div>
          </div>
        </section>
        {/* Experience Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Filtres par type */}
            {allTypes.length > 0 && (
              <div className="mb-10 flex flex-wrap gap-4 justify-center">
                {allTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={`flex items-center px-4 py-2 rounded-full border transition-colors
                      ${selectedTypes.includes(type)
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30'}
                    `}
                  >
                    {selectedTypes.includes(type) ? (
                      <FiCheckSquare className="mr-2" />
                    ) : (
                      <FiSquare className="mr-2" />
                    )}
                    <span>{type}</span>
                  </button>
                ))}
                {selectedTypes.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedTypes([])}
                    className="ml-2 px-3 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {language === 'fr' ? 'Réinitialiser' : 'Reset'}
                  </button>
                )}
              </div>
            )}
            {filteredExperiences.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <span className="text-gray-400 text-lg">{noExperienceText}</span>
              </div>
            ) : (
               <motion.div 
              className="space-y-12 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredExperiences.map((experience) => (
                <motion.div 
                  key={experience.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredId(experience.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                    <div className="md:flex">
                      <div className="md:w-1/4 flex flex-col items-center justify-center bg-red-900/10 dark:bg-red-900/20">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-900/30 text-red-500 m-6">
                          {experience.logo ? (
                            <OptimizedImage
                              src={experience.logo}
                              alt={experience.company}
                              className="w-16 h-16 flex items-center justify-center rounded-full bg-red-900/30 text-red-500 m-6"
                              width={64}
                              height={64}
                              quality={90}
                            />
                          ) : (
                            <FiBriefcase size={32} />
                          )}
                        </div>
                        <span className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
                          {experience.type}
                        </span>
                      </div>
                      <div className="md:w-3/4 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{experience.title}</h3>
                          <div className="flex items-center text-sm text-red-500 font-semibold">
                            <FiCalendar className="mr-1" />
                            <span>{experience.period}</span>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6">
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            {experience.companyUrl ? (
                              <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors flex items-center">
                                {experience.company} <FiExternalLink className="ml-1 text-sm" />
                              </a>
                            ) : (
                              <span>{experience.company}</span>
                            )}
                          </div>
                          <span className="hidden md:block text-gray-400 dark:text-gray-600">•</span>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <FiMapPin className="mr-1" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">{experience.description}</p>
                    {/* Affiche les détails si survolé et detail existe */}
                    {experience.detail && hoveredId === experience.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-gray-100 dark:bg-gray-900 rounded p-4 mb-4 text-gray-800 dark:text-gray-200"
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: experience.detail }}
                        />
                      </motion.div>
                    )}
                    <div className="flex flex-wrap gap-2">
                          {experience.technologies && experience.technologies.map((tech, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-gray-200 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <p className="text-gray-400 italic">
                {moreInfo}
              </p>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default ExperiencePage;