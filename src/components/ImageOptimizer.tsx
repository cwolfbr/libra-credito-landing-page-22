import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Accessibility } from "lucide-react";

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ 
  src, 
  alt, 
  className = "", 
  aspectRatio,
  priority = false,
  sizes = "100vw",
  width,
  height
}) => {
  // Function to get WebP version of image if available
  const getImagePath = (imagePath: string) => {
    // Check if it's an external URL
    if (imagePath.startsWith('http') && !imagePath.includes('lovable-uploads')) {
      return imagePath;
    }
    
    // For local images, we could use different formats
    // Currently returning the original path as WebP conversion would require server-side processing
    return imagePath;
  };

  return (
    <div className={cn("overflow-hidden", className)}>
      {aspectRatio ? (
        <AspectRatio ratio={aspectRatio} className="overflow-hidden">
          <img
            src={getImagePath(src)}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className={cn("object-cover w-full h-full", className)}
            decoding="async"
            sizes={sizes}
            width={width}
            height={height}
            onError={(e) => {
              // Fallback for images that fail to load
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('placeholder.svg')) {
                console.warn(`Image failed to load: ${target.src}`);
                target.src = '/placeholder.svg';
              }
            }}
          />
        </AspectRatio>
      ) : (
        <img
          src={getImagePath(src)}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={cn("object-cover w-full h-full", className)}
          decoding="async"
          sizes={sizes}
          width={width}
          height={height}
          onError={(e) => {
            // Fallback for images that fail to load
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('placeholder.svg')) {
              console.warn(`Image failed to load: ${target.src}`);
              target.src = '/placeholder.svg';
            }
          }}
        />
      )}
    </div>
  );
};

export default ImageOptimizer;
