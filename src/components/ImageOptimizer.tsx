/**
 * Componente otimizador de imagens
 * 
 * @component ImageOptimizer
 * @description Componente responsável pela otimização e carregamento eficiente de imagens
 * 
 * @features
 * - Lazy loading automático
 * - Suporte a aspect ratio
 * - Otimização de carregamento para LCP (Largest Contentful Paint)
 * - Suporte a imagens prioritárias
 * - Melhoria de performance via atributos decoding e loading
 * 
 * @param {ImageOptimizerProps} props
 * @param {string} props.src - URL da imagem
 * @param {string} props.alt - Texto alternativo para acessibilidade
 * @param {string} [props.className] - Classes CSS opcionais
 * @param {number} [props.aspectRatio=16/9] - Proporção da imagem (width/height)
 * @param {boolean} [props.priority=false] - Se true, carrega a imagem com prioridade alta
 * 
 * @example
 * ```tsx
 * // Imagem normal com lazy loading
 * <ImageOptimizer 
 *   src="/images/photo.jpg" 
 *   alt="Descrição da foto"
 * />
 * 
 * // Imagem prioritária (ex: hero section)
 * <ImageOptimizer 
 *   src="/images/hero.jpg" 
 *   alt="Hero banner"
 *   priority={true}
 *   aspectRatio={21/9}
 * />
 * ```
 * 
 * @performance
 * - Usa lazy loading por padrão para otimizar performance
 * - Suporta priorização para imagens above the fold
 * - Mantém aspect ratio para evitar layout shifts
 * 
 * @accessibility
 * - Requer alt text para todas as imagens
 * - Preserva aspect ratio para consistência visual
 */

import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
  priority?: boolean;
  width?: number;
  height?: number;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ 
  src, 
  alt, 
  className = "", 
  aspectRatio = 16/9,
  priority = false,
  width,
  height
}) => {
  // Calcular dimensões se não fornecidas
  const calculatedWidth = width || 800;
  const calculatedHeight = height || Math.round(calculatedWidth / aspectRatio);

  const imageElement = (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      width={calculatedWidth}
      height={calculatedHeight}
      className={`object-cover w-full h-full ${className}`}
      decoding="async"
    />
  );
  
  return aspectRatio ? (
    <AspectRatio ratio={aspectRatio} className={`overflow-hidden ${className}`}>
      {imageElement}
    </AspectRatio>
  ) : (
    <div className={`overflow-hidden ${className}`}>
      {imageElement}
    </div>
  );
};

export default ImageOptimizer;
