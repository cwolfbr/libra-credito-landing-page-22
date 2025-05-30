
import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

interface OptimizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  thumbnailQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault';
  priority?: boolean;
}

const OptimizedYouTube: React.FC<OptimizedYouTubeProps> = ({
  videoId,
  title,
  className = "",
  thumbnailQuality = "hqdefault",
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Use WebP when available, fallback to JPG
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;
  const webpThumbnailUrl = `https://img.youtube.com/vi_webp/${videoId}/${thumbnailQuality}.webp`;

  useEffect(() => {
    if (priority && imgRef.current) {
      // Preload critical images
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = thumbnailUrl;
      document.head.appendChild(preloadLink);
    }
  }, [thumbnailUrl, priority]);

  const loadVideo = () => {
    setIsLoaded(true);
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
          {/* Placeholder background */}
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          
          {/* WebP image with JPG fallback */}
          <picture>
            <source srcSet={webpThumbnailUrl} type="image/webp" />
            <img
              ref={imgRef}
              src={thumbnailUrl}
              alt={`Thumbnail for ${title}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              width="480"
              height="360"
            />
          </picture>
          
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
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&preload=none`}
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

export default OptimizedYouTube;
