import React, { useState } from 'react';
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
  
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  const handlePlayClick = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {!isLoaded ? (
        <div 
          className="relative w-full cursor-pointer"
          onClick={handlePlayClick}
          style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
        >
          <img
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            width="480"
            height="360"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-libra-blue rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default OptimizedYouTube;