import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const SEOHead = ({ 
  title, 
  description, 
  keywords = '', 
  ogImage = '/assets/images/screen.png',
  canonical = '',
  schemaData = null 
}) => {
  const { currentLanguage } = useLanguage();
  
  const baseUrl = 'https://melissa-colin.github.io/my-portfolio-dist';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  const baseName = currentLanguage === 'fr' ? 'Mélissa Colin' : 'Melissa Colin';
  const defaultKeywords = currentLanguage === 'fr' 
    ? 'Mélissa Colin, Melissa Colin, intelligence artificielle, IA, étudiant IA, ingénieur IA, vision par ordinateur, deep learning, machine learning, ENSEIRB-MATMECA, portfolio IA, projets IA, recherche IA, IA explicable'
    : 'Melissa Colin, Mélissa Colin, artificial intelligence, AI, AI student, AI engineer, computer vision, deep learning, machine learning, ENSEIRB-MATMECA, AI portfolio, AI projects, AI research, explainable AI';
  
  const finalKeywords = keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={currentLanguage === 'fr' ? 'fr_FR' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:card" content="summary_large_image" />
      
      {/* Langues alternatives */}
      <link rel="alternate" hreflang="fr" href={`${baseUrl}${canonical}`} />
      <link rel="alternate" hreflang="en" href={`${baseUrl}${canonical}?lang=en`} />
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}${canonical}`} />
      
      {/* Schema.org données structurées */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
