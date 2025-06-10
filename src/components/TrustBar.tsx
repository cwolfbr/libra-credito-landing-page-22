import React from 'react';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';

const TrustBar: React.FC = () => {
  return (
    <section className="bg-gray-50 py-6 border-t border-gray-200" aria-label="Indicadores de confiança">
      <h2 className="sr-only">Indicadores de Confiança da Libra Crédito</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {/* Regulamentação */}
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-libra-blue flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs md:text-sm text-gray-600 leading-tight">Regulamentado pelo</p>
              <p className="text-sm md:text-base font-semibold text-gray-900">Banco Central</p>
            </div>
          </div>
          
          {/* Anos no mercado */}
          <div className="flex items-center justify-center gap-3">
            <Award className="w-6 h-6 md:w-8 md:h-8 text-libra-blue flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs md:text-sm text-gray-600 leading-tight">Grupo Stéfani</p>
              <p className="text-sm md:text-base font-semibold text-gray-900">40+ anos</p>
            </div>
          </div>
          
          {/* Clientes atendidos */}
          <div className="flex items-center justify-center gap-3">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-libra-blue flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs md:text-sm text-gray-600 leading-tight">Mais de</p>
              <p className="text-sm md:text-base font-semibold text-gray-900">10.000 clientes</p>
            </div>
          </div>
          
          {/* Valor liberado */}
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-libra-blue flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs md:text-sm text-gray-600 leading-tight">Liberados</p>
              <p className="text-sm md:text-base font-semibold text-gray-900">R$ 500M+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
