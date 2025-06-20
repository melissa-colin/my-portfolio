import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCpu, FiDatabase, FiCode, FiEye, FiMessageSquare, FiBriefcase, FiShield, FiUsers, FiGlobe
} from 'react-icons/fi';
import en from '../../data/translations/en';
import fr from '../../data/translations/fr';

const iconMap = {
  FiCpu: <FiCpu size={28} />,
  FiEye: <FiEye size={28} />,
  FiBriefcase: <FiBriefcase size={28} />,
  FiCode: <FiCode size={28} />,
  FiDatabase: <FiDatabase size={28} />,
  FiMessageSquare: <FiMessageSquare size={28} />,
  FiShield: <FiShield size={28} />,
  FiUsers: <FiUsers size={28} />,
  FiGlobe: <FiGlobe size={28} />,
};

const SkillsSection = ({ language }) => {
  const t = language === 'fr' ? fr : en;
  const { title, subtitle, skills, notableTitle, notable } = t.home.skillsSection;

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
            {title}
          </h2>
          <div className="section-bar mx-auto"></div>
          <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {subtitle}
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
                {iconMap[skill.icon]}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {skill.name}
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300">
                {skill.description}
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
            {notableTitle}
          </h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              {notable.map((item, idx) => (
                <li className="flex" key={idx}>
                  <span className="text-red-600 dark:text-red-500 mr-2">•</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;