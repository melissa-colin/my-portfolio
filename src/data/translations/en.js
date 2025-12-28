/**
 * English translations for the portfolio website
 */
const en = {
  site: {
    title: "Mélissa Colin | Artificial Intelligence Student",
    tagline: "Artificial Intelligence Student",
    description: "AI student passionate about computer vision applications, with the ambition to work on innovative research projects involving deep learning model architectures, explainable AI, and computer vision.",
  },

  theme: {
    dark: "Dark Mode",
    light: "Light Mode",
    toggle: "Toggle Theme"
  },

  nav: {
    home: "Home",
    certification: "Certifications",
    publications: "Publications",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact"
  },
  
  common: {
    share: "Share",
    shareOn: "Share on",
    copyLink: "Copy link",
    linkCopied: "Link copied!",
    loading: "Loading...",
    error: "Error",
    retry: "Retry"
  },
  
  notFound: {
    title: "Page not found",
    pageNotFound: "Page not found",
    message: "The page you are looking for does not exist.",
    suggestion: "It may have been moved or deleted.",
    quickLinks: "Quick links",
    searchSuggestion: "What are you looking for?",
    searchHelp: "Use the navigation above or contact me directly.",
    goBack: "Go back",
    goHome: "Home",
    funFact: "\"To err is human, to really foul things up requires a computer.\" - Paul R. Ehrlich"
  },

  home: {
    heroTitle: "Mélissa Colin",
    heroSubtitle: "I'm an engineering student in computer science at ENSEIRB-MATMECA, specializing in AI applied to computer vision. I explore and enhance systems to make them more interpretable and reliable—or design new ones altogether.",
    viewProjects: "View Projects",
    viewPublications: "View Publications",
    viewExperience: "View Experience",
    learnMore: "Learn More",
    aboutTitle: "About Me",
    skillsSection: {
      title: "Expertise & Skills",
      subtitle: "A broad set of both technical and interpersonal skills, with a focus on explainable AI and computer vision.",
      skills: [
        {
          id: 'deeplearning',
          icon: 'FiCpu',
          name: "Deep Learning & Computer Vision",
          description: "CNNs, ViTs, Transformers, attention mechanisms, encoder-decoder architectures"
        },
        {
          id: 'languages',
          icon: 'FiCode',
          name: "Programming Languages",
          description: "Python, C, JavaScript, R, SQL"
        },
        {
          id: 'frameworks',
          icon: 'FiDatabase',
          name: "Data & AI Frameworks",
          description: "OpenCV, PyTorch, TensorFlow, NumPy, Pandas, scikit-learn"
        },
        {
          id: 'mlops',
          icon: 'FiBriefcase',
          name: "MLOps & Deployment",
          description: "Docker, Kubernetes, Kubeflow, optimized training pipelines"
        },
        {
          id: 'xai',
          icon: 'FiEye',
          name: "Explainable AI (XAI)",
          description: "LIME, SHAP, Grad-CAM, interpretability techniques"
        },
        {
          id: 'certification',
          icon: 'FiMessageSquare',
          name: "Research & Communication",
          description: "Scientific writing, technical presentations, knowledge dissemination"
        },
        {
          id: 'laws-ethics',
          icon: 'FiShield',
          name: "AI Law & Ethics",
          description: "GDPR compliance, AI Act, AI ethics, algorithmic bias, system accountability"
        },
        {
          id: 'softskills',
          icon: 'FiUsers',
          name: "Interpersonal Skills",
          description: "Curiosity, organization, adaptability, leadership, teamwork"
        },
        {
          id: 'languages-spoken',
          icon: 'FiGlobe',
          name: "Languages Spoken",
          description: "French (native), English (fluent), Chinese (beginner)"
        }
      ],
      notableTitle: "Notable Achievements",
      notable: [
        "Author of a first <a href=\"https://hal.science/hal-04641791v1\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">scientific publication</a> at age 20, presented at PFIA 2024",
        "Organizer of the networking session at <a href=\"https://www.ai4industry.fr/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">AI4Industry</a>, and moderator of a roundtable on post-PhD opportunities",
        "Published an in-depth explainer on YOLOv8 on <a href=\"https://medium.com/@melissa.colin/yolov8-explained-understanding-object-detection-from-scratch-763479652312\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">Medium</a>",
        "Vice-president of the <a href=\"https://www.ingenib.fr/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">Ingenib</a> recruitment forum at ENSEIRB-MATMECA"
      ]
    },
    viewAllProjects: "View All Projects",
    age: "21 years old",
    status: "Engineering Student",
    school: "ENSEIRB-MATMECA"
  },

  about: {
    title: "About Me",
    intro: "I am currently a computer and artificial intelligence engineering student at <strong>ENSEIRB-MATMECA</strong> in Bordeaux, following the <strong>engineer-doctor pathway</strong> with a clear ambition to pursue <strong>AI research</strong>.",
    section1Title: "An Unconventional Journey Driven by Passion",
    section1p1: "My passion for computing began very early. At <strong>12 years old</strong>, I discovered Scratch; at <strong>13</strong>, I taught myself Python; and by <strong>15</strong>, I enrolled in a technical high school. I quickly realized that what fascinated me most was <strong>algorithms</strong>, more than web development or game creation. I experimented for a while—robotics, development, Arduino projects—before finding a true calling in <strong>artificial intelligence</strong>.",
    section1p2: "That spark came during an AI internship at Cali Intelligences, a startup specializing in computer vision and AI. It was a revelation. I then threw myself wholeheartedly into AI studies, determined to <strong>actively contribute to its advancement</strong>, especially through <strong>designing and refining deep learning model architectures</strong>.",
    section2Title: "A Determination to Pivot and Excel",
    section2p1: "Originally enrolled in a practice-oriented program, I made the bold decision to <strong>transition to academia</strong> to strengthen my theoretical foundation in mathematics and algorithms. I joined ENSEIRB-MATMECA, renowned for its academic rigor and its computer science track, despite numerous doubts surrounding my application. My determination paid off: I was admitted on merit, proving that <strong>motivation and self-learning can stand shoulder to shoulder with the most traditional paths</strong>.",
    cta: "Explore My Journey"
  },

  certification: {
    pageTitle: "Certifications",
    pageIntro: "When curiosity comes with a stamp of approval.",
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
      { id: 'cloud', name: "Cloud Computing" },
      { id: 'python', name: "Python" },
      { id: 'data-science', name: "Data Science" },
      { id: 'math', name: "Mathematics" },
      { id: 'transversal', name: "Cross-Disciplinary Skills" },
      { id: 'research', name: "Research" },
      { id: 'ml', name: "Machine Learning" },
    ],
    certifications: [
      {
        id: 'math',
        title: "Math Prep: College & Work Ready",
        issuer: "University of North Texas",
        date: "February 2024",
        description: "Mathematics preparation for university students and professionals, covering algebra, geometry, and statistics.",
        categories: ['math'],
        verified: true,
        link: "https://www.coursera.org/account/accomplishments/verify/76JFT8RWXAH8"
      },
      {
        id: 'mlpos',
        title: "Docker for Developers",
        issuer: "LinkedIn Learning",
        date: "December 2023",
        description: "Training on using Docker for application containerization, including image creation and container management.",
        categories: ['mlops'],
        verified: true,
        link: "https://www.linkedin.com/learning/certificates/2ad9ec98113985ae1fb24fe5cbbc3db1a7a73233590d74d901f354cf760fdaf4?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B3EQveap8SVSnKDTYquyfvQ%3D%3D"
      },
      {
        id: 'ml',
        title: "Machine Learning: Natural Language Processing with Python",
        issuer: "LinkedIn Learning",
        date: "December 2023",
        description: "Course on natural language processing techniques with Python, including lemmatization, stemming, and K-fold cross-validation.",
        categories: ['ml', 'python'],
        verified: true,
        link: "https://www.linkedin.com/learning/certificates/721d19e8108b366ae34ccbc857580cb4c2a085f8870f7dfd2060e583c1a53643?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B3EQveap8SVSnKDTYquyfvQ%3D%3D"
      },
      {
        id: 'research',
        title: "Writing and Publishing a Scientific Article",
        issuer: "France Université Numérique",
        date: "December 2023",
        description: "Program led by the Institut de Recherche pour le Développement and taught by researchers from the Francophone Engineering Sciences Excellence Network, providing the keys to meet scientific publishers' standards.",
        categories: ['research'],
        verified: true,
        link: "https://openbadgefactory.com/validator/result?a=https%3A%2F%2Fopenbadgefactory.com%2Fv1%2Fassertion%2F680c4bd78593df8e2857621c811a5e97864584e4.json"
      }
    ]
  },

  publications: {
    title: "Publications",
    subtitle: "Explorations driven by the desire to understand (and explain).",
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
        abstract: "In recent years, explainable AI has been presented as the main solution for building trust between users and AI sys- tems. To investigate this hypothesis, we propose an empirical study on the link between the performance and explai- nability of four computer vision algorithms : ViT, ResNet50, VGG16 and InceptionV3. Our study uses three local explai- nability methods : LIME, SHAP and GradCam. We show that, while explainable AI can be a tool for challenging the artificial representation of an algorithm and its behavior, it can also present robustness problems or contradictory in- formation that undermines trust. Our results show that by multiplying the use of explainable AI algorithms to explain one prediction, it is possible to verify the reliability of the explanations and extracted information.",
        type: "Conference Paper",
      },
    ]
  },

  projects: {
    title: "Projects",
    subtitle: "A slightly mad lab for ideas that venture out without a guide.",
    filter: "Filter By",
    allCategories: "All Categories",
    search: "Search projects...",
    techStack: "Technologies",
    viewLive: "View Demo",
    viewCode: "View Code",
    readMore: "Learn More",
    list: [
      {
        id: 1,
        title: "PoseNet",
        description: "A research project on action recognition using human pose data.",
        image: "/assets/images/projects/posenet2.png",
        technologies: ["Python", "Pose Estimation", "OpenCV", "Deep Learning"],
        github: "https://github.com/melissa-colin/PoseNet",
        category: "Vision",
        featured: false
      },
      {
        id: 2,
        title: "WitHub",
        description: "A comprehensive toolkit to automate project versioning on Git using AI.",
        image: "/assets/images/projects/withub2.png",
        technologies: ["Python", "Git", "Ollama", "LLMs"],
        github: null,
        demo: null,
        category: "Tools",
        featured: false
      },
      {
        id: 3,
        title: "EcoSort",
        description: "A mobile app combining image recognition and geolocation to help users sort their waste properly.",
        image: "/assets/images/projects/ecosort.png",
        technologies: ["YOLO", "Python", "OpenCV"],
        github: "https://github.com/melissa-colin/EcoSort",
        demo: "https://www.youtube.com/watch?v=GGjImtkW-us",
        category: "Vision",
        featured: false
      }
    ],
    featuredSection: {
      title: "Featured Projects",
      subtitle: "Explore my latest research projects and technical implementations.",
      button: "View All Projects",
      demo: "Demo",
      publication: "Publication"
    },
  },

  experience: {
    pageTitle: "Professional Experience",
    pageSubtitle: "The places where I’ve learned outside of school.",
    moreInfo: "If you would like to know more about my professional experience, feel free to get in touch.",
    noExperience: "No professional experience available.",
    list: [
      {
        id: 1,
        title: "R&D Engineer – AI and Safety",
        company: "Sector Group",
        companyUrl: "https://www.sector-group.net/",
        location: "Villebon-sur-Yvette, Île-de-France, France (remote)",
        period: "June 2025 - August 2025",
        description: "Contributed to an applied research project focused on developing trustworthy AI to extract information from unstructured and non-OCR PDF documents.",
        technologies: ["Python", "Deep Learning", "Machine Learning", "Computer Vision", "Image Processing", "Trustworthy AI", "GDPR", "OCR", "RAG", "Safety"],
        logo: "assets/images/logos/sector-group.jpeg",
        type: "Internship",
      },
      // {
      //   id: 2,
      //   title: "Training Manager",
      //   company: "Eirb'IA",
      //   companyUrl: "https://bde.eirb.fr/clubs-assos/eirbia",
      //   location: "Talence, Nouvelle-Aquitaine, France",
      //   period: "June 2025 - Present",
      //   description: "Led training sessions on AI and machine learning technologies within the student association.",
      //   technologies: ["Python", "Deep Learning", "Machine Learning"],
      //   type: "Volunteer",
      //   logo: "assets/images/eirbia.jpeg",
      // },
      {
        id: 3,
        title: "Vice President",
        company: "Forum INGENIB",
        companyUrl: "https://www.ingenib.fr/",
        location: "Talence, Nouvelle-Aquitaine, France",
        period: "April 2025 - Present",
        description: "Organized events, managed teams, and handled corporate relations for the school's career fair.",
        technologies: ["Teamwork", "Organization", "Project Management", "Leadership"],
        type: "Volunteer",
        logo: "assets/images/logos/ingenib.png",
      },
      {
        id: 4,
        title: "Networking Manager",
        company: "ai4industry",
        companyUrl: "https://www.ai4industry.fr/",
        location: "Talence, Nouvelle-Aquitaine, France",
        period: "November 2024 - Present",
        description: "Planned, coordinated, and hosted a networking event during a national AI workshop for engineering students.",
        technologies: ["Organization", "Project Management", "Communication"],
        type: "Volunteer",
        logo: "assets/images/logos/ai4industry.png",
        detail: `
          <section>
          <p>
              <strong>ai4industry</strong> is a week-long workshop for final-year engineering or master’s students from across France, held annually at ENSERB-MATMECA.
            </p>
            <p>
              As <strong>Networking Manager</strong>, I’m responsible for planning and coordinating the event, engaging participants, and managing the budget and resources for the networking session scheduled for Thursday afternoon during the workshop week.
            </p>
            <p>
              During the event, I oversee setup, coordinate teams and speakers, and manage sessions held in the lecture hall, including moderating roundtables and delivering opening and closing speeches.
            </p>
            <p>
              After the event, I lead a debrief to identify areas for improvement and develop strategies to make future networking sessions more dynamic and rewarding for all participants.
            </p>
          </section>
        `
      },
      {
        id: 5,
        title: "AI Developer",
        company: "Cali Intelligences",
        companyUrl: "https://www.cali-intelligences.com/",
        location: "Talence, Nouvelle-Aquitaine, France",
        period: "July 2023 - October 2024",
        description: "Developed action recognition methods, optimized models and MLOps processes. Analyzed and annotated data, enhanced training efficiency for AI systems.",
        technologies: ["Python", "PyTorch", "Kubernetes", "OpenCV", "Docker", "Elasticsearch", "Kubeflow", "Computer Vision", "GDPR", "Machine Learning", "Deep Learning", "Explainable AI", "MLOps", "R&D", "QA/QC", "AI Act"],
        type: "Apprenticeship",
        detail: `
          <section>
            <h4>R&D:</h4>
            <ul>
              <li>Developed a new action recognition method for detecting suspicious behavior</li>
              <li>Improved model performance and interpretability</li>
              <li>Python and C++ development</li>
              <li>Explainability</li>
              <li>Reduced action recognition model processing time by 70% through algorithm optimization</li>
              <li>Led R&D projects resulting in 3 new feature developments</li>
            </ul>
            <h4>QA/QC:</h4>
            <ul>
              <li>Data sorting</li>
              <li>Data analysis and statistics for over 100,000 videos</li>
              <li>Labeling</li>
              <li>Implemented QA/QC processes to ensure high-quality training data</li>
            </ul>
            <h4>MLOps:</h4>
            <ul>
              <li>Built pipelines for AI training</li>
              <li>Enhanced training using data augmentation</li>
              <li>Optimized model hyperparameters</li>
              <li>Improved deep learning models from 60% to 90% accuracy</li>
            </ul>
          </section>
        `,
        logo: "assets/images/logos/cali.jpeg",
      },
      {
        id: 6,
        title: "Python Developer",
        company: "Cali Intelligences",
        companyUrl: "https://www.cali-intelligences.com/",
        location: "Talence, Nouvelle-Aquitaine, France",
        period: "January 2023 - March 2023",
        description: "Optimized algorithms, developed in Python, trained in computer vision and deep learning. GDPR awareness.",
        technologies: ["Python", "Machine Learning", "Deep Learning", "OpenCV", "Computer Vision", "GDPR"],
        type: "Internship",
        detail: `
          <section>
            <ul>
              <li>Algorithm optimization and enhancement</li>
              <li>Python development and testing</li>
              <li>AI model training</li>
              <li>Data processing</li>
              <li>Training in image processing, computer vision, deep learning, and machine learning</li>
              <li>Training in GDPR regulations</li>
              <li>Technical documentation</li>
            </ul>
          </section>
        `,
        logo: "assets/images/logos/cali.jpeg",
      },
      {
        id: 7,
        title: "Male Contraception Volunteer",
        company: "Le Planning Familial",
        companyUrl: "https://www.planning-familial.org/fr",
        location: "Bordeaux, Nouvelle-Aquitaine, France",
        period: "December 2022 - September 2024",
        description: "Awareness and education on male contraception methods, including the Andro-switch.",
        technologies: ["Communication"],
        type: "Volunteer",
        logo: "assets/images/logos/planning-familial.png",
      },
      {
        id: 8,
        title: "Ambassador",
        company: "EPSI - School of IT Engineering",
        companyUrl: "",
        location: "France",
        period: "November 2021 - June 2024",
        description: "Represented the school at fairs, open houses, and online events.",
        technologies: ["Communication"],
        type: "Volunteer",
        logo: "assets/images/logos/EPSI.png",
      },
      {
        id: 9,
        title: "Web Project Manager",
        company: "eveho",
        companyUrl: "https://eveho.io/",
        location: "Cenon, Nouvelle-Aquitaine, France",
        period: "June 2022 - August 2022",
        description: "Created web pages using CMS, applied CSS styling, and worked on SEO.",
        technologies: ["CMS", "CSS", "SEO"],
        type: "Internship",
        logo: "assets/images/logos/eveho.png",
      },
      {
        id: 10,
        title: "Webmaster",
        company: "COACHINTERNET.FR",
        companyUrl: "https://www.coachinternet.fr/",
        location: "Mérignac, Nouvelle-Aquitaine, France (remote)",
        period: "May 2022 - June 2022",
        description: "Created WordPress pages, published social media content, and worked in digital marketing.",
        technologies: ["Digital Marketing"],
        type: "Internship",
        logo: "assets/images/logos/coachinternet.png",
      },
      {
        id: 11,
        title: "Math Tutor",
        company: "Superprof",
        companyUrl: "https://www.superprof.fr/",
        location: "Bordeaux, France",
        period: "December 2018 - December 2021",
        description: "Private math lessons and homework help for secondary school students.",
        technologies: ["Teaching", "Communication"],
        type: "Freelance",
        logo: "assets/images/logos/superprof.jpg",
      },
      {
        id: 12,
        title: "Store Assistant",
        company: "Action",
        companyUrl: "https://www.action.com/fr-fr/",
        location: "Saint-André-de-Cubzac, France",
        period: "July 2021 - August 2021",
        description: "Stocking shelves, inventory management, and cashier duties.",
        technologies: ["Teamwork"],
        type: "Temporary",
        logo: "assets/images/logos/action.png",
      },
      {
        id: 13,
        title: "Content Reporting – Cybersecurity",
        company: "#StopFisha",
        companyUrl: "https://stopfisha.org/",
        location: "France",
        period: "November 2021 - July 2023",
        description: "Participated in online content reporting actions in the context of cybersecurity and human rights.",
        technologies: ["Cybersecurity", "Communication", "Digital Ethics"],
        type: "Volunteer",
        logo: "assets/images/logos/stopfisha.png",
      },
      {
        id: 14,
        title: "IT Maintenance Technician",
        company: "Arveyres Informatique",
        companyUrl: "",
        location: "Arveyres, Nouvelle-Aquitaine, France",
        period: "March 2018",
        description: "Tested computer hardware, installed operating systems, and provided customer support.",
        technologies: ["Communication", "Hardware"],
        type: "Internship"
      },
    ]
  },
  
  education: {
    subtitle: "Because in deep learning, there’s also supervised learning. But unlike machines, I sought knowledge—not just validation.",
    footer: "Because learning isn’t just about optimizing parameters, it’s about giving meaning to every iteration.",
    gpa: "GPA",
    rank: "Rank",
    list: [
      {
        id: 1,
        degree: "Engineering Degree in Computer Science",
        specialization: "Specialization in Artificial Intelligence",
        institution: "ENSEIRB-MATMECA",
        location: "Talence, Nouvelle-Aquitaine, France",
        period: "2024 - 2027",
        description: "An engineering program accredited by the CTI, spanning three years and combining a strong scientific core curriculum with innovative projects (team-based and often in partnership with industry).",
        gpa: "14.92/20",
        rank: "Top 3 in class",
      },
      {
        id: 2,
        degree: "Bachelor in Artificial Intelligence and Data Sciences",
        institution: "EPSI - School of Computer Engineering",
        location: "Bordeaux, Nouvelle-Aquitaine, France",
        period: "2021 - 2024",
        description: "Program focused on artificial intelligence, machine learning, and data science, with a strong emphasis on practical applications, including a work-study year in the final year.",
        achievements: [
          "EcoSort: Mobile app for waste sorting using image recognition and geolocation, winner of a national innovation competition. Watch the <a href=\"https://youtu.be/6nccMi2PK1Q\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-red-600 dark:text-red-500 hover:underline\">presentation video</a>",
          "VidAI: Web tool that simplifies video editing through AI assistance."
        ],
        gpa: "16.38/20",
        rank: "1st in class"
      },
      {
        id: 3,
        degree: "BTS in IT Services for Organizations",
        specialization: "Software Solutions and Business Applications",
        institution: "EPSI - School of Computer Engineering",
        location: "Bordeaux, Nouvelle-Aquitaine, France",
        period: "2021 - 2023",
        description: "BTS pursued as an option during the first two years of the Bachelor’s program, focused on software development and business applications.",
        rank: "1st in class"
      },
      {
        id: 4,
        degree: "Baccalaureate in Science and Technology for Industry and Sustainable Development",
        specialization: "Information and Digital Systems",
        institution: "Lycée Les Iris",
        location: "Lormont, Nouvelle-Aquitaine, France",
        period: "2019 - 2021",
        rank: "1st in class"
      }
    ]
  },
  
  blog: {
    title: "Blog",
    subtitle: "Tutorials, hypotheses, and other reasonably serious digressions.",
    readTime: "min read",
    categories: "Categories",
    recentPosts: "Recent Posts",
    popularTags: "Popular Tags",
    readMore: "Read",
    searchPosts: "Search posts...",
    publishedOn: "Published on",
    noPosts: "No posts found.",
    sortBy: "Sort by",
    sortOptions: {
      date: "Date",
      popularity: "Popularity",
      title: "Title"
    },
    formatDate: (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    clearTag: "Clear Tag",
    posts: [
        {
          id: 0,
          title: "Hacking the Google Interview: A Neurodivergent Candidate's Story (SWE 2026)",
          excerpt: "Far from the polished success stories, here is the brutal reality of my recruitment for a Google SRE internship. Technical bugs, a wasted €300 coaching session, and adaptive strategies: discover how I turned my ADHD into an asset against Silicon Valley's algorithms.",
          image: "/assets/images/blog-google-interview.png",
          date: "2025-12-28",
          readTime: 5,
          category: "Career & Recruitment",
          tags: ["Technical Interview", "Google", "Neurodiversity"],
          link: "https://medium.com/@melissa.colin/google-swe-sre-internship-summer-2026-emea-the-survival-guide-and-my-300-mistakes-f41ba031ad8a"
        },
      {
        id: 1,
        title: "YOLOv8 Explained: Understanding Object Detection from Scratch",
        excerpt: "A deep dive into the architecture and implementation details of YOLOv8, the latest iteration of the popular object detection algorithm.",
        image: "/assets/images/blog-yolov8.jpg",
        date: "2024-10-19",
        readTime: 7,
        category: "Computer Vision",
        tags: ["Object Detection", "YOLO", "Deep Learning"],
        link: "https://medium.com/@melissa.colin/yolov8-explained-understanding-object-detection-from-scratch-763479652312"
      }
    ],
  },

  contact: {
    title: "Contact",
    subtitle: "Never too busy to discuss new ideas or collaborations.",
    socialMedia: "My digital clones sometimes speak on my behalf",
    signalTitle: "Want to talk without filters?",
    signalText: "For conversations that won’t end up in an ad algorithm.",
    signalButton: "Send a message",
    location: "Location",
    place: "Bordeaux, France",
    followMe: "Follow me",
    locationAndPhone: "Within earshot, but never exposed",
    emailAddress: "contact-me@melissacolin.ai",
    phone: "+33 7 82 52 XX XX",
    ctaMail: "Send an email",
    // linkedin: "www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=mélissa-colin",
    linkedin: "https://linkedin.com/in/mélissa-colin",
    github: "https://github.com/melissa-colin",
    medium: "https://medium.com/@melissa.colin",
    scholar: "https://scholar.google.com/citations?user=7r7iFpsAAAAJ&hl=fr",
    signalLink: "https://signal.me/#eu/5yuYK2KZs3zqsnzCWn_2mpBqIxc_MbQRDWjif_4UR5twTC5PvupLJo-CbZs2d6Dg",
  },

  footer: {
    copyright: "© 2025 Mélissa Colin. All rights reserved.",
    navigation: "Navigation",
    language: "Language",
    darkMode: "Theme",
    contactInfo: "Contact Information"
  },


};

export default en;