import React from 'react';
import { cn } from '@/lib/utils';
import WaveSeparator from '@/components/ui/WaveSeparator';

interface SlimWaveBandProps {
  className?: string;
}

const SlimWaveBand: React.FC<SlimWaveBandProps> = ({ className }) => (
  <div
    className={cn(
      'relative w-full h-6 md:h-8 bg-[#003399] overflow-hidden',
      className
    )}
  >
    <WaveSeparator
      variant="hero"
      height="sm"
      inverted
      className="absolute inset-0 bg-transparent"
    />
    <WaveSeparator
      variant="hero"
      height="sm"
      className="absolute inset-0 bg-transparent"
    />
  </div>
);

export default SlimWaveBand;
