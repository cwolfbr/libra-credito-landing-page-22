import React from 'react';
import { useDevice } from '@/hooks/useDevice';

interface AdaptiveViewProps {
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  children?: React.ReactNode;
}

export const AdaptiveView: React.FC<AdaptiveViewProps> = ({ 
  mobile, 
  tablet, 
  desktop, 
  children 
}) => {
  const { isMobile, isTablet, isDesktop } = useDevice();

  // Se passar children, usa como fallback
  if (!mobile && !tablet && !desktop) {
    return <>{children}</>;
  }

  // Renderiza baseado no dispositivo
  if (isMobile && mobile) {
    return <>{mobile}</>;
  }

  if (isTablet && tablet) {
    return <>{tablet}</>;
  }

  if (isDesktop && desktop) {
    return <>{desktop}</>;
  }

  // Fallback logic
  if (isMobile) {
    return <>{mobile || tablet || desktop || children}</>;
  }

  if (isTablet) {
    return <>{tablet || desktop || mobile || children}</>;
  }

  return <>{desktop || tablet || mobile || children}</>;
};

// Componente para renderizar apenas em mobile
export const MobileOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile } = useDevice();
  return isMobile ? <>{children}</> : null;
};

// Componente para esconder em mobile
export const HideOnMobile: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile } = useDevice();
  return !isMobile ? <>{children}</> : null;
};

// Componente para renderizar apenas em desktop
export const DesktopOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDesktop } = useDevice();
  return isDesktop ? <>{children}</> : null;
};
