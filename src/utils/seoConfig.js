/**
 * Configuration SEO centralisée pour améliorer le référencement
 * Optimisé pour les recherches "Mélissa Colin", "melissa colin" et profils étudiants IA
 */

export const SEO_CONFIG = {
  // Informations de base
  baseUrl: 'https://melissacolin.ai',
  siteName: 'Mélissa Colin - Portfolio Intelligence Artificielle',
  
  // Titre et description optimisés à la première personne
  defaultTitle: 'Mélissa Colin | Portfolio IA & Computer Vision | ENSEIRB',
  defaultDescription: 'Je suis Mélissa Colin, étudiante ingénieure IA à ENSEIRB. J\'explore la vision par ordinateur et développe des systèmes d\'IA plus fiables.',
  
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
        title: 'Mélissa Colin | Portfolio IA & Computer Vision | ENSEIRB',
        description: 'Je suis Mélissa Colin, étudiante ingénieure IA à ENSEIRB. J\'explore la vision par ordinateur et développe des systèmes d\'IA plus fiables.',
        keywords: 'portfolio, accueil, profil complet'
      },
      en: {
        title: 'Melissa Colin | AI Portfolio & Computer Vision | ENSEIRB',
        description: 'I am Melissa Colin, AI engineering student at ENSEIRB. I explore computer vision and develop more reliable AI systems.',
        keywords: 'portfolio, home, complete profile'
      }
    },
    projects: {
      fr: {
        title: 'Mes Projets IA | Mélissa Colin | Vision par Ordinateur',
        description: 'Je développe des projets IA innovants en vision par ordinateur et deep learning. Découvrez mes réalisations en CNN, transformers et IA explicable.',
        keywords: 'projets IA, computer vision, CNN, transformers, YOLO, réseaux de neurones'
      },
      en: {
        title: 'My AI Projects | Melissa Colin | Computer Vision',
        description: 'I develop innovative AI projects in computer vision and deep learning. Discover my work in CNN, transformers and explainable AI.',
        keywords: 'AI projects, computer vision, CNN, transformers, YOLO, neural networks'
      }
    },
    publications: {
      fr: {
        title: 'Mes Publications IA | Mélissa Colin | Recherche en IA Explicable',
        description: 'Je partage mes recherches en intelligence artificielle et IA explicable. Mes publications explorent la vision par ordinateur et l\'interprétabilité des modèles.',
        keywords: 'publications, recherche IA, articles scientifiques, IA explicable'
      },
      en: {
        title: 'My AI Publications | Melissa Colin | Explainable AI Research',
        description: 'I share my research in artificial intelligence and explainable AI. My publications explore computer vision and model interpretability.',
        keywords: 'publications, AI research, scientific articles, explainable AI'
      }
    },
    experience: {
      fr: {
        title: 'Mon Expérience IA | Mélissa Colin | Stages & Projets',
        description: 'Je partage mon parcours et mes expériences en intelligence artificielle. Découvrez mes stages, missions et projets industriels en IA.',
        keywords: 'expérience IA, stages, missions, projets industriels'
      },
      en: {
        title: 'My AI Experience | Melissa Colin | Internships & Projects',
        description: 'I share my journey and experiences in artificial intelligence. Discover my internships, missions and industrial AI projects.',
        keywords: 'AI experience, internships, missions, industrial projects'
      }
    },
    education: {
      fr: {
        title: 'Ma Formation IA | Mélissa Colin | ENSEIRB-MATMECA',
        description: 'Je suis en formation d\'ingénieure IA à ENSEIRB-MATMECA. Mon cursus se spécialise en vision par ordinateur et deep learning.',
        keywords: 'formation IA, ENSEIRB-MATMECA, cursus ingénieur, études IA'
      },
      en: {
        title: 'My AI Education | Melissa Colin | ENSEIRB-MATMECA',
        description: 'I am studying AI engineering at ENSEIRB-MATMECA. My curriculum specializes in computer vision and deep learning.',
        keywords: 'AI education, ENSEIRB-MATMECA, engineering curriculum, AI studies'
      }
    },
    blog: {
      fr: {
        title: 'Mon Blog IA | Mélissa Colin | Articles Intelligence Artificielle',
        description: 'Je partage mes découvertes et réflexions sur l\'IA. Mon blog explore la vision par ordinateur, le deep learning et l\'IA explicable.',
        keywords: 'blog IA, articles, tutoriels, analyses IA'
      },
      en: {
        title: 'My AI Blog | Melissa Colin | Artificial Intelligence Articles',
        description: 'I share my discoveries and thoughts on AI. My blog explores computer vision, deep learning and explainable AI.',
        keywords: 'AI blog, articles, tutorials, AI analyses'
      }
    },
    contact: {
      fr: {
        title: 'Me Contacter | Mélissa Colin | Étudiante IA ENSEIRB',
        description: 'Je suis disponible pour des collaborations, stages et projets IA. Contactez-moi pour discuter d\'opportunités en intelligence artificielle.',
        keywords: 'contact, collaboration, stages IA, opportunités'
      },
      en: {
        title: 'Contact Me | Melissa Colin | AI Student ENSEIRB',
        description: 'I am available for collaborations, internships and AI projects. Contact me to discuss artificial intelligence opportunities.',
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
    "url": "https://melissacolin.ai/my-portfolio-dist/",
    "image": "https://melissacolin.ai/my-portfolio-dist/assets/images/profile-image.jpg",
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
    "url": "https://melissacolin.ai/my-portfolio-dist/",
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
      "target": "https://melissacolin.ai/my-portfolio-dist/?q={search_term_string}",
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
