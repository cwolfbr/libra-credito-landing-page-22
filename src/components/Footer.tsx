import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import WaveSeparator from '@/components/ui/WaveSeparator';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Wave separator before footer */}
      <WaveSeparator variant="footer" height="md" />
      
      <footer className="bg-[#003399] text-white">
        <div className="container mx-auto py-6 md:py-8 px-4">
        {/* Grid Principal - Layout mais compacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8 items-start">
          {/* Navegação */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-white">Navegação</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-base">Início</Link></li>
              <li><Link to="/simulacao" className="text-white/80 hover:text-white transition-colors text-base">Simulação</Link></li>
              <li><Link to="/vantagens" className="text-white/80 hover:text-white transition-colors text-base">Vantagens</Link></li>
              <li><Link to="/quem-somos" className="text-white/80 hover:text-white transition-colors text-base">Quem Somos</Link></li>
              <li><Link to="/blog" className="text-white/80 hover:text-white transition-colors text-base">Blog</Link></li>
              <li><Link to="/parceiros" className="text-white/80 hover:text-white transition-colors text-base">Parceiros</Link></li>
            </ul>
          </div>

          {/* Logo e Slogan - Centralizado */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
              <span className="text-white">LIBRA</span> CRÉDITO
            </h2>
            <p className="text-white/90 text-base md:text-lg">Vem que a gente equiLIBRA</p>
          </div>

          {/* Redes Sociais */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4 text-white">Nos Acompanhe</h3>
            <div className="flex justify-center md:justify-end gap-3 mb-4">
              <a href="https://www.facebook.com/LibraCreditoOficial/" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white text-white hover:text-[#003399] p-2 rounded-full transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/libracredito/" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white text-white hover:text-[#003399] p-2 rounded-full transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/libracredito/" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white text-white hover:text-[#003399] p-2 rounded-full transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/channel/UCXpuj7LlTLT_kdbwwJHS0qA" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white text-white hover:text-[#003399] p-2 rounded-full transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.reclameaqui.com.br/empresa/libra-credito-solucoes-financeiras/" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white text-white hover:text-[#003399] p-2 rounded-full transition-colors" aria-label="Reclame Aqui">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-2 mx-auto md:ml-auto md:mr-0 text-white/80 hover:text-white transition-colors text-sm"
              aria-label="Voltar ao topo"
            >
              <ChevronUp className="w-4 h-4" />
              Voltar ao topo
            </button>
          </div>
        </div>

        {/* Informações Legais */}
        <div className="text-center border-t border-white/20 pt-6 md:pt-8">
          <p className="text-sm md:text-base text-white">&copy; {new Date().getFullYear()} Libra Crédito. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm md:text-base text-white/90">
            CNPJ: 34.308.576/0001-32 | Rua Eliseu Guilherme, 879, sala 01 – Jardim Sumaré, Ribeirão Preto – SP, 14025-020
          </p>
          <div className="mt-4 md:mt-6 px-0 md:px-4 text-xs md:text-sm leading-relaxed text-white/80 space-y-2">
            <p>A Libra Crédito é uma plataforma digital que descomplica o processo de contratação de empréstimos com garantia de imóvel. Essas operações são realizadas através de Instituições Financeiras parceiras, autorizadas pelo Banco Central do Brasil.</p>
            <p><strong className="text-white">Informações do produto:</strong> Prazo de 36 a 180 meses | Taxa a partir de 1,19% ao mês + IPCA | Sistema Price ou SAC | Exemplo: R$ 75.000 em 180 meses - Prestação inicial de R$ 1.184,26 | CET de 15,86% ao ano.</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;