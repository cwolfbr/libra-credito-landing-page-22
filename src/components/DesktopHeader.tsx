
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ImageOptimizer from './ImageOptimizer';

interface DesktopHeaderProps {
  onPortalClientes: () => void;
  onSimulateNow: () => void;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ onPortalClientes, onSimulateNow }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Vantagens', path: '/vantagens' },
    { name: 'Quem Somos', path: '/quem-somos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Parceiros', path: '/parceiros' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm" role="banner">
      {/* Barra de informação superior - muito compacta */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-1">
          <div className="flex items-center justify-center">
            <div className="flex items-center text-libra-navy text-xs font-medium">
              <Info className="w-3 h-3 mr-2 text-libra-blue" />
              A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
            </div>
          </div>
        </div>
      </div>

      {/* Header principal - muito compacto */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Logo e nome - compactos */}
            <Link to="/" className="flex items-center gap-2 group" aria-label="Página inicial da Libra Crédito">
              <ImageOptimizer 
                src="/lovable-uploads/0be9e819-3b36-4075-944b-cf4835a76b3c.png" 
                alt="Libra Crédito" 
                className="h-8 w-8 transition-transform group-hover:scale-105"
                aspectRatio={1}
                priority={true}
              />
              <div className="flex flex-col">
                <span className="text-libra-navy font-bold text-lg tracking-tight leading-tight">Libra Crédito</span>
                <span className="text-libra-blue text-xs font-medium leading-none">Vem que a gente equiLIBRA</span>
              </div>
            </Link>

            {/* Navegação central */}
            <nav className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-sm font-medium transition-all duration-200 hover:text-libra-blue py-1 ${
                    location.pathname === item.path 
                      ? 'text-libra-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-libra-blue' 
                      : 'text-libra-navy hover:text-libra-blue'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Ações à direita - compactas */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onPortalClientes}
                aria-label="Acessar Portal de Clientes"
                className="border-libra-navy text-libra-navy hover:bg-libra-navy hover:text-white transition-all duration-200 text-sm h-8 px-3"
              >
                Portal de Clientes
              </Button>
              
              <Button 
                onClick={onSimulateNow}
                variant="goldContrast"
                size="sm"
                aria-label="Simular crédito agora"
                className="px-4 py-1 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 h-8"
              >
                Simule Agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
