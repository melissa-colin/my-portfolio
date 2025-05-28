import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiSave, FiAlertCircle, FiUpload, FiX } from 'react-icons/fi';
import api from '../../services/api';

const ContentForm = ({ id, type: initialType = 'project', language = 'en', onSuccess }) => {
  const { currentUser } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    type: initialType,
    language: language,
    title: '',
    description: '',
    image: '',
    content: {}, // For rich content like blog posts
    technologies: [],
    links: {
      github: '',
      demo: '',
      publication: ''
    },
    category: '',
    tags: [],
    status: 'published'
  });
  
  const [newTag, setNewTag] = useState('');
  const [newTech, setNewTech] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loadingItem, setLoadingItem] = useState(id ? true : false);
  
  // Form errors
  const [formErrors, setFormErrors] = useState({});
  
  // Content types and their specific fields
  const contentTypes = [
    { value: 'project', label: { en: 'Project', fr: 'Projet' } },
    { value: 'research', label: { en: 'Research', fr: 'Recherche' } },
    { value: 'publication', label: { en: 'Publication', fr: 'Publication' } },
    { value: 'blog', label: { en: 'Blog Post', fr: 'Article de Blog' } },
    { value: 'skill', label: { en: 'Skill', fr: 'Compétence' } },
    { value: 'about', label: { en: 'About Page', fr: 'Page À Propos' } },
    { value: 'home', label: { en: 'Home Page', fr: 'Page d\'Accueil' } }
  ];
  
  // Load existing content if editing
  useEffect(() => {
    if (id) {
      const fetchContent = async () => {
        try {
          setLoadingItem(true);
          const res = await api.content.getById(id);
          
          if (res.success && res.data) {
            // Initialize form with existing data
            setFormData({
              ...formData,
              ...res.data,
              // Ensure these specific fields are properly initialized
              technologies: res.data.technologies || [],
              tags: res.data.tags || [],
              links: res.data.links || { github: '', demo: '', publication: '' },
              content: res.data.content || {}
            });
          } else {
            throw new Error(res.message || 'Failed to load content');
          }
        } catch (err) {
          setError(err.message || (language === 'en' ? 'Error loading content item' : 'Erreur lors du chargement du contenu'));
        } finally {
          setLoadingItem(false);
        }
      };
      
      fetchContent();
    }
  }, [id, language]);
  
  // Handle basic form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear form error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  // Handle tags 
  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag]
      });
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };
  
  // Handle technologies
  const handleAddTech = () => {
    if (newTech && !formData.technologies.includes(newTech)) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech]
      });
      setNewTech('');
    }
  };
  
  const handleRemoveTech = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };
  
  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = language === 'en' ? 'Title is required' : 'Le titre est requis';
    }
    
    if (['project', 'research', 'publication', 'blog'].includes(formData.type) && !formData.description.trim()) {
      errors.description = language === 'en' ? 'Description is required' : 'La description est requise';
    }
    
    return errors;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      setError(language === 'en' ? 'Please fix the errors in the form' : 'Veuillez corriger les erreurs dans le formulaire');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      let res;
      
      if (id) {
        // Update existing content
        res = await api.content.update(id, formData);
      } else {
        // Create new content
        res = await api.content.create(formData);
      }
      
      if (res.success) {
        setSuccess(language === 'en' ? 'Content saved successfully' : 'Contenu enregistré avec succès');
        
        if (onSuccess) {
          setTimeout(() => {
            onSuccess(res.data);
          }, 1000);
        }
      } else {
        throw new Error(res.message || 'Failed to save content');
      }
    } catch (err) {
      setError(err.message || (language === 'en' ? 'Error saving content' : 'Erreur lors de l\'enregistrement du contenu'));
    } finally {
      setLoading(false);
    }
  };
  
  const getFieldLabel = (fieldName) => {
    const labels = {
      title: { en: 'Title', fr: 'Titre' },
      description: { en: 'Description', fr: 'Description' },
      image: { en: 'Image URL', fr: 'URL de l\'image' },
      category: { en: 'Category', fr: 'Catégorie' },
      tags: { en: 'Tags', fr: 'Tags' },
      technologies: { en: 'Technologies', fr: 'Technologies' },
      status: { en: 'Status', fr: 'Statut' },
      'links.github': { en: 'GitHub Link', fr: 'Lien GitHub' },
      'links.demo': { en: 'Demo Link', fr: 'Lien de Démo' },
      'links.publication': { en: 'Publication Link', fr: 'Lien de Publication' }
    };
    
    return labels[fieldName]?.[language] || fieldName;
  };
  
  if (loadingItem) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md flex items-start">
          <FiAlertCircle className="mt-1 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Content Type */}
          <div>
            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === 'en' ? 'Content Type' : 'Type de Contenu'}
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {contentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label[language]}
                </option>
              ))}
            </select>
          </div>
          
          {/* Language */}
          <div>
            <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === 'en' ? 'Language' : 'Langue'}
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
        
        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {getFieldLabel('title')} *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              formErrors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          />
          {formErrors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">{formErrors.title}</p>
          )}
        </div>
        
        {/* Description */}
        {(['project', 'research', 'publication', 'blog'].includes(formData.type)) && (
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {getFieldLabel('description')} *
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                formErrors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            ></textarea>
            {formErrors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-500">{formErrors.description}</p>
            )}
          </div>
        )}
        
        {/* Image URL */}
        <div className="mb-6">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {getFieldLabel('image')}
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/assets/images/your-image.jpg"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {language === 'en' 
              ? 'Enter the path to the image file (e.g., /assets/images/your-image.jpg)'
              : 'Entrez le chemin vers le fichier image (par ex., /assets/images/your-image.jpg)'}
          </p>
        </div>
        
        {/* Category */}
        <div className="mb-6">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {getFieldLabel('category')}
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        {/* Technologies */}
        {(['project', 'research'].includes(formData.type)) && (
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {getFieldLabel('technologies')}
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={language === 'en' ? 'Add a technology...' : 'Ajouter une technologie...'}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-r-md hover:bg-red-700 focus:outline-none"
              >
                {language === 'en' ? 'Add' : 'Ajouter'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="ml-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Tags */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {getFieldLabel('tags')}
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={language === 'en' ? 'Add a tag...' : 'Ajouter un tag...'}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-r-md hover:bg-red-700 focus:outline-none"
            >
              {language === 'en' ? 'Add' : 'Ajouter'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag, idx) => (
              <div
                key={idx}
                className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Links */}
        {['project', 'research', 'publication'].includes(formData.type) && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {language === 'en' ? 'Links' : 'Liens'}
            </h3>
            
            {/* GitHub Link */}
            {['project', 'research'].includes(formData.type) && (
              <div className="mb-4">
                <label htmlFor="links.github" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {getFieldLabel('links.github')}
                </label>
                <input
                  type="url"
                  id="links.github"
                  name="links.github"
                  value={formData.links.github}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            )}
            
            {/* Demo Link */}
            {formData.type === 'project' && (
              <div className="mb-4">
                <label htmlFor="links.demo" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {getFieldLabel('links.demo')}
                </label>
                <input
                  type="url"
                  id="links.demo"
                  name="links.demo"
                  value={formData.links.demo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://example.com/demo"
                />
              </div>
            )}
            
            {/* Publication Link */}
            {formData.type === 'publication' && (
              <div className="mb-4">
                <label htmlFor="links.publication" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {getFieldLabel('links.publication')}
                </label>
                <input
                  type="url"
                  id="links.publication"
                  name="links.publication"
                  value={formData.links.publication}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://doi.org/10.xxxx/xxxxx"
                />
              </div>
            )}
          </div>
        )}
        
        {/* Status */}
        <div className="mb-6">
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {getFieldLabel('status')}
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="published">{language === 'en' ? 'Published' : 'Publié'}</option>
            <option value="draft">{language === 'en' ? 'Draft' : 'Brouillon'}</option>
          </select>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                {language === 'en' ? 'Saving...' : 'Enregistrement...'}
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
                {language === 'en' ? 'Save Content' : 'Enregistrer le Contenu'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;