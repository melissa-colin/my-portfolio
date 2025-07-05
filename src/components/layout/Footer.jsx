import React from 'react';
import { Link } from 'react-router-dom';
import { FiMoon, FiSun, FiLinkedin, FiGithub, FiMail, FiMessageCircle } from 'react-icons/fi';
import { SiMedium, SiGooglescholar } from 'react-icons/si';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import SocialLinks from '../common/SocialLinks';
import SocialShare from '../common/SocialShare';

const Footer = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, languages, changeLanguage, t } = useLanguage();
  
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{t('home.heroTitle')}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('site.tagline')} 
            </p>
            <SocialLinks showLabels={false} className="mb-4" />
            <SocialShare 
              title={t('site.title')} 
              description={t('site.description')} 
              className="mb-4" 
            />
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {t('footer.navigation')}
            </h3>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500">
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/publications" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500">
                    {t('nav.publications')}
                  </Link>
                </li>
                <li>
                  <Link to="/experience" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500">
                    {t('nav.experience')}
                  </Link>
                </li>
                <li>
                  <Link to="/education" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500">
                    {t('nav.education')}
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <Link to="/projects" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500">
                    {t('nav.projects')}
                  </Link>
                </li>
                <li>
                  <Link to="/certification" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500">
                    {t('nav.certification')}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500">
                    {t('nav.blog')}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500">
                    {t('nav.contact')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Language */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {t('footer.language')}
            </h3>
            <div className="space-y-2">
              {Object.entries(languages).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`block px-3 py-1 rounded-md ${
                    language === code
                      ? 'bg-red-600 text-white'
                      : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                {t('footer.darkMode')}
              </h3>
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500"
              >
                {isDarkMode ? (
                  <>
                    <FiSun size={20} />
                    <span>{t('theme.light')}</span>
                  </>
                ) : (
                  <>
                    <FiMoon size={20} />
                    <span>{t('theme.dark')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {t('nav.contact')}
            </h3>
            <address className="not-italic text-gray-600 dark:text-gray-400">
              <p className="mb-2">{t('contact.place')}</p>
              <p className="mb-2">
                <a 
                  href={`mailto:${t('contact.emailAddress')}`}
                  className="hover:text-red-600 dark:hover:text-red-500"
                >
                  {t('contact.emailAddress')}
                </a>
              </p>
            </address>
            <Link 
              to={t('contact.signalLink')} 
              className="inline-block mt-2 text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400"
            >
              {language === 'en' ? 'Send me a message' : 'M\'envoyer un message'}
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-gray-600 dark:text-gray-400">
          <p>
            © {currentYear} {t('home.heroTitle')}. {language === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;