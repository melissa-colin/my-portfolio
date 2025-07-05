import { useEffect } from 'react';

/**
 * Composant de fallback SEO pour s'assurer que les meta tags essentiels sont toujours présents
 * Ce composant s'exécute après le rendu initial pour garantir la présence des meta tags critiques
 */
const SEOFallback = () => {
  useEffect(() => {
    // S'assurer qu'une meta description est toujours présente
    const ensureMetaDescription = () => {
      let metaDescription = document.querySelector('meta[name="description"]');
      
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      
      if (!metaDescription.content || metaDescription.content.trim() === '') {
        metaDescription.content = 'Je suis Mélissa Colin, étudiante ingénieure IA à ENSEIRB. J\'explore la vision par ordinateur et développe des systèmes d\'IA plus fiables.';
      }
    };

    // S'assurer qu'un titre est toujours présent
    const ensureTitle = () => {
      if (!document.title || document.title.trim() === '') {
        document.title = 'Mélissa Colin | Étudiante Ingénieure en Intelligence Artificielle | Portfolio IA';
      }
    };

    // S'assurer que les meta robots sont présents
    const ensureRobotsMeta = () => {
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        robotsMeta.content = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
        document.head.appendChild(robotsMeta);
      }
    };

    // S'assurer que la balise canonical est présente
    const ensureCanonical = () => {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = window.location.origin + window.location.pathname;
        document.head.appendChild(canonical);
      }
    };

    // S'assurer que les meta Open Graph essentiels sont présents
    const ensureOpenGraph = () => {
      const ogMetas = [
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:site_name', content: 'Mélissa Colin - Portfolio IA' },
        { property: 'og:locale', content: 'fr_FR' }
      ];

      ogMetas.forEach(({ property, content }) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          meta.content = content;
          document.head.appendChild(meta);
        }
      });
    };

    // Exécuter toutes les vérifications
    ensureMetaDescription();
    ensureTitle();
    ensureRobotsMeta();
    ensureCanonical();
    ensureOpenGraph();

    // Ajouter un délai pour s'assurer que les autres composants ont fini de se charger
    const timeoutId = setTimeout(() => {
      ensureMetaDescription();
      ensureTitle();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return null; // Ce composant ne rend rien visuellement
};

export default SEOFallback;
