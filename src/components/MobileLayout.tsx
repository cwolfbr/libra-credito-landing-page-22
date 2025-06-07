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
      {/* Header - Simplificado em mobile */}
      {showHeader && <Header />}
      
      {/* Main Content */}
      <main className={`flex-1 ${showHeader ? 'pt-20' : ''} ${isMobile && showBottomNav ? 'pb-20' : ''}`}>
        {children}
      </main>
      
      {/* Footer - Apenas em desktop ou quando explicitamente solicitado */}
      {showFooter && !isMobile && <Footer />}
      
      {/* Bottom Navigation - Apenas em mobile */}
      {showBottomNav && isMobile && <BottomNavigation />}
    </div>
  );
};

export default MobileLayout;
