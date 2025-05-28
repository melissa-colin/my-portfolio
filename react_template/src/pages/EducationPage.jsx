import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiMapPin, FiBookOpen } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet';

const EducationPage = () => {
  const { t, language } = useLanguage();
  const [education, setEducation] = useState([]);
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
      const dummyEducation = [
        {
          id: 1,
          degree: language === 'en' ? "Ph.D. in Computer Science" : "Doctorat en Informatique",
          specialization: language === 'en' ? "Specialization in AI and Computer Vision" : "Spécialisation en IA et Vision par Ordinateur",
          institution: language === 'en' ? "University of Paris" : "Université de Paris",
          location: language === 'en' ? "Paris, France" : "Paris, France",
          period: language === 'en' ? "2014 - 2018" : "2014 - 2018",
          description: language === 'en' 
            ? "Thesis: 'Explainable Deep Learning Methods for Computer Vision'. Developed novel approaches for interpreting convolutional neural networks. Received honors for research contributions."
            : "Thèse: 'Méthodes d'Apprentissage Profond Explicables pour la Vision par Ordinateur'. Développement de nouvelles approches pour interpréter les réseaux de neurones convolutifs. Distinctions reçues pour les contributions à la recherche.",
          achievements: [
            language === 'en' ? "Published 4 papers in top-tier conferences (CVPR, NeurIPS)" : "Publication de 4 articles dans des conférences prestigieuses (CVPR, NeurIPS)",
            language === 'en' ? "Recipient of the Excellence in Research Award" : "Lauréate du Prix d'Excellence en Recherche",
            language === 'en' ? "Teaching assistant for Advanced Machine Learning" : "Assistante d'enseignement pour l'Apprentissage Automatique Avancé"
          ]
        },
        {
          id: 2,
          degree: language === 'en' ? "M.Sc. in Artificial Intelligence" : "Master en Intelligence Artificielle",
          specialization: language === 'en' ? "Machine Learning and Computer Vision" : "Apprentissage Automatique et Vision par Ordinateur",
          institution: language === 'en' ? "Technical University of Lyon" : "Université Technique de Lyon",
          location: language === 'en' ? "Lyon, France" : "Lyon, France",
          period: language === 'en' ? "2012 - 2014" : "2012 - 2014",
          description: language === 'en'
            ? "Focus on machine learning algorithms and computer vision techniques. Master's thesis on 'Efficient Deep Learning for Image Classification'."
            : "Concentration sur les algorithmes d'apprentissage automatique et les techniques de vision par ordinateur. Thèse de master sur 'l'Apprentissage Profond Efficace pour la Classification d'Images'.",
          achievements: [
            language === 'en' ? "Graduated with highest honors (Summa Cum Laude)" : "Diplômée avec les plus hautes distinctions (Mention Très Bien)",
            language === 'en' ? "Research internship at National Research Center" : "Stage de recherche au Centre National de Recherche",
            language === 'en' ? "Published master's research in international journal" : "Publication de la recherche de master dans un journal international"
          ]
        },
        {
          id: 3,
          degree: language === 'en' ? "B.Sc. in Computer Science" : "Licence en Informatique",
          specialization: language === 'en' ? "Mathematics and Computer Science" : "Mathématiques et Informatique",
          institution: language === 'en' ? "University of Toulouse" : "Université de Toulouse",
          location: language === 'en' ? "Toulouse, France" : "Toulouse, France",
          period: language === 'en' ? "2009 - 2012" : "2009 - 2012",
          description: language === 'en'
            ? "Core curriculum in computer science, mathematics, and algorithms. Developed strong foundations in programming and computational theory."
            : "Programme principal en informatique, mathématiques et algorithmes. Développement de bases solides en programmation et en théorie computationnelle.",
          achievements: [
            language === 'en' ? "Dean's List for academic excellence (all semesters)" : "Tableau d'honneur du doyen pour l'excellence académique (tous les semestres)",
            language === 'en' ? "Undergraduate research project on algorithm optimization" : "Projet de recherche de premier cycle sur l'optimisation des algorithmes",
            language === 'en' ? "President of Computer Science Student Association" : "Présidente de l'Association des Étudiants en Informatique"
          ]
        }
      ];
      setEducation(dummyEducation);
      setIsLoading(false);
    }, 1000);
  }, [language]);

  return (
    <>
      <Helmet>
        <title>{language === 'en' ? 'Education | Mélissa Colin' : 'Formation | Mélissa Colin'}</title>
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
              {language === 'en' ? 'Education' : 'Formation'}
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'My academic background and educational qualifications in computer science, AI, and related fields.' 
                : 'Mon parcours académique et mes qualifications éducatives en informatique, IA et domaines connexes.'}
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
              {education.map((edu) => (
                <motion.div 
                  key={edu.id}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 hover:border-red-900/50 transition-colors"
                  variants={itemVariants}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-900/30 text-red-500">
                        <FiAward size={24} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                        <div className="flex items-center text-sm text-red-500 font-semibold">
                          <FiCalendar className="mr-1" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                      
                      <div className="text-lg text-red-400 mb-2">{edu.specialization}</div>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6">
                        <div className="flex items-center text-gray-300">
                          <FiBookOpen className="mr-1" />
                          <span>{edu.institution}</span>
                        </div>
                        <span className="hidden md:block text-gray-600">•</span>
                        <div className="flex items-center text-gray-400 text-sm">
                          <FiMapPin className="mr-1" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 mb-6">{edu.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-white font-semibold mb-2">
                          {language === 'en' ? 'Achievements & Activities' : 'Réalisations & Activités'}
                        </h4>
                        <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
                          {edu.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
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
            <p className="text-gray-400">
              {language === 'en' 
                ? 'In addition to formal education, I regularly participate in workshops, conferences, and continuing education to stay at the forefront of AI research.' 
                : 'En plus de l\'éducation formelle, je participe régulièrement à des ateliers, des conférences et à la formation continue pour rester à la pointe de la recherche en IA.'}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default EducationPage;