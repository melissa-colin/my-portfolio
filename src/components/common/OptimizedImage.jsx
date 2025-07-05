import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'blur',
  priority = false,
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer pour lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Créer une version WebP si possible
  const getOptimizedSrc = (originalSrc) => {
    if (typeof originalSrc !== 'string') return originalSrc;
    
    // Pour les images locales, on peut essayer de charger une version optimisée
    if (originalSrc.startsWith('/') || originalSrc.startsWith('./')) {
      const ext = originalSrc.split('.').pop();
      if (['jpg', 'jpeg', 'png'].includes(ext?.toLowerCase())) {
        return originalSrc;
      }
    }
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  // Placeholder pendant le chargement
  const PlaceholderDiv = () => (
    <div 
      className={`
        ${className} 
        bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800
        animate-pulse flex items-center justify-center
      `}
      style={{ width, height }}
    >
      <svg 
        className="w-8 h-8 text-gray-400" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
          clipRule="evenodd" 
        />
      </svg>
    </div>
  );

  if (error) {
    return <PlaceholderDiv />;
  }

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {!isLoaded && <PlaceholderDiv />}
      
      {isInView && (
        <img
          src={getOptimizedSrc(src)}
          alt={alt}
          className={`
            ${className}
            transition-opacity duration-500
            ${isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}
          `}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
