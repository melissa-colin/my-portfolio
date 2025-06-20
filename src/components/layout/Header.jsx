import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun, FiGlobe } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header 
      className={`fixed w-full z-50 ${scrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-red-900/20' : 'bg-transparent'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <motion.span 
                className="font-bold text-xl text-white bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
              >
                {t('home.heroTitle')}
              </motion.span>
              <span className="hidden md:block text-red-600">|</span>
              <span className="hidden md:block text-sm text-gray-300">
                {t('site.tagline')}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, staggerChildren: 0.1 }}
          >
            {[
              { path: '/', label: t('nav.home') },
              { path: '/publications', label: t('nav.publications') },
              { path: '/experience', label: t('nav.experience') },
              { path: '/education', label: t('nav.education') },
              { path: '/projects', label: t('nav.projects') },
              { path: '/certification', label: t('nav.certification') },
              { path: '/blog', label: t('nav.blog') },
              { path: '/contact', label: t('nav.contact') }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link 
                  to={item.path} 
                  className={`nav-link relative overflow-hidden ${location.pathname === item.path ? 'text-red-500 font-medium' : 'text-white'}`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-700"
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Header Actions */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Theme Toggle */}
            <motion.button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-300 hover:bg-red-900/30 transition-colors"
              aria-label={isDarkMode ? t('theme.light') : t('theme.dark')}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {isDarkMode ? <FiSun size={20} className="text-yellow-400" /> : <FiMoon size={20} />}
            </motion.button>

            {/* Language Toggle */}
            <motion.button 
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-300 hover:bg-red-900/30 transition-colors ml-2 flex items-center"
              aria-label={language === 'en' ? 'Français' : 'English'}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <FiGlobe size={20} className="text-blue-400" />
              <span className="ml-1">{language === 'en' ? 'FR' : 'EN'}</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-full text-gray-300 hover:bg-red-900/30 transition-colors ml-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <FiX size={24} className="text-red-500" /> : <FiMenu size={24} />}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-black/95 backdrop-blur-lg shadow-xl border-t border-gray-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <motion.nav 
              className="container mx-auto px-4 py-6"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              <div className="flex flex-col space-y-4">
                {[
                  { path: '/', label: t('nav.home') },
                  { path: '/certification', label: t('nav.certification') },
                  { path: '/publications', label: t('nav.publications') },
                  { path: '/experience', label: t('nav.experience') },
                  { path: '/education', label: t('nav.education') },
                  { path: '/projects', label: t('nav.projects') },
                  { path: '/blog', label: t('nav.blog') },
                  { path: '/contact', label: t('nav.contact') }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 10 }
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link 
                      to={item.path} 
                      className={`block text-lg py-2 ${location.pathname === item.path 
                        ? 'text-red-500 font-semibold' 
                        : 'text-white hover:text-red-400 transition-colors'}`}
                    >
                      {item.label}
                      {location.pathname === item.path && (
                        <motion.span
                          className="ml-2 inline-block w-2 h-2 rounded-full bg-red-500"
                          layoutId="mobileDot"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;