import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiBookOpen } from 'react-icons/fi';

const ResearchInterests = () => {
  const { language } = useLanguage();

  // Research interests with English and French versions
  const interests = [
    {
      id: 'xai',
      title: {
        en: 'Explainable AI (XAI)',
        fr: 'IA Explicable (XAI)'
      },
      description: {
        en: 'Developing methods to make neural network decisions more transparent, interpretable, and explainable, particularly in high-stakes domains like healthcare and autonomous systems.',
        fr: 'Développement de méthodes pour rendre les décisions des réseaux neuronaux plus transparentes, interprétables et explicables, en particulier dans des domaines critiques comme la santé et les systèmes autonomes.'
      }
    },
    {
      id: 'vision',
      title: {
        en: 'Computer Vision',
        fr: 'Vision par Ordinateur'
      },
      description: {
        en: 'Working on advanced vision architectures that combine the strengths of CNNs and Vision Transformers, with a focus on interpretability and robustness against adversarial attacks.',
        fr: 'Travail sur des architectures de vision avancées combinant les forces des CNN et des Vision Transformers, avec un accent sur l\'interprétabilité et la robustesse contre les attaques adverses.'
      }
    },
    {
      id: 'attention',
      title: {
        en: 'Attention Mechanisms',
        fr: 'Mécanismes d\'Attention'
      },
      description: {
        en: 'Studying and improving attention mechanisms in deep neural networks to enhance model performance while enabling better explainability of the learned features.',
        fr: 'Étude et amélioration des mécanismes d\'attention dans les réseaux neuronaux profonds pour améliorer les performances des modèles tout en permettant une meilleure explicabilité des caractéristiques apprises.'
      }
    },
    {
      id: 'ethics',
      title: {
        en: 'AI Ethics & Fairness',
        fr: 'Éthique & Équité en IA'
      },
      description: {
        en: 'Investigating how explainable AI methods can help identify and mitigate biases in datasets and algorithms, promoting fairer and more ethical AI systems.',
        fr: 'Étude de la façon dont les méthodes d\'IA explicable peuvent aider à identifier et atténuer les biais dans les ensembles de données et les algorithmes, favorisant des systèmes d\'IA plus équitables et éthiques.'
      }
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
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <FiBookOpen className="text-red-600 dark:text-red-500 text-3xl mr-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {language === 'en' ? 'Research Interests' : 'Intérêts de Recherche'}
            </h2>
          </div>
          
          <div className="section-bar mb-8"></div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
            {language === 'en' ? (
              <>My research lies at the intersection of Explainable AI and Computer Vision, where I focus on developing interpretable deep learning models that provide meaningful explanations for their predictions while maintaining high performance.</>
            ) : (
              <>Mes recherches se situent à l'intersection de l'IA Explicable et de la Vision par Ordinateur, où je me concentre sur le développement de modèles d'apprentissage profond interprétables qui fournissent des explications significatives pour leurs prédictions tout en maintenant des performances élevées.</>
            )}
          </p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {interests.map((interest) => (
              <motion.div 
                key={interest.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-red-600 dark:border-red-500"
                variants={itemVariants}
              >
                <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">
                  {interest.title[language]}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {interest.description[language]}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResearchInterests;