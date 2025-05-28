import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiExternalLink, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet';

const ExperiencePage = () => {
  const { t, language } = useLanguage();
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Animation variants
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

  // Placeholder data - this would be fetched from an API in a real implementation
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      const dummyExperiences = [
        {
          id: 1,
          title: language === 'en' ? "Senior AI Researcher" : "Chercheuse Senior en IA",
          company: "AI Research Lab, University of Technology",
          location: language === 'en' ? "Paris, France" : "Paris, France",
          period: language === 'en' ? "January 2022 - Present" : "Janvier 2022 - Présent",
          description: language === 'en' 
            ? "Leading research in Explainable AI methods for computer vision applications. Developed novel techniques for interpreting deep neural networks. Published 5 papers in top-tier conferences and journals."
            : "Direction de recherche sur les méthodes d'IA explicable pour les applications de vision par ordinateur. Développement de nouvelles techniques pour interpréter les réseaux de neurones profonds. Publication de 5 articles dans des conférences et journaux de premier plan.",
          technologies: ["PyTorch", "TensorFlow", "Python", "Computer Vision", "XAI"]
        },
        {
          id: 2,
          title: language === 'en' ? "AI Research Scientist" : "Scientifique de Recherche en IA",
          company: "Tech Innovation Labs",
          location: language === 'en' ? "Lyon, France" : "Lyon, France",
          period: language === 'en' ? "March 2019 - December 2021" : "Mars 2019 - Décembre 2021",
          description: language === 'en'
            ? "Researched and implemented state-of-the-art computer vision algorithms. Collaborated with cross-functional teams to integrate AI solutions into production environments."
            : "Recherche et implémentation d'algorithmes de vision par ordinateur à la pointe de la technologie. Collaboration avec des équipes pluridisciplinaires pour intégrer des solutions d'IA dans des environnements de production.",
          technologies: ["CUDA", "PyTorch", "Docker", "MLOps", "CI/CD"]
        },
        {
          id: 3,
          title: language === 'en' ? "Research Assistant" : "Assistant de Recherche",
          company: language === 'en' ? "National Research Institute" : "Institut National de Recherche",
          location: language === 'en' ? "Toulouse, France" : "Toulouse, France",
          period: language === 'en' ? "September 2017 - February 2019" : "Septembre 2017 - Février 2019",
          description: language === 'en'
            ? "Assisted senior researchers in developing and evaluating machine learning models for image recognition. Contributed to 3 published papers and presented findings at international conferences."
            : "Assistance aux chercheurs seniors dans le développement et l'évaluation de modèles d'apprentissage automatique pour la reconnaissance d'images. Contribution à 3 articles publiés et présentation des résultats lors de conférences internationales.",
          technologies: ["Scikit-learn", "Keras", "NumPy", "Pandas", "Data Visualization"]
        }
      ];
      setExperiences(dummyExperiences);
      setIsLoading(false);
    }, 1000);
  }, [language]);

  return (
    <>
      <Helmet>
        <title>{language === 'en' ? 'Experience | Mélissa Colin' : 'Expérience | Mélissa Colin'}</title>
      </Helmet>
      
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              {language === 'en' ? 'Professional Experience' : 'Expérience Professionnelle'}
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'My journey in AI research and development, focusing on explainable AI and computer vision.' 
                : 'Mon parcours dans la recherche et le développement en IA, centré sur l\'IA explicable et la vision par ordinateur.'}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div 
              className="space-y-12 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {experiences.map((experience) => (
                <motion.div 
                  key={experience.id}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 hover:border-red-900/50 transition-colors"
                  variants={itemVariants}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-900/30 text-red-500">
                        <FiBriefcase size={24} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <h3 className="text-2xl font-bold text-white">{experience.title}</h3>
                        <div className="flex items-center text-sm text-red-500 font-semibold">
                          <FiCalendar className="mr-1" />
                          <span>{experience.period}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6">
                        <div className="flex items-center text-gray-300">
                          <a href="#" className="hover:text-red-500 transition-colors flex items-center">
                            {experience.company} <FiExternalLink className="ml-1 text-sm" />
                          </a>
                        </div>
                        <span className="hidden md:block text-gray-600">•</span>
                        <div className="flex items-center text-gray-400 text-sm">
                          <FiMapPin className="mr-1" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 mb-6">{experience.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-red-900/20 text-red-400 text-sm rounded-full"
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
              {language === 'en' 
                ? 'For more information about my professional experience, please contact me.' 
                : 'Pour plus d\'informations sur mon expérience professionnelle, veuillez me contacter.'}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ExperiencePage;