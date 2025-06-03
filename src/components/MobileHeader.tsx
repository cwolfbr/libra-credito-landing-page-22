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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" role="banner">
      {/* Barra superior compacta */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center justify-center">
            <div className="flex items-center text-libra-navy text-xs font-medium">
              <Info className="w-3 h-3 mr-1 text-libra-blue" />
              A Libra não realiza cobrança até a liberação
            </div>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <Link to="/" aria-label="Página inicial da Libra Crédito">
            <ImageOptimizer 
              src="/lovable-uploads/0be9e819-3b36-4075-944b-cf4835a76b3c.png" 
              alt="Libra Crédito" 
              className="h-8 w-auto"
              aspectRatio={1}
              priority={true}
            />
          </Link>
          <div className="flex flex-col">
            <span className="text-libra-navy font-bold text-base">Libra Crédito</span>
            <span className="text-libra-blue text-xs font-medium">Vem que a gente equiLIBRA</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            className="min-h-[40px] px-3 text-xs bg-libra-navy text-white hover:bg-libra-navy/90"
            size="sm"
            onClick={onSimulateNow}
            aria-label="Simular crédito agora"
          >
            Simular
          </Button>

          <button
            className="lg:hidden p-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu de navegação"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="self-start bg-libra-navy text-white border-2 border-white hover:bg-libra-navy/90"
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
