import React from 'react';
import { useDevice } from '@/hooks/useDevice';
import DesktopHeader from './DesktopHeader';
import SimpleMobileHeader from './SimpleMobileHeader';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import InfoPopup from './InfoPopup';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();

  const handleSimulateNow = () => {
    navigate('/simulacao');
  };

  const handlePortalClientes = () => {
    window.open('https://libracredito.construtorastefani.com.br:9000/', '_blank');
  };

  return (
    <>
      {isMobile ? (
        <SimpleMobileHeader onPortalClientes={handlePortalClientes} />
      ) : (
        <DesktopHeader
          onPortalClientes={handlePortalClientes}
          onSimulateNow={handleSimulateNow}
        />
      )}
      <InfoPopup />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
