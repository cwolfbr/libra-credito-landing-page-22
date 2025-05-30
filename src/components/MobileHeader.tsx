
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MobileHeaderProps {
  onPortalClientes: () => void;
  onSimulateNow: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onPortalClientes, onSimulateNow }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Vantagens', path: '/vantagens' },
    { name: 'Quem Somos', path: '/quem-somos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Parceiros', path: '/parceiros' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md" role="banner">
      {/* Trust Bar - Mais compacta */}
      <div className="bg-gradient-to-r from-libra-navy to-libra-blue">
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center justify-center">
            <div className="flex items-center text-white text-xs font-medium">
              <Shield className="w-3 h-3 mr-1 text-libra-gold" />
              100% Seguro - Sem cobrança prévia
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Reduzido */}
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <Link to="/" aria-label="Página inicial da Libra Crédito" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-libra-navy to-libra-blue rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-libra-navy font-bold text-base">Libra Crédito</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            className="bg-gradient-to-r from-libra-gold to-yellow-400 hover:from-yellow-400 hover:to-libra-gold text-black font-bold px-3 py-1.5 rounded-full text-xs shadow-md h-7"
            onClick={onSimulateNow}
            aria-label="Simular crédito agora"
          >
            <span className="hidden sm:inline">Simule Agora</span>
            <span className="sm:hidden">Simular</span>
          </Button>

          <button
            className="lg:hidden p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu de navegação"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <div className="container mx-auto flex flex-col px-4 py-3">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-2 px-3 text-sm font-medium transition-colors rounded-lg ${
                  location.pathname === item.path 
                    ? 'text-libra-blue bg-libra-blue/10' 
                    : 'text-libra-navy hover:text-libra-blue hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={onPortalClientes}
              aria-label="Acessar Portal de Clientes"
              className="mt-3 self-start border-libra-navy text-libra-navy hover:bg-libra-navy hover:text-white text-xs h-7"
            >
              Portal de Clientes
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default MobileHeader;
