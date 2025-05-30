
import React, { useState, useRef } from 'react';
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const loadVideo = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {!isLoaded ? (
        <div 
          className="w-full h-full cursor-pointer relative" 
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
          <img
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            className="w-full h-full object-cover"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            width="480"
            height="360"
          />
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-libra-blue rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" fill="currentColor" />
            </div>
          </div>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          className="w-full h-full"
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
