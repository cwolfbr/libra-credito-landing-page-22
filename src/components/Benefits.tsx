
import React from 'react';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const benefits = [
  {
    title: "Taxas a partir de 1,09% ao mês",
    description: "As menores taxas do mercado para empréstimo com garantia de imóvel"
  },
  {
    title: "Até 180 meses para pagar",
    description: "Parcelas que cabem no seu bolso com prazos estendidos"
  },
  {
    title: "Até 50% do valor do imóvel",
    description: "Libere até 50% do valor de avaliação do seu imóvel"
  }
];

const BenefitCard: React.FC<{title: string, description: string, isMobile: boolean}> = ({ title, description, isMobile }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 ${isMobile ? 'p-3' : 'p-6'}`}>
      <div className="flex items-start gap-4">
        <div className="bg-libra-blue rounded-full p-2 flex-shrink-0">
          <Check className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-white`} />
        </div>
        <div>
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-libra-navy mb-1`}>{title}</h3>
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="benefits" className={`${isMobile ? 'py-8' : 'py-16 md:py-24'} bg-libra-light`}>
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-libra-navy mb-2 md:mb-4`}>
            Vantagens do Crédito com Garantia de Imóvel
          </h2>
          <p className={`${isMobile ? 'text-sm px-4' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            O Home Equity é a solução financeira ideal para quem precisa de um valor expressivo com as melhores condições do mercado.
          </p>
        </div>
        
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-6'} animate-slide-up`}>
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index} 
              title={benefit.title} 
              description={benefit.description}
              isMobile={isMobile} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
