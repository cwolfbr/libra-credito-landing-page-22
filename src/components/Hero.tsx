import React from 'react';
import { Button } from '@/components/ui/button';
import PremiumButton from '@/components/ui/PremiumButton';
import { ChevronDown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OptimizedYouTube from './OptimizedYouTube';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const scrollToSimulator = () => {
    navigate('/simulacao');
  };

  const goToVantagens = () => {
    navigate('/vantagens');
  };

  const scrollToBenefits = () => {
    const benefitsSection = document.getElementById('benefits');
    if (benefitsSection) {
      // Altura total do header: faixa superior (py-3 = 24px) + header principal (h-20 = 80px) = 104px
      // Adicionando um pequeno padding extra (16px) para garantir espaço visual
      const headerOffset = 120;
      const elementPosition = benefitsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="min-h-[100vh] pt-20 md:pt-24 pb-4 bg-gradient-to-br from-[#003399] via-[#0066cc] to-[#00ccff] relative flex flex-col justify-center" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Lado Esquerdo */}
          <div className="text-white space-y-4 md:space-y-6">
            <div>
              <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Transforme seu Patrimônio<br />
                em Oportunidades
              </h1>
              <div className="space-y-3 md:space-y-4">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                  Crédito inteligente para quem construiu história.
                  Até R$ 5 milhões com as menores taxas do mercado.
                </p>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-white/80 flex-shrink-0" />
                  <p className="text-base md:text-lg text-white/90 leading-relaxed">
                    Regulamentado pelo Banco Central - Segurança e transparência
                  </p>
                </div>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  Taxas a partir de 1,19% a.m. • Até 180 meses • 100% online
                </p>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <PremiumButton 
                onClick={scrollToSimulator} 
                variant="primary"
                className="w-full sm:w-auto"
              >
                Simular Agora
              </PremiumButton>
              <PremiumButton 
                onClick={goToVantagens} 
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Conheça as Vantagens
              </PremiumButton>
            </div>
          </div>

          {/* Vídeo - com loading=lazy em mobile */}
          <div className="w-full max-w-2xl mx-auto lg:max-w-none">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <OptimizedYouTube 
                videoId="E9lwL6R2l1s"
                title="Vídeo institucional Libra Crédito"
                priority={!isMobile}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Botão Saiba Mais */}
        <div className="flex justify-center mt-6 md:mt-8">
          <button
            onClick={scrollToBenefits}
            className="text-white flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Rolar para benefícios"
          >
            <span className="text-sm font-medium">Saiba mais</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
