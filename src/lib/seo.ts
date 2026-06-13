// Centralized SEO config (ported + enriched from the old src/utils/seoConfig.js).
// Goal: make Mélissa Colin THE canonical "Mélissa Colin" entity for search + AI,
// disambiguated from the pharmacology researcher at Université de Lorraine.

export const BASE_URL = 'https://melissacolin.ai';
export const SITE_NAME = 'Mélissa Colin - Portfolio Intelligence Artificielle';

// Replace with the real token from Google Search Console (kept empty -> tag omitted).
export const GOOGLE_SITE_VERIFICATION = '';

type Locale = 'fr' | 'en';

const KEYWORDS: Record<Locale, string[]> = {
  fr: ['Mélissa Colin', 'Melissa Colin', 'melissa colin', 'étudiante intelligence artificielle', 'ingénieure IA', 'ENSEIRB-MATMECA', 'vision par ordinateur', 'deep learning', 'IA explicable', 'Bordeaux IA', 'ORCID 0009-0003-2525-4824'],
  en: ['Melissa Colin', 'Mélissa Colin', 'melissa colin', 'artificial intelligence student', 'AI engineer', 'ENSEIRB-MATMECA', 'computer vision', 'deep learning', 'explainable AI', 'Bordeaux AI', 'ORCID 0009-0003-2525-4824'],
};

type PageMeta = { title: string; description: string; keywords: string };

