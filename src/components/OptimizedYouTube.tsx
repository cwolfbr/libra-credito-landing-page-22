
import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import ImageOptimizer from './ImageOptimizer';

interface OptimizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  thumbnailQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault';
  autoload?: boolean;
}

const OptimizedYouTube: React.FC<OptimizedYouTubeProps> = ({
  videoId,
  title,
  className = "",
  thumbnailQuality = "hqdefault",
  autoload = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(autoload);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  // Usar IntersectionObserver para carregar vídeo quando estiver na viewport
  useEffect(() => {
    if (autoload) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Atraso intencional para melhorar o desempenho geral da página
          setTimeout(() => {
            setShouldLoad(true);
            observer.disconnect();
          }, 200);
        }
      },
      { threshold: 0.1, rootMargin: '200px' } // Carregar quando 10% visível ou dentro de 200px da viewport
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [autoload]);

  const loadVideo = () => {
    setIsLoaded(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      loadVideo();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      role="region" 
      aria-label={`YouTube video: ${title}`}
    >
      {!isLoaded ? (
        <div 
          className="w-full h-full cursor-pointer relative" 
          onClick={loadVideo}
          onKeyDown={handleKeyPress}
          tabIndex={0}
          role="button"
          aria-label={`Play ${title} video`}
        >
          <ImageOptimizer
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            className="w-full h-full"
            width={480}
            height={360}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-libra-blue rounded-full flex items-center justify-center" aria-hidden="true">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" fill="currentColor" />
            </div>
          </div>
        </div>
      ) : (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
};

export default OptimizedYouTube;
