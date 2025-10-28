/**
 * Configuration SEO centralisée pour améliorer le référencement
 * Optimisé pour les recherches "Mélissa Colin", "melissa colin" et profils étudiants IA
 */

export const SEO_CONFIG = {
  // Informations de base
  baseUrl: 'https://melissacolin.ai',
  siteName: 'Mélissa Colin - Portfolio Intelligence Artificielle',
  
  // Mots-clés principaux pour le référencement personnel
  primaryKeywords: {
    fr: [
      'Mélissa Colin',
      'Melissa Colin',
      'melissa colin',
      'mélissa colin',
      'étudiant intelligence artificielle',
      'étudiante IA',
      'ingénieur IA',
      'ENSEIRB-MATMECA',
      'portfolio IA',
      'profil étudiant IA',
      'recherche IA',
      'vision par ordinateur',
      'deep learning étudiant',
      'Bordeaux IA',
      'étudiant ingénieur IA France'
    ],
    en: [
      'Melissa Colin',
      'Mélissa Colin',
      'melissa colin',
      'mélissa colin',
      'AI student',
      'artificial intelligence student',
      'AI engineer',
      'ENSEIRB-MATMECA',
      'AI portfolio',
      'student AI profile',
      'AI research',
      'computer vision',
      'deep learning student',
      'Bordeaux AI',
      'AI engineering student France'
    ]
  },

  // Configuration par page
  pages: {
    home: {
      fr: {
        title: 'Mélissa Colin | Étudiante Ingénieure en Intelligence Artificielle | Portfolio IA',
        description: 'Mélissa Colin, étudiante ingénieure en intelligence artificielle à l\'ENSEIRB-MATMECA. Portfolio de projets IA innovants en vision par ordinateur, deep learning et IA explicable. Profil étudiant IA Bordeaux.',
        keywords: 'portfolio, accueil, profil complet'
      },
      en: {
        title: 'Melissa Colin | AI Engineering Student | Artificial Intelligence Portfolio',
        description: 'Melissa Colin, AI engineering student at ENSEIRB-MATMECA. Portfolio of innovative AI projects in computer vision, deep learning, and explainable AI. AI student profile Bordeaux France.',
        keywords: 'portfolio, home, complete profile'
      }
    },
    projects: {
      fr: {
        title: 'Projets IA | Mélissa Colin | Vision par Ordinateur & Deep Learning',
        description: 'Découvrez les projets d\'intelligence artificielle de Mélissa Colin : vision par ordinateur, deep learning, CNN, transformers. Projets étudiants IA innovants ENSEIRB-MATMECA.',
        keywords: 'projets IA, computer vision, CNN, transformers, YOLO, réseaux de neurones'
      },
      en: {
        title: 'AI Projects | Melissa Colin | Computer Vision & Deep Learning',
        description: 'Discover Melissa Colin\'s artificial intelligence projects: computer vision, deep learning, CNN, transformers. Innovative AI student projects ENSEIRB-MATMECA.',
        keywords: 'AI projects, computer vision, CNN, transformers, YOLO, neural networks'
      }
    },
    publications: {
      fr: {
        title: 'Publications & Recherche IA | Mélissa Colin | IA Explicable',
        description: 'Publications scientifiques et recherches en intelligence artificielle de Mélissa Colin. Spécialisation en IA explicable, vision par ordinateur et architectures de deep learning.',
        keywords: 'publications, recherche IA, articles scientifiques, IA explicable'
      },
      en: {
        title: 'AI Publications & Research | Melissa Colin | Explainable AI',
        description: 'Scientific publications and artificial intelligence research by Melissa Colin. Specialization in explainable AI, computer vision and deep learning architectures.',
        keywords: 'publications, AI research, scientific articles, explainable AI'
      }
    },
    experience: {
      fr: {
        title: 'Expérience Professionnelle IA | Mélissa Colin | Stages & Missions',
        description: 'Expérience professionnelle de Mélissa Colin en intelligence artificielle : stages, missions, projets industriels. Parcours étudiant ingénieur IA ENSEIRB-MATMECA.',
        keywords: 'expérience IA, stages, missions, projets industriels'
      },
      en: {
        title: 'AI Professional Experience | Melissa Colin | Internships & Projects',
        description: 'Melissa Colin\'s professional experience in artificial intelligence: internships, missions, industrial projects. AI engineering student journey ENSEIRB-MATMECA.',
        keywords: 'AI experience, internships, missions, industrial projects'
      }
    },
    education: {
      fr: {
        title: 'Formation IA | Mélissa Colin | ENSEIRB-MATMECA | Cursus Intelligence Artificielle',
        description: 'Formation académique de Mélissa Colin en intelligence artificielle à l\'ENSEIRB-MATMECA. Cursus ingénieur IA, spécialisation vision par ordinateur et deep learning.',
        keywords: 'formation IA, ENSEIRB-MATMECA, cursus ingénieur, études IA'
      },
      en: {
        title: 'AI Education | Melissa Colin | ENSEIRB-MATMECA | Artificial Intelligence Curriculum',
        description: 'Melissa Colin\'s academic education in artificial intelligence at ENSEIRB-MATMECA. AI engineering curriculum, specialization in computer vision and deep learning.',
        keywords: 'AI education, ENSEIRB-MATMECA, engineering curriculum, AI studies'
      }
    },
    blog: {
      fr: {
        title: 'Blog IA | Mélissa Colin | Articles Intelligence Artificielle',
        description: 'Blog de Mélissa Colin sur l\'intelligence artificielle : tutoriels, analyses, découvertes en IA. Contenu étudiant spécialisé en vision par ordinateur et deep learning.',
        keywords: 'blog IA, articles, tutoriels, analyses IA'
      },
      en: {
        title: 'AI Blog | Melissa Colin | Artificial Intelligence Articles',
        description: 'Melissa Colin\'s blog on artificial intelligence: tutorials, analyses, AI discoveries. Student content specialized in computer vision and deep learning.',
        keywords: 'AI blog, articles, tutorials, AI analyses'
      }
    },
    contact: {
      fr: {
        title: 'Contact | Mélissa Colin | Étudiante IA ENSEIRB-MATMECA',
        description: 'Contactez Mélissa Colin, étudiante en intelligence artificielle à l\'ENSEIRB-MATMECA. Disponible pour collaborations, stages, projets IA et opportunités de recherche.',
        keywords: 'contact, collaboration, stages IA, opportunités'
      },
      en: {
        title: 'Contact | Melissa Colin | AI Student ENSEIRB-MATMECA',
        description: 'Contact Melissa Colin, artificial intelligence student at ENSEIRB-MATMECA. Available for collaborations, internships, AI projects and research opportunities.',
        keywords: 'contact, collaboration, AI internships, opportunities'
      }
    }
  },

  // Données structurées Schema.org
  getPersonSchema: (language = 'fr') => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mélissa Colin",
    "alternateName": ["Melissa Colin", "melissa colin", "mélissa colin"],
    "url": "https://melissa-colin.github.io/my-portfolio-dist/",
    "image": "https://melissa-colin.github.io/my-portfolio-dist/assets/images/profile-image.jpeg",
    "sameAs": [
      "https://linkedin.com/in/melissa-colin",
      "https://github.com/melissa-colin"
    ],
    "jobTitle": language === 'fr' ? "Étudiante Ingénieure en Intelligence Artificielle" : "AI Engineering Student",
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "ENSEIRB-MATMECA",
      "url": "https://enseirb-matmeca.bordeaux-inp.fr/"
    },
    "alumniOf": {
      "@type": "EducationalOrganization", 
      "name": "ENSEIRB-MATMECA"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Deep Learning", 
      "Computer Vision",
      "Machine Learning",
      "Explainable AI",
      "CNN",
      "Transformers",
      "Python",
      "Neural Networks",
      "Vision par Ordinateur",
      "Intelligence Artificielle",
      "Réseaux de Neurones"
    ],
    "description": language === 'fr' 
      ? "Étudiante ingénieure en intelligence artificielle spécialisée en vision par ordinateur et deep learning à l'ENSEIRB-MATMECA"
      : "AI engineering student specialized in computer vision and deep learning at ENSEIRB-MATMECA",
    "nationality": "French",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressRegion": "Nouvelle-Aquitaine",
      "addressLocality": "Bordeaux"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": language === 'fr' ? "Étudiante en Intelligence Artificielle" : "Artificial Intelligence Student",
      "occupationLocation": {
        "@type": "Place",
        "name": "Bordeaux, France"
      }
    }
  }),

  getWebSiteSchema: (language = 'fr') => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": language === 'fr' ? "Portfolio de Mélissa Colin" : "Melissa Colin Portfolio",
    "alternateName": "Melissa Colin Portfolio IA",
    "url": "https://melissa-colin.github.io/my-portfolio-dist/",
    "description": language === 'fr' 
      ? "Portfolio professionnel de Mélissa Colin, étudiante en intelligence artificielle spécialisée en vision par ordinateur"
      : "Professional portfolio of Melissa Colin, AI student specialized in computer vision",
    "author": {
      "@type": "Person",
      "name": "Mélissa Colin"
    },
    "inLanguage": ["fr-FR", "en-US"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://melissa-colin.github.io/my-portfolio-dist/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }),

  getEducationalOrganizationSchema: () => ({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ENSEIRB-MATMECA",
    "url": "https://enseirb-matmeca.bordeaux-inp.fr/",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1 avenue du Dr Albert Schweitzer",
      "addressLocality": "Pessac",
      "postalCode": "33400",
      "addressCountry": "FR"
    },
    "alumni": {
      "@type": "Person",
      "name": "Mélissa Colin"
    }
  })
};

// Fonction utilitaire pour générer les mots-clés complets
export const generateKeywords = (page, language, additionalKeywords = []) => {
  const baseKeywords = SEO_CONFIG.primaryKeywords[language] || SEO_CONFIG.primaryKeywords.fr;
  const pageKeywords = SEO_CONFIG.pages[page]?.[language]?.keywords?.split(', ') || [];
  
  return [...baseKeywords, ...pageKeywords, ...additionalKeywords].join(', ');
};

// Fonction utilitaire pour obtenir l'URL canonique
export const getCanonicalUrl = (path = '', language = 'fr') => {
  const basePath = path.startsWith('/') ? path : `/${path}`;
  const langParam = language === 'en' ? '?lang=en' : '';
  return `${SEO_CONFIG.baseUrl}${basePath}${langParam}`;
};
