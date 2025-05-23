
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import ImageOptimizer from './ImageOptimizer';

const Header: React.FC = memo(() => {
  const handleWhatsAppContact = () => {
    window.open('https://wa.me/5516996360424?text=Ol%C3%A1%2C%20Quero%20agendar%20uma%20conversa%20com%20o%20consultor!', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4" role="banner">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <a href="/" aria-label="Página inicial da Libra Crédito">
            <ImageOptimizer 
              src="/lovable-uploads/75b290f8-4c51-45af-b45c-b737f5e1ca37.png" 
              alt="Libra Crédito" 
              className="h-12 w-auto"
              aspectRatio={1}
              priority={true}
            />
          </a>
          <span className="text-libra-navy font-semibold text-lg md:text-xl">Libra Crédito</span>
        </div>
        <nav className="flex items-center">
          <ul>
            <li>
              <a href="/portal-cliente-placeholder" className="text-libra-navy hover:text-libra-blue font-medium">Portal do Cliente</a>
            </li>
            <li>
              <a href="/portal-parceiro-placeholder" className="text-libra-navy hover:text-libra-blue font-medium">Portal do Parceiro</a>
            </li>
            <li>
              <a href="/blog-placeholder" className="text-libra-navy hover:text-libra-blue font-medium">Blog</a>
            </li>
            <li>
              <a href="/credito-com-garantia-de-imovel" className="text-libra-navy hover:text-libra-blue font-medium">Entenda o Crédito Com Garantia de Imóvel</a>
            </li>
            <li>
              <a href="/sobre-nos" className="text-libra-navy hover:text-libra-blue font-medium">Sobre Nós</a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <p className="hidden md:flex items-center text-libra-navy font-medium text-sm">
            <Info className="w-5 h-5 mr-2 text-libra-blue" aria-hidden="true" />
            A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
          </p>
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
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
