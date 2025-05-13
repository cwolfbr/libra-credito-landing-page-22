
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const Header: React.FC = () => {
  const handleWhatsAppContact = () => {
    window.open('https://wa.me/5516996360424?text=Ol%C3%A1%2C%20Quero%20agendar%20uma%20conversa%20com%20o%20consultor!', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 md:py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/75b290f8-4c51-45af-b45c-b737f5e1ca37.png" 
            alt="Libra Crédito" 
            className="h-10 md:h-12"
          />
          <span className="text-libra-navy font-semibold text-lg md:text-xl">Libra Crédito</span>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden md:flex items-center text-libra-navy font-medium text-sm">
            <Info className="w-4 h-4 mr-2 text-libra-blue" />
            A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
          </p>
          <Button 
            className="bg-libra-blue hover:bg-libra-navy text-white font-medium"
            onClick={handleWhatsAppContact}
          >
            Fale Conosco
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
