import { useState, useEffect } from 'react';

// Import translations
import en from '../data/translations/en';
import fr from '../data/translations/fr';

// Available languages
const languages = {
  en: 'English',
  fr: 'Français'
};

/**
 * Custom hook for localization functionality
 * @returns {Object} Localization utilities
 */
export const useLocalization = () => {
  // Get user's browser language or default to English
  const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return languages[browserLang] ? browserLang : 'en';
  };

  // Initialize language from localStorage or browser preference
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || getBrowserLanguage();
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update document language for accessibility
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Toggle between English and French
   */
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'fr' : 'en'));
  };

  /**
   * Change to a specific language
   * @param {string} lang - Language code ('en' or 'fr')
   */
  const changeLanguage = (lang) => {
    if (languages[lang]) {
      setLanguage(lang);
    }
  };

  /**
   * Translate a key based on current language
   * @param {string} key - Translation key (dot notation supported)
   * @param {Object} params - Parameters to replace in the translation
   * @returns {string} Translated text
   */
  const t = (key, params = {}) => {
    // Get translations for current language
    const translations = language === 'en' ? en : fr;
    
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    // Navigate through the translations object
    let result = keys.reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : null), translations);
    
    // If translation is missing, fallback to key
    if (result === null) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    
    // Replace parameters in the translation
    if (params && Object.keys(params).length) {
      Object.keys(params).forEach(param => {
        result = result.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
      });
    }
    
    return result;
  };

  return {
    language,
    languages,
    toggleLanguage,
    changeLanguage,
    t
  };
};

export default useLocalization;