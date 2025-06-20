import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiClock, FiSearch, FiArrowRight } from 'react-icons/fi';


const Blog = () => {
  const { t, language } = useLanguage();

  // Récupère les données du contexte de traduction
  const posts = t('blog.posts');
  // Génère la liste des catégories avec leur quantité à partir des posts
  const categoriesObj = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});
  const categories = Object.entries(categoriesObj).map(([name, count]) => ({ name, count }));
  // Génère la liste unique des tags à partir des posts
  const tags = Array.from(
    new Set(
      posts.flatMap(post => post.tags || [])
    )
  );

  // Ajout de l'état pour la recherche
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  // Filtrage des posts selon la recherche et le tag sélectionné
  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag ? post.tags && post.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });


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
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
              </div>
              {/* Posts */}
              <div className="space-y-10">
                {filteredPosts.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    {t('blog.noPostsFound') || 'Aucun article trouvé.'}
                  </div>
                ) : (
                  filteredPosts.map(post => (
                    <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:shadow-2xl hover:-translate-y-1">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="h-48 md:h-full">
                            <img 
                              src={post.image} 
                              alt={post.title} 
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
                            {post.title}
                          </h2>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                              {`${t('blog.publishedOn')} ${formatDate(post.date)}`}
                            </div>
                            
                            <a
                              href={post.link}
                              className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 inline-flex items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t('blog.readMore')} <FiArrowRight className="ml-1" />
                            </a>
                          </div>
                          {/* Affichage des tags de l'article */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {post.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 mt-12 lg:mt-0">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {t('blog.categories')}
                </h3>
                <ul>
                  {categories.map((category, idx) => (
                    <li key={idx} className="flex items-center justify-between mb-2">
                      <span className="text-gray-800 dark:text-gray-300">{category.name}</span>
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Tags Filter */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {t('blog.popularTags')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors
                        ${tag === activeTag
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-800 dark:hover:text-red-300'
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                  {activeTag && (
                    <button
                      type="button"
                      onClick={() => setActiveTag(null)}
                      className="ml-2 px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full text-xs"
                    >
                      {t('blog.clearTag') || 'Effacer'}
                    </button>
                  )}
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