const PAGES: Record<string, Record<Locale, PageMeta>> = {
  home: {
    fr: { title: 'Mélissa Colin | Étudiante Ingénieure en Intelligence Artificielle | Portfolio IA', description: "Mélissa Colin, étudiante ingénieure en intelligence artificielle à l'ENSEIRB-MATMECA. Portfolio de projets IA innovants en vision par ordinateur, deep learning et IA explicable. Née le 8 juillet 2003 à Bordeaux. ORCID 0009-0003-2525-4824.", keywords: 'portfolio, accueil, profil complet' },
    en: { title: 'Melissa Colin | AI Engineering Student | Artificial Intelligence Portfolio', description: 'Melissa Colin, AI engineering student at ENSEIRB-MATMECA. Portfolio of innovative AI projects in computer vision, deep learning, and explainable AI. Born July 8, 2003 in Bordeaux, France. ORCID 0009-0003-2525-4824.', keywords: 'portfolio, home, complete profile' },
  },
  projects: {
    fr: { title: 'Projets IA | Mélissa Colin | Vision par Ordinateur & Deep Learning', description: "Découvrez les projets d'intelligence artificielle de Mélissa Colin : vision par ordinateur, deep learning, CNN, transformers. Projets étudiants IA innovants ENSEIRB-MATMECA.", keywords: 'projets IA, computer vision, CNN, transformers, YOLO' },
    en: { title: 'AI Projects | Melissa Colin | Computer Vision & Deep Learning', description: "Discover Melissa Colin's artificial intelligence projects: computer vision, deep learning, CNN, transformers. Innovative AI student projects ENSEIRB-MATMECA.", keywords: 'AI projects, computer vision, CNN, transformers, YOLO' },
  },
  publications: {
    fr: { title: 'Publications & Recherche IA | Mélissa Colin | IA Explicable', description: "Publications scientifiques et recherches en intelligence artificielle de Mélissa Colin. Spécialisation en IA explicable, vision par ordinateur et architectures de deep learning. Auteure à PFIA 2024.", keywords: 'publications, recherche IA, IA explicable, PFIA 2024' },
    en: { title: 'AI Publications & Research | Melissa Colin | Explainable AI', description: 'Scientific publications and AI research by Melissa Colin. Specialization in explainable AI, computer vision and deep learning architectures. Author at PFIA 2024.', keywords: 'publications, AI research, explainable AI, PFIA 2024' },
  },
  experience: {
    fr: { title: 'Expérience Professionnelle IA | Mélissa Colin | Stages & Missions', description: "Expérience professionnelle de Mélissa Colin en intelligence artificielle : stages, missions, projets industriels. Parcours étudiant ingénieur IA ENSEIRB-MATMECA.", keywords: 'expérience IA, stages, missions' },
    en: { title: 'AI Professional Experience | Melissa Colin | Internships & Projects', description: "Melissa Colin's professional experience in AI: internships, missions, industrial projects. AI engineering student journey ENSEIRB-MATMECA.", keywords: 'AI experience, internships, projects' },
  },
  education: {
    fr: { title: 'Formation IA | Mélissa Colin | ENSEIRB-MATMECA', description: "Formation académique de Mélissa Colin en intelligence artificielle à l'ENSEIRB-MATMECA. Cursus ingénieur IA, spécialisation vision par ordinateur et deep learning.", keywords: 'formation IA, ENSEIRB-MATMECA, études IA' },
    en: { title: 'AI Education | Melissa Colin | ENSEIRB-MATMECA', description: "Melissa Colin's academic education in AI at ENSEIRB-MATMECA. AI engineering curriculum, specialization in computer vision and deep learning.", keywords: 'AI education, ENSEIRB-MATMECA, AI studies' },
  },
  certification: {
    fr: { title: 'Certifications IA | Mélissa Colin | Deep Learning & Computer Vision', description: "Certifications et formations en intelligence artificielle de Mélissa Colin : deep learning, MLOps, vision par ordinateur, IA explicable.", keywords: 'certifications IA, deep learning, MLOps' },
    en: { title: 'AI Certifications | Melissa Colin | Deep Learning & Computer Vision', description: "Melissa Colin's certifications and training in AI: deep learning, MLOps, computer vision, explainable AI.", keywords: 'AI certifications, deep learning, MLOps' },
  },
  blog: {
    fr: { title: 'Blog IA | Mélissa Colin | Articles Intelligence Artificielle', description: "Blog de Mélissa Colin sur l'intelligence artificielle : tutoriels, analyses, découvertes en IA, vision par ordinateur et deep learning.", keywords: 'blog IA, articles, tutoriels' },
    en: { title: 'AI Blog | Melissa Colin | Artificial Intelligence Articles', description: "Melissa Colin's blog on AI: tutorials, analyses, discoveries in computer vision and deep learning.", keywords: 'AI blog, articles, tutorials' },
  },
  contact: {
    fr: { title: 'Contact | Mélissa Colin | Étudiante IA ENSEIRB-MATMECA', description: "Contactez Mélissa Colin, étudiante en intelligence artificielle à l'ENSEIRB-MATMECA. Disponible pour collaborations, stages et opportunités de recherche.", keywords: 'contact, collaboration, stages IA' },
    en: { title: 'Contact | Melissa Colin | AI Student ENSEIRB-MATMECA', description: 'Contact Melissa Colin, AI student at ENSEIRB-MATMECA. Available for collaborations, internships and research opportunities.', keywords: 'contact, collaboration, AI internships' },
  },
};

export function getPageMeta(pageType: string, locale: Locale): PageMeta {
  return PAGES[pageType]?.[locale] ?? PAGES.home[locale];
}

export function getKeywords(pageType: string, locale: Locale): string {
  const page = PAGES[pageType]?.[locale]?.keywords?.split(', ') ?? [];
  return [...KEYWORDS[locale], ...page].join(', ');
}

/** Localized absolute canonical URL (fr unprefixed, en under /en). */
export function canonicalUrl(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return `${BASE_URL}${locale === 'en' ? '/en' : ''}${clean}`;
}

