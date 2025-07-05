import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiGithub, FiExternalLink, FiFilter } from 'react-icons/fi';
import OptimizedImage from '../components/common/OptimizedImage';
import SEOHead from '../components/SEOHead';

const Projects = () => {
  const { t } = useLanguage();

  // Récupération des projets et catégories depuis les fichiers de traduction
  const projects = t('projects.list');
  const categories = Array.from(
    new Set(projects.map(project => project.category))
  ).reduce((acc, category) => {
    acc[category] = category;
    return acc;
  }, {});

  // Gestion du filtre et de la recherche
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

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
    <>
      <SEOHead pageType="projects" />
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
                {t('projects.title')}
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
                {t('projects.subtitle')}
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center">
                  <FiFilter className="text-red-600 dark:text-red-500 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('projects.filter')}
                  </h2>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-4 py-2 rounded-md ${selectedCategory === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    {t('projects.allCategories')}
                  </button>
                  {Object.entries(categories).map(([key, label]) => (
                    <button
                      key={key}
                      className={`px-4 py-2 rounded-md ${selectedCategory === key ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                      onClick={() => setSelectedCategory(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="w-full">
                <input
                  type="text"
                  placeholder={t('projects.search')}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden">
                    <OptimizedImage 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      width={400}
                      height={192}
                      quality={85}
                    />
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 rounded text-red-800 dark:text-red-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto flex justify-between items-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 flex items-center"
                    >
                      <FiGithub className="mr-1" />
                      <span>GitHub</span>
                    </a>
                    
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center"
                      >
                        <FiExternalLink className="mr-1" />
                        <span>{project.demo.includes("hal.science") ? "Publication" : t('projects.viewLive')}</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Projects;