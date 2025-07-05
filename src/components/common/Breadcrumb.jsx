import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const Breadcrumb = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  // Définir les noms de pages pour le breadcrumb
  const pageNames = {
    '': t('nav.home'),
    'certification': t('nav.certification'),
    'publications': t('nav.publications'),
    'experience': t('nav.experience'),
    'education': t('nav.education'),
    'projects': t('nav.projects'),
    'blog': t('nav.blog'),
    'contact': t('nav.contact')
  };
  
  // Générer les segments du chemin
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Ne pas afficher le breadcrumb sur la page d'accueil
  if (pathSegments.length === 0) {
    return null;
  }
  
  return (
    <nav className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {/* Lien vers l'accueil */}
          <li>
            <Link 
              to="/" 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500"
            >
              <FiHome className="w-4 h-4 mr-1" />
              {t('nav.home')}
            </Link>
          </li>
          
          {/* Segments du chemin */}
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const pageName = pageNames[segment] || segment;
            
            return (
              <li key={segment} className="flex items-center">
                <FiChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                {isLast ? (
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {pageName}
                  </span>
                ) : (
                  <Link 
                    to={path}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500"
                  >
                    {pageName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
