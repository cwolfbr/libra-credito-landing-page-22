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
      <div className="container mx-auto py-6 md:py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Logo e Menu de Produtos */}
          <div className="text-center md:text-left">
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">
                <span className="text-libra-blue">LIBRA</span> CRÉDITO
              </h2>
              <p className="text-sm text-libra-silver">Vem que a gente equiLIBRA</p>
            </div>

            <div>
              <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Produtos</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Home Equity</a></li>
                <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Crédito com garantia de imóvel</a></li>
                <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Consolidação de dívidas</a></li>
                <li><a href="#" className="text-libra-silver hover:text-white transition-colors">Capital de giro para empresas</a></li>
              </ul>
            </div>
          </div>

          {/* Seção de Contato */}
          <div className="bg-libra-blue/20 rounded-lg p-4 md:p-8 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center md:text-left">Entre em contato</h3>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4 justify-center md:justify-start">
                <div className="bg-libra-blue rounded-full p-2">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-base md:text-lg">Telefone</h4>
                  <p className="text-libra-silver text-sm md:text-base">16 99636 0424</p>
                  <p className="text-xs md:text-sm text-libra-silver mt-0.5 md:mt-1">Segunda a sexta, das 9h às 18h</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 md:gap-4 justify-center md:justify-start">
                <div className="bg-libra-blue rounded-full p-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-base md:text-lg">E-mail</h4>
                  <p className="text-libra-silver text-sm md:text-base">contato@libracredito.com.br</p>
                  <p className="text-xs md:text-sm text-libra-silver mt-0.5 md:mt-1">Respondemos em até 24 horas úteis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Redes Sociais e Voltar ao Topo */}
          <div className="flex flex-col items-center md:items-end space-y-4 md:space-y-6">
            <div className="w-full">
              <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-center md:text-right">Acompanhe nas redes sociais</h4>
              <div className="flex items-center justify-center md:justify-end">
                <div className="grid grid-flow-col gap-4 md:gap-6">
                  <a href="https://www.facebook.com/LibraCreditoOficial/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-libra-blue transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-white/10" aria-label="Siga a Libra Crédito no Facebook - abre em nova aba">
                    <Facebook className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
                  </a>
                  <a href="https://www.instagram.com/libracredito/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-libra-blue transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-white/10" aria-label="Siga a Libra Crédito no Instagram - abre em nova aba">
                    <Instagram className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
                  </a>
                  <a href="https://www.linkedin.com/company/libracredito/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-libra-blue transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-white/10" aria-label="Conecte-se com a Libra Crédito no LinkedIn - abre em nova aba">
                    <Linkedin className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
                  </a>
                  <a href="https://www.youtube.com/channel/UCXpuj7LlTLT_kdbwwJHS0qA" target="_blank" rel="noopener noreferrer" className="text-white hover:text-libra-blue transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-white/10" aria-label="Assista aos vídeos da Libra Crédito no YouTube - abre em nova aba">
                    <Youtube className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
                  </a>
                  <a href="https://www.reclameaqui.com.br/empresa/libra-credito-solucoes-financeiras/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-libra-blue transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-white/10" aria-label="Veja a reputação da Libra Crédito no Reclame Aqui - abre em nova aba">
                    <ExternalLink className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
            
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-2 text-sm md:text-base text-libra-silver hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-libra-gold rounded px-4 py-3 min-h-[44px]"
              aria-label="Voltar ao topo da página"
            >
              Voltar ao topo
              <ChevronUp className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Informações Legais */}
        <div className="text-center border-t border-libra-blue/20 pt-6 md:pt-8">
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Libra Crédito. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm md:text-base">
            CNPJ: 34.308.576/0001-32 | Rua Eliseu Guilherme, 879, sala 01 – Jardim Sumaré, Ribeirão Preto – SP, 14025-020
          </p>
          <div className="mt-4 md:mt-6 px-0 md:px-4 text-[10px] md:text-xs leading-relaxed text-libra-silver/70">
            <p>A Libra Crédito é uma plataforma digital que descomplica o processo de contratação de empréstimos com garantia de imóvel. Essas operações são realizadas através de Instituições Financeiras parceiras, autorizadas pelo Banco Central do Brasil, que instrumentalizam e emitem as cédulas de crédito bancário. Informações complementares referentes ao Empréstimo com Garantia de Imóvel: mínimo de 36 meses e máximo de 180 meses | Exemplo: Empréstimo de R$ 75.000,00 para pagar em 15 anos (180 meses) – Prestação inicial de R$ 1.184,26, com uma taxa de juros de 1,19% ao mês + IPCA | Sistema de Amortização Tabela Price. CET de 15,86% ao ano. Libra Crédito Soluções Financeiras Ltda. – CNPJ 34.308.576/0001-32 | Rua Eliseu Guilherme, 879, sala 01 – Jardim Sumaré, Ribeirão Preto – SP, 14025-020.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;