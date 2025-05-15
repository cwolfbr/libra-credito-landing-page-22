
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import ImageOptimizer from './ImageOptimizer';

interface OptimizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  thumbnailQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault';
}

const OptimizedYouTube: React.FC<OptimizedYouTubeProps> = ({
  videoId,
  title,
  className = "",
  thumbnailQuality = "hqdefault"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  const loadVideo = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {!isLoaded ? (
        <div className="w-full h-full cursor-pointer relative" onClick={loadVideo}>
          <ImageOptimizer
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            className="w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-libra-blue rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" fill="currentColor" />
            </div>
          </div>
        </div>
      ) : (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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
