import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  aspectRatio,
  priority = false,
  width,
  height,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Por enquanto, usar apenas a imagem original até converter as imagens
  const useModernFormats = false; // Ativar após conversão das imagens
  
  // Gera URLs para diferentes formatos
  const getImageUrls = (src: string) => {
    if (!useModernFormats) {
      return {
        webp: src,
        avif: src,
        original: src
      };
    }
    
    const basePath = src.substring(0, src.lastIndexOf('.'));
    const extension = src.substring(src.lastIndexOf('.'));
    
    return {
      webp: `${basePath}.webp`,
      avif: `${basePath}.avif`,
      original: src
    };
  };
  
  const urls = getImageUrls(src);
  
  const handleError = () => {
    setImageError(true);
  };
  
  const imageElement = (
    <picture>
      {/* AVIF para navegadores modernos */}
      <source 
        srcSet={urls.avif} 
        type="image/avif"
        sizes={sizes}
      />
      
      {/* WebP como fallback principal */}
      <source 
        srcSet={urls.webp} 
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Imagem original como fallback final */}
      <img
        src={imageError ? src : urls.original}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={`object-cover w-full h-full ${className}`}
        decoding="async"
        width={width}
        height={height}
        onError={handleError}
      />
    </picture>
  );
  
  if (aspectRatio) {
    return (
      <AspectRatio ratio={aspectRatio} className={`overflow-hidden ${className}`}>
        {imageElement}
      </AspectRatio>
    );
  }
  
  return (
    <div className={`overflow-hidden ${className}`}>
      {imageElement}
    </div>
  );
};

export default OptimizedImage;
</content>
</invoke>