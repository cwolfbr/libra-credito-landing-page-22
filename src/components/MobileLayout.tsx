import React from 'react';
import { useDevice } from '@/hooks/useDevice';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface MobileLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  showHeader = true,
  showFooter = true
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
      </div>
      
      {/* Header - Simplificado em mobile */}
      {showHeader && <Header />}
      
      {/* Main Content */}
      <main 
        id="main-content"
        data-has-header={showHeader ? "true" : "false"}
        className={`flex-1 ${showHeader ? (isMobile ? 'pt-16' : 'pt-24') : ''}`}
        role="main"
        aria-label="Conteúdo principal"
      >
        {children}
      </main>
      
      {/* Footer - Sempre mostrar quando solicitado */}
      {showFooter && <Footer />}
    </div>
  );
};

export default MobileLayout;
