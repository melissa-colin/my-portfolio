// Centralized SEO config (ported + enriched from the old src/utils/seoConfig.js).
// Goal: make Mélissa Colin THE canonical "Mélissa Colin" entity for search + AI,
// disambiguated from the pharmacology researcher at Université de Lorraine.

export const BASE_URL = 'https://melissacolin.ai';
export const SITE_NAME = 'Mélissa Colin - Portfolio Intelligence Artificielle';

// Replace with the real token from Google Search Console (kept empty -> tag omitted).
export const GOOGLE_SITE_VERIFICATION = '';

type Locale = 'fr' | 'en';

const KEYWORDS: Record<Locale, string[]> = {
  fr: ['Mélissa Colin', 'Melissa Colin', 'melissa colin', 'étudiante en IA', 'architectures de modèles', 'modèles de fondation', 'vision 3D humaine', 'contraintes par construction', 'reconstruction de maillages humains 3D', 'deep learning', 'vision par ordinateur', 'ENSEIRB-MATMECA', 'NAVER LABS Europe', 'Inria KINETIX', 'Mitacs Globalink', 'ORCID 0009-0003-2525-4824'],
  en: ['Melissa Colin', 'Mélissa Colin', 'melissa colin', 'AI student', 'model architectures', 'foundation models', '3D human vision', 'constraints by construction', '3D human mesh recovery', 'deep learning', 'computer vision', 'ENSEIRB-MATMECA', 'NAVER LABS Europe', 'Inria KINETIX', 'Mitacs Globalink', 'ORCID 0009-0003-2525-4824'],
};

type PageMeta = { title: string; description: string; keywords: string };

