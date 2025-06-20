import React, { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = () => {
  const { t, language } = useLanguage();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 10
      }
    },
  };
  
  const fadeInUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 50, 
        damping: 10,
        duration: 0.8 
      }
    },
  };
  
  const imageVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      rotateY: 20,
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotateY: 0,
      transition: { 
        type: 'spring', 
        stiffness: 70, 
        damping: 15, 
        delay: 0.4,
        duration: 1 
      }
    },
  };
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setAtTop(window.scrollY < 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buttonHoverVariants = {
    hover: { 
      y: -5, 
      boxShadow: '0px 10px 25px rgba(229, 20, 0, 0.4)',
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  return (
    <section className="min-h-screen flex items-center py-20 relative overflow-hidden">
      {/* Background particles or pattern with animation */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
      
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-20 left-10 w-80 h-80 bg-red-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-text-shimmer">
                {t('home.heroTitle')}
              </h1>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium mb-6 text-red-400 dark:text-red-400"
            >
              {t('site.tagline')}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {t('home.heroSubtitle')}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.div variants={buttonHoverVariants} whileHover="hover">
                <Link to="/experience" className="btn-primary relative group">
                  {t('home.viewExperience')} 
                  <motion.span 
                    className="inline-block ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <FiArrowRight />
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-md opacity-0 group-hover:opacity-100 bg-white/10"
                    initial={{ scale: 0.85 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.15 }}
                  />
                </Link>
              </motion.div>
              
              <motion.div variants={buttonHoverVariants} whileHover="hover">
                <Link to="/contact" className="btn-outline relative group overflow-hidden">
                  {t('home.learnMore')}
                  <motion.span
                    className="absolute inset-0 -z-10 bg-gradient-red opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div
            variants={imageVariants}
            className="hidden lg:block"
          >
            <div className="relative">
              <motion.div 
                className="w-full h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ 
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                  position: 'relative'
                }}
              >
                {/* Profile image container with corner gradients */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/20 via-transparent to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-red-500/20 via-transparent to-transparent opacity-70">
                  <motion.img
                    src="/assets/images/profile-image.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover shadow-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
                    draggable={false}
                  />
                  </div>
                </div>

                {/* Animated decorative elements */}
                <div className="absolute inset-0">
                  <motion.div 
                    className="absolute top-10 left-10 w-20 h-1 bg-red-500 rounded-full"
                    animate={{ width: [20, 80, 20] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute top-16 left-10 w-10 h-1 bg-red-500 rounded-full"
                    animate={{ width: [10, 40, 10] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.div 
                    className="absolute bottom-10 right-10 w-20 h-1 bg-red-500/30 rounded-full"
                    animate={{ width: [20, 80, 20] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  <motion.div 
                    className="absolute bottom-16 right-10 w-10 h-1 bg-red-500/20 rounded-full"
                    animate={{ width: [10, 40, 10] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-gradient-red text-white p-6 rounded-lg shadow-red-glow"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(229, 20, 0, 0.4)'
                }}
              >
                <p className="text-xl font-bold">{t('home.age')}</p>
                <p className="text-sm">{t('home.status')}</p>
                <p className="text-sm">{t('home.school')}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator with enhanced animation */}
        {/* Removed the old scroll indicator here */}
      </div>
      {/* Scroll indicator with enhanced animation */}
      {atTop && (
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-20"
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut" 
          }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <FiChevronDown className="text-7xl text-red-400 dark:text-red-500 animate-bounce" />
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;