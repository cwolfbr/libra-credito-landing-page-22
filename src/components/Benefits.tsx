import React from 'react';
import { TrendingUp, Building, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

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

const UsageCard: React.FC<{title: string, description: string, icon: React.ComponentType<any>, isMobile: boolean, onClick: () => void}> = ({ title, description, icon: IconComponent, isMobile, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:border-libra-blue/30 transition-all duration-300 cursor-pointer transform hover:scale-105 ${isMobile ? 'p-4' : 'p-5'}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Simular ${title}`}
    >
      <div className="text-center">
        <div className="bg-libra-blue rounded-full p-3 w-fit mx-auto mb-3 group-hover:bg-libra-navy transition-colors">
          <IconComponent className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'} text-white`} />
        </div>
        <h3 className={`${isMobile ? 'text-lg font-bold' : 'text-xl font-bold'} text-libra-navy mb-2`}>{title}</h3>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{description}</p>
        <div className="mt-4 text-libra-blue text-sm font-medium">
          Clique para simular →
        </div>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/simulacao');
  };
  
  return (
    <section id="benefits" className={`${isMobile ? 'pt-4 pb-6' : 'pt-6 md:pt-8 lg:pt-8 xl:pt-10 pb-6 md:pb-8 lg:pb-8 xl:pb-10'} bg-white scroll-mt-[88px]`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8 lg:mb-8 xl:mb-10">
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
              onClick={handleCardClick}
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
          {!isMobile && (
            <Button 
              size="lg"
              variant="outline"
              className="border-libra-blue text-libra-blue hover:bg-libra-blue hover:text-white px-8 py-3"
              onClick={() => {
                const testimonialsSection = document.getElementById('testimonials');
                if (testimonialsSection) {
                  // Procura pelo vídeo especificamente dentro da seção de testimonials
                  const videoContainer = testimonialsSection.querySelector('.aspect-video');
                  if (videoContainer) {
                    const videoPosition = videoContainer.getBoundingClientRect().top;
                    const videoHeight = videoContainer.getBoundingClientRect().height;
                    const windowHeight = window.innerHeight;
                    const headerOffset = 120;
                    
                    // Calcula a posição para centralizar o vídeo na tela
                    const centerOffset = (windowHeight - videoHeight) / 2;
                    const targetPosition = videoPosition + window.pageYOffset - centerOffset - headerOffset;
                    
                    window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                    });
                  } else {
                    // Fallback para a seção inteira se não encontrar o vídeo
                    const headerOffset = 120;
                    const elementPosition = testimonialsSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }
              }}
            >
              O que Falam da Libra
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
