/**
 * English translations for the portfolio website
 */
const en = {
  site: {
    title: "Mélissa Colin | XAI & Computer Vision Specialist",
    tagline: "XAI & Computer Vision Specialist",
    description: "Portfolio of Mélissa Colin, AI Researcher specializing in Explainable AI and Computer Vision"
  },
  
  theme: {
    dark: "Dark Mode",
    light: "Light Mode",
    toggle: "Toggle theme"
  },
  
  nav: {
    home: "Home",
    certification: "Certification",
    publications: "Publications",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact"
  },

  home: {
    heroTitle: "Mélissa Colin",
    heroSubtitle: "I'm an AI researcher specializing in Explainable AI (XAI) and Computer Vision, passionate about making AI systems more interpretable and trustworthy.",
    viewProjects: "View Projects",
    viewResearch: "View Certification",
    viewPublications: "View Publications",
    viewExperience: "View Experience",
    viewEducation: "View Education",
    viewBlog: "View Blog",
    learnMore: "Learn More",
    aboutTitle: "About Me",
    skillsSection: {
      title: "Expertise & Skills",
      subtitle: "A broad spectrum of technical skills with specialization in explainable AI and computer vision.",
      skills: [
        {
          id: 'deeplearning',
          icon: 'FiCpu',
          name: "Deep Learning & Computer Vision",
          description: "CNN, ViT, Transformers, attention mechanisms, encoder-decoder architectures"
        },
        {
          id: 'xai',
          icon: 'FiEye',
          name: "Explainable AI (XAI)",
          description: "LIME, SHAP, Grad-CAM, interpretability techniques"
        },
        {
          id: 'mlops',
          icon: 'FiBriefcase',
          name: "MLOps & Deployment",
          description: "Docker, Kubernetes, Kubeflow, optimized training pipelines"
        },
        {
          id: 'languages',
          icon: 'FiCode',
          name: "Programming Languages",
          description: "Python, R, SQL"
        },
        {
          id: 'frameworks',
          icon: 'FiDatabase',
          name: "AI Frameworks",
          description: "PyTorch, TensorFlow, scikit-learn, OpenCV"
        },
        {
          id: 'research',
          icon: 'FiMessageSquare',
          name: "Research & Communication",
          description: "Scientific writing, technical presentations, knowledge dissemination"
        }
      ],
      notableTitle: "Notable Achievements",
      notable: [
        "Development of a suspicious behavior recognition AI model (accuracy improved from <strong>60% to 90%</strong>)",
        "Reduction of model inference time by <strong>70%</strong>",
        "Co-organization of AI4Industry networking session, moderating a roundtable on post-PhD perspectives",
        "Published an <a href=\"https://medium.com/@melissa.colin/yolov8-explained-understanding-object-detection-from-scratch-763479652312\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">explanatory article</a> on YOLOv8 on Medium",
        "Co-author of a <a href=\"https://hal.science/hal-04641791v1\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">scientific publication</a> presented at PFIA 2024"
      ]
    },
    projectsTitle: "Featured Projects",
    viewAllProjects: "View All Projects",
    age: "21 years old",
    status: "Student-Engineer",
    school: "ENSEIRB-MATMECA"
  },

  about: {
    title: "About Me",
    intro: "My name is <strong>Mélissa Colin</strong>, I'm 21 years old, and I'm currently an engineering student in computer science and artificial intelligence at <strong>ENSEIRB-MATMECA</strong> in Bordeaux, where I'm pursuing an <strong>engineer-doctor track</strong> with the clear ambition to engage in <strong>AI research</strong>.",
    section1Title: "An atypical journey, forged by passion",
    section1p1: "My passion for computer science began very early. At <strong>12 years old</strong>, I discovered Scratch, at <strong>13</strong>, I taught myself Python, and by <strong>15</strong>, I chose a high school specializing in Information Systems and Digital Technology. Very quickly, I realized that what fascinated me was <strong>algorithmic design</strong>, more than website creation or game development. I experimented for a while – robotics, development, Arduino projects – before finding a true resonance in <strong>artificial intelligence</strong>.",
    section1p2: "This realization came during an AI internship at Cali Intelligences, a startup specializing in data and AI. It was a revelation. I then threw myself wholeheartedly into the study of AI, with one goal: <strong>to actively contribute to its evolution</strong>, particularly through <strong>the design and improvement of deep learning model architectures</strong>.",
    section2Title: "A determination to reorient and excel",
    section2p1: "Initially coming from a private curriculum oriented toward practical applications, I made the courageous choice to <strong>transition to public education</strong> in order to strengthen my theoretical foundations in mathematics and algorithms. I entered ENSEIRB-MATMECA, a school known for its academic rigor, despite the many obstacles and doubts expressed about my application. My determination paid off: I entered the program ranked <strong>first on the waiting list</strong>, proving that <strong>motivation and self-teaching can compete with the most traditional educational paths</strong>.",
    cta: "Discover my certification"
  },
  certification: {
    pageTitle: "Professional Certifications",
    pageIntro: "Continuous learning is essential in the rapidly evolving field of AI. These certifications represent my commitment to developing expertise across multiple domains within artificial intelligence and machine learning.",
    filterByCategory: "Filter by Category",
    clearFilters: "Clear Filters",
    noMatch: "No certifications match the selected categories. Please adjust your filters.",
    viewCertificate: "View Certificate",
    verified: "Verified Certificate",
    categoriesList: [
      { id: 'deep-learning', name: "Deep Learning" },
      { id: 'computer-vision', name: "Computer Vision" },
      { id: 'mlops', name: "MLOps" },
      { id: 'xai', name: "Explainable AI" },
      { id: 'ethics', name: "AI Ethics" },
      { id: 'cloud', name: "Cloud Computing" }
    ],
    certifications: [
      {
        id: 'deeplearning',
        title: "Deep Learning Specialization",
        issuer: "DeepLearning.AI",
        date: "December 2022",
        description: "Mastered fundamental concepts in deep neural networks, including convolutional networks, sequence models, and practical engineering techniques.",
        categories: ['deep-learning', 'computer-vision'],
        verified: true,
        link: "https://www.coursera.org/account/accomplishments/specialization/XXXXXX"
      },
      {
        id: 'mlops',
        title: "MLOps Engineering Certification",
        issuer: "Google Cloud",
        date: "March 2023",
        description: "Advanced training in building and deploying machine learning systems in production environments, with expertise in containerization, continuous delivery, and monitoring.",
        categories: ['mlops', 'cloud'],
        verified: true,
        link: "https://cloud.google.com/certification/machine-learning-engineer"
      },
      {
        id: 'explainableai',
        title: "Explainable AI: Foundations and Applications",
        issuer: "MIT Professional Education",
        date: "September 2023",
        description: "Comprehensive program covering theoretical foundations and practical implementation of explainable AI methods, with a focus on model interpretability, fairness, and regulatory compliance.",
        categories: ['xai', 'ethics'],
        verified: false,
        link: "https://professional.mit.edu/course-catalog/explainable-ai"
      },
      {
        id: 'computervision',
        title: "Advanced Computer Vision Certification",
        issuer: "NVIDIA Deep Learning Institute",
        date: "January 2023",
        description: "Specialized training in state-of-the-art computer vision techniques using deep learning, with hands-on experience in designing and implementing vision models for real-world applications.",
        categories: ['computer-vision', 'deep-learning'],
        verified: true,
        link: "https://www.nvidia.com/en-us/training/online/"
      },
      {
        id: 'ethics',
        title: "AI Ethics and Governance",
        issuer: "Oxford University",
        date: "June 2023",
        description: "Interdisciplinary program exploring ethical challenges in AI development and deployment, including bias mitigation, privacy protection, and creating responsible AI frameworks.",
        categories: ['ethics', 'xai'],
        verified: true,
        link: "https://www.conted.ox.ac.uk/courses/artificial-intelligence-ethics-and-society"
      },
      {
        id: 'cloudarch',
        title: "Cloud Architecture Professional",
        issuer: "AWS Training and Certification",
        date: "April 2023",
        description: "Professional certification covering cloud architecture best practices, scalable systems design, and implementation of secure and resilient cloud services.",
        categories: ['cloud', 'mlops'],
        verified: true,
        link: "https://aws.amazon.com/certification/"
      }
    ]
  },

  research: {
    title: "Research Focus",
    subtitle: "Exploring the frontiers of Explainable AI and Computer Vision",
    interests: "Research Interests",
    intro: "My research lies at the intersection of Explainable AI and Computer Vision, where I focus on developing interpretable deep learning models that provide meaningful explanations for their predictions while maintaining high performance.",
    publications: "Recent Publications",
    currentProjects: "Current Projects",
    collaborations: "Collaborations",
    currentProjects: "Current Projects",
    collaborations: "Collaborations",
    currentProjectsList: [
      {
        id: 'visionformer',
        title: 'VisionFormer: A Hybrid CNN-Transformer Architecture',
        status: 'In Progress',
        description: 'Developing a novel hybrid architecture that combines the local feature extraction strengths of CNNs with the global context understanding of Vision Transformers. The model aims to balance computational efficiency with superior performance on complex image recognition tasks.',
        link: 'https://github.com/melissacolin/visionformer'
      },
      {
        id: 'xaibench',
        title: 'XAIBench: Comprehensive Benchmarking Framework for XAI Methods',
        status: 'Active',
        description: 'Creating a standardized benchmarking framework to evaluate and compare different explainability methods across multiple dimensions: faithfulness to the model, comprehensibility to humans, and computational efficiency. The goal is to establish quantifiable metrics for XAI quality.',
        link: 'https://xaibench.org'
      },
      {
        id: 'medxai',
        title: 'MedXAI: Explainable Medical Image Analysis',
        status: 'Collaboration',
        description: 'Collaborative project with medical researchers to develop explainable AI systems for medical image analysis, focusing on early cancer detection. The project emphasizes creating explanations that are clinically meaningful and actionable for healthcare professionals.',
        link: 'https://www.bordeaux-neurocampus.fr/projects/medxai'
      },
      {
        id: 'attentionxai',
        title: 'AttentionXAI: Making Attention Mechanisms More Transparent',
        status: 'New',
        description: 'Investigating how attention mechanisms in neural networks can be designed to be inherently more interpretable, while maintaining or improving model performance. This project explores novel attention architectures and visualization techniques.',
        link: 'https://github.com/melissacolin/attention-xai'
      }
    ],
    noProjects: "No current projects available.",
    interestsList: [
      {
        id: 'xai',
        title: 'Explainable AI (XAI)',
        description: 'Developing methods to make neural network decisions more transparent, interpretable, and explainable, particularly in high-stakes domains like healthcare and autonomous systems.'
      },
      {
        id: 'vision',
        title: 'Computer Vision',
        description: 'Working on advanced vision architectures that combine the strengths of CNNs and Vision Transformers, with a focus on interpretability and robustness against adversarial attacks.'
      },
      {
        id: 'attention',
        title: 'Attention Mechanisms',
        description: 'Studying and improving attention mechanisms in deep neural networks to enhance model performance while enabling better explainability of the learned features.'
      },
      {
        id: 'ethics',
        title: 'AI Ethics & Fairness',
        description: 'Investigating how explainable AI methods can help identify and mitigate biases in datasets and algorithms, promoting fairer and more ethical AI systems.'
      }
    ],

    collaborationsList: [
      {
        id: 'bordeaux-neuro',
        title: 'Bordeaux NeuroComputing Institute',
        description: 'Collaboration on interpretable deep learning models for medical image analysis.',
        link: 'https://www.bordeaux-neurocampus.fr/',
        linkLabel: 'bordeaux-neurocampus.fr'
      },
      {
        id: 'ai-ethics-lab',
        title: 'AI Ethics Lab',
        description: 'Working on developing guidelines for ethical considerations in explainable AI systems.',
        link: 'https://aiethicslab.com/',
        linkLabel: 'aiethicslab.com'
      },
      {
        id: 'inria-bordeaux',
        title: 'INRIA Bordeaux',
        description: 'Joint research on efficient self-attention mechanisms for vision transformers.',
        link: 'https://www.inria.fr/en/inria-centre-bordeaux',
        linkLabel: 'inria.fr/en/inria-centre-bordeaux'
      },
      {
        id: 'xai-research',
        title: 'XAI Research Group',
        description: 'International collaboration on developing standardized evaluation metrics for explainable AI methods.',
        link: 'https://xai-research.org',
        linkLabel: 'xai-research.org'
      }
    ]
  },
  
  education: {
    subtitle: "Because in deep learning, there is also supervised learning. Unlike machines, I sought knowledge—not just validations.",
    footer: "Because learning isn’t just about optimizing parameters; it’s also about giving meaning to each iteration.",
    gpa : "GPA",
    rank : "Rank",
    list: [
      {
        id: 1,
        degree: "Ph.D. in Computer Science",
        specialization: "Specialization in AI and Computer Vision",
        institution: "University of Paris",
        location: "Paris, France",
        period: "2014 - 2018",
        description: "Thesis: 'Explainable Deep Learning Methods for Computer Vision'. Developed novel approaches for interpreting convolutional neural networks. Received honors for research contributions.",
        achievements: [
          "Published 4 papers in top-tier conferences (CVPR, NeurIPS)",
          "Recipient of the Excellence in Research Award",
          "Teaching assistant for Advanced Machine Learning"
        ]
      },
      {
        id: 2,
        degree: "M.Sc. in Artificial Intelligence",
        specialization: "Machine Learning and Computer Vision",
        institution: "Technical University of Lyon",
        location: "Lyon, France",
        period: "2012 - 2014",
        description: "Focus on machine learning algorithms and computer vision techniques. Master's thesis on 'Efficient Deep Learning for Image Classification'.",
        achievements: [
          "Graduated with highest honors (Summa Cum Laude)",
          "Research internship at National Research Center",
          "Published master's research in international journal"
        ]
      },
      {
        id: 3,
        degree: "B.Sc. in Computer Science",
        specialization: "Mathematics and Computer Science",
        institution: "University of Toulouse",
        location: "Toulouse, France",
        period: "2009 - 2012",
        description: "Core curriculum in computer science, mathematics, and algorithms. Developed strong foundations in programming and computational theory.",
        achievements: [
          "Dean's List for academic excellence (all semesters)",
          "Undergraduate research project on algorithm optimization",
          "President of Computer Science Student Association"
        ]
      }
    ]
  },
  publications: {
    title: "Publications",
    subtitle: "Scientific contributions and research papers",
    filter: "Filter",
    sort: "Sort by",
    date: "Date",
    citations: "Citations",
    venue: "Publication Venue",
    abstract: "Abstract",
    keywords: "Keywords",
    viewPaper: "View Paper",
    citeBibtex: "Cite (BibTeX)",
    readMore: "Read More",
    noPublications: "No publications available.",
    list: [
      {
        id: 1,
        title: "Performances and Explainability of ViT and CNN Architectures: An Empirical Study Using LIME, SHAP, and GradCam",
        authors: "Colin, M., Chraibi Kkaadoud, I.",
        venue: "PFIA 2024",
        year: "2024",
        url: "https://hal.science/hal-04641791v1",
        abstract: "In recent years, explainable AI has been presented as the main solution for building trust between users and AI sys- tems. To investigate this hypothesis, we propose an empiri- cal study on the link between the performance and explai- nability of four computer vision algorithms : ViT, ResNet50, VGG16 and InceptionV3. Our study uses three local explai- nability methods : LIME, SHAP and GradCam. We show that, while explainable AI can be a tool for challenging the artificial representation of an algorithm and its behavior, it can also present robustness problems or contradictory in- formation that undermines trust. Our results show that by multiplying the use of explainable AI algorithms to explain one prediction, it is possible to verify the reliability of the explanations and extracted information."
      },
    ]
  },
  
  projects: {
    title: "Projects",
    subtitle: "A showcase of my technical work and research implementations",
    filter: "Filter By",
    allCategories: "All Categories",
    search: "Search projects...",
    techStack: "Technologies",
    viewLive: "View Demo",
    viewCode: "View Code",
    readMore: "Read More",
    categories: {
      xai: "XAI",
      vision: "Vision",
      ethics: "Ethics"
    },
    list: [
      {
        id: 1,
        title: "XAI Dashboard",
        description: "An interactive dashboard for visualizing and understanding how deep neural networks make decisions in computer vision applications.",
        image: "/assets/images/project-xai.jpg",
        technologies: ["Python", "TensorFlow", "React", "D3.js"],
        github: "https://github.com/melissacolin/xai-dashboard",
        demo: "https://xai-demo.example.com",
        category: "xai",
        featured: false
      },
      {
        id: 2,
        title: "Bias Detection Toolkit",
        description: "A comprehensive toolkit for identifying and mitigating various biases in ML models and datasets for more ethical AI development.",
        image: "/assets/images/project-bias.jpg",
        technologies: ["Python", "Scikit-learn", "Pandas"],
        github: "https://github.com/melissacolin/bias-detection",
        demo: null,
        category: "ethics",
        featured: false
      },
      {
        id: 3,
        title: "ViT vs CNN Explainability",
        description: "Research project comparing the explainability of Vision Transformers and CNNs using LIME, SHAP and Grad-CAM techniques.",
        image: "/assets/images/project-vit-cnn.jpg",
        technologies: ["PyTorch", "Python", "LIME", "SHAP", "Grad-CAM"],
        github: "https://github.com/melissacolin/vit-cnn-explainability",
        demo: "https://hal.science/hal-04641791v1",
        category: "vision",
        featured: false
      }
    ],
    featuredSection: {
      title: "Featured Projects", // ou "Projets en Vedette" en français
      subtitle: "Discover my recent projects in explainable AI and computer vision.", // ou la version FR
      button: "View All Projects", // ou "Voir Tous les Projets"
      demo: "Demo", // ou "Démo"
      publication: "Publication" // ou "Publication"
    },
  
  },

  experience: {
    pageTitle: "Professional Experience",
    pageSubtitle: "My journey in AI research and development, focusing on explainable AI and computer vision.",
    moreInfo: "For more information about my professional experience, please contact me.",
    noExperience: "No professional experience available.",
    list: [
      {
        id: 1,
        title: "Senior AI Researcher",
        company: "AI Research Lab, University of Technology",
        companyUrl: "",
        location: "Paris, France",
        period: "January 2022 - Present",
        description: "Leading research in Explainable AI methods for computer vision applications. Developed novel techniques for interpreting deep neural networks. Published 5 papers in top-tier conferences and journals.",
        technologies: ["PyTorch", "TensorFlow", "Python", "Computer Vision", "XAI"]
      },
      {
        id: 2,
        title: "AI Research Scientist",
        company: "Tech Innovation Labs",
        companyUrl: "",
        location: "Lyon, France",
        period: "March 2019 - December 2021",
        description: "Researched and implemented state-of-the-art computer vision algorithms. Collaborated with cross-functional teams to integrate AI solutions into production environments.",
        technologies: ["CUDA", "PyTorch", "Docker", "MLOps", "CI/CD"]
      },
      {
        id: 3,
        title: "Research Assistant",
        company: "National Research Institute",
        companyUrl: "",
        location: "Toulouse, France",
        period: "September 2017 - February 2019",
        description: "Assisted senior researchers in developing and evaluating machine learning models for image recognition. Contributed to 3 published papers and presented findings at international conferences.",
        technologies: ["Scikit-learn", "Keras", "NumPy", "Pandas", "Data Visualization"]
      }
    ]
  },
  
  blog: {
    title: "Blog",
    subtitle: "Thoughts, tutorials, and insights on AI research",
    readTime: "min read",
    categories: "Categories",
    recentPosts: "Recent Posts",
    popularTags: "Popular Tags",
    readMore: "Read More",
    searchPosts: "Search posts...",
    publishedOn: "Published on",
    noPostsFound: "No posts found.",
    sortBy: "Sort by",
    sortOptions: {
      date: "Date",
      popularity: "Popularity",
      title: "Title"
    },
    formatDate: (date) => new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }),
    clearTag: "Clear Tag",
    posts: [
      {
        id: 1,
        title: "Understanding YOLOv8: Object Detection from Scratch",
        excerpt: "A deep dive into the architecture and implementation details of YOLOv8, the latest iteration of the popular object detection algorithm.",
        image: "/assets/images/blog-yolov8.jpg",
        date: "2024-01-15",
        readTime: 12,
        category: "Computer Vision",
        tags: ["Object Detection", "YOLO", "Deep Learning"],
        link: "/blog/understanding-yolov8"
      },
      {
        id: 2,
        title: "Explainability in AI: Why Should We Care?",
        excerpt: "Exploring the importance of making AI systems interpretable, the current state of XAI techniques, and their impact on building trustworthy artificial intelligence.",
        image: "/assets/images/blog-xai.jpg",
        date: "2023-12-03",
        readTime: 8,
        category: "XAI",
        tags: ["Explainability", "Ethics", "AI Trust"],
        link: "/blog/explainability-ai"
      },
      {
        id: 3,
        title: "Vision Transformers vs CNNs: The Battle for Computer Vision",
        excerpt: "A comprehensive comparison of traditional Convolutional Neural Networks and the newer Vision Transformers for various computer vision tasks.",
        image: "/assets/images/blog-vit-cnn.jpg",
        date: "2023-09-22",
        readTime: 15,
        category: "Deep Learning",
        tags: ["Vision Transformers", "CNN", "Architecture"],
        link: "/blog/vit-vs-cnn"
      }
    ]
  },
  
  contact: {
    title: "Contact",
    subtitle: "Get in touch with me",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    sendMeMessage: "Send me a message",
    success: "Your message has been sent successfully!",
    error: "Sorry, there was an error sending your message.",
    required: "Required field",
    invalidEmail: "Please enter a valid email address",
    messageSent: "Thank you for your message. I will get back to you soon!",
    location: "Location",
    place: "Bordeaux, France",
    followMe: "Follow Me",
    emailAddress: "melissa.colin0@proton.me",
    phone: "+33 6 XX XX XX XX",
    linkedin: "https://linkedin.com/in/mélissa-colin",
    github: "https://github.com/melissacolin",
    medium: "https://medium.com/@melissacolin",
    scholar: "https://scholar.google.com/citations?user=melissacolin"
  },
  
  footer: {
    copyright: "© 2024 Mélissa Colin. All rights reserved.",
    navigation: "Navigation",
    language: "Language",
    darkMode: "Theme",
    contactInfo: "Contact Info"
  },
  
  notFound: {
    title: "Page Not Found",
    message: "The page you are looking for does not exist.",
    button: "Back to Home"
  }
};

export default en;