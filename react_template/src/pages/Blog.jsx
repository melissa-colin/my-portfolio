import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiClock, FiTag, FiSearch, FiArrowRight } from 'react-icons/fi';

const Blog = () => {
  const { t, language } = useLanguage();
  
  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: {
        en: "Understanding YOLOv8: Object Detection from Scratch",
        fr: "Comprendre YOLOv8: Détection d'Objets à Partir de Zéro"
      },
      excerpt: {
        en: "A deep dive into the architecture and implementation details of YOLOv8, the latest iteration of the popular object detection algorithm.",
        fr: "Une plongée profonde dans l'architecture et les détails d'implémentation de YOLOv8, la dernière itération de l'algorithme populaire de détection d'objets."
      },
      image: "/assets/images/blog-yolov8.jpg",
      date: "2024-01-15",
      readTime: 12,
      category: "Computer Vision",
      tags: ["Object Detection", "YOLO", "Deep Learning"]
    },
    {
      id: 2,
      title: {
        en: "Explainability in AI: Why Should We Care?",
        fr: "L'Explicabilité en IA: Pourquoi Devons-Nous Nous en Soucier?"
      },
      excerpt: {
        en: "Exploring the importance of making AI systems interpretable, the current state of XAI techniques, and their impact on building trustworthy artificial intelligence.",
        fr: "Explorer l'importance de rendre les systèmes d'IA interprétables, l'état actuel des techniques XAI et leur impact sur la construction d'une intelligence artificielle fiable."
      },
      image: "/assets/images/blog-xai.jpg",
      date: "2023-12-03",
      readTime: 8,
      category: "XAI",
      tags: ["Explainability", "Ethics", "AI Trust"]
    },
    {
      id: 3,
      title: {
        en: "Vision Transformers vs CNNs: The Battle for Computer Vision",
        fr: "Vision Transformers vs CNNs: La Bataille pour la Vision par Ordinateur"
      },
      excerpt: {
        en: "A comprehensive comparison of traditional Convolutional Neural Networks and the newer Vision Transformers for various computer vision tasks.",
        fr: "Une comparaison complète des réseaux neuronaux convolutifs traditionnels et des nouveaux Vision Transformers pour diverses tâches de vision par ordinateur."
      },
      image: "/assets/images/blog-vit-cnn.jpg",
      date: "2023-09-22",
      readTime: 15,
      category: "Deep Learning",
      tags: ["Vision Transformers", "CNN", "Architecture"]
    }
  ];
  
  // Popular categories
  const categories = [
    { name: "Computer Vision", count: 8 },
    { name: "XAI", count: 6 },
    { name: "Deep Learning", count: 12 },
    { name: "Ethics", count: 4 },
    { name: "Research", count: 7 }
  ];
  
  // Popular tags
  const tags = [
    "Vision Transformers", "CNN", "Object Detection", "Explainability",
    "PyTorch", "TensorFlow", "Ethics", "LIME", "SHAP", "Grad-CAM"
  ];

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', options);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-24 pb-20"
    >
      {/* Hero Section */}
      <section className="bg-gray-900 dark:bg-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-70">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-transparent to-red-900/20 opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('blog.title')}
            </motion.h1>

            <motion.div 
              className="section-bar mx-auto bg-red-500"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
            
            <motion.p 
              className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('blog.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {/* Blog Posts */}
            <div className="w-full lg:w-2/3 pr-0 lg:pr-8">
              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('blog.searchPosts')}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
              </div>
              
              {/* Posts */}
              <div className="space-y-10">
                {posts.map(post => (
                  <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="h-48 md:h-full">
                          <img 
                            src={post.image} 
                            alt={post.title[language]} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center mb-2">
                          <span className="text-sm bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 px-2 py-1 rounded">
                            {post.category}
                          </span>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 ml-3 text-sm">
                            <FiClock className="mr-1" />
                            <span>{post.readTime} {t('blog.readTime')}</span>
                          </div>
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                          {post.title[language]}
                        </h2>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {post.excerpt[language]}
                        </p>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-gray-500 dark:text-gray-400 text-sm">
                            {`${t('blog.publishedOn')} ${formatDate(post.date)}`}
                          </div>
                          
                          <a href="#" className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 inline-flex items-center">
                            {t('blog.readMore')} <FiArrowRight className="ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {t('blog.categories')}
                </h3>
                <ul className="space-y-2">
                  {categories.map((category, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500">
                        {category.name}
                      </a>
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {t('blog.popularTags')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <a 
                      key={idx}
                      href="#" 
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-800 dark:hover:text-red-300"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Blog;