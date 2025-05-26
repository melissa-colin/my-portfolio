import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun, FiGlobe } from 'react-icons/fi';
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
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              Mélissa Colin
            </span>
            <span className="hidden md:block text-red-600 dark:text-red-500">|</span>
            <span className="hidden md:block text-sm text-gray-700 dark:text-gray-300">
              {t('site.tagline')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              {t('nav.home')}
            </Link>
            <Link to="/research" className={`nav-link ${location.pathname === '/research' ? 'active' : ''}`}>
              {t('nav.research')}
            </Link>
            <Link to="/publications" className={`nav-link ${location.pathname === '/publications' ? 'active' : ''}`}>
              {t('nav.publications')}
            </Link>
            <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>
              {t('nav.projects')}
            </Link>
            <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>
              {t('nav.blog')}
            </Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label={isDarkMode ? t('theme.light') : t('theme.dark')}
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage} 
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 ml-2"
              aria-label={language === 'en' ? 'Français' : 'English'}
            >
              <div className="flex items-center">
                <FiGlobe size={20} />
                <span className="ml-1">{language === 'en' ? 'FR' : 'EN'}</span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 ml-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                {t('nav.home')}
              </Link>
              <Link to="/research" className={`mobile-nav-link ${location.pathname === '/research' ? 'active' : ''}`}>
                {t('nav.research')}
              </Link>
              <Link to="/publications" className={`mobile-nav-link ${location.pathname === '/publications' ? 'active' : ''}`}>
                {t('nav.publications')}
              </Link>
              <Link to="/projects" className={`mobile-nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>
                {t('nav.projects')}
              </Link>
              <Link to="/blog" className={`mobile-nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>
                {t('nav.blog')}
              </Link>
              <Link to="/contact" className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                {t('nav.contact')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;