import React from 'react';
import { Button } from '@/components/ui/button';
import HeroButton from '@/components/ui/HeroButton';
import { ChevronDown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OptimizedYouTube from './OptimizedYouTube';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroPremium: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const scrollToSimulator = () => {
    navigate('/simulacao');
  };

  const goToVantagens = () => {
    navigate('/vantagens');
  };

  const scrollToBenefits = () => {
    const card = document.getElementById('capital-giro-card');
    const trustbar = document.getElementById('trustbar');
    if (card) {
      const headerOffset = window.innerWidth < 768 ? 96 : 108;
      const trustbarRect = trustbar?.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const trustbarHeight = trustbarRect ? trustbarRect.height : 0;
      const cardHeight = cardRect.height;
      const centerOffset = (window.innerHeight - cardHeight) / 2;
      const baseTarget =
        cardRect.top +
        window.pageYOffset -
        headerOffset -
        trustbarHeight -
        centerOffset;

      const isMobileView = window.innerWidth < 768;
      const additionalScroll = window.innerHeight * (isMobileView ? 0.24 : 0.2);
      const target = baseTarget + additionalScroll;

      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  return (
<section
      className="flex items-center bg-white py-10 md:py-16"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12">
          {/* Lado Esquerdo: Conteúdo de Texto */}
          <div className="animate-fade-in-up space-y-5 text-center md:text-left">
            <div className="space-y-3">
              <h1
                id="hero-heading"
                className="text-3xl font-extrabold leading-tight tracking-tighter text-libra-navy md:text-4xl"
              >
                <span className="block">Crédito com Garantia de Imóvel:</span>
                <span className="block text-libra-blue">Simples e Inteligente.</span>
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                Use seu patrimônio para realizar projetos com as melhores condições do mercado.
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Shield
                  className="h-4 w-4 flex-shrink-0 text-libra-blue"
                  aria-hidden="true"
                />
                <p className="font-semibold">
                  Segurança, Transparência e Atendimento Personalizado.
                </p>
              </div>
              <p className="font-medium">
                <span className="font-bold text-libra-blue">Taxas a partir de 1,19% a.m.</span> • Até 180 meses • 100% online.
              </p>
            </div>

            <p className="text-lg font-bold text-libra-navy md:text-xl">
              Crédito de até 50% do valor do seu imóvel.
            </p>

            {/* Botões */}
            <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-center md:justify-start">
              <HeroButton
                onClick={scrollToSimulator}
                variant="primary"
                className="w-full sm:w-auto"
              >
                Simular Agora
              </HeroButton>
              <HeroButton
                onClick={goToVantagens}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Conhecer Vantagens
              </HeroButton>
            </div>
          </div>

          {/* Lado Direito: Vídeo Institucional */}
          <div className="w-full max-w-lg mx-auto">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-lg">
              <OptimizedYouTube
                videoId="E9lwL6R2l1s"
                title="Vídeo institucional Libra Crédito"
                priority={true}
                className="w-full h-full"
                thumbnailSrc="/images/media/video-cgi-libra.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPremium;