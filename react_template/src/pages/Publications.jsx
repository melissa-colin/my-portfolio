import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiBookOpen, FiDownload } from 'react-icons/fi';

const Publications = () => {
  const { t, language } = useLanguage();
  
  // Sample publications data
  const publications = [
    {
      id: 1,
      title: {
        en: "Explainable Deep Learning for Computer Vision: Challenges and Opportunities",
        fr: "Apprentissage Profond Explicable pour la Vision par Ordinateur: Défis et Opportunités"
      },
      authors: "Colin, M., Dubois, J., Martinez, A.",
      venue: "PFIA 2024",
      year: "2024",
      url: "https://hal.science/hal-04641791v1",
      abstract: {
        en: "This paper reviews recent advances in explainability methods for deep learning models in computer vision applications, with a focus on the trade-offs between model performance and interpretability.",
        fr: "Cet article examine les avancées récentes dans les méthodes d'explicabilité pour les modèles d'apprentissage profond dans les applications de vision par ordinateur, en mettant l'accent sur les compromis entre les performances du modèle et l'interprétabilité."
      }
    },
    {
      id: 2,
      title: {
        en: "Attention-Based Explanations for Vision Transformers",
        fr: "Explications Basées sur l'Attention pour les Vision Transformers"
      },
      authors: "Bernard, L., Colin, M., Thomas, R.",
      venue: "ArXiv Preprint",
      year: "2023",
      url: "https://arxiv.org/abs/2304.12345",
      abstract: {
        en: "We propose a novel method for generating explanations from Vision Transformers by analyzing and interpreting the attention patterns across different layers and heads.",
        fr: "Nous proposons une nouvelle méthode pour générer des explications à partir des Vision Transformers en analysant et en interprétant les motifs d'attention à travers différentes couches et têtes."
      }
    }
  ];

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
            <div className="flex items-center mb-8">
              <FiBookOpen className="text-red-600 dark:text-red-500 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('publications.title')}
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
              {publications.map(pub => (
                <motion.div 
                  key={pub.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {pub.title[language]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {pub.authors} • {pub.venue} • {pub.year}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {pub.abstract[language]}
                    </p>
                    <div className="flex items-center">
                      <a 
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-red-600 dark:text-red-500 hover:underline mr-4"
                      >
                        <FiBookOpen className="mr-2" />
                        {language === 'en' ? 'View Publication' : 'Voir la publication'}
                      </a>
                      <a 
                        href="#"
                        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500"
                      >
                        <FiDownload className="mr-2" />
                        {language === 'en' ? 'Download PDF' : 'Télécharger le PDF'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Publications;