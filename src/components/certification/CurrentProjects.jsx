import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiCode, FiExternalLink } from 'react-icons/fi';
import en from '../../data/translations/en';
import fr from '../../data/translations/fr';

const CurrentProjects = () => {
  const { language } = useLanguage();
  const t = language === 'fr' ? fr : en;
  const projects = t.researchcurrentProjectsList || [];
  const noProjectsMsg = t.researchnoProjects;

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
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <FiCode className="text-red-600 dark:text-red-500 text-3xl mr-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t.researchcurrentProjects}
            </h2>
          </div>
          
          <div className="section-bar mb-8"></div>
          
          {projects.length === 0 ? (
            <div className="text-gray-600 dark:text-gray-300 text-center py-8">
              {noProjectsMsg}
            </div>
          ) : (
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {projects.map((project) => (
                <motion.div 
                  key={project.id} 
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        project.status.includes('Progress') || project.status.includes('Cours') 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : project.status.includes('Active') || project.status.includes('Actif')
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : project.status.includes('New') || project.status.includes('Nouveau')
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-600 dark:text-red-500 hover:underline"
                    >
                      <FiExternalLink className="mr-1" />
                      {language === 'en' ? 'View Project' : 'Voir le Projet'}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CurrentProjects;