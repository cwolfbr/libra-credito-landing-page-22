import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface OptimizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  priority?: boolean;
  /**
   * Path to a custom optimized thumbnail image.
   */
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Use local optimized image or fallback to YouTube
  const localThumbnail = thumbnailSrc || '/images/video-thumbnail.jpg';
  const youtubeThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const loadVideo = () => {
    setIsLoaded(true);
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
          {/* Imagem otimizada como LCP */}
          <OptimizedImage
            src={thumbnailSrc ? localThumbnail : youtubeThumbnail}
            webpSrc={thumbnailSrc ? '/images/video-thumbnail.webp' : undefined}
            avifSrc={thumbnailSrc ? '/images/video-thumbnail.avif' : undefined}
            alt={`Miniatura do ${title}`}
            width={480}
            height={360}
            className="video-thumbnail"
            priority={priority}
            placeholder="#000000"
          />
          
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
