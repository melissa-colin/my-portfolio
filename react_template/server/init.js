// server/init.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Content = require('./models/Content');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Sample data for initialization
const adminUser = {
  name: 'Mélissa Colin',
  email: 'admin@example.com',
  password: 'admin123456',
  role: 'admin'
};

const sampleProjects = [
  {
    type: 'project',
    language: 'en',
    title: 'XAI Dashboard',
    description: 'An interactive dashboard for visualizing and understanding how deep neural networks make decisions in computer vision applications.',
    image: '/assets/images/project-xai.jpg',
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
    links: {
      github: 'https://github.com/melissacolin/xai-dashboard',
      demo: 'https://xai-demo.example.com'
    },
    category: 'xai',
    status: 'published'
  },
  {
    type: 'project',
    language: 'fr',
    title: 'Tableau de bord XAI',
    description: 'Un tableau de bord interactif pour visualiser et comprendre comment les réseaux de neurones profonds prennent des décisions dans les applications de vision par ordinateur.',
    image: '/assets/images/project-xai.jpg',
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
    links: {
      github: 'https://github.com/melissacolin/xai-dashboard',
      demo: 'https://xai-demo.example.com'
    },
    category: 'xai',
    status: 'published'
  }
];

const sampleResearch = [
  {
    type: 'research',
    language: 'en',
    title: 'VisionFormer: A Hybrid CNN-Transformer Architecture',
    description: 'Developing a novel hybrid architecture that combines the local feature extraction strengths of CNNs with the global context understanding of Vision Transformers.',
    content: {
      status: 'In Progress',
      details: 'The model aims to balance computational efficiency with superior performance on complex image recognition tasks.'
    },
    category: 'vision',
    tags: ['Vision Transformers', 'CNN', 'Deep Learning'],
    status: 'published'
  },
  {
    type: 'research',
    language: 'fr',
    title: 'VisionFormer: Une Architecture Hybride CNN-Transformer',
    description: 'Développement d\'une nouvelle architecture hybride qui combine les forces d\'extraction de caractéristiques locales des CNN avec la compréhension du contexte global des Vision Transformers.',
    content: {
      status: 'En Cours',
      details: 'Le modèle vise à équilibrer l\'efficacité computationnelle avec des performances supérieures sur des tâches complexes de reconnaissance d\'images.'
    },
    category: 'vision',
    tags: ['Vision Transformers', 'CNN', 'Deep Learning'],
    status: 'published'
  }
];

const samplePublications = [
  {
    type: 'publication',
    language: 'en',
    title: 'Explainable Deep Learning for Computer Vision: Challenges and Opportunities',
    description: 'This paper reviews recent advances in explainability methods for deep learning models in computer vision applications, with a focus on the trade-offs between model performance and interpretability.',
    date: new Date('2024-01-15'),
    links: {
      publication: 'https://hal.science/hal-04641791v1'
    },
    category: 'xai',
    tags: ['XAI', 'Computer Vision', 'Survey'],
    status: 'published'
  },
  {
    type: 'publication',
    language: 'fr',
    title: 'Apprentissage Profond Explicable pour la Vision par Ordinateur: Défis et Opportunités',
    description: 'Cet article examine les avancées récentes dans les méthodes d\'explicabilité pour les modèles d\'apprentissage profond dans les applications de vision par ordinateur, en mettant l\'accent sur les compromis entre les performances du modèle et l\'interprétabilité.',
    date: new Date('2024-01-15'),
    links: {
      publication: 'https://hal.science/hal-04641791v1'
    },
    category: 'xai',
    tags: ['XAI', 'Vision par Ordinateur', 'Étude'],
    status: 'published'
  }
];

// Function to initialize database
const initializeDB = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Check for existing admin
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists, skipping user creation...');
    } else {
      // Create admin user
      console.log('Creating admin user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminUser.password, salt);
      
      const user = await User.create({
        ...adminUser,
        password: hashedPassword
      });
      
      console.log(`Admin user created with ID: ${user._id}`);
      
      // Create sample content
      console.log('Creating sample content...');
      
      // Projects
      for (const project of sampleProjects) {
        await Content.create({
          ...project,
          author: user._id
        });
      }
      
      // Research
      for (const research of sampleResearch) {
        await Content.create({
          ...research,
          author: user._id
        });
      }
      
      // Publications
      for (const publication of samplePublications) {
        await Content.create({
          ...publication,
          author: user._id
        });
      }
      
      console.log('Sample content created successfully');
    }
    
    console.log('Database initialization completed!');
    console.log('\nUse these credentials to login to the admin panel:');
    console.log(`  Email: ${adminUser.email}`);
    console.log(`  Password: ${adminUser.password}`);
    console.log('\nMake sure to change the password after the first login!');
    
    process.exit();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Run initialization
initializeDB();