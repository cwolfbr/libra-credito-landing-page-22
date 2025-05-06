
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 md:py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/public/lovable-uploads/75b290f8-4c51-45af-b45c-b737f5e1ca37.png" 
            alt="Libra Crédito" 
            className="h-12 md:h-16"
          />
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:08000000000" className="hidden md:flex items-center text-libra-navy font-medium">
            <Phone className="w-4 h-4 mr-2" />
            0800 000 0000
          </a>
          <Button className="bg-libra-blue hover:bg-libra-navy text-white font-medium">
            Fale Conosco
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
