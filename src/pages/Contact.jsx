import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiMail, FiMapPin, FiSend, FiPhone, FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';

const Contact = () => {
  const { t, language } = useLanguage();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = t('contact.required');
    }
    
    if (!formData.email.trim()) {
      errors.email = t('contact.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('contact.invalidEmail');
    }
    
    if (!formData.subject.trim()) {
      errors.subject = t('contact.required');
    }
    
    if (!formData.message.trim()) {
      errors.message = t('contact.required');
    }
    
    return errors;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);
    
    // If form has errors, don't submit
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Successful submission
      setSubmitStatus({
        success: true,
        message: t('contact.messageSent')
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      // Failed submission
      setSubmitStatus({
        success: false,
        message: t('contact.error')
      });
    }
    
    setIsSubmitting(false);
  };
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-24 pb-20"
    >
      {/* Hero Section */}
      <section className="bg-gray-900 dark:bg-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-70">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-transparent to-red-900/20 opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('contact.title')}
            </motion.h1>

            <motion.div 
              className="section-bar mx-auto bg-red-500"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
            
            <motion.p 
              className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                    {language === 'en' ? 'Contact Information' : 'Informations de Contact'}
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                        <FiMapPin className="text-red-600 dark:text-red-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                          {t('contact.location')}
                        </h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          Bordeaux, France
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                        <FiMail className="text-red-600 dark:text-red-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                          Email
                        </h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          <a href="mailto:melissa.colin0@proton.me" className="hover:text-red-600 dark:hover:text-red-500">
                            melissa.colin0@proton.me
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                        <FiPhone className="text-red-600 dark:text-red-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                          {language === 'en' ? 'Phone' : 'Téléphone'}
                        </h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          +33 6 XX XX XX XX
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      {t('contact.followMe')}
                    </h3>
                    
                    <div className="flex space-x-4">
                      <a 
                        href="https://linkedin.com/in/mélissa-colin" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-500 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <FiLinkedin size={20} />
                      </a>
                      <a 
                        href="https://github.com/melissacolin" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-500 transition-colors"
                        aria-label="GitHub"
                      >
                        <FiGithub size={20} />
                      </a>
                      <a 
                        href="https://twitter.com/melissacolin" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-500 transition-colors"
                        aria-label="Twitter"
                      >
                        <FiTwitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                    {language === 'en' ? 'Send Me a Message' : 'Envoyez-moi un Message'}
                  </h3>
                  
                  {/* Success/Error Message */}
                  {submitStatus && (
                    <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-gray-800 dark:text-gray-200">
                          {t('contact.name')} *
                        </label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 ${formErrors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-red-600 dark:text-red-500 text-sm">
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-2 text-gray-800 dark:text-gray-200">
                          {t('contact.email')} *
                        </label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 ${formErrors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-red-600 dark:text-red-500 text-sm">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="subject" className="block mb-2 text-gray-800 dark:text-gray-200">
                        {t('contact.subject')} *
                      </label>
                      <input 
                        type="text" 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 ${formErrors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      />
                      {formErrors.subject && (
                        <p className="mt-1 text-red-600 dark:text-red-500 text-sm">
                          {formErrors.subject}
                        </p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block mb-2 text-gray-800 dark:text-gray-200">
                        {t('contact.message')} *
                      </label>
                      <textarea 
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 ${formErrors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-1 text-red-600 dark:text-red-500 text-sm">
                          {formErrors.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary flex items-center disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                            {language === 'en' ? 'Sending...' : 'Envoi...'}
                          </>
                        ) : (
                          <>
                            <FiSend className="mr-2" />
                            {t('contact.send')}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;