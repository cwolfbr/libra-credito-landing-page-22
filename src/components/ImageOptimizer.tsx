
import React, { useState, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
  priority?: boolean;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ 
  src, 
  alt, 
  className = "", 
  aspectRatio = 16/9,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (priority) {
      // Preload critical images
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);

  // Generate WebP version for modern browsers
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.startsWith('/lovable-uploads/')) {
      return originalSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    }
    return originalSrc;
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
    setIsLoaded(true);
  };

  const imageElement = (
    <div className="relative w-full h-full">
      {/* Placeholder */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      {/* WebP with fallback */}
      <picture>
        <source srcSet={getWebPSrc(src)} type="image/webp" />
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={`object-cover w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
      </picture>
    </div>
  );
  
  return (
    <div className={`overflow-hidden ${className}`}>
      {aspectRatio ? (
        <AspectRatio ratio={aspectRatio} className="overflow-hidden">
          {imageElement}
        </AspectRatio>
      ) : (
        imageElement
      )}
    </div>
  );
};

export default ImageOptimizer;
