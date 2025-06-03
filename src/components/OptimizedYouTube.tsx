import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

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
  
  // Tenta primeiro a thumbnail de alta qualidade, se falhar usa a padrão
  const highQualityThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  
  const [currentThumbnail, setCurrentThumbnail] = useState(highQualityThumbnail);

  const handleThumbnailError = () => {
    if (currentThumbnail !== fallbackThumbnail) {
      setCurrentThumbnail(fallbackThumbnail);
    } else {
      setThumbnailError(true);
    }
  };

  const loadVideo = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {!isLoaded ? (
        <div 
          className="w-full h-full cursor-pointer relative bg-black flex items-center justify-center" 
          onClick={loadVideo}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              loadVideo();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Play video: ${title}`}
        >
          {!thumbnailError ? (
            <img
              src={currentThumbnail}
              alt={`Thumbnail for ${title}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
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
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default OptimizedYouTube;
