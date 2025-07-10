import React from 'react';
import ImageOptimizer from '@/components/ImageOptimizer';

const LogoBand: React.FC = () => {
  return (
    <div className="w-full bg-libra-navy py-1">
      <div className="container mx-auto px-4 flex items-center justify-center gap-6">
        <div className="h-24 flex items-center">
          <ImageOptimizer
            src="/images/logos/libra-logo.png"
            alt="Libra Crédito"
            className="h-full w-auto"
            aspectRatio={1}
            priority={false}
          />
        </div>
        <span className="text-white text-xl font-semibold whitespace-nowrap">
          Crédito justo, equilibrado e consciente!
        </span>
      </div>
    </div>
  );
};

export default LogoBand;
