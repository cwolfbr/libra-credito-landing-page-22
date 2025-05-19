
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

  useEffect(() => {
    // Preload image if priority is true
    if (priority) {
      const img = new Image();
      img.src = src;
    }
  }, [src, priority]);

  // Generate responsive sizes for srcSet
  const generateSrcSet = () => {
    if (src.startsWith('http')) {
      return undefined; // External images don't need srcSet
    }
    
    const baseSrc = src.split('.').slice(0, -1).join('.');
    const ext = src.split('.').pop();
    
    // We can't actually resize images in this implementation
    // but this shows how it would be structured
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
            className={`object-cover w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
          />
        </AspectRatio>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={`object-cover w-full h-full ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
      )}
    </div>
  );
};

export default ImageOptimizer;
