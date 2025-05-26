import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiCode, FiExternalLink } from 'react-icons/fi';

const CurrentProjects = () => {
  const { language } = useLanguage();

  // Current research projects data with English and French versions
  const projects = [
    {
      id: 'visionformer',
      title: {
        en: 'VisionFormer: A Hybrid CNN-Transformer Architecture',
        fr: 'VisionFormer: Une Architecture Hybride CNN-Transformer'
      },
      status: {
        en: 'In Progress',
        fr: 'En Cours'
      },
      description: {
        en: 'Developing a novel hybrid architecture that combines the local feature extraction strengths of CNNs with the global context understanding of Vision Transformers. The model aims to balance computational efficiency with superior performance on complex image recognition tasks.',
        fr: 'Développement d\'une nouvelle architecture hybride qui combine les forces d\'extraction de caractéristiques locales des CNN avec la compréhension du contexte global des Vision Transformers. Le modèle vise à équilibrer l\'efficacité computationnelle avec des performances supérieures sur des tâches complexes de reconnaissance d\'images.'
      },
      link: 'https://github.com/melissacolin/visionformer'
    },
    {
      id: 'xaibench',
      title: {
        en: 'XAIBench: Comprehensive Benchmarking Framework for XAI Methods',
        fr: 'XAIBench: Cadre Complet d\'Évaluation pour Méthodes XAI'
      },
      status: {
        en: 'Active',
        fr: 'Actif'
      },
      description: {
        en: 'Creating a standardized benchmarking framework to evaluate and compare different explainability methods across multiple dimensions: faithfulness to the model, comprehensibility to humans, and computational efficiency. The goal is to establish quantifiable metrics for XAI quality.',
        fr: 'Création d\'un cadre d\'évaluation standardisé pour évaluer et comparer différentes méthodes d\'explicabilité selon plusieurs dimensions : fidélité au modèle, compréhensibilité pour les humains et efficacité computationnelle. L\'objectif est d\'établir des métriques quantifiables pour la qualité de l\'XAI.'
      },
      link: 'https://xaibench.org'
    },
    {
      id: 'medxai',
      title: {
        en: 'MedXAI: Explainable Medical Image Analysis',
        fr: 'MedXAI: Analyse Explicable d\'Images Médicales'
      },
      status: {
        en: 'Collaboration',
        fr: 'Collaboration'
      },
      description: {
        en: 'Collaborative project with medical researchers to develop explainable AI systems for medical image analysis, focusing on early cancer detection. The project emphasizes creating explanations that are clinically meaningful and actionable for healthcare professionals.',
        fr: 'Projet collaboratif avec des chercheurs médicaux pour développer des systèmes d\'IA explicables pour l\'analyse d\'images médicales, axé sur la détection précoce du cancer. Le projet met l\'accent sur la création d\'explications cliniquement significatives et exploitables pour les professionnels de la santé.'
      },
      link: 'https://www.bordeaux-neurocampus.fr/projects/medxai'
    },
    {
      id: 'attentionxai',
      title: {
        en: 'AttentionXAI: Making Attention Mechanisms More Transparent',
        fr: 'AttentionXAI: Rendre les Mécanismes d\'Attention Plus Transparents'
      },
      status: {
        en: 'New',
        fr: 'Nouveau'
      },
      description: {
        en: 'Investigating how attention mechanisms in neural networks can be designed to be inherently more interpretable, while maintaining or improving model performance. This project explores novel attention architectures and visualization techniques.',
        fr: 'Étude de la façon dont les mécanismes d\'attention dans les réseaux neuronaux peuvent être conçus pour être intrinsèquement plus interprétables, tout en maintenant ou améliorant les performances du modèle. Ce projet explore de nouvelles architectures d\'attention et techniques de visualisation.'
      },
      link: 'https://github.com/melissacolin/attention-xai'
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
              {language === 'en' ? 'Current Projects' : 'Projets Actuels'}
            </h2>
          </div>
          
          <div className="section-bar mb-8"></div>
          
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
                      {project.title[language]}
                    </h3>
                    
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      project.status[language].includes('Progress') || project.status[language].includes('Cours') 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : project.status[language].includes('Active') || project.status[language].includes('Actif')
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : project.status[language].includes('New') || project.status[language].includes('Nouveau')
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                    }`}>
                      {project.status[language]}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description[language]}
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
        </div>
      </div>
    </section>
  );
};

export default CurrentProjects;