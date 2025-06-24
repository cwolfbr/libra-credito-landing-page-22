import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto py-8 md:py-16 px-4">
        {/* Logo e Slogan */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 text-[#003399]">
            <span className="text-[#003399]">LIBRA</span> CRÉDITO
          </h2>
          <p className="text-gray-600 text-lg">Vem que a gente equiLIBRA</p>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Navegação */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#003399]">Navegação</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-[#003399] transition-colors text-base">Início</Link></li>
              <li><Link to="/simulacao" className="text-gray-600 hover:text-[#003399] transition-colors text-base">Simulação</Link></li>
              <li><Link to="/vantagens" className="text-gray-600 hover:text-[#003399] transition-colors text-base">Vantagens</Link></li>
              <li><Link to="/quem-somos" className="text-gray-600 hover:text-[#003399] transition-colors text-base">Quem Somos</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-[#003399] transition-colors text-base">Blog</Link></li>
              <li><Link to="/parceiros" className="text-gray-600 hover:text-[#003399] transition-colors text-base">Parceiros</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#003399]">Entre em Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="bg-[#003399] rounded-full p-2 flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[#003399] font-medium">16 99636 0424</p>
                  <p className="text-gray-600 text-sm">Segunda a sexta, 9h às 18h</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="bg-[#003399] rounded-full p-2 flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[#003399] font-medium">contato@libracredito.com.br</p>
                  <p className="text-gray-600 text-sm">Resposta em até 24h úteis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="text-center lg:text-left md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-[#003399]">Nos Acompanhe</h3>
            <div className="flex justify-center lg:justify-start gap-4 mb-6">
              <a href="https://www.facebook.com/LibraCreditoOficial/" target="_blank" rel="noopener noreferrer" className="bg-[#003399]/10 hover:bg-[#003399] text-[#003399] hover:text-white p-3 rounded-full transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/libracredito/" target="_blank" rel="noopener noreferrer" className="bg-[#003399]/10 hover:bg-[#003399] text-[#003399] hover:text-white p-3 rounded-full transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/company/libracredito/" target="_blank" rel="noopener noreferrer" className="bg-[#003399]/10 hover:bg-[#003399] text-[#003399] hover:text-white p-3 rounded-full transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/channel/UCXpuj7LlTLT_kdbwwJHS0qA" target="_blank" rel="noopener noreferrer" className="bg-[#003399]/10 hover:bg-[#003399] text-[#003399] hover:text-white p-3 rounded-full transition-colors" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://www.reclameaqui.com.br/empresa/libra-credito-solucoes-financeiras/" target="_blank" rel="noopener noreferrer" className="bg-[#003399]/10 hover:bg-[#003399] text-[#003399] hover:text-white p-3 rounded-full transition-colors" aria-label="Reclame Aqui">
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
            
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-2 mx-auto lg:mx-0 text-gray-600 hover:text-[#003399] transition-colors"
              aria-label="Voltar ao topo"
            >
              <ChevronUp className="w-5 h-5" />
              Voltar ao topo
            </button>
          </div>
        </div>

        {/* Informações Legais */}
        <div className="text-center border-t border-gray-200 pt-6 md:pt-8">
          <p className="text-sm md:text-base text-[#003399]">&copy; {new Date().getFullYear()} Libra Crédito. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            CNPJ: 34.308.576/0001-32 | Rua Eliseu Guilherme, 879, sala 01 – Jardim Sumaré, Ribeirão Preto – SP, 14025-020
          </p>
          <div className="mt-4 md:mt-6 px-0 md:px-4 text-xs md:text-sm leading-relaxed text-gray-500 space-y-2">
            <p>A Libra Crédito é uma plataforma digital que descomplica o processo de contratação de empréstimos com garantia de imóvel. Essas operações são realizadas através de Instituições Financeiras parceiras, autorizadas pelo Banco Central do Brasil.</p>
            <p><strong className="text-[#003399]">Informações do produto:</strong> Prazo de 36 a 180 meses | Taxa a partir de 1,19% ao mês + IPCA | Sistema Price ou SAC | Exemplo: R$ 75.000 em 180 meses - Prestação inicial de R$ 1.184,26 | CET de 15,86% ao ano.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;