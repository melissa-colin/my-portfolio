import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import fr from '../../data/translations/fr';
import en from '../../data/translations/en';

const AboutSection = ({ language }) => {
  const t = language === 'fr' ? fr : en;
  const about = t.about;

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
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{about.title}</h2>
            <div className="section-bar mb-8"></div>
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-lg" dangerouslySetInnerHTML={{ __html: about.intro }} />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{about.section1Title}</h3>
              <p dangerouslySetInnerHTML={{ __html: about.section1p1 }} />
              <p dangerouslySetInnerHTML={{ __html: about.section1p2 }} />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{about.section2Title}</h3>
              <p dangerouslySetInnerHTML={{ __html: about.section2p1 }} />
            </div>
            <div className="mt-8">
              <Link to="/education" className="btn-outline flex items-center w-fit">
                {about.cta} <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;