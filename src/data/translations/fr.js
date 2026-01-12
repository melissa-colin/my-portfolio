import { details, link, view } from "framer-motion/client";

/**
 * French translations for the portfolio website
 */
const fr = {
  site: {
    title: "Mélissa Colin | Étudiante en Intelligence Artificielle",
    tagline: "Étudiante en Intelligence Artificielle",
    description: "Étudiante en IA passionnée par ses applications en vision par ordinateur, j'ai pour ambition de travailler sur des projets de recherche innovants dans les architectures de modèles de deep learning, l'IA explicable et la vision par ordinateur.",
  },
  
  theme: {
    dark: "Mode Sombre",
    light: "Mode Clair",
    toggle: "Changer le thème"
  },
  
  nav: {
    home: "Accueil",
    certification: "Certifications",
    publications: "Publications",
    experience: "Expérience",
    education: "Formation",
    projects: "Projets",
    blog: "Blog",
    contact: "Contact"
  },
  
  common: {
    share: "Partager",
    shareOn: "Partager sur",
    copyLink: "Copier le lien",
    linkCopied: "Lien copié !",
    loading: "Chargement...",
    error: "Erreur",
    retry: "Réessayer"
  },
  
  notFound: {
    title: "Page non trouvée",
    pageNotFound: "Page non trouvée",
    message: "La page que vous recherchez n'existe pas.",
    suggestion: "Elle a peut-être été déplacée ou supprimée.",
    quickLinks: "Liens rapides",
    searchSuggestion: "Que recherchez-vous ?",
    searchHelp: "Utilisez la navigation ci-dessus ou contactez-moi directement.",
    goBack: "Retour",
    goHome: "Accueil",
    funFact: "\" L'erreur est humaine mais un véritable désastre nécessite un ordinateur.\" - Paul R. Ehrlich"
  },
  
  home: {
    heroTitle: "Mélissa Colin",
    heroSubtitle: "Je suis une étudiante ingénieure en filière informatique de l'ENSEIRB-MATMECA, spécialisée en IA appliquée à la vision par ordinateur. J'explore les différents systèmes afin de les rendre plus interprétables et fiables ou d'en développer de nouveaux.",
    viewProjects: "Voir les Projets",
    viewPublications: "Voir les Publications",
    viewExperience: "Voir l'expérience",
    learnMore: "En Savoir Plus",
    aboutTitle: "À Propos de Moi",
    skillsSection: {
      title: "Expertise & Compétences",
      subtitle: "Un spectre de compétences aussi bien techniques que relationnelles, avec un accent sur l'IA explicable et la vision par ordinateur.",
      skills: [
        {
          id: 'deeplearning',
          icon: 'FiCpu',
          name: "Deep Learning et Vision par Ordinateur",
          description: "CNN, ViT, Transformers, mécanismes d'attention, architectures encodeur-décodeur"
        },
        {
          id: 'languages',
          icon: 'FiCode',
          name: "Langages de Programmation",
          description: "Python, C, JavaScript, R, SQL"
        },
        {
          id: 'frameworks',
          icon: 'FiDatabase',
          name: "Frameworks data & IA",
          description: "OpenCV, PyTorch, TensorFlow, NumPy, Pandas, scikit-learn"
        },
        {
          id: 'mlops',
          icon: 'FiBriefcase',
          name: "MLOps & Déploiement",
          description: "Docker, Kubernetes, Kubeflow, pipelines d'entraînement optimisés"
        },
        {
          id: 'xai',
          icon: 'FiEye',
          name: "IA Explicable (XAI)",
          description: "LIME, SHAP, Grad-CAM, techniques d'interprétabilité"
        },
        {
          id: 'certification',
          icon: 'FiMessageSquare',
          name: "Recherche & Communication",
          description: "Rédaction scientifique, présentations techniques, diffusion des connaissances"
        },
        {
          id: 'laws-ethics',
          icon: 'FiShield',
          name: "Droit & Éthique de l'IA",
          description: "Conformité RGPD, IA Act, éthique de l'IA, biais algorithmiques, responsabilité des systèmes d'IA"
        },
        {
          id: 'softskills',
          icon: 'FiUsers',
          name: "Compétences Interpersonnelles",
          description: "Curiosité, organisation, adaptabilité, leadership, collaboration"
        },
        {
          id: 'languages-spoken',
          icon: 'FiGlobe',
          name: "Langues Parlées",
          description: "Français (natif), Anglais (courant), Chinois (débutant)"
        }
      ],
      notableTitle: "Réalisations Notables",
      notable: [
        "Auteure d'une première <a href=\"https://hal.science/hal-04641791v1\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">publication scientifique</a> à 20 ans présentée à PFIA 2024",
        "Organisation de la session de networking d'<a href=\"https://www.ai4industry.fr/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">AI4Industry</a>, avec animation d'une table ronde sur les perspectives post-thèse",
        "Publication sur <a href=\"https://medium.com/@melissa.colin/yolov8-explained-understanding-object-detection-from-scratch-763479652312\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">Medium</a> d'un article explicatif sur YOLOv8",
        "Vice-présidente du forum de recrutement <a href=\"https://www.ingenib.fr/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">Ingenib</a> de l'ENSEIRB-MATMECA"
      ]
    },
    viewAllProjects: "Voir Tous les Projets",
    age: "21 ans",
    status: "Élève-Ingénieure",
    school: "ENSEIRB-MATMECA"
  },

  about: {
    title: "À Propos de Moi",
    intro: "Je suis actuellement élève-ingénieure en informatique et intelligence artificielle à l'<strong>ENSEIRB-MATMECA</strong> à Bordeaux, où je suis le <strong>parcours ingénieur-docteur</strong> avec l'ambition claire de m'engager dans la <strong>recherche en IA</strong>.",
    section1Title: "Un parcours atypique, forgé par la passion",
    section1p1: "Ma passion pour l'informatique a commencé très tôt. À <strong>12 ans</strong>, je découvrais Scratch, à <strong>13 ans</strong>, je me formais seule en Python, et à <strong>15 ans</strong>, je choisissais un lycée technique. Très vite, je me suis rendu compte que ce qui me captivait, c'était <strong>l'algorithmique</strong>, plus que la création de sites web ou le développement de jeux. J'ai tâtonné un moment – robotique, développement, projets Arduino – avant de trouver une véritable résonance dans l'<strong>intelligence artificielle</strong>.",
    section1p2: "Ce déclic, je l'ai eu lors d'un stage en IA au sein de Cali Intelligences, une start-up spécialisée dans la vision par ordinateur et l'IA. Ce fut une révélation. Je me suis alors lancée corps et âme dans l'étude de l'IA, avec une volonté : <strong>contribuer activement à son évolution</strong>, en particulier à travers <strong>la conception et l'amélioration des architectures de modèles de deep learning</strong>.",
    section2Title: "Une volonté de réorientation et de dépassement",
    section2p1: "Issue initialement d'un cursus orienté vers la pratique, j'ai fait le choix courageux de me <strong>réorienter vers l'académique</strong> afin de consolider mes bases théoriques en mathématiques et algorithmique. J'ai intégré l'ENSEIRB-MATMECA, une école réputée pour son exigence académique et sa filière informatique, malgré les nombreux obstacles et doutes exprimés autour de ma candidature. Ma détermination a payé : j'ai intégré la formation en étant admise sur titre, prouvant que <strong>la motivation et l'autodidaxie peuvent rivaliser avec les parcours les plus classiques</strong>.",
    cta: "Découvrir mon parcours"
  },
  certification: {
    pageTitle: "Certifications",
    pageIntro: "Quand la curiosité s’accompagne d’un tampon.",
    filterByCategory: "Filtrer par Catégorie",
    clearFilters: "Effacer les Filtres",
    noMatch: "Aucune certification ne correspond aux catégories sélectionnées. Veuillez ajuster vos filtres.",
    viewCertificate: "Voir le Certificat",
    verified: "Certificat Vérifié",
    categoriesList: [
      { id: 'deep-learning', name: "Apprentissage Profond" },
      { id: 'computer-vision', name: "Vision par Ordinateur" },
      { id: 'mlops', name: "MLOps" },
      { id: 'xai', name: "IA Explicable" },
      { id: 'ethics', name: "Éthique de l'IA" },
      { id: 'cloud', name: "Cloud Computing" },
      { id: 'python', name: "Python" },
      { id: 'data-science', name: "Science des Données" },
      { id: 'math', name: "Mathématiques" },
      { id: 'transversal', name: "Compétences Transversales" },
      { id: 'research', name: "Recherche" },
      { id: 'ml', name: "Machine Learning" },
    ],
    certifications: [
      {
        id: 'math',
        title: "Math Prep: College & Work Ready",
        issuer: "University of North Texas",
        date: "Février 2024",
        description: "Préparation mathématique pour les étudiants universitaires et professionnels, couvrant l'algèbre, la géométrie et les statistiques.",
        categories: ['math'],
        verified: true,
        link: "https://www.coursera.org/account/accomplishments/verify/76JFT8RWXAH8"
      },
      {
        id: 'mlpos',
        title: "Docker pour les Développeurs/développeuses",
        issuer: "Linkedin Learning",
        date: "Décembre 2023",
        description: "Formation sur l'utilisation de Docker pour la conteneurisation des applications, y compris la création d'images et la gestion des conteneurs.",
        categories: ['mlops'],
        verified: true,
        link: "https://www.linkedin.com/learning/certificates/2ad9ec98113985ae1fb24fe5cbbc3db1a7a73233590d74d901f354cf760fdaf4?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B3EQveap8SVSnKDTYquyfvQ%3D%3D"
      },
      {
        id: 'ml',
        title: "Machine learning : Traitement du langage naturel avec Python",
        issuer: "Linkedin Learning",
        date: "Décembre 2023",
        description: "Formation sur les techniques de traitement du langage naturel (NLP) avec Python, y compris la lemmatisation, le stemming et le K-fold.",
        categories: ['ml', 'python'],
        verified: true,
        link: "https://www.linkedin.com/learning/certificates/721d19e8108b366ae34ccbc857580cb4c2a085f8870f7dfd2060e583c1a53643?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B3EQveap8SVSnKDTYquyfvQ%3D%3D"
      },
      {
        id: 'research',
        title: "Rédiger et publier un article scientifique",
        issuer: "France Université Numérique",
        date: "Décembre 2023",
        description: "Formation portée par l’Institut de recherche pour le Développement et animée par des chercheurs et enseignants-chercheurs du Réseau d’Excellence des Sciences de l’Ingénieur de la Francophonie, elle leur offre ainsi les clés pour répondre aux exigences des éditeurs scientifiques.",
        categories: ['research'],
        verified: true,
        link: "https://openbadgefactory.com/validator/result?a=https%3A%2F%2Fopenbadgefactory.com%2Fv1%2Fassertion%2F680c4bd78593df8e2857621c811a5e97864584e4.json"
      }
    ]
  },

  publications: {
    title: "Publications",
    subtitle: "Explorations guidées par l’envie de comprendre (et d’expliquer).",
    filter: "Filtrer",
    sort: "Trier par",
    date: "Date",
    citations: "Citations",
    venue: "Lieu de Publication",
    abstract: "Résumé",
    keywords: "Mots-clés",
    viewPaper: "Voir l'Article",
    citeBibtex: "Citer (BibTeX)",
    readMore: "Lire Plus",
    noPublications: "Aucune publication disponible.",
    list: [
      {
        id: 1,
        title: "Performances et explicabilité de ViT et d'architectures CNN : une étude empirique utilisant LIME, SHAP et GradCam",
        authors: "Colin, M., Chraibi Kkaadoud, I.",
        venue: "PFIA 2024",
        year: "2024",
        url: "https://hal.science/hal-04641791v1",
        abstract: "Ces dernières années, l’IA explicable a été mise en avant comme la solution à plébisciter pour instaurer la confiance entre les utilisateurs et les systèmes d’IA. Pour étudier cette hypothèse, nous proposons une étude empirique sur le lien entre la performance et l’explicabilité de quatre algorithmes de vision par ordinateur : ViT, ResNet50, VGG16 et InceptionV3. Notre étude utilise trois méthodes d’explicabilité locale : LIME, SHAP et GradCam. Nous montrons que si l’IA explicable peut être un outil permettant de questionner la représentation artificielle d’un algorithme et son comportement, elle peut aussi présenter des problèmes de robustesse ou d’informations contradictoires susceptibles de miner la confiance. Les résultats de notre étude montrent que multiplier les outils d’explicabilité permet de vérifier la fiabilité des explications et des informations extraites.",
        type: "Conférence",
      }
    ]
  },
  
  projects: {
    title: "Projets",
    subtitle: "Le laboratoire un peu fou des idées qui s’aventurent sans guide.",
    filter: "Filtrer Par",
    allCategories: "Toutes les Catégories",
    search: "Rechercher des projets...",
    techStack: "Technologies",
    viewLive: "Voir la Démo",
    viewCode: "Voir le Code",
    readMore: "En Savoir Plus",
    list: [
      {
        id: 1,
        title: "PoseNet",
        description: "Un projet de recherche sur la reconnaissance d'actions grâce aux données de pose humaine.",
        image: "/assets/images/projects/posenet2.png",
        technologies: ["Python", "Pose Estimation", "OpenCV", "Deep Learning"],
        github: "https://github.com/melissa-colin/PoseNet",
        category: "Vision",
        featured: false
      },
      {
        id: 2,
        title: "WitHub",
        description: "Une boîte à outils complète pour automatiser le versioning de projets sur Git grâce à l'IA.",
        image: "/assets/images/projects/withub2.png",
        technologies: ["Python", "Git", "Ollama", "LLMs"],
        github: null,
        demo: null,
        category: "Outils",
        featured: false
      },
      {
        id: 3,
        title: "EcoSort",
        description: "Application mobile qui combine la reconnaissance d'image et la géolocalisation pour aider les utilisateurs à trier correctement leurs déchets.",
        image: "/assets/images/projects/ecosort.png",
        technologies: ["YOLO", "Python", "OpenCV"],
        github: "https://github.com/melissa-colin/EcoSort",
        demo: "https://www.youtube.com/watch?v=GGjImtkW-us",
        category: "Vision",
        featured: false
      }
    ],
    featuredSection: {
      title: "Projets phares",
      subtitle: "Découvrez mes derniers projets de recherche et implémentations techniques.",
      button: "Voir Tous les Projets",
      demo: "Démo",
      publication: "Publication"
    },
  },

  experience: {
    pageTitle: "Expérience Professionnelle",
    pageSubtitle: "Les endroits où j’ai appris autrement qu’à l’école.",
    moreInfo: "Si vous souhaitez en savoir plus sur mon expérience professionnelle, n'hésitez pas à me contacter.",
    noExperience: "Aucune expérience professionnelle disponible.",
    list: [
      {
        id: 1,
        title: "Ingénieure R&D – IA et Sûreté",
        company: "Sector Group",
        companyUrl: "https://www.sector-group.net/",
        location: "Villebon-sur-Yvette, Île-de-France, France (à distance)",
        period: "Juin 2025 - Août 2025",
        description: "Participation à un projet de recherche appliquée sur le développement d’une IA fiable pour extraire de l’information à partir de documents PDF non structurés et non OCRisés.",
        technologies: ["Python", "Deep Learning", "Machine Learning", "Vision par Ordinateur", "Traitement de l'image", "IA digne de confiance", "RGPD", "OCR", "RAG", "Sûreté"],
        logo: "assets/images/logos/sector-group.jpeg",
        type: "Stage",
      },
      // {
      //   id: 2,
      //   title: "Responsable formation",
      //   company: "Eirb'IA",
      //   companyUrl: "https://bde.eirb.fr/clubs-assos/eirbia",
      //   location: "Talence, Nouvelle-Aquitaine, France",
      //   period: "Juin 2025 - Présent",
      //   description: "Responsable des formations sur les technologies d’IA et de machine learning au sein de l’association.",
      //   technologies: ["Python", "Deep Learning", "Machine Learning"],
      //   type: "Associatif",
      //   logo: "assets/images/eirbia.jpeg",
      // },
      {
        id: 3,
        title: "Vice-présidente",
        company: "Forum INGENIB",
        companyUrl: "https://www.ingenib.fr/",
        location: "Talence, Nouvelle-Aquitaine, France",
        period: "Avril 2025 - Présent",
        description: "Organisation d'événements, coordination d'équipe et relations entreprises pour le forum de recrutement de l'école.",
        technologies: ["Travail d’équipe", "Organisation", "Gestion de projet", "Management"],
        type: "Associatif",
        logo: "assets/images/logos/ingenib.png",
      },
      {
        id: 4,
        title: "Responsable Networking",
        company: "ai4industry",
        companyUrl: "https://www.ai4industry.fr/",
        location: "Talence, Nouvelle-Aquitaine, France",
        period: "Novembre 2024 - Présent",
        description: "Organisation, coordination et animation d’un événement de networking lors d’un workshop national en IA pour étudiants ingénieurs.",
        technologies: ["Organisation", "Gestion de projet", "Communication"],
        type: "Associatif",
        logo: "assets/images/logos/ai4industry.png",
        detail: `
          <section>
          <p>
              <strong>ai4industry</strong> est un atelier d'une semaine destiné aux étudiants en dernière année d'école d'ingénieurs ou de master venant de toute la France, organisé chaque année à l'ENSEIRB-MATMECA.
            </p>
            <p>
              En tant que <strong>Responsable Networking</strong> pour ai4industry, je suis en charge de la planification et de la coordination de l’événement, de la mobilisation des participants, ainsi que de la gestion du budget et des ressources en amont de la session de networking, prévue le jeudi après-midi durant la semaine de l’atelier.
            </p>
            <p>
              Pendant l’événement, je supervise la mise en place, je coordonne les équipes et les intervenants, et je gère les sessions se déroulant dans l’amphithéâtre, y compris l’animation des tables rondes ainsi que les discours d’ouverture et de clôture.
            </p>
            <p>
              Après l’événement, je mène un débriefing afin d’identifier les axes d’amélioration et je travaille sur des stratégies pour rendre la session de networking plus dynamique et enrichissante pour l’ensemble des participants.
            </p>
          </section>
        `
      },
      {
        id: 5,
        title: "Développeuse IA",
        company: "Cali Intelligences",
        companyUrl: "https://www.cali-intelligences.com/",
        location: "Talence, Nouvelle-Aquitaine, France",
        period: "Juillet 2023 - Octobre 2024",
        description: "Développement de méthodes pour la reconnaissance d'actions, optimisation des modèles et processus MLOps. Analyse et annotation de données, amélioration de l'efficacité des entraînements IA.",
        technologies: ["Python", "PyTorch", "Kubernetes", "OpenCV", "Docker", "Elasticsearch", "Kubeflow", "Vision par Ordinateur", "RGPD", "Machine Learning", "Deep Learning", "IA Explicable", "MLOps", "R&D", "QA/QC", "IA Act"],
        type: "Alternance",
        detail: `
          <section>
            <h4>R&D :</h4>
            <ul>
              <li>Développement d'une nouvelle méthode de reconnaissance d'actions pour les comportements suspects</li>
              <li>Amélioration des modèles et de leur compréhension</li>
              <li>Développement Python et C++</li>
              <li>Explicabilité</li>
              <li>Réduction du temps de traitement des modèles de reconnaissance d'actions de 70 % grâce à l'optimisation des algorithmes</li>
              <li>Conduite de projets de R&D ayant abouti à la création de 3 nouvelles fonctionnalités</li>
            </ul>
            <h4>QA/QC :</h4>
            <ul>
              <li>Tri des données</li>
              <li>Analyse des données et statistiques pour plus de 100 000 vidéos</li>
              <li>Labellisation</li>
              <li>Mise en place de processus de QA/QC, garantissant des données de haute qualité pour l'entraînement des modèles</li>
            </ul>
            <h4>MLOps :</h4>
            <ul>
              <li>Mise en place de pipelines pour l'entraînement de l'IA</li>
              <li>Amélioration de l'entraînement grâce à l'augmentation de données</li>
              <li>Optimisation des hyperparamètres du modèle</li>
              <li>Optimisation des modèles d'apprentissage profond améliorant la précision du modèle de 60 % à 90 %</li>
            </ul>
          </section>
        `,
        logo: "assets/images/logos/cali.jpeg",
      },
      {
        id: 6,
        title: "Développeuse Python",
        company: "Cali Intelligences",
        companyUrl: "https://www.cali-intelligences.com/",
        location: "Talence, Nouvelle-Aquitaine, France",
        period: "Janvier 2023 - Mars 2023",
        description: "Optimisation d'algorithmes, développement Python, formation en vision par ordinateur et apprentissage profond. Sensibilisation RGPD.",
        technologies: ["Python", "Machine Learning", "Deep Learning", "OpenCV", "Vision par Ordinateur", "RGPD"],
        type: "Stage",
        detail: `
          <section>
            <ul>
              <li>Optimisation et amélioration des algorithmes</li>
              <li>Développement et test en python</li>
              <li>Entraînement de modèles IA</li>
              <li>Traitement de la donnée</li>
              <li>Formation au traitement de l'image, à la vision par ordinateur, au deep learning et au machine learning</li>
              <li>Formation à la réglementation RGPD</li>
              <li>Documentation technique</li>
            </ul>
          </section>
        `,
        logo: "assets/images/logos/cali.jpeg",
      },
      {
        id: 7,
        title: "Permanence contraception masculine",
        company: "Le Planning Familial",
        companyUrl: "https://www.planning-familial.org/fr",
        location: "Bordeaux, Nouvelle-Aquitaine, France",
        period: "Décembre 2022 - Septembre 2024",
        description: "Sensibilisation et information sur les méthodes de contraception masculine, notamment l’Andro-switch.",
        technologies: ["Communication"],
        type: "Associatif",
        logo: "assets/images/logos/planning-familial.png",
      },
      {
        id: 8,
        title: "Ambassadrice",
        company: "EPSI - L'école d'ingénierie informatique",
        companyUrl: "",
        location: "France",
        period: "Novembre 2021 - Juin 2024",
        description: "Représentation de l’école lors des salons, JPO et événements en ligne.",
        technologies: ["Communication"],
        type: "Associatif",
        logo: "assets/images/logos/EPSI.png",
      },
      {
        id: 9,
        title: "Web Project Manager",
        company: "eveho",
        companyUrl: "https://eveho.io/",
        location: "Cenon, Nouvelle-Aquitaine, France",
        period: "Juin 2022 - Août 2022",
        description: "Création de pages web via CMS, stylisation CSS, référencement SEO.",
        technologies: ["CMS", "CSS", "SEO"],
        type: "Stage",
        logo: "assets/images/logos/eveho.png",
      },
      {
        id: 10,
        title: "Webmaster",
        company: "COACHINTERNET.FR",
        companyUrl: "https://www.coachinternet.fr/",
        location: "Mérignac, Nouvelle-Aquitaine, France (à distance)",
        period: "Mai 2022 - Juin 2022",
        description: "Création de pages WordPress, publication de contenus sur les réseaux sociaux et marketing digital.",
        technologies: ["Marketing Digital"],
        type: "Stage",
        logo: "assets/images/logos/coachinternet.png",
      },
      {
        id: 11,
        title: "Enseignante de mathématiques",
        company: "Superprof",
        companyUrl: "https://www.superprof.fr/",
        location: "Bordeaux, France",
        period: "Décembre 2018 - Décembre 2021",
        description: "Cours particuliers de mathématiques et aide aux devoirs pour élèves du secondaire.",
        technologies: ["Pédagogie", "Communication"],
        type: "Indépendante",
        logo: "assets/images/logos/superprof.jpg",
      },
      {
        id: 12,
        title: "Employée de magasin",
        company: "Action",
        companyUrl: "https://www.action.com/fr-fr/",
        location: "Saint-André-de-Cubzac, France",
        period: "Juillet 2021 - Août 2021",
        description: "Mise en rayon, gestion des stocks, encaissement.",
        technologies: ["Travail d’équipe"],
        type: "Intérimaire",
        logo: "assets/images/logos/action.png",
      },
      {
        id: 13,
        title: "Signalement - Cybersécurité",
        company: "#StopFisha",
        companyUrl: "https://stopfisha.org/",
        location: "France",
        period: "Novembre 2021 - Juillet 2023",
        description: "Participation à des actions de signalement de contenus en ligne dans le cadre de la cybersécurité et des droits humains.",
        technologies: ["Cybersécurité", "Communication", "Éthique numérique"],
        type: "Associatif",
        logo: "assets/images/logos/stopfisha.png",
      },
      {
        id: 14,
        title: "Technicienne maintenance informatique",
        company: "Arveyres Informatique",
        companyUrl: "",
        location: "Arveyres, Nouvelle-Aquitaine, France",
        period: "Mars 2018",
        description: "Tests de matériel informatique, installation de systèmes d’exploitation, support client.",
        technologies: ["Communication", "Matériel"],
        type: "Stage"
      },
    ]
  },

  education: {
    subtitle: "Parce que dans l’apprentissage profond, il y a aussi l’apprentissage supervisé. Mais contrairement aux machines, j’ai cherché des savoirs et pas juste des validations.",
    footer: "Parce qu’apprendre, ce n’est pas seulement optimiser des paramètres, c’est aussi donner du sens à chaque itération.",
    gpa : "Moyenne Générale",
    rank : "Classement",
    list: [
      {
        id: 1,
        degree: "Diplôme d'Ingénieur en Informatique",
        specialization: "Spécialisation en Intelligence Artificielle",
        institution: "ENSEIRB-MATMECA",
        location: "Talence, Nouvelle-Aquitaine, France",
        period: "2024 - 2027",
        description: "Formation d’ingénieure reconnue par la CTI se déroulant sur trois ans et combinant un solide tronc commun scientifique, des projets innovants (en équipe et souvent en partenariat avec l’industrie).",
        gpa: "14.92/20",
        rank: "Top 3 de la promotion",
      },
      {
        id: 2,
        degree: "Bachelor en Intelligence Artificielle et Data Sciences",
        institution: "EPSI - L'école d'ingénierie informatique",
        location: "Bordeaux, Nouvelle-Aquitaine, France",
        period: "2021- 2024",
        description: "Formation en intelligence artificielle, apprentissage automatique et sciences des données, avec un accent sur les applications pratiques et réalisée en alternance lors de la dernière année.",
        achievements: [
          "EcoSort : Application mobile pour le tri des déchets via reconnaissance d’image et géolocalisation, gagnante d’une compétition nationale d’innovation. Voir la <a href=\"https://youtu.be/6nccMi2PK1Q\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">vidéo de présentation</a>",
          "VidAI : Outil web simplifiant l’édition vidéo grâce à une assistance IA."
        ],
        gpa: "16.38/20",
        rank: "1ère de promotion"
      },
      {
        id: 3,
        degree: "BTS Services informatiques aux organisations",
        specialization: "Solutions Logicielles et Applications Métiers",
        institution: "EPSI - L'école d'ingénierie informatique",
        location: "Bordeaux, Nouvelle-Aquitaine, France",
        period: "2021 - 2023",
        description: "BTS réalisé en option lors des deux premières années de Bachelor, avec un accent sur le développement logiciel et les applications métiers.",
        rank: "1ère de promotion"
      },
      {
        id: 4,
        degree: "Baccalauréat Sciences et Technologies de l’Industrie et du Développement Durable",
        specialization: "Systèmes d’Information et Numérique",
        institution: "Lycée Les Iris",
        location: "Lormont, Nouvelle-Aquitaine, France",
        period: "2019 - 2021",
        rank: "1ère de promotion",
      }
    ]
  },

  blog: {
    title: "Blog",
    subtitle: "Tutos, hypothèses et autres digressions raisonnablement sérieuses.",
    readTime: "min de lecture",
    categories: "Catégories",
    recentPosts: "Articles Récents",
    popularTags: "Tags Populaires",
    readMore: "Lire",
    searchPosts: "Rechercher des articles...",
    publishedOn: "Publié le",
    noPosts: "Aucun article trouvé.",
    sortBy: "Trier par",
    sortOptions: {
      date: "Date",
      popularity: "Popularité",
      title: "Titre"
    },
    formatDate: (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    },
    clearTag: "Effacer le Tag",
    posts: [
{
        id: 0,
        title: "Le 'Non' qui veut dire 'Pas Encore' : Post-Mortem de mon entretien Google",
        excerpt: "Google a dit 'Non' pour 2026. Loin des success stories, voici l'analyse technique de cet échec. Du 'bug' de coaching à 200€ à la révélation lors de l'entretien système : découvrez comment ce refus a validé mon pivot stratégique vers la Recherche à l'Université d'Alberta.",
        image: "/assets/images/blog-google-interview.png",
        date: "2026-01-12",
        readTime: 4,
        category: "Ingénierie & Résilience",
        tags: ["Post-Mortem", "Google", "Esprit Recherche"],
        link: "https://medium.com/@melissa.colin/the-no-that-means-not-yet-anatomy-of-a-google-interview-process-and-why-ill-be-back-fb3f0c2fecc9"
      },      {
        id: 1,
        title: "YOLOv8 Décrypté : Maîtriser la détection d’objets depuis zéro",
        excerpt: "Une plongée profonde dans l'architecture et les détails d'implémentation de YOLOv8, la dernière itération de l'algorithme populaire de détection d'objets.",
        image: "/assets/images/blog-yolov8.jpg",
        date: "2024-10-19",
        readTime: 7,
        category: "Vision par Ordinateur",
        tags: ["Détection d'Objets", "YOLO", "Deep Learning"],
        link: "https://medium.com/@melissa.colin/yolov8-explained-understanding-object-detection-from-scratch-763479652312"
      }
    ],
  },
  
  contact: {
    title: "Contact",
    subtitle: "On n'est jamais trop occupé pour discuter de nouvelles idées ou collaborations.",
    socialMedia: "Mes clones digitaux parlent parfois à ma place",
    signalTitle: "Envie de parler sans filtres ?",
    signalText: "Pour les conversations qui ne finiront pas dans un algorithme publicitaire.",
    signalButton: "Envoyer un message",
    location: "Localisation",
    place: "Bordeaux, France",
    followMe: "Suivez-moi",
    locationAndPhone: "À portée de voix, mais pas à découvert",
    emailAddress: "contact-me@melissacolin.ai",
    phone: "+33 7 82 52 XX XX",
    ctaMail: "Envoyer un e-mail",
    // linkedin: "www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=mélissa-colin",
    linkedin: "https://linkedin.com/in/mélissa-colin",
    github: "https://github.com/melissa-colin",
    medium: "https://medium.com/@melissa.colin",
    scholar: "https://scholar.google.com/citations?user=7r7iFpsAAAAJ&hl=fr",
    signalLink: "https://signal.me/#eu/5yuYK2KZs3zqsnzCWn_2mpBqIxc_MbQRDWjif_4UR5twTC5PvupLJo-CbZs2d6Dg",
  },
  
  footer: {
    copyright: "© 2025 Mélissa Colin. Tous droits réservés.",
    navigation: "Navigation",
    language: "Langue",
    darkMode: "Thème",
    contactInfo: "Informations de contact"
  }
};

export default fr;