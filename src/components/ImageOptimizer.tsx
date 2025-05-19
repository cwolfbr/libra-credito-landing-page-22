
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
    if (priority && !isLoaded) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [src, priority, isLoaded]);

  // Determine if image is external (YouTube thumbnails, etc.)
  const isExternalImage = src.startsWith('http');
  
  // For external images like YouTube thumbnails, use fetchpriority to optimize loading
  const fetchPriority = priority ? "high" as const : (isExternalImage ? "low" as const : "auto" as const);
  
  // Use WebP for local images if available (handle with picture element)
  const getImageElement = () => {
    const imgProps = {
      src,
      alt,
      loading: priority ? "eager" as const : "lazy" as const,
      className: `object-cover w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`,
      onLoad: () => setIsLoaded(true),
      onError: () => setHasError(true),
      decoding: "async" as const,
      fetchPriority,
      sizes
    };

    if (isExternalImage) {
      return <img {...imgProps} />;
    }

    // For local images, try to use WebP if available
    // Note: This is a simplified implementation. In a real project, you'd need a build process
    // that generates WebP versions of your images
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    return (
      <picture>
        <source type="image/webp" srcSet={webpSrc} />
        <img {...imgProps} />
      </picture>
    );
  };
  
  return (
    <div className={`overflow-hidden ${className}`}>
      {aspectRatio ? (
        <AspectRatio ratio={aspectRatio} className="overflow-hidden">
          {getImageElement()}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
        </AspectRatio>
      ) : (
        <>
          {getImageElement()}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(ImageOptimizer);
