/**
 * Componente otimizado para exibição de vídeos do YouTube
 * 
 * @component OptimizedYouTube
 * @description Implementa carregamento otimizado de vídeos YouTube com foco em performance
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface OptimizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  priority?: boolean;
}

const OptimizedYouTube: React.FC<OptimizedYouTubeProps> = ({
  videoId,
  title,
  className = "",
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Tenta primeiro a thumbnail de alta qualidade em WebP, depois JPG, e por fim a padrão
  const thumbnails = [
    `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/0.jpg`
  ];
  
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
  const currentThumbnail = thumbnails[currentThumbnailIndex];

  useEffect(() => {
    // Adiciona preconnect para domínios do YouTube
    const preconnectUrls = [
      'https://www.youtube-nocookie.com',
      'https://i.ytimg.com',
      'https://www.google.com'
    ];

    preconnectUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      document.head.appendChild(link);

      // DNS-prefetch como fallback
      const dns = document.createElement('link');
      dns.rel = 'dns-prefetch';
      dns.href = url;
      document.head.appendChild(dns);
    });

    // Cleanup
    return () => {
      const links = document.querySelectorAll('link[rel="preconnect"], link[rel="dns-prefetch"]');
      links.forEach(link => link.remove());
    };
  }, []);

  const handleThumbnailError = () => {
    if (currentThumbnailIndex < thumbnails.length - 1) {
      setCurrentThumbnailIndex(prev => prev + 1);
    } else {
      setThumbnailError(true);
    }
  };

  const loadVideo = () => {
    setIsLoaded(true);
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
          >
            {!thumbnailError ? (
              <img
                src={currentThumbnail}
                alt={`Thumbnail for ${title}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onError={handleThumbnailError}
              />
            ) : (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <Play className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Clique para reproduzir o vídeo</p>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
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
};

export default OptimizedYouTube;
