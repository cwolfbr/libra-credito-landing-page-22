/**
 * Componente de cabeçalho para desktop
 * 
 * @component DesktopHeader
 * @description Implementa a versão desktop do cabeçalho com navegação horizontal e botões de ação
 * 
 * @features
 * - Navegação horizontal com indicador de página atual
 * - Botões de ação com hover effects
 * - Logo e slogan da Libra Crédito
 * - Aviso informativo integrado
 * 
 * @param {DesktopHeaderProps} props
 * @param {() => void} props.onPortalClientes - Callback para acesso ao portal de clientes
 * @param {() => void} props.onSimulateNow - Callback para iniciar simulação
 * 
 * @example
 * ```tsx
 * <DesktopHeader 
 *   onPortalClientes={() => window.open('https://portal.com')}
 *   onSimulateNow={() => navigate('/simulacao')}
 * />
 * ```
 */

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import ImageOptimizer from '@/components/ImageOptimizer';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-white/20" role="banner">
      {/* Faixa superior premium */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-3">
            <div className="flex items-center text-white text-sm font-medium">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
              <Info className="w-4 h-4 mr-2 text-yellow-400" />
              A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
            </div>
          </div>
        </div>
      </div>

      {/* Faixa principal premium */}
      <div className="border-b border-libra-neutral-100/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo e slogan */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center">
                <div className="h-16 overflow-hidden flex items-center">
                  <ImageOptimizer 
                    src="/images/logos/libra-logo.png" 
                    alt="Libra Crédito" 
                    className="h-20 w-auto transform scale-110"
                    aspectRatio={1}
                    priority={true}
                    style={{
                      clipPath: 'inset(25% 0 25% 0)'
                    }}
                  />
                </div>
              </Link>
              <span className="text-base text-blue-600 font-medium">
                Vem que a gente equi<span className="text-yellow-500 font-semibold">LIBRA</span>
              </span>
            </div>

            {/* Navegação Premium */}
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-base font-medium transition-all duration-300 hover:text-blue-600 group ${
                    location.pathname === item.path 
                      ? 'text-blue-600 after:absolute after:bottom-[-24px] after:left-0 after:w-full after:h-0.5 after:bg-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <span className="relative">
                    {item.name}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </Link>
              ))}
            </nav>

            {/* Botões Premium */}
            <div className="flex items-center gap-4">
              <button
                onClick={onPortalClientes}
                aria-label="Acessar Portal de Clientes"
                className="px-6 py-3 text-blue-900 border-2 border-blue-200 rounded-xl font-medium hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:-translate-y-0.5"
              >
                Portal de Clientes
              </button>
              
              <button 
                onClick={onSimulateNow}
                aria-label="Simular crédito agora"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <span className="mr-2">📊</span>
                Simule Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
