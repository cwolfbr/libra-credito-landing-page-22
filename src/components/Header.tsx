
import React, { memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
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
  const isMobile = useIsMobile();

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/5516996360424?text=Ol%C3%A1%2C%20Quero%20agendar%20uma%20conversa%20com%20o%20consultor!', '_blank');
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-libra-blue ${
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
              style={{ backgroundColor: '#00ccff', color: 'white' }}
              size="lg"
              onClick={handleWhatsAppContact}
              aria-label="Fale conosco pelo WhatsApp"
            >
              <span className="hidden sm:inline">Fale Conosco</span>
              <span className="sm:hidden">Contato</span>
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

      {/* Popup informativo para mobile */}
      {isMobile && (
        <Dialog open={isInfoPopupOpen} onOpenChange={setIsInfoPopupOpen}>
          <DialogContent className="fixed top-20 left-4 right-4 max-w-none w-auto mx-0 p-4">
            <DialogHeader>
              <DialogTitle className="flex items-center text-libra-navy text-sm">
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
      )}
    </>
  );
});

Header.displayName = 'Header';

export default Header;
