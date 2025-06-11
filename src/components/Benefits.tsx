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

const UsageCard: React.FC<{title: string, description: string, icon: React.ComponentType<any>, isMobile: boolean}> = ({ title, description, icon: IconComponent, isMobile }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 ${isMobile ? 'p-4' : 'p-5'}`}>
      <div className="text-center">
        <div className="bg-libra-blue rounded-full p-3 w-fit mx-auto mb-3">
          <IconComponent className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'} text-white`} />
        </div>
        <h3 className={`${isMobile ? 'text-lg font-bold' : 'text-xl font-bold'} text-libra-navy mb-2`}>{title}</h3>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{description}</p>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="benefits" className={`${isMobile ? 'pt-6 pb-8' : 'pt-8 pb-10'} bg-libra-light scroll-mt-[88px]`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-libra-blue font-semibold uppercase tracking-wider mb-4`}>
            Soluções para cada necessidade
          </p>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-libra-navy mb-3`}>
            Como usar o Crédito com Garantia de Imóvel
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            Descubra as principais formas de usar o crédito com garantia de imóvel para transformar sua vida financeira
          </p>
        </div>
        
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-3 gap-5'} animate-slide-up max-w-6xl mx-auto mb-6`}>
          {usageOptions.map((option, index) => (
            <UsageCard 
              key={index} 
              title={option.title}
              description={option.description}
              icon={option.icon}
              isMobile={isMobile} 
            />
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/vantagens">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="bg-libra-navy hover:bg-libra-navy/90 text-white px-8 py-3"
            >
              Conheça Mais Vantagens
            </Button>
          </Link>
          <Button 
            size={isMobile ? "default" : "lg"} 
            variant="outline"
            className="border-libra-blue text-libra-blue hover:bg-libra-blue hover:text-white px-8 py-3"
            onClick={() => {
              const testimonialsSection = document.getElementById('testimonials');
              if (testimonialsSection) {
                const headerOffset = window.innerWidth < 768 ? 96 : 120;
                const elementPosition = testimonialsSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            O que Falam da Libra
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
