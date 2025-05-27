// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalization from '../services/localization';

// Create the language context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const {
    language,
    languages,
    toggleLanguage,
    changeLanguage,
    t
  } = useLocalization();

  return (
    <LanguageContext.Provider value={{ 
      language, 
      languages, 
      toggleLanguage, 
      changeLanguage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;