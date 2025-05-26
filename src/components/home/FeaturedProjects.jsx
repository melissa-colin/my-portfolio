import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi';

const FeaturedProjects = ({ language }) => {
  // Featured projects data
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
      demo: "https://xai-demo.example.com"
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
      demo: null
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
      demo: "https://hal.science/hal-04641791v1"
    }
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {language === 'fr' ? 'Projets en Vedette' : 'Featured Projects'}
          </h2>
          <div className="section-bar mx-auto"></div>
          <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez mes projets récents en IA explicable et vision par ordinateur.'
              : 'Discover my recent projects in explainable AI and computer vision.'}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
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
        </motion.div>
        
        <div className="text-center mt-12">
          <Link to="/projects" className="btn-primary inline-flex items-center">
            {language === 'fr' ? 'Voir Tous les Projets' : 'View All Projects'}
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;