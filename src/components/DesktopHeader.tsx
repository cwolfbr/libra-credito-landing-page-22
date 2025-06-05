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
    <header className="fixed top-0 left-0 right-0 z-50 bg-libra-navy text-white" role="banner">
      {/* Faixa superior com aviso */}
      <div className="bg-libra-navy">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-3">
            <div className="flex items-center text-white text-sm font-semibold">
              <Info className="w-4 h-4 mr-2 text-libra-gold" />
              A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
            </div>
          </div>
        </div>
      </div>

      {/* Faixa principal */}
      <div className="border-b border-libra-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo e slogan */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3">
                <ImageOptimizer 
                  src="/images/logos/libra-logo.png" 
                  alt="Libra Crédito" 
                  className="h-10 w-auto"
                  aspectRatio={1}
                  priority={true}
                />
                <div className="text-libra-navy">
                  <span className="font-bold text-xl">Libra</span>
                  <span className="text-sm font-medium block -mt-1">crédito</span>
                </div>
              </Link>
              <span className="text-libra-blue text-sm font-medium">
                Vem que a gente equiLIBRA
              </span>
            </div>

            {/* Navegação */}
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-base font-medium transition-all duration-200 hover:text-libra-blue ${
                    location.pathname === item.path 
                      ? 'text-libra-blue after:absolute after:bottom-[-24px] after:left-0 after:w-full after:h-0.5 after:bg-libra-blue' 
                      : 'text-libra-navy hover:text-libra-blue'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Botões à direita */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="default"
                onClick={onPortalClientes}
                aria-label="Acessar Portal de Clientes"
                className="bg-transparent border-libra-gold text-libra-gold hover:bg-libra-gold hover:text-libra-navy transition-colors rounded-full"
              >
                Portal de Clientes
              </Button>
              
              <Button
                onClick={onSimulateNow}
                size="default"
                aria-label="Simular crédito agora"
                className="bg-libra-gold text-libra-navy font-semibold rounded-full py-3 px-8 shadow-lg hover:shadow-2xl transition duration-300"
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
