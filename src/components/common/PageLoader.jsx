import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ isLoading, onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(timer);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      return () => clearInterval(timer);
    } else {
      setProgress(100);
      setTimeout(onLoadComplete, 800);
    }
  }, [isLoading, onLoadComplete]);

  const loaderVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: `${progress}%`,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      scale: 1.1, 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <AnimatePresence>
      {(isLoading || progress < 100) && (
        <motion.div
          variants={loaderVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-red-900"
        >
          <div className="text-center">
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mb-8"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">MC</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Mélissa Colin</h1>
              <p className="text-gray-300">Étudiante en Intelligence Artificielle</p>
            </motion.div>

            <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                variants={progressVariants}
                initial="initial"
                animate="animate"
                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
              />
            </div>
            
            <motion.p 
              className="text-gray-400 mt-4 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Chargement... {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
