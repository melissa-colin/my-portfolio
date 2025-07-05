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
  aspectRatio = 'auto',
  objectFit = 'cover',
  responsive = true,
  ...props
}) => {
  // Générer des srcset pour responsive images
  const generateSrcSet = (baseSrc, ext) => {
    // Pour l'instant, désactiver la génération de srcSet
    // TODO: Implémenter après avoir généré les variantes d'images
    return '';
  };

    // Calculer les dimensions optimales
  const getOptimizedDimensions = () => {
    if (!responsive) return { width, height };
    
    // Définir des breakpoints standards
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const maxWidth = Math.min(width || screenWidth, screenWidth);
    
    if (aspectRatio !== 'auto' && width) {
      const ratio = parseFloat(aspectRatio);
      return {
        width: maxWidth,
        height: Math.round(maxWidth / ratio)
      };
    }
    
    return { width: maxWidth, height };
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  const optimizedDimensions = getOptimizedDimensions();

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

  // Support pour les formats modernes (AVIF/WebP)
  const getOptimizedSrc = (originalSrc) => {
    if (typeof originalSrc !== 'string') return originalSrc;
    
    // Pour l'instant, retourner simplement l'image originale
    // TODO: Implémenter la logique d'optimisation d'images après avoir généré les variantes
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
          width={optimizedDimensions.width}
          height={optimizedDimensions.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit: objectFit,
            aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
            maxWidth: '100%',
            height: 'auto'
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
