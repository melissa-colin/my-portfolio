import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from '../common/Breadcrumb';
import { useTheme } from '../../context/ThemeContext';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';
import usePageTitle from '../../hooks/usePageTitle';

const Layout = () => {
  const { isDarkMode } = useTheme(); // Keep for compatibility
  
  // Activer le suivi Google Analytics
  useGoogleAnalytics();
  
  // Mettre à jour le titre de la page
  usePageTitle();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;