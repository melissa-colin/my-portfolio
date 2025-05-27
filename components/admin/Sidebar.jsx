import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { FiHome, FiBookOpen, FiFileText, FiCode, FiEdit3, FiMail, FiLogOut, FiExternalLink } from 'react-icons/fi';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { logout } = useAuth();
  
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FiHome /> },
    { id: 'home', name: 'Home Page', icon: <FiHome /> }, 
    { id: 'research', name: 'Research', icon: <FiBookOpen /> },
    { id: 'publications', name: 'Publications', icon: <FiFileText /> },
    { id: 'projects', name: 'Projects', icon: <FiCode /> },
    { id: 'blog', name: 'Blog', icon: <FiEdit3 /> },
    { id: 'contact', name: 'Contact', icon: <FiMail /> }
  ];

  return (
    <aside className="w-64 bg-gray-800 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-500">Admin Panel</h2>
        <p className="text-gray-400 text-sm">Content Management System</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.id}>
              <button 
                className={`w-full text-left px-4 py-2 rounded flex items-center ${activeSection === item.id ? 'bg-red-900/30 text-red-400' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-4">
        <NavLink 
          to="/"
          className="text-gray-400 hover:text-white text-sm flex items-center"
        >
          <FiExternalLink className="mr-2" /> View Site
        </NavLink>
        <button 
          onClick={logout} 
          className="text-red-400 hover:text-red-300 text-sm flex items-center mt-2"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;