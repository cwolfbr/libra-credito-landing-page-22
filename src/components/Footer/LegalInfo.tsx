import React from 'react';
import { Link } from 'react-router-dom';

const LegalInfo: React.FC = () => (
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
);

export default LegalInfo;
