import React from 'react';
import { ChevronUp, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-libra-navy text-white">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Menu de Produtos */}
          <div>
            <div className="text-center md:text-left mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="text-libra-gold">LIBRA</span> CRÉDITO
              </h2>
              <p className="text-sm text-libra-silver">Vem que a gente equiLIBRA</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-center md:text-left">Produtos</h3>
              <ul className="space-y-2 text-center md:text-left">
                <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Home Equity</a></li>
                <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Crédito com garantia de imóvel</a></li>
                <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Consolidação de dívidas</a></li>
                <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Capital de giro para empresas</a></li>
              </ul>
            </div>
          </div>

          {/* Seção de Contato */}
          <div>
            <div className="bg-libra-blue/20 rounded-lg p-8 backdrop-blur-sm h-full">
              <h3 className="text-2xl font-bold mb-6">Entre em contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-libra-gold rounded-full p-2 mt-1">
                    <Phone className="w-5 h-5 text-libra-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Telefone</h4>
                    <p className="text-libra-silver">16 99636 0424</p>
                    <p className="text-sm text-libra-silver mt-1">Segunda a sexta, das 9h às 18h</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-libra-gold rounded-full p-2 mt-1">
                    <Mail className="w-5 h-5 text-libra-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">E-mail</h4>
                    <p className="text-libra-silver">contato@libracredito.com.br</p>
                    <p className="text-sm text-libra-silver mt-1">Respondemos em até 24 horas úteis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Redes Sociais e Voltar ao Topo */}
          <div>
            <div className="flex flex-col items-end space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-4">Acompanhe nas redes sociais</h4>
                <div className="flex flex-wrap gap-4 justify-end">
                  <a href="https://www.facebook.com/LibraCreditoOficial/" target="_blank" rel="noopener noreferrer" className="bg-libra-blue/30 hover:bg-libra-gold p-3 rounded-full transition-colors" aria-label="Facebook">
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://www.instagram.com/libracredito/" target="_blank" rel="noopener noreferrer" className="bg-libra-blue/30 hover:bg-libra-gold p-3 rounded-full transition-colors" aria-label="Instagram">
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://www.linkedin.com/company/libracredito/" target="_blank" rel="noopener noreferrer" className="bg-libra-blue/30 hover:bg-libra-gold p-3 rounded-full transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://www.youtube.com/channel/UCXpuj7LlTLT_kdbwwJHS0qA" target="_blank" rel="noopener noreferrer" className="bg-libra-blue/30 hover:bg-libra-gold p-3 rounded-full transition-colors" aria-label="YouTube">
                    <Youtube className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://www.reclameaqui.com.br/empresa/libra-credito-solucoes-financeiras/" target="_blank" rel="noopener noreferrer" className="bg-libra-blue/30 hover:bg-libra-gold p-3 rounded-full transition-colors" aria-label="Reclame Aqui">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
              <button 
                onClick={scrollToTop} 
                className="flex items-center gap-2 text-libra-silver hover:text-white transition-colors"
              >
                Voltar ao topo
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Informações Legais */}
        <div className="text-center border-t border-libra-blue/20 pt-8">
          <p>&copy; {new Date().getFullYear()} Libra Crédito. Todos os direitos reservados.</p>
          <p className="mt-2">
            CNPJ: 34.308.576/0001-32 | Rua Eliseu Guilherme, 879, sala 01 – Jardim Sumaré, Ribeirão Preto – SP, 14025-020
          </p>
          <div className="mt-6 px-4 text-xs leading-relaxed text-libra-silver/70">
            <p>A Libra Crédito é uma plataforma digital que descomplica o processo de contratação de empréstimos com garantia de imóvel. Essas operações são realizadas através de Instituições Financeiras parceiras, autorizadas pelo Banco Central do Brasil, que instrumentalizam e emitem as cédulas de crédito bancário. Informações complementares referentes ao Empréstimo com Garantia de Imóvel: mínimo de 36 meses e máximo de 180 meses | Exemplo: Empréstimo de R$ 75.000,00 para pagar em 15 anos (180 meses) – Prestação inicial de R$ 1.184,26, com uma taxa de juros de 1,19% ao mês + IPCA | Sistema de Amortização Tabela Price. CET de 15,86% ao ano. Libra Crédito Soluções Financeiras Ltda. – CNPJ 34.308.576/0001-32 | Rua Eliseu Guilherme, 879, sala 01 – Jardim Sumaré, Ribeirão Preto – SP, 14025-020.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;