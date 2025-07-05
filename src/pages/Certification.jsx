import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiAward, FiCheckCircle, FiExternalLink, FiFilter } from 'react-icons/fi';
import en from '../data/translations/en';
import fr from '../data/translations/fr';
import SEOHead from '../components/SEOHead';

const Certification = () => {
  const { language } = useLanguage();
  const t = language === 'en' ? en.certification : fr.certification;

  // Categories and certifications from translation
  const categoriesList = t.categoriesList;
  const certifications = t.certifications;

  // State for selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredCertifications, setFilteredCertifications] = useState(t.certifications);

  // Toujours filtrer à partir de t.certifications
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredCertifications(t.certifications);
    } else {
      setFilteredCertifications(
        t.certifications.filter(cert =>
          cert.categories.some(category => selectedCategories.includes(category))
        )
      );
    }
  }, [selectedCategories, t.certifications]);

  // Fonction pour (dé)sélectionner une catégorie
  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Réinitialise tout quand on efface les filtres
  const clearFilters = () => {
    setSelectedCategories([]);
    setFilteredCertifications(t.certifications);
  };



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
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <SEOHead pageType="certification" />
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
                className="text-4xl md:text-5xl font-bold mb-6 text-white flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <FiAward className="text-red-500" />
                {t.pageTitle}
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
                {t.pageIntro}
              </motion.p>
            </div>
          </div>
        </section>
        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
              {/* Main Content */}
              <div className="w-full lg:w-2/3 pr-0 lg:pr-8">
                {/* Category filter section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mb-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <FiFilter className="text-red-600 dark:text-red-500 text-xl mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t.filterByCategory}
                      </h3>
                    </div>
                    {selectedCategories.length > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-red-600 dark:text-red-500 hover:underline flex items-center"
                      >
                        {t.clearFilters}
                      </button>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {categoriesList
                      .filter(category =>
                        t.certifications.some(cert => cert.categories.includes(category.id))
                      )
                      .map((category) => (
                        <button
                          key={category.id}
                          onClick={() => toggleCategory(category.id)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategories.includes(category.id)
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                        >
                          {category.name}
                        </button>
                      ))}
                  </div>
                </div>
                {/* Grid of certification cards */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6" // Juste cette classe
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {filteredCertifications.map((certification) => (
                    <motion.div
                      key={certification.id}
                      layout // Ajoute cette ligne !
                      className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden border-t border-red-100 dark:border-red-900/30 flex flex-col h-full"
                      variants={itemVariants}
                      whileHover={{
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex flex-wrap items-start justify-between mb-4 gap-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                              {certification.title}
                              {certification.verified && (
                                <span className="ml-2 text-green-500 dark:text-green-400" title={t.verified}>
                                  <FiCheckCircle />
                                </span>
                              )}
                            </h3>
                            <div className="text-gray-600 dark:text-gray-400 mt-1">
                              {certification.issuer}
                            </div>
                          </div>
                          <div className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            {certification.date}
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                          {certification.description}
                        </p>
                        {/* Categories tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {certification.categories.map(catId => {
                            const categoryObj = categoriesList.find(cat => cat.id === catId);
                            return (
                              <span
                                key={catId}
                                className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                              >
                                {categoryObj?.name}
                              </span>
                            );
                          })}
                        </div>
                        <a
                          href={certification.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-red-600 dark:text-red-500 hover:underline mt-auto"
                        >
                          <FiExternalLink className="mr-1" />
                          {t.viewCertificate}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                {/* Message when no certifications match the current filter */}
                {filteredCertifications.length === 0 && (
                  <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    {t.noMatch}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Certification;