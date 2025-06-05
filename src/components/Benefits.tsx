import React from 'react';
import { TrendingUp, Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const usageOptions = [
  {
    title: "Consolidação de Dívidas",
    icon: TrendingUp,
    description: "Quite suas dívidas com juros altos e tenha uma única parcela menor"
  },
  {
    title: "Capital de Giro",
    icon: Building,
    description: "Invista no seu negócio e faça ele crescer com capital de giro"
  },
  {
    title: "Investimentos/Reformas",
    icon: Home,
    description: "Reforme seu imóvel ou invista em novos projetos pessoais"
  }
];

const UsageCard: React.FC<{ title: string; description: string; icon: React.ComponentType<any> }> = ({
  title,
  description,
  icon: IconComponent,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 p-4 md:p-5">
      <div className="text-center">
        <div className="bg-libra-blue rounded-full p-3 w-fit mx-auto mb-3">
          <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-libra-navy mb-2">{title}</h3>
        <p className="text-sm md:text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="pt-16 md:pt-24 pb-12 md:pb-16 bg-libra-light scroll-mt-[88px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm sm:text-base md:text-lg text-libra-blue font-semibold uppercase tracking-wider mb-6">
            Soluções para cada necessidade
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-libra-navy mb-4">
            Como usar o Crédito com Garantia de Imóvel
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra as principais formas de usar o crédito com garantia de imóvel para transformar sua vida financeira
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 animate-slide-up max-w-6xl mx-auto mb-8">
          {usageOptions.map((option, index) => (
            <UsageCard
              key={index}
              title={option.title}
              description={option.description}
              icon={option.icon}
            />
          ))}
        </div>

        <div className="text-center">
          <Link to="/vantagens">
            <Button
              className="bg-libra-navy hover:bg-libra-navy/90 text-white px-8 py-3"
              size="default"
            >
              Conheça Mais Vantagens
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
