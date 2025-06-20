import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiHome, FiFileText, FiSettings, FiLogOut, FiUser, FiBarChart2 } from 'react-icons/fi';
import api from '../../services/api';

const Dashboard = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    projects: 0,
    certification: 0,
    publications: 0,
    blog: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Fetch content statistics
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Get all content to calculate stats
        const res = await api.content.getAll();
        
        if (res.success) {
          const data = res.data || [];
          
          // Calculate counts for each content type
          const counts = data.reduce((acc, item) => {
            if (item.type && item.language === language) {
              acc[item.type] = (acc[item.type] || 0) + 1;
            }
            return acc;
          }, {});
          
          setStats({
            projects: counts.project || 0,
            certification: counts.certification || 0,
            publications: counts.publication || 0,
            blog: counts.blog || 0
          });
        }
      } catch (err) {
        console.error('Error fetching content statistics:', err);
        setError(language === 'en' ? 'Failed to load data' : 'Échec du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, navigate, language]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === 'en' ? 'Admin Dashboard' : 'Tableau de Bord Admin'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {currentUser?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentUser?.role === 'admin' 
                  ? (language === 'en' ? 'Administrator' : 'Administrateur') 
                  : (language === 'en' ? 'Editor' : 'Éditeur')}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={language === 'en' ? 'Logout' : 'Déconnexion'}
            >
              <FiLogOut />
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/admin" 
                  className="flex items-center p-3 text-gray-900 dark:text-white rounded-lg bg-gray-100 dark:bg-gray-700"
                >
                  <FiHome className="mr-3" />
                  <span>{language === 'en' ? 'Dashboard' : 'Tableau de Bord'}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/content" 
                  className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiFileText className="mr-3" />
                  <span>{language === 'en' ? 'Content Management' : 'Gestion de Contenu'}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/settings" 
                  className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiSettings className="mr-3" />
                  <span>{language === 'en' ? 'Settings' : 'Paramètres'}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiHome className="mr-3" />
                  <span>{language === 'en' ? 'View Website' : 'Voir le Site'}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {language === 'en' ? 'Welcome Back!' : 'Bienvenue !'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {language === 'en' 
                ? `You are logged in as ${currentUser?.name}. You can manage your website content from here.` 
                : `Vous êtes connecté en tant que ${currentUser?.name}. Vous pouvez gérer le contenu de votre site web à partir d'ici.`}
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Projects */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <FiFileText className="text-blue-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Projects' : 'Projets'}
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.projects}</p>
                </div>
              </div>
            </div>
            
            {/* Certification */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                  <FiBarChart2 className="text-green-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Certification' : 'Recherche'}
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.certification}</p>
                </div>
              </div>
            </div>
            
            {/* Publications */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <FiFileText className="text-purple-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Publications' : 'Publications'}
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.publications}</p>
                </div>
              </div>
            </div>
            
            {/* Blog */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                  <FiFileText className="text-yellow-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Blog Posts' : 'Articles de Blog'}
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.blog}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {language === 'en' ? 'Quick Actions' : 'Actions Rapides'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/admin/content?action=new&type=project"
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FiFileText className="text-red-600 dark:text-red-500 mr-3" />
                <span className="text-gray-900 dark:text-white">
                  {language === 'en' ? 'Add New Project' : 'Ajouter un Projet'}
                </span>
              </Link>
              <Link 
                to="/admin/content?action=new&type=publication"
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FiFileText className="text-red-600 dark:text-red-500 mr-3" />
                <span className="text-gray-900 dark:text-white">
                  {language === 'en' ? 'Add Publication' : 'Ajouter une Publication'}
                </span>
              </Link>
              <Link 
                to="/admin/content?action=new&type=blog"
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FiFileText className="text-red-600 dark:text-red-500 mr-3" />
                <span className="text-gray-900 dark:text-white">
                  {language === 'en' ? 'Create Blog Post' : 'Créer un Article de Blog'}
                </span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;