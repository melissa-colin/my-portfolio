import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const usePageTitle = () => {
  const location = useLocation();
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    const getPageTitle = (pathname) => {
      switch (pathname) {
        case '/':
          return t('site.title');
        case '/certification':
          return `${t('nav.certification')} | ${t('site.tagline')}`;
        case '/publications':
          return `${t('nav.publications')} | ${t('site.tagline')}`;
        case '/experience':
          return `${t('nav.experience')} | ${t('site.tagline')}`;
        case '/education':
          return `${t('nav.education')} | ${t('site.tagline')}`;
        case '/projects':
          return `${t('nav.projects')} | ${t('site.tagline')}`;
        case '/blog':
          return `${t('nav.blog')} | ${t('site.tagline')}`;
        case '/contact':
          return `${t('nav.contact')} | ${t('site.tagline')}`;
        default:
          return `${currentLanguage === 'fr' ? 'Page non trouvée' : 'Page not found'} | ${t('site.tagline')}`;
      }
    };

    // Mettre à jour le titre de la page
    document.title = getPageTitle(location.pathname);
  }, [location.pathname, t, currentLanguage]);
};

export default usePageTitle;
