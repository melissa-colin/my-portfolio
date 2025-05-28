import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCpu, FiDatabase, FiCode, FiEye, FiMessageSquare, FiBriefcase
} from 'react-icons/fi';

const SkillsSection = ({ language }) => {
  // Skills data with icons and descriptions
  const skills = [
    {
      id: 'deeplearning',
      icon: <FiCpu size={28} />,
      name: {
        en: 'Deep Learning & Computer Vision',
        fr: 'Deep Learning et Vision par Ordinateur'
      },
      description: {
        en: 'CNN, ViT, Transformers, attention mechanisms, encoder-decoder architectures',
        fr: 'CNN, ViT, Transformers, mécanismes d\'attention, architectures encodeur-décodeur'
      }
    },
    {
      id: 'xai',
      icon: <FiEye size={28} />,
      name: {
        en: 'Explainable AI (XAI)',
        fr: 'IA Explicable (XAI)'
      },
      description: {
        en: 'LIME, SHAP, Grad-CAM, interpretability techniques',
        fr: 'LIME, SHAP, Grad-CAM, techniques d\'interprétabilité'
      }
    },
    {
      id: 'mlops',
      icon: <FiBriefcase size={28} />,
      name: {
        en: 'MLOps & Deployment',
        fr: 'MLOps & Déploiement'
      },
      description: {
        en: 'Docker, Kubernetes, Kubeflow, optimized training pipelines',
        fr: 'Docker, Kubernetes, Kubeflow, pipelines d\'entraînement optimisés'
      }
    },
    {
      id: 'languages',
      icon: <FiCode size={28} />,
      name: {
        en: 'Programming Languages',
        fr: 'Langages de Programmation'
      },
      description: {
        en: 'Python, R, SQL',
        fr: 'Python, R, SQL'
      }
    },
    {
      id: 'frameworks',
      icon: <FiDatabase size={28} />,
      name: {
        en: 'AI Frameworks',
        fr: 'Frameworks IA'
      },
      description: {
        en: 'PyTorch, TensorFlow, scikit-learn, OpenCV',
        fr: 'PyTorch, TensorFlow, scikit-learn, OpenCV'
      }
    },
    {
      id: 'research',
      icon: <FiMessageSquare size={28} />,
      name: {
        en: 'Research & Communication',
        fr: 'Recherche & Communication'
      },
      description: {
        en: 'Scientific writing, technical presentations, knowledge dissemination',
        fr: 'Rédaction scientifique, présentations techniques, diffusion des connaissances'
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {language === 'fr' ? 'Expertise & Compétences' : 'Expertise & Skills'}
          </h2>
          <div className="section-bar mx-auto"></div>
          <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Un large spectre de compétences techniques avec une spécialisation en IA explicable et vision par ordinateur.' 
              : 'A broad spectrum of technical skills with specialization in explainable AI and computer vision.'}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill) => (
            <motion.div 
              key={skill.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 dark:text-red-500 mb-6 mx-auto md:mx-0">
                {skill.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {skill.name[language]}
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300">
                {skill.description[language]}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Add notable achievements */}
        <motion.div 
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            {language === 'fr' ? 'Réalisations Notables' : 'Notable Achievements'}
          </h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex">
                <span className="text-red-600 dark:text-red-500 mr-2">•</span>
                {language === 'fr' 
                  ? <p>Développement d'un modèle de reconnaissance de comportements suspects en IA (précision augmentée de <strong>60% à 90%</strong>)</p>
                  : <p>Development of a suspicious behavior recognition AI model (accuracy improved from <strong>60% to 90%</strong>)</p>}
              </li>
              <li className="flex">
                <span className="text-red-600 dark:text-red-500 mr-2">•</span>
                {language === 'fr' 
                  ? <p>Réduction du <strong>temps d'inférence de modèles de 70%</strong></p>
                  : <p>Reduction of model inference time by <strong>70%</strong></p>}
              </li>
              <li className="flex">
                <span className="text-red-600 dark:text-red-500 mr-2">•</span>
                {language === 'fr' 
                  ? <p>Co-organisation de la session de networking d'AI4Industry, avec modération d'une table ronde sur les perspectives post-thèse</p>
                  : <p>Co-organization of AI4Industry networking session, moderating a roundtable on post-PhD perspectives</p>}
              </li>
              <li className="flex">
                <span className="text-red-600 dark:text-red-500 mr-2">•</span>
                {language === 'fr' 
                  ? <p>Publication sur <a href="https://medium.com/@melissa.colin/yolov8-explained-understanding-object-detection-from-scratch-763479652312" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-500 hover:underline">Medium</a> d'un article explicatif sur YOLOv8</p>
                  : <p>Published an <a href="https://medium.com/@melissa.colin/yolov8-explained-understanding-object-detection-from-scratch-763479652312" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-500 hover:underline">explanatory article</a> on YOLOv8 on Medium</p>}
              </li>
              <li className="flex">
                <span className="text-red-600 dark:text-red-500 mr-2">•</span>
                {language === 'fr' 
                  ? <p>Co-auteure d'une <a href="https://hal.science/hal-04641791v1" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-500 hover:underline">publication scientifique</a> présentée à la PFIA 2024</p>
                  : <p>Co-author of a <a href="https://hal.science/hal-04641791v1" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-500 hover:underline">scientific publication</a> presented at PFIA 2024</p>}
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;