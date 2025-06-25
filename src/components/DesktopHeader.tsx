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
    <>
      {/* Faixa superior informativa */}
      <div className="w-full bg-libra-navy">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-2">
            <div className="flex items-center text-white text-sm font-semibold">
              <Info className="w-4 h-4 mr-2 text-white" />
              A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
            </div>
          </div>
        </div>
      </div>

      {/* Header de navegação que permanece no topo após o scroll */}
      <header
        className="sticky top-0 left-0 right-0 z-40 bg-white shadow-sm"
        role="banner"
      >
        {/* Faixa principal */}
        <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[58px] lg:h-[72px]">
            {/* Logo e slogan */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center">
                <div className="h-10 lg:h-12 overflow-hidden flex items-center">
                  <ImageOptimizer 
                    src="/images/logos/libra-logo.png" 
                    alt="Libra Crédito" 
                    className="h-14 lg:h-16 w-auto transform scale-110"
                    aspectRatio={1}
                    priority={true}
                    style={{
                      clipPath: 'inset(25% 0 25% 0)'
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* Navegação */}
            <nav className="flex items-center h-full space-x-6 xl:space-x-10">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center h-full leading-none text-[0.9rem] lg:text-[1.0125rem] xl:text-[1.125rem] font-medium transition-all duration-200 hover:text-libra-blue ${
                    location.pathname === item.path
                      ? 'text-libra-blue after:absolute after:bottom-[-22px] after:left-0 after:w-full after:h-0.5 after:bg-libra-blue'
                      : 'text-libra-navy hover:text-libra-blue'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Botões à direita */}
            <div className="flex items-center gap-3 lg:gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onPortalClientes}
                aria-label="Acessar Portal de Clientes"
                className="bg-transparent text-libra-navy border-2 border-libra-navy hover:bg-libra-navy hover:text-white transition-colors text-sm lg:text-base"
              >
                Portal de Clientes
              </Button>
              
              <Button 
                onClick={onSimulateNow}
                size="sm"
                aria-label="Simular crédito agora"
                className="px-4 lg:px-6 font-bold bg-libra-navy text-white hover:bg-libra-navy/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 text-sm lg:text-base"
              >
                Simule Agora
              </Button>
            </div>
          </div>
        </div>
      </div>
      </header>
    </>
  );
};

export default DesktopHeader;
