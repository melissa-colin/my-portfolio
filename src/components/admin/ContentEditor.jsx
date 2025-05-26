import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { updateContent, deleteContent } from '../../services/api';
import { FiSave, FiTrash2, FiPlus } from 'react-icons/fi';

const ContentEditor = ({ section, initialContent }) => {
  const { language, toggleLanguage } = useLanguage();
  const [content, setContent] = useState(initialContent || {});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Handle content change
  const handleContentChange = (key, value) => {
    setContent({
      ...content,
      [key]: value
    });
  };

  // Save content changes
  const handleSave = async (key) => {
    try {
      setSaving(true);
      setError('');
      
      await updateContent({
        section,
        contentKey: key,
        language,
        contentValue: content[key]
      });
      
      setSuccess(`Successfully saved ${key}`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving content:', err);
      setError('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  // Delete content entry
  const handleDelete = async (key) => {
    if (!window.confirm(`Are you sure you want to delete ${key}?`)) {
      return;
    }
    
    try {
      setSaving(true);
      await deleteContent(key);
      
      // Remove from local state
      const newContent = { ...content };
      delete newContent[key];
      setContent(newContent);
      
      setSuccess(`Successfully deleted ${key}`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting content:', err);
      setError('Failed to delete content');
    } finally {
      setSaving(false);
    }
  };

  // Add new content entry
  const handleAddNew = () => {
    const newKey = prompt('Enter new content key:');
    if (newKey && !content[newKey]) {
      setContent({
        ...content,
        [newKey]: ''
      });
    } else if (content[newKey]) {
      alert('This key already exists');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit {section.charAt(0).toUpperCase() + section.slice(1)} Content</h1>
        
        <div className="flex items-center">
          <div className="mr-4">
            <button
              onClick={() => toggleLanguage()}
              className="px-3 py-1 bg-gray-700 rounded-md text-sm"
            >
              {language === 'en' ? 'Editing in English' : 'Editing in French'}
            </button>
          </div>
          
          <button 
            onClick={handleAddNew}
            className="btn-secondary flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-6 p-3 bg-red-900/20 border border-red-800 text-red-300 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-3 bg-green-900/20 border border-green-800 text-green-300 rounded">
          {success}
        </div>
      )}
      
      <div className="space-y-8">
        {Object.keys(content).length === 0 ? (
          <div className="text-gray-400 text-center p-8">
            No content available. Click "Add New" to create content.
          </div>
        ) : (
          Object.keys(content).map((key) => {
            const value = content[key];
            
            return (
              <div key={key} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-red-400">{key}</h3>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleSave(key)}
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm flex items-center"
                      disabled={saving}
                    >
                      {saving ? (
                        <span className="inline-block animate-spin h-4 w-4 mr-1 border-t-2 border-b-2 border-white rounded-full"></span>
                      ) : (
                        <FiSave className="mr-1" />
                      )}
                      Save
                    </button>
                    <button 
                      onClick={() => handleDelete(key)}
                      className="bg-red-900/30 hover:bg-red-800 px-3 py-1 rounded text-sm text-red-300 flex items-center"
                    >
                      <FiTrash2 className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
                
                {typeof value === 'string' ? (
                  value.length > 100 ? (
                    <textarea
                      value={value}
                      onChange={(e) => handleContentChange(key, e.target.value)}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      rows="5"
                    />
                  ) : (
                    <input 
                      type="text"
                      value={value}
                      onChange={(e) => handleContentChange(key, e.target.value)}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  )
                ) : (
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <pre className="text-sm overflow-auto text-gray-300">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                    <p className="text-xs text-gray-400 mt-2">
                      Complex object - manual editing not available through this interface.
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ContentEditor;