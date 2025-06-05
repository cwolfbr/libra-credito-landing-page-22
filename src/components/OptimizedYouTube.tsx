import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';

interface OptimizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  priority?: boolean;
  thumbnailSrc?: string;
}

const OptimizedYouTube: React.FC<OptimizedYouTubeProps> = ({
  videoId,
  title,
  className = "",
  priority = false,
  thumbnailSrc
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Determinar qual imagem usar
  const getImageSrc = () => {
    if (thumbnailSrc && !imageError) {
      return thumbnailSrc;
    }
    // Fallback para YouTube se a imagem local falhar
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const loadVideo = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    console.log('Erro ao carregar imagem local, usando YouTube fallback');
    setImageError(true);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {!isLoaded ? (
        <div 
          className="w-full h-full cursor-pointer relative bg-black flex items-center justify-center hero-video" 
          onClick={loadVideo}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              loadVideo();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Reproduzir vídeo: ${title}`}
        >
          {/* Usar picture element para melhor suporte */}
          <picture className="video-thumbnail">
            {/* WebP se disponível e não houve erro */}
            {thumbnailSrc && !imageError && (
              <source 
                srcSet="/images/video-thumbnail.webp" 
                type="image/webp"
              />
            )}
            
            {/* Imagem principal */}
            <img
              src={getImageSrc()}
              alt={`Miniatura do ${title}`}
              width={480}
              height={360}
              className="video-thumbnail max-w-full h-auto"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              onError={handleImageError}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </picture>
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors group">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" />
            </div>
          </div>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&preload=metadata`}
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
