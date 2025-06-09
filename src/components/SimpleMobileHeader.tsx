import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDevice } from '@/hooks/useDevice';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimpleMobileHeaderProps {
  onPortalClientes?: () => void;
}

const SimpleMobileHeader: React.FC<SimpleMobileHeaderProps> = ({ onPortalClientes }) => {
  const { hasNotch } = useDevice();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Simulação', path: '/simulacao' },
    { name: 'Vantagens', path: '/vantagens' },
    { name: 'Quem Somos', path: '/quem-somos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Parceiros', path: '/parceiros' },
  ];

  const handleSimulate = () => {
    navigate('/simulacao');
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm ${hasNotch ? 'safe-top' : ''}`}>
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo-libra.png" 
            alt="Libra Crédito" 
            className="h-10 w-auto"
          />
        </Link>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          {/* Simular Button - destaque principal */}
          <Button 
            onClick={handleSimulate}
            size="sm"
            className="bg-libra-navy text-white hover:bg-libra-navy/90 text-xs px-3 py-2 h-8"
          >
            Simular
          </Button>

          {/* Menu Hamburguer */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <nav className="bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block py-3 px-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === item.path 
                        ? 'text-libra-blue bg-blue-50' 
                        : 'text-libra-navy hover:text-libra-blue hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              
              {/* Portal de Clientes */}
              {onPortalClientes && (
                <li className="pt-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      onPortalClientes();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left py-3 px-2 text-sm font-medium text-libra-blue hover:bg-blue-50 rounded-md transition-colors"
                  >
                    Portal de Clientes
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default SimpleMobileHeader;
