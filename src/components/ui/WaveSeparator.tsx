import React from 'react';
import { cn } from '@/lib/utils';

interface WaveSeparatorProps {
  variant?: 'hero' | 'section' | 'inverted' | 'footer' | 'page';
  height?: 'sm' | 'md' | 'lg';
  inverted?: boolean;
  className?: string;
}

const WaveSeparator: React.FC<WaveSeparatorProps> = ({ 
  variant = 'hero', 
  height = 'md',
  inverted = false,
  className 
}) => {
  // Alturas responsivas usando Tailwind classes
  const heightClasses = {
    sm: 'h-10 md:h-12 lg:h-16', // 40px, 48px, 64px
    md: 'h-16 md:h-20 lg:h-28', // 64px, 80px, 112px  
    lg: 'h-20 md:h-28 lg:h-36'  // 80px, 112px, 144px
  };

  // Configurações de cores simplificadas
  const variantConfig = {
    hero: {
      background: 'bg-[#003399]',
      waveColor: '#ffffff',
    },
    section: {
      background: 'bg-gray-50',
      waveColor: '#ffffff',
    },
    inverted: {
      background: 'bg-white',
      waveColor: '#003399',
    },
    footer: {
      background: 'bg-gradient-to-b from-[#00ccff] to-[#003399]',
      waveColor: '#ffffff',
    },
    page: {
      background: 'bg-[#003399]',
      waveColor: '#ffffff',
    }
  };

  const config = variantConfig[variant];
  const heightClass = heightClasses[height];

  // SVG wave path otimizado para mobile
  const wavePath = "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z";

  return (
    <div 
      className={cn(
        'relative w-full flex-shrink-0',
        config.background,
        heightClass,
        className
      )}
      aria-hidden="true"
    >
      <svg
        className={cn(
          'absolute inset-0 w-full h-full',
          inverted && 'transform scale-y-[-1]'
        )}
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={wavePath}
          fill={config.waveColor}
          fillOpacity="0.7"
        />
        <path
          d={wavePath}
          fill={config.waveColor}
          fillOpacity="0.5"
          transform="translate(0, 4)"
        />
        <path
          d={wavePath}
          fill={config.waveColor}
          fillOpacity="1"
          transform="translate(0, 8)"
        />
      </svg>
    </div>
  );
};

export default WaveSeparator;