import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiGithub, FiExternalLink, FiFilter } from 'react-icons/fi';

const Projects = () => {
  const { t, language } = useLanguage();
  
  // Sample projects data
  const projects = [
    {
      id: 1,
      title: {
        en: "XAI Dashboard",
        fr: "Tableau de bord XAI"
      },
      description: {
        en: "An interactive dashboard for visualizing and understanding how deep neural networks make decisions in computer vision applications.",
        fr: "Un tableau de bord interactif pour visualiser et comprendre comment les réseaux de neurones profonds prennent des décisions dans les applications de vision par ordinateur."
      },
      image: "/assets/images/project-xai.jpg",
      technologies: ["Python", "TensorFlow", "React", "D3.js"],
      github: "https://github.com/melissacolin/xai-dashboard",
      demo: "https://xai-demo.example.com",
      category: "xai"
    },
    {
      id: 2,
      title: {
        en: "Bias Detection Toolkit",
        fr: "Boîte à outils de détection des biais"
      },
      description: {
        en: "A comprehensive toolkit for identifying and mitigating various biases in ML models and datasets for more ethical AI development.",
        fr: "Une boîte à outils complète pour identifier et atténuer divers biais dans les modèles et ensembles de données ML pour un développement d'IA plus éthique."
      },
      image: "/assets/images/project-bias.jpg",
      technologies: ["Python", "Scikit-learn", "Pandas"],
      github: "https://github.com/melissacolin/bias-detection",
      demo: null,
      category: "ethics"
    },
    {
      id: 3,
      title: {
        en: "ViT vs CNN Explainability",
        fr: "Explicabilité ViT vs CNN"
      },
      description: {
        en: "Research project comparing the explainability of Vision Transformers and CNNs using LIME, SHAP and Grad-CAM techniques.",
        fr: "Projet de recherche comparant l'explicabilité des Vision Transformers et des CNN en utilisant les techniques LIME, SHAP et Grad-CAM."
      },
      image: "/assets/images/project-vit-cnn.jpg",
      technologies: ["PyTorch", "Python", "LIME", "SHAP", "Grad-CAM"],
      github: "https://github.com/melissacolin/vit-cnn-explainability",
      demo: "https://hal.science/hal-04641791v1",
      category: "vision"
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
                <button className="px-4 py-2 bg-red-600 text-white rounded-md">
                  {t('projects.allCategories')}
                </button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
                  XAI
                </button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
                  Vision
                </button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
                  Ethics
                </button>
              </div>
            </div>
            
            <div className="w-full">
              <input
                type="text"
                placeholder={t('projects.search')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title[language]}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title[language]}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description[language]}
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
                      <span>{project.demo.includes("hal.science") ? "Publication" : "Demo"}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Projects;