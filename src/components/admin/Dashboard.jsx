import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ContentEditor from './ContentEditor';
import { contentService } from '../../services/supabase';

const Dashboard = ({ activeSection }) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Skip loading for dashboard view
        if (activeSection === 'dashboard') {
          setContent({});
          return;
        }
        
        // Get content from Supabase filtered by section
        const { data, error } = await contentService.getAll({ 
          type: activeSection 
        });
        
        if (error) throw error;
        
        // Format the data for the content editor
        const formattedData = data.data.length > 0 
          ? data.data[0] 
          : { type: activeSection, content: {}, status: 'published' };
          
        setContent(formattedData);
        setError('');
      } catch (err) {
        console.error('Error loading content:', err);
        setError('Failed to load content: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, [activeSection]);
  
  const sectionTitles = {
    dashboard: 'Dashboard',
    home: 'Home Page Content',
    research: 'Research Content',
    publications: 'Publications Content',
    projects: 'Projects Content',
    blog: 'Blog Content', 
    contact: 'Contact Information'
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 p-4 border border-red-800 rounded text-red-300">
        {error}
        <button 
          className="mt-2 underline text-sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (activeSection === 'dashboard') {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Welcome to the Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(sectionTitles).filter(key => key !== 'dashboard').map((section) => (
            <div 
              key={section}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
              style={{ cursor: 'pointer' }}
              onClick={() => window.location.href = `/admin?section=${section}`}
            >
              <h2 className="text-xl font-semibold mb-2">{sectionTitles[section]}</h2>
              <p className="text-gray-400 text-sm">Manage {section} content</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <ContentEditor section={activeSection} initialContent={content} />;
};

export default Dashboard;