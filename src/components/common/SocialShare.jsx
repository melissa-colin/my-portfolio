import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaLink, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const SocialShare = ({ url, title, description, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const shareDescription = description || '';

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-500/20'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-600/20'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-500/20'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`,
      color: 'hover:text-green-500',
      bgColor: 'hover:bg-green-500/20'
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-400/20'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform) => {
    if (navigator.share && platform.name === 'Native') {
      navigator.share({
        title: shareTitle,
        text: shareDescription,
        url: shareUrl,
      });
    } else {
      window.open(platform.url, '_blank', 'width=600,height=400');
    }

    // Track social sharing for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform.name.toLowerCase(),
        content_type: 'page',
        item_id: shareUrl
      });
    }
  };

  return (
    <div className={`social-share ${className}`}>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {t('common.share', 'Partager')}:
        </span>
        
        <div className="flex items-center space-x-2">
          {socialPlatforms.map((platform) => (
            <motion.button
              key={platform.name}
              onClick={() => handleShare(platform)}
              className={`
                p-2 rounded-full transition-all duration-300
                text-gray-500 dark:text-gray-400
                ${platform.color} ${platform.bgColor}
                hover:transform hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-red-500/50
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={`${t('common.shareOn', 'Partager sur')} ${platform.name}`}
            >
              <platform.icon className="w-4 h-4" />
            </motion.button>
          ))}
          
          <motion.button
            onClick={copyToClipboard}
            className="
              p-2 rounded-full transition-all duration-300
              text-gray-500 dark:text-gray-400
              hover:text-gray-700 dark:hover:text-gray-300
              hover:bg-gray-200 dark:hover:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-red-500/50
            "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={t('common.copyLink', 'Copier le lien')}
          >
            <FaLink className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded-md"
          >
            {t('common.linkCopied', 'Lien copié!')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialShare;
