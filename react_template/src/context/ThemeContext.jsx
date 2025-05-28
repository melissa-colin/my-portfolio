// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the theme context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get theme from localStorage or default to dark
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // If theme was previously saved, use it, otherwise check system preference
    if (savedTheme) {
      return savedTheme === 'dark';
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  // Update document's data-theme attribute and localStorage when theme changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (darkMode) {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Apply theme colors to meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        darkMode ? '#171717' : '#ffffff'
      );
    }
  }, [darkMode]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  // Set a specific theme
  const setTheme = (isDark) => {
    setDarkMode(isDark);
  };

  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      toggleTheme, 
      setTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;