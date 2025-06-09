import React from 'react';
import { Link } from 'react-router-dom';
import { useDevice } from '@/hooks/useDevice';

interface SimpleMobileHeaderProps {
  onPortalClientes?: () => void;
}

const SimpleMobileHeader: React.FC<SimpleMobileHeaderProps> = ({ onPortalClientes }) => {
  const { hasNotch } = useDevice();

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 ${hasNotch ? 'safe-top' : ''}`}>
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo-libra.png" 
            alt="Libra Crédito" 
            className="h-10 w-auto"
          />
        </Link>

        {/* Portal Cliente Button */}
        {onPortalClientes && (
          <button
            onClick={onPortalClientes}
            className="text-sm font-medium text-libra-blue hover:text-blue-700 transition-colors"
          >
            Portal Cliente
          </button>
        )}
      </div>
    </header>
  );
};

export default SimpleMobileHeader;
