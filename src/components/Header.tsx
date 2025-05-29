
import React, { memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ImageOptimizer from './ImageOptimizer';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

const Header: React.FC = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSimulateNow = () => {
    navigate('/simulacao');
  };

  const handlePortalClientes = () => {
    window.open('https://libracredito.construtorastefani.com.br:9000/', '_blank');
  };

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Vantagens', path: '/vantagens' },
    { name: 'Quem Somos', path: '/quem-somos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Parceiros', path: '/parceiros' },
  ];

  return (
    <>
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

          {/* Desktop Navigation - Melhor espaçamento e alinhamento */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-libra-blue px-2 py-1 ${
                  location.pathname === item.path ? 'text-libra-blue' : 'text-libra-navy'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={handlePortalClientes}
              aria-label="Acessar Portal de Clientes"
              className="ml-4"
            >
              Portal de Clientes
            </Button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Texto informativo - apenas desktop */}
            <p className="hidden xl:flex items-center text-libra-navy font-medium text-sm">
              <Info className="w-5 h-5 mr-2 text-libra-blue" aria-hidden="true" />
              A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
            </p>
            
            <Button 
              className="min-h-[48px] px-4 sm:px-6 lg:px-8 text-sm sm:text-base"
              variant="goldContrast"
              size="lg"
              onClick={handleSimulateNow}
              aria-label="Simular crédito agora"
            >
              <span className="hidden sm:inline">Simule Agora</span>
              <span className="sm:hidden">Simular</span>
            </Button>

            {/* Mobile menu button */}
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
                onClick={handlePortalClientes}
                aria-label="Acessar Portal de Clientes"
                className="self-start"
              >
                Portal de Clientes
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Popup informativo centralizado - para todos os dispositivos */}
      <Dialog open={isInfoPopupOpen} onOpenChange={setIsInfoPopupOpen}>
        <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-libra-navy text-base">
              <Info className="w-5 h-5 mr-2 text-libra-blue" aria-hidden="true" />
              Informação Importante
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-libra-navy">
            A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
          </p>
          <DialogClose asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 self-end"
              onClick={() => setIsInfoPopupOpen(false)}
            >
              Fechar
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
});

Header.displayName = 'Header';

export default Header;
