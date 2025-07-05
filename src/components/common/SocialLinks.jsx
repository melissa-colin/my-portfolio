import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SocialLinks = ({ className = '', showLabels = false }) => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/melissa-colin',
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-600/20',
      label: 'LinkedIn Profile'
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/melissa-colin',
      color: 'hover:text-gray-800 dark:hover:text-white',
      bgColor: 'hover:bg-gray-800/20',
      label: 'GitHub Profile'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/melissa_colin_ai',
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-400/20',
      label: 'Twitter Profile'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:melissa.colin@enseirb-matmeca.fr',
      color: 'hover:text-red-500',
      bgColor: 'hover:bg-red-500/20',
      label: 'Send Email'
    }
  ];

  const handleSocialClick = (platform) => {
    // Track social media clicks for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'social_click', {
        social_network: platform.name.toLowerCase(),
        link_url: platform.url
      });
    }
  };

  return (
    <div className={`social-links ${className}`}>
      <div className={showLabels ? 'space-y-3' : 'flex items-center space-x-4'}>
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick(link)}
            className={`
              ${showLabels ? 'flex items-center space-x-3 p-3' : 'p-2'} 
              rounded-full transition-all duration-300
              text-gray-600 dark:text-gray-400
              ${link.color} ${link.bgColor}
              hover:transform hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-red-500/50
              ${showLabels ? 'hover:translate-x-2' : ''}
            `}
            whileHover={{ scale: showLabels ? 1.02 : 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={link.label}
          >
            <link.icon className={showLabels ? 'w-5 h-5' : 'w-6 h-6'} />
            {showLabels && (
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {link.name}
              </span>
            )}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
