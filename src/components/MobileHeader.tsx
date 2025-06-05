/**
 * Componente de cabeçalho para dispositivos móveis
 * 
 * @component MobileHeader
 * @description Implementa a versão mobile do cabeçalho com menu hamburguer e navegação adaptada
 * 
 * @features
 * - Menu hamburguer com animação
 * - Navegação responsiva
 * - Botões de ação adaptados para mobile
 * - Integração com localStorage para estado do menu
 * 
 * @param {MobileHeaderProps} props
 * @param {() => void} props.onPortalClientes - Callback para acesso ao portal de clientes
 * @param {() => void} props.onSimulateNow - Callback para iniciar simulação
 * 
 * @example
 * ```tsx
 * <MobileHeader 
 *   onPortalClientes={() => window.open('https://portal.com')}
 *   onSimulateNow={() => navigate('/simulacao')}
 * />
 * ```
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Info } from 'lucide-react';
import ImageOptimizer from '@/components/ImageOptimizer';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-libra-navy text-white shadow-md" role="banner">
      {/* Barra superior compacta */}
      <div className="bg-libra-navy border-b border-blue-800">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center">
            <div className="flex items-center text-white text-xs font-semibold">
              <Info className="w-3 h-3 mr-1 text-libra-gold" />
              A Libra não realiza cobrança até a liberação
            </div>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" aria-label="Página inicial da Libra Crédito">
              <ImageOptimizer 
                src="/images/logos/libra-logo.png" 
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
              className="min-h-[40px] px-3 text-xs bg-libra-gold text-libra-navy font-semibold rounded-full shadow-lg hover:shadow-2xl transition duration-300"
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
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <nav className="bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block py-2 text-base font-medium ${
                      location.pathname === item.path 
                        ? 'text-libra-blue' 
                        : 'text-libra-navy hover:text-libra-blue'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  onClick={() => {
                    onPortalClientes();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full justify-center text-base font-medium border-libra-gold text-libra-gold hover:bg-libra-gold hover:text-libra-navy rounded-full"
                >
                  Portal de Clientes
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default MobileHeader;
