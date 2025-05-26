
import React, { memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ImageOptimizer from './ImageOptimizer';

const Header: React.FC = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4" role="banner">
      <div className="container mx-auto flex justify-between items-center">
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

        <div className="flex items-center gap-4">
          <p className="hidden xl:flex items-center text-libra-navy font-medium text-sm">
            <Info className="w-5 h-5 mr-2 text-libra-blue" aria-hidden="true" />
            A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
          </p>
          
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu de navegação"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Button 
            className="min-h-[48px] min-w-[150px]"
            variant="highContrast"
            size="lg"
            onClick={handleWhatsAppContact}
            aria-label="Fale conosco pelo WhatsApp"
          >
            Fale Conosco
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto flex flex-col space-y-4">
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
  );
});

Header.displayName = 'Header';

export default Header;
