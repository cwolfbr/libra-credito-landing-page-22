
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 md:py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-libra-navy font-bold text-2xl md:text-3xl">
            <span className="text-libra-gold">LIBRA</span> CRÉDITO
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:08000000000" className="hidden md:flex items-center text-libra-navy font-medium">
            <Phone className="w-4 h-4 mr-2" />
            0800 000 0000
          </a>
          <Button className="bg-libra-gold hover:bg-libra-navy text-white font-medium">
            Fale Conosco
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
