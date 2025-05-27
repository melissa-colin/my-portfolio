import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from '../components/admin/Login';
import Dashboard from '../components/admin/Dashboard';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Get section from URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [location.search]);
  
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-900 min-h-screen text-white"
    >
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 min-h-screen p-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-red-500">Admin Panel</h2>
            <p className="text-gray-400 text-sm">Content Management System</p>
          </div>
          
          <nav>
            <ul className="space-y-2">
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded ${activeSection === 'dashboard' ? 'bg-red-900/30 text-red-400' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveSection('dashboard')}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded ${activeSection === 'home' ? 'bg-red-900/30 text-red-400' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveSection('home')}
                >
                  Home Page
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded ${activeSection === 'research' ? 'bg-red-900/30 text-red-400' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveSection('research')}
                >
                  Research
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded ${activeSection === 'publications' ? 'bg-red-900/30 text-red-400' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveSection('publications')}
                >
                  Publications
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded ${activeSection === 'projects' ? 'bg-red-900/30 text-red-400' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveSection('projects')}
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded ${activeSection === 'blog' ? 'bg-red-900/30 text-red-400' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveSection('blog')}
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded ${activeSection === 'contact' ? 'bg-red-900/30 text-red-400' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveSection('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="absolute bottom-4 left-4">
            <button 
              onClick={() => navigate('/')} 
              className="text-gray-400 hover:text-white text-sm flex items-center"
            >
              View Site
            </button>
            <button 
              onClick={() => logout()} 
              className="text-red-400 hover:text-red-300 text-sm flex items-center mt-2"
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          <Dashboard activeSection={activeSection} />
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;