/**
 * Componente otimizado para exibição de vídeos do YouTube
 * 
 * @component OptimizedYouTube
 * @description Implementa carregamento otimizado de vídeos YouTube com foco em performance
 */

import React, { useState, useRef, useEffect, memo } from 'react';
import { Play } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface OptimizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  priority?: boolean;
}

const OptimizedYouTube: React.FC<OptimizedYouTubeProps> = memo(({ 
  videoId,
  title,
  className = "",
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Otimização: Pré-carrega a próxima thumbnail em WebP
  const thumbnailUrl = `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`;
  const fallbackThumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  
  useEffect(() => {
    // Preconnect otimizado apenas quando necessário
    if (!isLoaded) {
      const preconnectUrls = [
        'https://www.youtube-nocookie.com',
        'https://i.ytimg.com'
      ];

      const links = preconnectUrls.map(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        return link;
      });

      links.forEach(link => document.head.appendChild(link));
      return () => links.forEach(link => link.remove());
    }
  }, [isLoaded]);

  const handleThumbnailLoad = () => {
    setThumbnailLoaded(true);
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  const loadVideo = () => {
    if (thumbnailLoaded) {
      setIsLoaded(true);
    }
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <AspectRatio ratio={16/9} className="bg-black">
        {!isLoaded ? (
          <button 
            className="absolute inset-0 w-full h-full cursor-pointer bg-black flex items-center justify-center" 
            onClick={loadVideo}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                loadVideo();
              }
            }}
            aria-label={`Play video: ${title}`}
            disabled={!thumbnailLoaded}
          >
            {!thumbnailError ? (
              <img
                src={thumbnailUrl}
                alt={`Thumbnail for ${title}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onLoad={handleThumbnailLoad}
                onError={handleThumbnailError}
              />
            ) : (
              <img
                src={fallbackThumbnailUrl}
                alt={`Thumbnail for ${title}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onLoad={handleThumbnailLoad}
              />
            )}
            
            <div className={`absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors group">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" />
              </div>
            </div>
          </button>
        ) : (
          <iframe
            ref={iframeRef}
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
      </AspectRatio>
    </div>
  );
});

OptimizedYouTube.displayName = 'OptimizedYouTube';

export default OptimizedYouTube;
