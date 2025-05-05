
import React from 'react';
import { ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-libra-navy text-white">
      <div className="container mx-auto py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-libra-gold">LIBRA</span> CRÉDITO
            </h2>
            <p className="text-sm text-libra-silver mt-2">
              Soluções financeiras personalizadas para você
            </p>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-libra-silver hover:text-white transition-colors"
          >
            Voltar ao topo
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-libra-blue/20">
          <div>
            <h3 className="font-bold text-lg mb-4">Produtos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Home Equity</a></li>
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Crédito com garantia de imóvel</a></li>
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Consolidação de dívidas</a></li>
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Capital de giro para empresas</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Sobre nós</a></li>
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Trabalhe conosco</a></li>
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Termos de uso</a></li>
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Política de privacidade</a></li>
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Política de cookies</a></li>
              <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Informações legais</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-sm text-libra-silver">
          <p>&copy; {new Date().getFullYear()} Libra Crédito. Todos os direitos reservados.</p>
          <p className="mt-2">
            CNPJ: 00.000.000/0001-00 | Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
