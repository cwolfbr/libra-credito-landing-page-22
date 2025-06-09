import React from 'react';
import { TrendingUp, Building, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
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

interface UsageCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isMobile: boolean;
}

const UsageCard: React.FC<UsageCardProps> = ({ title, description, icon: IconComponent, isMobile }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 w-fit mx-auto shadow-lg">
            <IconComponent className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-semibold text-blue-900">{title}</h3>
          <p className="text-base text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="benefits" className="py-20 md:py-28 bg-gradient-to-b from-white to-blue-50 scroll-mt-[88px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Soluções para cada necessidade
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Como usar o Crédito com Garantia de Imóvel
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra as principais formas de usar o crédito com garantia de imóvel para transformar sua vida financeira
          </p>
        </div>
        
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-3 gap-8'} max-w-6xl mx-auto mb-12`}>
          {usageOptions.map((option, index) => (
            <div 
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <UsageCard 
                title={option.title}
                description={option.description}
                icon={option.icon}
                isMobile={isMobile} 
              />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/vantagens">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 shadow-lg">
              Conheça Mais Vantagens
              <span className="ml-2">→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
