
import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import ImageOptimizer from './ImageOptimizer';

interface OptimizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  thumbnailQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault';
  preload?: boolean;
}

const OptimizedYouTube: React.FC<OptimizedYouTubeProps> = ({
  videoId,
  title,
  className = "",
  thumbnailQuality = "hqdefault",
  preload = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Use mqdefault for better initial load performance
  const initialQuality = preload ? thumbnailQuality : 'mqdefault';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${initialQuality}.jpg`;

  // Preconnect to YouTube domain to speed up subsequent requests
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://www.youtube-nocookie.com';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Load YouTube iframe only when user interacts
  const loadVideo = () => {
    setIsLoaded(true);
    // Focus on iframe for accessibility
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.focus();
      }
    }, 100);
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
          <ImageOptimizer
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            className="w-full h-full"
            priority={preload}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className={`absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
          loading="lazy"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default React.memo(OptimizedYouTube);
