
import React from 'react';
import { Check } from 'lucide-react';

const benefits = [
  {
    title: "Taxas a partir de 0,99% ao mês",
    description: "As menores taxas do mercado para empréstimo com garantia de imóvel"
  },
  {
    title: "Até 20 anos para pagar",
    description: "Parcelas que cabem no seu bolso com prazos estendidos"
  },
  {
    title: "Até 80% do valor do imóvel",
    description: "Libere até 80% do valor de avaliação do seu imóvel"
  }
];

const BenefitCard: React.FC<{title: string, description: string}> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="bg-libra-blue rounded-full p-2 flex-shrink-0">
          <Check className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-libra-navy mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-libra-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-4">Vantagens do Crédito com Garantia de Imóvel</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            O Home Equity é a solução financeira ideal para quem precisa de um valor expressivo com as melhores condições do mercado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index} 
              title={benefit.title} 
              description={benefit.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
