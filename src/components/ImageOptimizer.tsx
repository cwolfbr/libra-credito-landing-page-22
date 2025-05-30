
import React from 'react';
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
  const imageElement = (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={`object-cover w-full h-full ${className}`}
      decoding="async"
    />
  );
  
  return aspectRatio ? (
    <AspectRatio ratio={aspectRatio} className={`overflow-hidden ${className}`}>
      {imageElement}
    </AspectRatio>
  ) : (
    <div className={`overflow-hidden ${className}`}>
      {imageElement}
    </div>
  );
};

export default ImageOptimizer;
