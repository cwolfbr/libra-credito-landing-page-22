import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import OptimizedYouTube from './OptimizedYouTube';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSimulator = () => {
    navigate('/simulacao');
  };

  const goToVantagens = () => {
    navigate('/vantagens');
  };

  const scrollToBenefits = () => {
    const benefitsSection = document.getElementById('benefits');
    if (benefitsSection) {
      // Altura total do header = barra de info (24px) + header principal (48px) + margem de segurança (16px)
      const headerOffset = 88;
      const elementPosition = benefitsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="pt-32 md:pt-28 pb-8 bg-hero-pattern bg-cover bg-center relative" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-libra-navy/70"></div>
      <div className="container mx-auto relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-white animate-fade-in">
            <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Crédito com Garantia de Imóvel
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white leading-relaxed">
              Taxas a partir de 1,19% ao mês, as melhores condições do mercado para você realizar seus projetos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToSimulator} 
                className="min-h-[48px] min-w-[200px]" 
                variant="goldContrast" 
                size="xl" 
                aria-label="Simular crédito agora"
              >
                Simular Agora
              </Button>
              <Button 
                onClick={goToVantagens} 
                variant="highContrast" 
                aria-label="Conheça as vantagens" 
                className="font-semibold min-h-[48px] min-w-[200px]" 
                size="xl"
              >
                Conheça as Vantagens
              </Button>
            </div>
          </div>
          
          <div className="w-full max-w-xl mx-auto lg:max-w-none">
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl animate-fade-in bg-black">
              <OptimizedYouTube 
                videoId="E9lwL6R2l1s" 
                title="Crédito com Garantia de Imóvel - Libra Crédito"
                priority={true}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <button 
            onClick={scrollToBenefits} 
            className="bg-black/40 p-3 rounded-full hover:bg-black/60 transition-colors min-h-[40px] min-w-[40px] hover:scale-110 transform duration-200" 
            aria-label="Rolar para seção de benefícios"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
