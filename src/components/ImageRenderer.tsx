/**
 * Componente para renderizar imagens salvas localmente
 * 
 * @component ImageRenderer
 * @description Intercepta URLs de imagens locais e renderiza do localStorage
 */

import React, { useState, useEffect } from 'react';
import { ImageService } from '../services/imageService';

interface ImageRendererProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function ImageRenderer({
  src,
  alt,
  className = '',
  fallback = '/images/placeholder.jpg',
  onLoad,
  onError
}: ImageRendererProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      setError(false);

      try {
        // Verificar se é uma imagem local (uploads)
        if (src.includes('/images/blog/uploads/')) {
          const fileName = src.split('/').pop();
          if (fileName) {
            const localImageData = ImageService.getImageUrl(fileName);
            if (localImageData) {
              setImageSrc(localImageData);
              setLoading(false);
              onLoad?.();
              return;
            }
          }
        }

        // Se não for local ou não existir, usar src original
        setImageSrc(src);
        setLoading(false);
      } catch (err) {
        setError(true);
        setImageSrc(fallback);
        setLoading(false);
        onError?.();
      }
    };

    loadImage();
  }, [src, fallback, onLoad, onError]);

  const handleImageError = () => {
    if (!error) {
      setError(true);
      setImageSrc(fallback);
      onError?.();
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
    onLoad?.();
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}