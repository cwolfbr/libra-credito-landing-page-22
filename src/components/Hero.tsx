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
      // Usar valores CSS dinâmicos para offset
      const headerOffsetMobile = 96; // var(--header-offset-mobile)
      const headerOffsetDesktop = 120; // var(--header-offset-desktop)
      const isMobileScreen = window.innerWidth < 768;
      const headerOffset = isMobileScreen ? headerOffsetMobile : headerOffsetDesktop;
      
      const elementPosition = benefitsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      className="min-h-[100vh] pt-header py-20 sm:py-24 md:py-32 bg-gradient-to-br from-white to-[#003399] relative flex flex-col justify-center"
      aria-labelledby="hero-heading"
    >
      {/* Sobreposição para melhor contraste do texto */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/40"></div>
      <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Lado Esquerdo */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-libra-navy mb-4">
                Transforme seu Patrimônio<br />
                em Oportunidades
              </h1>
              <div className="space-y-3 md:space-y-4">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                  Crédito inteligente para quem construiu história.
                  Até R$ 5 milhões com as menores taxas do mercado.
                </p>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-libra-gold flex-shrink-0" />
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Regulamentado pelo Banco Central - Segurança e transparência
                  </p>
                </div>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
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

            <div className="w-full max-w-2xl mx-auto lg:max-w-none">
            <div className="hero-video">
              <OptimizedYouTube
                videoId="E9lwL6R2l1s"
                title="Vídeo institucional Libra Crédito"
                priority={true}
                className="w-full h-full"
                thumbnailSrc="/images/video-thumbnail.jpg"
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
