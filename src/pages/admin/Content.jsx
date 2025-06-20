import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiPlus, FiEdit, FiTrash2, FiArrowLeft, FiFilter, FiSearch } from 'react-icons/fi';
import api from '../../services/api';
import ContentForm from '../../components/admin/ContentForm';

const Content = () => {
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Get action and type from URL query parameters
  const action = queryParams.get('action') || 'list';
  const contentType = queryParams.get('type') || 'all';
  const contentId = queryParams.get('id') || null;
  
  // State
  const [contents, setContents] = useState([]);
  const [filters, setFilters] = useState({
    type: contentType !== 'all' ? contentType : '',
    language: language,
    search: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // For deletion confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  
  // Content types list
  const contentTypes = [
    { value: 'all', label: { en: 'All Content', fr: 'Tout le Contenu' } },
    { value: 'project', label: { en: 'Projects', fr: 'Projets' } },
    { value: 'certification', label: { en: 'Certification', fr: 'Recherche' } },
    { value: 'publication', label: { en: 'Publications', fr: 'Publications' } },
    { value: 'blog', label: { en: 'Blog Posts', fr: 'Articles de Blog' } },
    { value: 'skill', label: { en: 'Skills', fr: 'Compétences' } },
    { value: 'about', label: { en: 'About Page', fr: 'Page À Propos' } },
    { value: 'home', label: { en: 'Home Page', fr: 'Page d\'Accueil' } }
  ];
  
  // Fetch content when component mounts or filters change
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    
    if (action === 'list') {
      fetchContents();
    }
  }, [isAuthenticated, navigate, currentPage, filters.type, filters.language, action]);
  
  // Fetch content list from API
  const fetchContents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = {
        page: currentPage,
        limit: 10,
        language: filters.language
      };
      
      if (filters.type) {
        queryParams.type = filters.type;
      }
      
      const res = await api.content.getAll(queryParams);
      
      if (res.success) {
        setContents(res.data || []);
        setTotalPages(res.pagination?.totalPages || 1);
      } else {
        throw new Error(res.message || 'Failed to fetch content');
      }
    } catch (err) {
      setError(err.message || (language === 'en' ? 'Error loading content' : 'Erreur lors du chargement du contenu'));
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset page when filter changes
  };
  
  // Apply search filter
  const handleSearch = (e) => {
    e.preventDefault();
    fetchContents();
  };
  
  // Delete content
  const handleDeleteConfirm = async () => {
    if (!deleteItemId) return;
    
    try {
      setLoading(true);
      const res = await api.content.delete(deleteItemId);
      
      if (res.success) {
        // Update list after deletion
        setContents(contents.filter(item => item._id !== deleteItemId));
        setShowDeleteModal(false);
        setDeleteItemId(null);
      } else {
        throw new Error(res.message || 'Failed to delete content');
      }
    } catch (err) {
      setError(err.message || (language === 'en' ? 'Error deleting content' : 'Erreur lors de la suppression du contenu'));
      console.error('Error deleting content:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Render content list
  const renderContentList = () => (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        {/* Filters */}
        <div className="flex flex-wrap items-center space-x-4">
          <div className="flex items-center">
            <FiFilter className="text-gray-500 mr-2" />
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2"
            >
              {contentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label[language]}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <select
              name="language"
              value={filters.language}
              onChange={handleFilterChange}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
        
        {/* Search */}
        <form onSubmit={handleSearch} className="flex w-full md:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder={language === 'en' ? "Search content..." : "Rechercher du contenu..."}
              className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-3 text-gray-500 dark:text-gray-400"
            >
              <FiSearch />
            </button>
          </div>
          <Link
            to="/admin/content?action=new"
            className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center"
          >
            <FiPlus className="mr-2" />
            {language === 'en' ? 'New' : 'Nouveau'}
          </Link>
        </form>
      </div>
      
      {/* Content List Table */}
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : contents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {language === 'en' ? 'Title' : 'Titre'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {language === 'en' ? 'Type' : 'Type'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {language === 'en' ? 'Status' : 'Statut'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {language === 'en' ? 'Updated' : 'Mis à jour'}
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {language === 'en' ? 'Actions' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {contents.map((content) => (
                <tr key={content._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{content.title}</div>
                    {content.description && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {content.description.substring(0, 100)}...
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                      {content.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      content.status === 'published' 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                    }`}>
                      {content.status === 'published' 
                        ? (language === 'en' ? 'Published' : 'Publié')
                        : (language === 'en' ? 'Draft' : 'Brouillon')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(content.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-3">
                      <Link
                        to={`/admin/content?action=edit&id=${content._id}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900"
                        title={language === 'en' ? 'Edit' : 'Modifier'}
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteItemId(content._id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 dark:text-red-400 hover:text-red-900"
                        title={language === 'en' ? 'Delete' : 'Supprimer'}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          {language === 'en' ? 'No content found' : 'Aucun contenu trouvé'}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex-1 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 disabled:opacity-50"
            >
              {language === 'en' ? 'Previous' : 'Précédent'}
            </button>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {language === 'en' 
                ? `Page ${currentPage} of ${totalPages}` 
                : `Page ${currentPage} sur ${totalPages}`}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 disabled:opacity-50"
            >
              {language === 'en' ? 'Next' : 'Suivant'}
            </button>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowDeleteModal(false)}></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Confirm Deletion' : 'Confirmer la Suppression'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {language === 'en' 
                  ? 'Are you sure you want to delete this content? This action cannot be undone.' 
                  : 'Êtes-vous sûr de vouloir supprimer ce contenu ? Cette action ne peut pas être annulée.'}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {language === 'en' ? 'Cancel' : 'Annuler'}
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
                >
                  {language === 'en' ? 'Delete' : 'Supprimer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  // Render main content based on action
  const renderContent = () => {
    switch (action) {
      case 'new':
        return (
          <div>
            <div className="mb-6 flex items-center">
              <Link to="/admin/content" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 mr-4">
                <FiArrowLeft className="mr-2" />
                {language === 'en' ? 'Back to List' : 'Retour à la Liste'}
              </Link>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'en' ? 'Create New Content' : 'Créer un Nouveau Contenu'}
              </h2>
            </div>
            <ContentForm 
              type={contentType !== 'all' ? contentType : 'project'} 
              language={language} 
              onSuccess={() => navigate('/admin/content')}
            />
          </div>
        );
      
      case 'edit':
        return (
          <div>
            <div className="mb-6 flex items-center">
              <Link to="/admin/content" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 mr-4">
                <FiArrowLeft className="mr-2" />
                {language === 'en' ? 'Back to List' : 'Retour à la Liste'}
              </Link>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'en' ? 'Edit Content' : 'Modifier le Contenu'}
              </h2>
            </div>
            <ContentForm 
              id={contentId} 
              language={language} 
              onSuccess={() => navigate('/admin/content')}
            />
          </div>
        );
      
      case 'list':
      default:
        return (
          <div>
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              {language === 'en' ? 'Content Management' : 'Gestion de Contenu'}
            </h2>
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
                {error}
              </div>
            )}
            {renderContentList()}
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div>
                  <Link to="/admin" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    {language === 'en' ? 'Dashboard' : 'Tableau de Bord'}
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 mx-2">/</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Content Management' : 'Gestion de Contenu'}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
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
                  className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiArrowLeft className="mr-3" />
                  <span>{language === 'en' ? 'Back to Dashboard' : 'Retour au Tableau de Bord'}</span>
                </Link>
              </li>
              
              <li className="pt-4">
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Content Types' : 'Types de Contenu'}
                </h3>
              </li>
              
              {contentTypes.map((type) => (
                <li key={type.value}>
                  <Link 
                    to={`/admin/content?type=${type.value}`}
                    className={`flex items-center p-3 rounded-lg ${
                      contentType === type.value
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{type.label[language]}</span>
                  </Link>
                </li>
              ))}
              
              <li className="pt-4">
                <Link 
                  to="/admin/content?action=new"
                  className="flex items-center p-3 text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  <FiPlus className="mr-3" />
                  <span>{language === 'en' ? 'Add New Content' : 'Ajouter du Contenu'}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Content;