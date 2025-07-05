import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const useGoogleAnalytics = () => {
  const location = useLocation();
  const { currentLanguage, t } = useLanguage();

  useEffect(() => {
    // Vérifier si gtag est disponible
    if (typeof window !== 'undefined' && window.gtag) {
      // Générer le nom de la page en utilisant les traductions
      const pageName = getPageName(location.pathname, t, currentLanguage);
      
      // Envoyer l'événement page_view avec un titre personnalisé
      window.gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
        page_title: pageName,
        page_location: window.location.href,
        page_path: location.pathname,
        custom_map: {
          'custom_parameter_1': 'language'
        }
      });

      // Envoyer un événement personnalisé pour plus de détails
      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        page_path: location.pathname,
        content_group1: 'Portfolio',
        content_group2: getPageCategory(location.pathname),
        language: currentLanguage,
        custom_parameter_1: currentLanguage
      });
    }
  }, [location, currentLanguage, t]);
};

// Fonction pour obtenir le nom de la page traduit
const getPageName = (pathname, t, language) => {
  const suffix = language === 'fr' ? ' | Portfolio' : ' | Portfolio';
  
  switch (pathname) {
    case '/':
      return t('nav.home') + suffix;
    case '/certification':
      return t('nav.certification') + suffix;
    case '/publications':
      return t('nav.publications') + suffix;
    case '/experience':
      return t('nav.experience') + suffix;
    case '/education':
      return t('nav.education') + suffix;
    case '/projects':
      return t('nav.projects') + suffix;
    case '/blog':
      return t('nav.blog') + suffix;
    case '/contact':
      return t('nav.contact') + suffix;
    default:
      return (language === 'fr' ? 'Page non trouvée' : 'Page not found') + suffix;
  }
};

// Fonction pour categoriser les pages
const getPageCategory = (pathname) => {
  if (pathname === '/') return 'Home';
  if (pathname.includes('certification') || pathname.includes('publications')) return 'Academic';
  if (pathname.includes('experience') || pathname.includes('education')) return 'Professional';
  if (pathname.includes('projects')) return 'Portfolio';
  if (pathname.includes('blog')) return 'Content';
  if (pathname.includes('contact')) return 'Contact';
  return 'Other';
};

export default useGoogleAnalytics;
