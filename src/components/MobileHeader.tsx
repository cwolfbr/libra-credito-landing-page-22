
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ImageOptimizer from './ImageOptimizer';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4" role="banner">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Página inicial da Libra Crédito">
            <ImageOptimizer 
              src="/lovable-uploads/75b290f8-4c51-45af-b45c-b737f5e1ca37.png" 
              alt="Libra Crédito" 
              className="h-12 w-auto"
              aspectRatio={1}
              priority={true}
            />
          </Link>
          <span className="text-libra-navy font-semibold text-lg md:text-xl">Libra Crédito</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button 
            className="min-h-[48px] px-4 sm:px-6 lg:px-8 text-sm sm:text-base"
            variant="goldContrast"
            size="lg"
            onClick={onSimulateNow}
            aria-label="Simular crédito agora"
          >
            <span className="hidden sm:inline">Simule Agora</span>
            <span className="sm:hidden">Simular</span>
          </Button>

          <button
            className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu de navegação"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto flex flex-col space-y-4 px-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-libra-blue ${
                  location.pathname === item.path ? 'text-libra-blue' : 'text-libra-navy'
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
              className="self-start"
            >
              Portal de Clientes
            </Button>
            
            {/* Informação importante no mobile */}
            <div className="flex items-center text-libra-navy text-sm pt-4 border-t border-gray-200">
              <Info className="w-4 h-4 mr-2 text-libra-blue" />
              A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default MobileHeader;
