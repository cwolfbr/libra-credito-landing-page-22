
import React, { useState, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
  priority?: boolean;
  sizes?: string;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ 
  src, 
  alt, 
  className = "", 
  aspectRatio = 16/9,
  priority = false,
  sizes = "100vw"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);

    // Preload image if priority is true
    if (priority) {
      const img = new Image();
      img.src = src;
    }
  }, [src, priority]);

  // Determine if image is external (YouTube thumbnails, etc.)
  const isExternalImage = src.startsWith('http');
  
  // For external images like YouTube thumbnails, use fetchpriority to optimize loading
  const fetchPriority = priority ? "high" : (isExternalImage ? "low" : "auto");
  
  // Generate responsive sizes for srcSet
  const generateSrcSet = () => {
    if (isExternalImage) {
      return undefined; // External images don't need srcSet
    }
    
    // For local images we can't actually resize them in this implementation
    // but we set the sizes attribute for browser optimization
    return undefined;
  };
  
  return (
    <div className={`overflow-hidden ${className}`}>
      {aspectRatio ? (
        <AspectRatio ratio={aspectRatio} className="overflow-hidden">
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className={`object-cover w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            decoding="async"
            fetchPriority={fetchPriority}
            sizes={sizes}
          />
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
        </AspectRatio>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className={`object-cover w-full h-full ${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            decoding="async"
            fetchPriority={fetchPriority}
            sizes={sizes}
          />
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(ImageOptimizer);
