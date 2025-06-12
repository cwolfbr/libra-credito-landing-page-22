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
    const trustbarSection = document.getElementById('trustbar');
    if (trustbarSection) {
      // Usar valores CSS dinâmicos para offset
      const headerOffsetMobile = 96; // var(--header-offset-mobile)
      const headerOffsetDesktop = 120; // var(--header-offset-desktop)
      const isMobileScreen = window.innerWidth < 768;
      const headerOffset = isMobileScreen ? headerOffsetMobile : headerOffsetDesktop;
      
      const elementPosition = trustbarSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      className="hero-section" 
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div className="hero-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Lado Esquerdo */}
          <div className="text-[#003399] space-y-4 md:space-y-6">
            <div>
              <h1 id="hero-heading" className="hero-h1">
                Transforme seu Patrimônio<br />
                em Oportunidades
              </h1>
              <div className="space-y-3 md:space-y-4">
                <p className="hero-p">
                  Crédito inteligente para quem construiu história.
                  Até R$ 5 milhões com as menores taxas do mercado.
                </p>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#003399] flex-shrink-0" aria-hidden="true" />
                  <p className="text-base md:text-lg text-[#003399] leading-relaxed">
                    Regulamentado pelo Banco Central - Segurança e transparência
                  </p>
                </div>
                <p className="text-base md:text-lg text-[#003399] leading-relaxed">
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
        <div className="flex justify-center mt-4 md:mt-6">
          <button
            onClick={scrollToBenefits}
            className="text-gray-700 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
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
