/**
 * Componente otimizado para exibição de vídeos do YouTube
 * 
 * @component OptimizedYouTube
 * @description Implementa carregamento otimizado de vídeos YouTube com foco em performance
 */

import React from 'react';
import { Play } from 'lucide-react';

interface OptimizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
}

const OptimizedYouTube = React.memo(({ videoId, title, className = "" }: OptimizedYouTubeProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  // Usar diretamente a thumbnail JPG para evitar conversão WebP
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  
  if (!isPlaying) {
    return (
      <button 
        onClick={() => setIsPlaying(true)}
        className={`relative w-full aspect-video bg-black ${className}`}
        aria-label={`Play ${title}`}
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={`relative w-full aspect-video ${className}`}>
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
});

OptimizedYouTube.displayName = 'OptimizedYouTube';

export default OptimizedYouTube;
