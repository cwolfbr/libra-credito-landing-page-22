import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: 'glow' | 'lift' | 'tilt' | 'none';
  variant?: 'glass' | 'solid' | 'gradient' | 'elevated';
  glowColor?: 'blue' | 'purple' | 'green' | 'yellow' | 'pink';
  onClick?: () => void;
}

const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = '',
  hover = 'lift',
  variant = 'glass',
  glowColor = 'blue',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = cn(
    'transition-all duration-300 ease-out',
    'border border-white/20',
    'backdrop-blur-md',
    className
  );

  const variantClasses = {
    glass: 'bg-white/10 backdrop-blur-md border-white/20',
    solid: 'bg-white shadow-xl border-gray-200',
    gradient: 'bg-gradient-to-br from-white/20 to-white/5 border-white/30',
    elevated: 'bg-white shadow-2xl border-gray-100'
  };

  const hoverClasses = {
    glow: cn(
      'hover:shadow-2xl transition-all duration-500',
      {
        'hover:shadow-blue-500/25 hover:border-blue-400/50': glowColor === 'blue',
        'hover:shadow-purple-500/25 hover:border-purple-400/50': glowColor === 'purple',
        'hover:shadow-green-500/25 hover:border-green-400/50': glowColor === 'green',
        'hover:shadow-yellow-500/25 hover:border-yellow-400/50': glowColor === 'yellow',
        'hover:shadow-pink-500/25 hover:border-pink-400/50': glowColor === 'pink',
      }
    ),
    lift: 'hover:transform hover:-translate-y-2 hover:shadow-2xl',
    tilt: 'hover:transform hover:rotate-1 hover:scale-105',
    none: ''
  };

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    hoverClasses[hover]
  );

  return (
    <div
      className={combinedClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {/* Conteúdo do card */}
      <div className="relative">
        {children}
        
        {/* Efeito de shimmer (só aparece no hover para variants glass e gradient) */}
        {isHovered && (variant === 'glass' || variant === 'gradient') && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer-animation pointer-events-none rounded-lg"></div>
        )}
      </div>
      
      {/* Styles internos para animação shimmer */}
      <style jsx>{`
        .shimmer-animation {
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default PremiumCard;