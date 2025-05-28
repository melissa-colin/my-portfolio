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

  // Enhanced animation variants
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
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 50,
        damping: 10,
        duration: 0.8
      }
    }
  };
  
  const cardVariants = {
    hidden: { 
      y: 40, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 70,
        damping: 14,
        duration: 0.7
      }
    }
  };
  
  const imageVariants = {
    hover: {
      scale: 1.07,
      filter: "brightness(1.1)",
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  const buttonHoverVariants = {
    hover: { 
      y: -2, 
      x: 2,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 z-0">
        <motion.div 
          className="absolute -top-20 -left-20 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {language === 'fr' ? 'Projets en Vedette' : 'Featured Projects'}
          </motion.h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full mt-4"></div>
          
          <motion.p 
            className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {language === 'fr' 
              ? 'Découvrez mes projets récents en IA explicable et vision par ordinateur.'
              : 'Discover my recent projects in explainable AI and computer vision.'}
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 10 
                }
              }}
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col h-full border border-gray-700 shadow-lg hover:shadow-red-500/20 transition-all duration-300 group"
            >
              <div className="h-56 overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-red opacity-0 group-hover:opacity-30 z-10 transition-opacity duration-300"
                />
                <motion.img 
                  src={project.image}
                  alt={project.title[language]}
                  className="w-full h-full object-cover"
                  variants={imageVariants}
                  whileHover="hover"
                  initial={{ scale: 1.01 }}
                />
              </div>
              
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors duration-300">
                  {project.title[language]}
                </h3>
                
                <p className="text-gray-300 mb-5 leading-relaxed">
                  {project.description[language]}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full border border-red-500/30 text-red-400 bg-red-500/10"
                      whileHover={{ 
                        backgroundColor: "rgba(239, 68, 68, 0.2)",
                        color: "#ffffff", 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div className="p-5 border-t border-gray-700 mt-auto flex justify-between items-center">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-400 flex items-center group/button"
                  whileHover="hover"
                  variants={buttonHoverVariants}
                >
                  <FiGithub className="mr-2 group-hover/button:rotate-12 transition-transform duration-300" />
                  <span>GitHub</span>
                </motion.a>
                
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 flex items-center group/button"
                    whileHover="hover"
                    variants={buttonHoverVariants}
                  >
                    <FiExternalLink className="mr-2 group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform duration-300" />
                    <span>{project.demo.includes("hal.science") ? "Publication" : "Demo"}</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link 
            to="/projects" 
            className="btn-primary inline-flex items-center group relative overflow-hidden px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-medium hover:shadow-lg hover:shadow-red-600/30 transition duration-300"
          >
            <span className="relative z-10 flex items-center">
              {language === 'fr' ? 'Voir Tous les Projets' : 'View All Projects'}
              <motion.span 
                className="ml-2 flex"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5, 
                  ease: "easeInOut" 
                }}
              >
                <FiArrowRight />
              </motion.span>
            </span>
            <motion.span 
              className="absolute inset-0 -z-10 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;