import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import SkillsSection from '../components/home/SkillsSection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { language } = useLanguage();

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
    >
      <HeroSection />
      
      <AboutSection language={language} />
      
      <SkillsSection language={language} />
      
      <FeaturedProjects language={language} />
    </motion.div>
  );
};

export default Home;