import React from 'react';
import { useDevice } from '@/hooks/useDevice';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/BottomNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showBottomNav?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  showHeader = true,
  showFooter = true,
  showBottomNav = true 
}) => {
  const { isMobile } = useDevice();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip Navigation Links for Accessibility */}
      <div className="sr-only focus-within:not-sr-only">
        <a 
          href="#main-content" 
          className="absolute top-4 left-4 z-50 bg-libra-blue text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-libra-gold"
          tabIndex={1}
        >
          Pular para o conteúdo principal
        </a>
        {showBottomNav && isMobile && (
          <a 
            href="#bottom-navigation" 
            className="absolute top-4 left-48 z-50 bg-libra-blue text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-libra-gold"
            tabIndex={2}
          >
            Pular para navegação
          </a>
        )}
      </div>
      
      {/* Header - Simplificado em mobile */}
      {showHeader && <Header />}
      
      {/* Main Content */}
      <main 
        id="main-content"
        className={`flex-1 ${showHeader ? 'pt-20' : ''} ${isMobile && showBottomNav ? 'pb-20' : ''}`}
        role="main"
        aria-label="Conteúdo principal"
      >
        {children}
      </main>
      
      {/* Footer - Apenas em desktop ou quando explicitamente solicitado */}
      {showFooter && !isMobile && <Footer />}
      
      {/* Bottom Navigation - Apenas em mobile */}
      {showBottomNav && isMobile && (
        <div id="bottom-navigation">
          <BottomNavigation />
        </div>
      )}
    </div>
  );
};

export default MobileLayout;
