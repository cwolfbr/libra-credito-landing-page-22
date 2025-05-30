
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DesktopHeaderProps {
  onPortalClientes: () => void;
  onSimulateNow: () => void;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ onPortalClientes, onSimulateNow }) => {
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Vantagens', path: '/vantagens' },
    { name: 'Quem Somos', path: '/quem-somos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Parceiros', path: '/parceiros' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" role="banner">
      {/* Trust Bar */}
      <div className="bg-gradient-to-r from-libra-navy to-libra-blue">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-center">
            <div className="flex items-center text-white text-sm font-medium">
              <Shield className="w-4 h-4 mr-2 text-libra-gold" />
              A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" aria-label="Página inicial da Libra Crédito">
              <div className="w-12 h-12 bg-gradient-to-br from-libra-navy to-libra-blue rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div className="flex flex-col">
                <span className="text-libra-navy font-bold text-2xl tracking-tight">Libra Crédito</span>
                <span className="text-libra-gold text-sm font-medium">Vem que a gente equiLIBRA</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-base font-medium transition-all duration-200 py-2 ${
                    location.pathname === item.path 
                      ? 'text-libra-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-libra-blue' 
                      : 'text-libra-navy hover:text-libra-blue'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={onPortalClientes}
                aria-label="Acessar Portal de Clientes"
                className="border-libra-navy text-libra-navy hover:bg-libra-navy hover:text-white transition-all duration-200"
              >
                Portal de Clientes
              </Button>
              
              <Button 
                onClick={onSimulateNow}
                className="bg-gradient-to-r from-libra-gold to-yellow-400 hover:from-yellow-400 hover:to-libra-gold text-black font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                size="lg"
                aria-label="Simular crédito agora"
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
