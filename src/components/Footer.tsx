import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import WaveSeparator from '@/components/ui/WaveSeparator';
import ImageOptimizer from '@/components/ImageOptimizer';

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
        <div className="container mx-auto py-6 lg:py-8 px-4">
        {/* Grid Principal - Layout 3 colunas para mobile e desktop */}
        <div className="grid grid-cols-3 gap-2 md:gap-6 lg:gap-8 mb-6 lg:mb-8 items-center md:items-start">
          {/* Navegação - Esquerda */}
          <div className="text-left">
            <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-4 text-white">Navegação</h3>
            <ul className="space-y-1 md:space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-xs md:text-base">Início</Link></li>
              <li><Link to="/simulacao" className="text-white/80 hover:text-white transition-colors text-xs md:text-base">Simulação</Link></li>
              <li><Link to="/vantagens" className="text-white/80 hover:text-white transition-colors text-xs md:text-base">Vantagens</Link></li>
              <li><Link to="/quem-somos" className="text-white/80 hover:text-white transition-colors text-xs md:text-base">Quem Somos</Link></li>
              <li><Link to="/blog" className="text-white/80 hover:text-white transition-colors text-xs md:text-base">Blog</Link></li>
              <li><Link to="/parceiros" className="text-white/80 hover:text-white transition-colors text-xs md:text-base">Parceiros</Link></li>
            </ul>
          </div>

          {/* Logo - Centro (centralizado horizontal e verticalmente no mobile) */}
          <div className="text-center flex items-center justify-center h-full">
            <ImageOptimizer 
              src="/images/logos/libra-logo.png" 
              alt="Libra Crédito" 
              className="h-24 md:h-20 lg:h-24 xl:h-32 w-auto max-w-full"
              aspectRatio={1}
              priority={false}
            />
          </div>

          {/* Redes Sociais - Direita */}
          <div className="text-right">
            <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-4 text-white">Redes Sociais</h3>
            {/* Layout mobile: coluna vertical alinhada à direita */}
            <div className="flex flex-col items-end gap-0.5 md:hidden mb-2">
              <a href="https://www.facebook.com/LibraCreditoOficial/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/libracredito/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/libracredito/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/channel/UCXpuj7LlTLT_kdbwwJHS0qA" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.reclameaqui.com.br/empresa/libra-credito-solucoes-financeiras/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Reclame Aqui">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            
            {/* Layout desktop: horizontal */}
            <div className="hidden md:flex justify-end items-center gap-4 mb-4">
              <a href="https://www.facebook.com/LibraCreditoOficial/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Facebook">
                <Facebook className="w-7 h-7" />
              </a>
              <a href="https://www.instagram.com/libracredito/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Instagram">
                <Instagram className="w-7 h-7" />
              </a>
              <a href="https://www.linkedin.com/company/libracredito/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-7 h-7" />
              </a>
              <a href="https://www.youtube.com/channel/UCXpuj7LlTLT_kdbwwJHS0qA" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="YouTube">
                <Youtube className="w-7 h-7" />
              </a>
              <a href="https://www.reclameaqui.com.br/empresa/libra-credito-solucoes-financeiras/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Reclame Aqui">
                <ExternalLink className="w-7 h-7" />
              </a>
            </div>
            
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-1 md:gap-2 ml-auto text-white/80 hover:text-white transition-colors text-xs md:text-sm"
              aria-label="Voltar ao topo"
            >
              <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden md:inline">Voltar ao topo</span>
              <span className="md:hidden">Topo</span>
            </button>
          </div>
        </div>

        {/* Informações Legais */}
        <div className="text-center border-t border-white/20 pt-6 md:pt-8">
          <p className="text-sm md:text-base text-white">&copy; {new Date().getFullYear()} Libra Crédito. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm md:text-base text-white/90">
            CNPJ: 34.308.576/0001-32 | Rua Eliseu Guilherme, 879, sala 01 – Jardim Sumaré, Ribeirão Preto – SP, 14025-020
          </p>
          <div className="mt-4 md:mt-6 flex justify-center gap-4 text-sm">
            <Link to="/politica-privacidade" className="text-white/80 hover:text-white transition-colors underline">
              Política de Privacidade
            </Link>
            <span className="text-white/60">|</span>
            <Link to="/politica-cookies" className="text-white/80 hover:text-white transition-colors underline">
              Política de Cookies
            </Link>
          </div>
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