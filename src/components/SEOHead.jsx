import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG, generateKeywords, getCanonicalUrl } from '../utils/seoConfig';

const SEOHead = ({ 
  title, 
  description, 
  keywords = '', 
  ogImage = '/assets/images/screen.png',
  canonical = '',
  schemaData = null,
  pageType = 'home' // Nouveau: type de page pour la configuration SEO automatique
}) => {
  const { currentLanguage } = useLanguage();
  const location = useLocation();
  
  // Détection automatique du type de page si non spécifié
  const currentPageType = pageType || location.pathname.slice(1) || 'home';
  
  // Configuration SEO automatique basée sur le type de page
  const pageConfig = SEO_CONFIG.pages[currentPageType]?.[currentLanguage];
  
  // Utilisation de la configuration automatique si les props ne sont pas fournies
  const finalTitle = title || pageConfig?.title || SEO_CONFIG.siteName;
  const finalDescription = description || pageConfig?.description || 'Mélissa Colin, étudiante ingénieure en intelligence artificielle à l\'ENSEIRB-MATMECA, spécialisée en vision par ordinateur et deep learning.';
  
  const baseUrl = SEO_CONFIG.baseUrl;
  const fullCanonical = canonical ? getCanonicalUrl(canonical, currentLanguage) : getCanonicalUrl(location.pathname, currentLanguage);
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  // Génération automatique des mots-clés optimisés
  const additionalKeywords = keywords ? keywords.split(', ') : [];
  const finalKeywords = generateKeywords(currentPageType, currentLanguage, additionalKeywords);
  
  // Schema.org automatique si non fourni
  const defaultSchemas = [
    SEO_CONFIG.getPersonSchema(currentLanguage),
    SEO_CONFIG.getWebSiteSchema(currentLanguage)
  ];
  
  const finalSchemas = schemaData ? [schemaData, ...defaultSchemas] : defaultSchemas;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Mélissa Colin" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph optimisé */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={currentLanguage === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:locale:alternate" content={currentLanguage === 'fr' ? 'en_US' : 'fr_FR'} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      
      {/* Twitter Card optimisé */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:creator" content="@melissa_colin" />
      
      {/* Langues alternatives optimisées */}
      <link rel="alternate" hreflang="fr" href={getCanonicalUrl(location.pathname, 'fr')} />
      <link rel="alternate" hreflang="en" href={getCanonicalUrl(location.pathname, 'en')} />
      <link rel="alternate" hreflang="x-default" href={getCanonicalUrl(location.pathname, 'fr')} />
      
      {/* Optimisations supplémentaires pour la recherche personnelle */}
      <meta name="google-site-verification" content="votre-code-verification-google" />
      <meta name="geo.region" content="FR-NAQ" />
      <meta name="geo.placename" content="Bordeaux" />
      <meta name="geo.position" content="44.837789;-0.579180" />
      <meta name="ICBM" content="44.837789, -0.579180" />
      
      {/* Schema.org données structurées multiples */}
      {finalSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
