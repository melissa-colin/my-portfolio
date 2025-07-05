import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const usePageTitle = () => {
  const location = useLocation();
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    const getPageTitle = (pathname) => {
      const baseName = currentLanguage === 'fr' ? 'Mélissa Colin' : 'Melissa Colin';
      const baseTagline = currentLanguage === 'fr' 
        ? 'Étudiante Ingénieure en Intelligence Artificielle' 
        : 'AI Engineering Student';
      
      switch (pathname) {
        case '/':
          return currentLanguage === 'fr'
            ? `${baseName} | ${baseTagline} | Portfolio IA`
            : `${baseName} | ${baseTagline} | AI Portfolio`;
        case '/certification':
          return currentLanguage === 'fr'
            ? `Certifications IA | ${baseName} | Portfolio`
            : `AI Certifications | ${baseName} | Portfolio`;
        case '/publications':
          return currentLanguage === 'fr'
            ? `Publications & Recherche IA | ${baseName} | Deep Learning`
            : `AI Publications & Research | ${baseName} | Deep Learning`;
        case '/experience':
          return currentLanguage === 'fr'
            ? `Expérience Professionnelle | ${baseName} | Ingénieure IA`
            : `Professional Experience | ${baseName} | AI Engineer`;
        case '/education':
          return currentLanguage === 'fr'
            ? `Formation IA | ${baseName} | ENSEIRB-MATMECA`
            : `AI Education | ${baseName} | ENSEIRB-MATMECA`;
        case '/projects':
          return currentLanguage === 'fr'
            ? `Projets IA & Vision par Ordinateur | ${baseName} | Deep Learning`
            : `AI & Computer Vision Projects | ${baseName} | Deep Learning`;
        case '/blog':
          return currentLanguage === 'fr'
            ? `Blog IA | ${baseName} | Recherche & Innovation`
            : `AI Blog | ${baseName} | Research & Innovation`;
        case '/contact':
          return currentLanguage === 'fr'
            ? `Contacter ${baseName} | Étudiante IA | Collaboration`
            : `Contact ${baseName} | AI Student | Collaboration`;
        default:
          return currentLanguage === 'fr'
            ? `Page non trouvée | ${baseName} | Portfolio IA`
            : `Page not found | ${baseName} | AI Portfolio`;
      }
    };

    // Mettre à jour le titre de la page
    const newTitle = getPageTitle(location.pathname);
    document.title = newTitle;
    
    // Mettre à jour les meta tags dynamiquement
    updateMetaTags(location.pathname, currentLanguage);
  }, [location.pathname, t, currentLanguage]);
};

// Fonction pour mettre à jour les meta tags dynamiquement
const updateMetaTags = (pathname, currentLanguage) => {
  const baseName = currentLanguage === 'fr' ? 'Mélissa Colin' : 'Melissa Colin';
  
  // Meta description dynamique
  let description = '';
  switch (pathname) {
    case '/':
      description = currentLanguage === 'fr'
        ? `Portfolio de ${baseName}, étudiante ingénieure en intelligence artificielle spécialisée en vision par ordinateur et deep learning. Découvrez mes projets de recherche innovants.`
        : `${baseName}'s portfolio, AI engineering student specialized in computer vision and deep learning. Discover my innovative research projects.`;
      break;
    case '/certification':
      description = currentLanguage === 'fr'
        ? `Certifications et formations en intelligence artificielle de ${baseName}. Spécialisation en deep learning, vision par ordinateur et IA explicable.`
        : `${baseName}'s AI certifications and training. Specialization in deep learning, computer vision and explainable AI.`;
      break;
    case '/publications':
      description = currentLanguage === 'fr'
        ? `Publications et travaux de recherche en IA de ${baseName}. Recherche en vision par ordinateur, deep learning et IA explicable.`
        : `${baseName}'s AI publications and research work. Research in computer vision, deep learning and explainable AI.`;
      break;
    case '/projects':
      description = currentLanguage === 'fr'
        ? `Projets d'intelligence artificielle et vision par ordinateur de ${baseName}. Applications innovantes en deep learning et CNN.`
        : `${baseName}'s artificial intelligence and computer vision projects. Innovative applications in deep learning and CNN.`;
      break;
    default:
      description = currentLanguage === 'fr'
        ? `${baseName}, étudiante en intelligence artificielle passionnée par la vision par ordinateur et le deep learning.`
        : `${baseName}, AI student passionate about computer vision and deep learning.`;
  }
  
  // Mettre à jour la meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Mettre à jour les Open Graph tags
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
  
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', description);
  }
};

export default usePageTitle;