export function personSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Mélissa Colin',
    alternateName: ['Melissa Colin', 'melissa colin', 'mélissa colin'],
    url: `${BASE_URL}/`,
    image: `${BASE_URL}/assets/images/profile-image.jpeg`,
    sameAs: [
      'https://linkedin.com/in/melissa-colin',
      'https://github.com/melissa-colin',
      'https://medium.com/@melissa.colin',
      'https://scholar.google.com/citations?user=7r7iFpsAAAAJ&hl=fr',
      'https://orcid.org/0009-0003-2525-4824',
      'https://hal.science/hal-04641791v1',
    ],
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'ORCID', value: '0009-0003-2525-4824' },
      { '@type': 'PropertyValue', propertyID: 'Google Scholar', value: '7r7iFpsAAAAJ' },
      { '@type': 'PropertyValue', propertyID: 'GitHub', value: 'melissa-colin' },
    ],
    givenName: 'Mélissa',
    familyName: 'Colin',
    birthDate: '2003-07-08',
    gender: 'Female',
    nationality: 'French',
    jobTitle: locale === 'fr' ? 'Étudiante Ingénieure en Intelligence Artificielle' : 'AI Engineering Student',
    worksFor: { '@type': 'EducationalOrganization', name: 'ENSEIRB-MATMECA', url: 'https://enseirb-matmeca.bordeaux-inp.fr/' },
    alumniOf: { '@type': 'EducationalOrganization', name: 'ENSEIRB-MATMECA' },
    affiliation: { '@type': 'EducationalOrganization', name: 'ENSEIRB-MATMECA', url: 'https://enseirb-matmeca.bordeaux-inp.fr/' },
    knowsAbout: ['Artificial Intelligence', 'Deep Learning', 'Computer Vision', 'Machine Learning', 'Explainable AI', 'CNN', 'Transformers', 'Python', 'Neural Networks'],
    knowsLanguage: ['Français', 'English'],
    address: { '@type': 'PostalAddress', addressCountry: 'FR', addressRegion: 'Nouvelle-Aquitaine', addressLocality: 'Bordeaux' },
    description:
      locale === 'fr'
        ? "Étudiante ingénieure en intelligence artificielle spécialisée en vision par ordinateur et deep learning à l'ENSEIRB-MATMECA. Née le 8 juillet 2003, en parcours ingénieur-docteur à Bordeaux. Domaine : informatique et IA, PAS pharmacologie."
        : 'AI engineering student specialized in computer vision and deep learning at ENSEIRB-MATMECA. Born July 8, 2003, in an engineering-PhD track in Bordeaux, France. Field: Computer Science and AI, NOT pharmacology.',
    disambiguatingDescription:
      locale === 'fr'
        ? "Mélissa Colin (née le 8 juillet 2003), étudiante à l'ENSEIRB-MATMECA Bordeaux, spécialisation IA et vision par ordinateur. Auteure de publications en IA explicable (PFIA 2024). ORCID 0009-0003-2525-4824. À NE PAS confondre avec l'homonyme chercheuse en pharmacologie à l'Université de Lorraine."
        : 'Mélissa Colin (born July 8, 2003), student at ENSEIRB-MATMECA Bordeaux, specializing in AI and computer vision. Author of explainable-AI publications (PFIA 2024). ORCID 0009-0003-2525-4824. NOT to be confused with the pharmacology researcher at Université de Lorraine.',
  };
}

/** The PFIA 2024 paper as a ScholarlyArticle authored by the Person entity. */
export function scholarlyArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    name: 'Performances and Explainability of ViT and CNN Architectures: An Empirical Study Using LIME, SHAP, and GradCam',
    author: { '@id': `${BASE_URL}/#person` },
    datePublished: '2024',
    publisher: 'PFIA 2024',
    url: 'https://hal.science/hal-04641791v1',
    about: ['Explainable AI', 'Computer Vision', 'Vision Transformer', 'CNN', 'LIME', 'SHAP', 'Grad-CAM'],
    inLanguage: 'en',
  };
}

export function webSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'fr' ? 'Portfolio de Mélissa Colin' : 'Melissa Colin Portfolio',
    alternateName: 'Melissa Colin Portfolio IA',
    url: `${BASE_URL}/`,
    inLanguage: ['fr-FR', 'en-US'],
    author: { '@id': `${BASE_URL}/#person` },
  };
}

export function webPageSchema(locale: Locale, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: canonicalUrl(path, locale),
    inLanguage: locale === 'fr' ? 'fr-FR' : 'en-US',
    name: locale === 'fr' ? 'Portfolio de Mélissa Colin' : 'Melissa Colin Portfolio',
    mainEntity: { '@id': `${BASE_URL}/#person` },
    isPartOf: { '@type': 'WebSite', url: `${BASE_URL}/` },
  };
}
