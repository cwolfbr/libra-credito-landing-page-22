
import React from 'react';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const benefits = [
  {
    title: "Taxas a partir de 1,09% ao mês",
  },
  {
    title: "Até 180 meses para pagar",
  },
  {
    title: "Até 50% do valor do imóvel",
  }
];

const BenefitCard: React.FC<{title: string, isMobile: boolean}> = ({ title, isMobile }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 ${isMobile ? 'p-3' : 'p-5'}`}>
      <div className="flex items-center gap-3">
        <div className="bg-libra-blue rounded-full p-2 flex-shrink-0">
          <Check className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-white`} />
        </div>
        <h3 className={`${isMobile ? 'text-base font-bold' : 'text-xl font-bold'} text-libra-navy`}>{title}</h3>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="benefits" className={`${isMobile ? 'py-6' : 'py-16 md:py-24'} bg-libra-light`}>
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-libra-navy mb-2 md:mb-4`}>
            Vantagens do Crédito com Garantia de Imóvel
          </h2>
        </div>
        
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-6'} animate-slide-up`}>
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index} 
              title={benefit.title}
              isMobile={isMobile} 
            />
          ))}
        </div>
        
        <div className="text-center mt-6 md:mt-10">
          <p className={`${isMobile ? 'text-base' : 'text-xl'} font-medium text-libra-navy italic`}>
            Tudo isso com parcelas que cabem no seu bolso!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