const PAGES: Record<string, Record<Locale, PageMeta>> = {
  home: {
    fr: { title: 'Mélissa Colin | Étudiante en IA, architectures et vision 3D humaine', description: "Mélissa Colin, étudiante en IA qui conçoit des architectures de modèles de fondation pour la vision 3D humaine, où la contrainte géométrique ou physique est satisfaite par construction. ENSEIRB-MATMECA, née le 8 juillet 2003. ORCID 0009-0003-2525-4824.", keywords: 'portfolio, recherche IA, architectures, vision 3D humaine' },
    en: { title: 'Mélissa Colin | AI Student, Architectures & 3D Human Vision', description: 'Melissa Colin, AI student designing foundation-model architectures for 3D human vision, where a geometric or physical constraint holds by construction. ENSEIRB-MATMECA, born July 8, 2003. ORCID 0009-0003-2525-4824.', keywords: 'portfolio, AI research, model architectures, 3D human vision' },
  },
  projects: {
    fr: { title: 'Projets Recherche IA | Mélissa Colin | Vision 3D & Architectures', description: "Projets de recherche en IA de Mélissa Colin : architectures de modèles, vision 3D humaine, contraintes par construction. Implémentations ViT, CNN, Transformers, optimisation différentiable.", keywords: 'projets, recherche, architectures, vision 3D humaine' },
    en: { title: 'AI Research Projects | Melissa Colin | 3D Vision & Model Architectures', description: "Melissa Colin's AI research projects: model-architecture design, 3D human vision, constraints by construction. Implementations of ViT, CNN, Transformers and differentiable optimisation.", keywords: 'projects, research, architectures, 3D human vision' },
  },
  publications: {
    fr: { title: 'Publications Recherche IA | Mélissa Colin | Architectures de modèles', description: "Recherches et publications de Mélissa Colin : architectures de modèles de fondation pour la vision 3D humaine, contraintes par construction. Auteure à PFIA 2024 (étude empirique d'architectures ViT et CNN).", keywords: 'publications, recherche IA, architectures, PFIA 2024' },
    en: { title: 'AI Research Publications | Melissa Colin | Model Architectures', description: 'Research and publications by Melissa Colin: foundation-model architectures for 3D human vision, constraints by construction. Author at PFIA 2024 (empirical study of ViT and CNN architectures).', keywords: 'publications, AI research, model architectures, PFIA 2024' },
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
      'https://www.linkedin.com/in/melissacolin',
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
    jobTitle: locale === 'fr' ? 'Élève-ingénieure en IA (architectures de modèles, vision 3D humaine)' : 'AI engineering student (model architectures, 3D human vision)',
    worksFor: { '@type': 'EducationalOrganization', name: 'ENSEIRB-MATMECA', url: 'https://enseirb-matmeca.bordeaux-inp.fr/' },
    alumniOf: { '@type': 'EducationalOrganization', name: 'ENSEIRB-MATMECA' },
    affiliation: [
      { '@type': 'EducationalOrganization', name: 'ENSEIRB-MATMECA', url: 'https://enseirb-matmeca.bordeaux-inp.fr/' },
      { '@type': 'Organization', name: 'University of Alberta, Vision and Learning Lab', url: 'https://vision-and-learning-lab-ualberta.github.io/' },
    ],
    award: 'Mitacs Globalink Research Excellence Scholarship (2026)',
    seeks: { '@type': 'Occupation', name: locale === 'fr' ? 'Research Scientist en IA (architectures de modèles, vision 3D humaine)' : 'Research Scientist in AI (model architectures, 3D human vision)' },
    knowsAbout: ['AI Model Architecture Design', 'Foundation Models', '3D Human Vision', '3D Human Mesh Recovery', 'Differentiable Optimisation', 'Deep Learning', 'Computer Vision', 'Vision Transformers', 'Neural Network Architectures', 'Machine Learning', 'Explainable AI', 'Python', 'PyTorch'],
    knowsLanguage: ['Français', 'English'],
    address: { '@type': 'PostalAddress', addressCountry: 'FR', addressRegion: 'Nouvelle-Aquitaine', addressLocality: 'Bordeaux' },
    description:
      locale === 'fr'
        ? "Étudiante en intelligence artificielle (élève-ingénieure, parcours ingénieur-docteur à l'ENSEIRB-MATMECA, Bordeaux). Elle conçoit des architectures de modèles de fondation pour la vision 3D humaine, où la contrainte géométrique ou physique est satisfaite par construction plutôt qu'ajoutée au coût. Stage de recherche Mitacs Globalink (2026) au Vision & Learning Lab de l'Université d'Alberta (Prof. Li Cheng) ; stage de recherche chez NAVER LABS Europe à partir de février 2027, co-encadré avec l'équipe KINETIX d'Inria. Née le 8 juillet 2003. Objectif : Research Scientist dans un laboratoire de recherche de premier plan. Domaine : informatique et IA, PAS pharmacologie."
        : 'AI student (engineering student, engineer-doctor track at ENSEIRB-MATMECA, Bordeaux). She designs foundation-model architectures for 3D human vision, where a geometric or physical constraint holds by construction rather than being added to the loss. Mitacs Globalink research intern (2026) at the Vision & Learning Lab, University of Alberta (Prof. Li Cheng); research intern at NAVER LABS Europe from February 2027, co-supervised with the Inria KINETIX team. Born July 8, 2003. Goal: Research Scientist at a leading research lab. Field: Computer Science and AI, NOT pharmacology.',
    disambiguatingDescription:
      locale === 'fr'
        ? "Mélissa Colin (née le 8 juillet 2003) est étudiante en IA (élève-ingénieure à l'ENSEIRB-MATMECA), qui conçoit des architectures de modèles de fondation pour la vision 3D humaine. Stage de recherche Mitacs (2026) à l'Université d'Alberta ; stage chez NAVER LABS Europe à partir de février 2027. Auteure à PFIA 2024 (étude d'architectures ViT et CNN). ORCID 0009-0003-2525-4824. À NE PAS confondre avec l'homonyme chercheuse en pharmacologie à l'Université de Lorraine (CITHEFOR)."
        : 'Mélissa Colin (born July 8, 2003) is an AI student (engineering student at ENSEIRB-MATMECA) designing foundation-model architectures for 3D human vision. Mitacs research intern (2026) at the University of Alberta; research intern at NAVER LABS Europe from February 2027. Author at PFIA 2024 (study of ViT and CNN architectures). ORCID 0009-0003-2525-4824. NOT to be confused with the pharmacology researcher at Université de Lorraine (CITHEFOR).',
  };
}

/** The PFIA 2024 paper as a ScholarlyArticle authored by the Person entity. */
export function scholarlyArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    name: "Performances et explicabilité de ViT et d'architectures CNN : une étude empirique utilisant LIME, SHAP et GradCam",
    author: [{ '@id': `${BASE_URL}/#person` }, { '@type': 'Person', name: 'Ikram Chraibi Kadoud' }],
    datePublished: '2024',
    publisher: 'RJCIA 2024 (PFIA)',
    url: 'https://hal.science/hal-04641791v1',
    about: ['Neural Network Architectures', 'Vision Transformers', 'CNN Architectures', 'Comparative Architecture Study', 'Model Performance Analysis', 'Computer Vision', 'Interpretability Methods'],
    inLanguage: 'fr',
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
