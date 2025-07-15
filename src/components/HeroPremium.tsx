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
      className="relative flex flex-col justify-center bg-gradient-to-b from-white to-gray-50 py-12 md:py-20"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div className="container relative z-10 mx-auto flex-grow px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Lado Esquerdo: Conteúdo de Texto */}
          <div className="flex animate-fade-in-up flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
            <div className="space-y-4">
              <h1
                id="hero-heading"
                className="text-3xl font-extrabold leading-tight tracking-tighter text-libra-navy md:text-4xl lg:text-5xl"
              >
                <span className="block">Crédito com Garantia de Imóvel:</span>
                <span className="block">Simples e Inteligente com a Libra!</span>
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Use seu patrimônio para realizar seus projetos com as melhores condições do mercado.
              </p>
            </div>

            <div className="space-y-3 text-base text-gray-700">
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <Shield
                  className="h-5 w-5 flex-shrink-0 text-libra-blue"
                  aria-hidden="true"
                />
                <p className="font-semibold">
                  Atendimento Personalizado, Segurança e Transparência.
                </p>
              </div>
              <p className="font-medium">
                <span className="font-bold text-libra-blue">Taxas a partir de 1,19% a.m.</span> • Até 180 meses para pagar • Processo 100% online.
              </p>
              <p className="text-xl font-bold text-libra-navy md:text-2xl">
                Crédito de até 50% do valor do seu imóvel.
              </p>
            </div>

            {/* Botões */}
            <div className="flex w-full max-w-md flex-col gap-4 pt-4 sm:flex-row">
              <HeroButton
                onClick={scrollToSimulator}
                variant="primary"
                className="w-full"
              >
                Simular Agora
              </HeroButton>
              <HeroButton
                onClick={goToVantagens}
                variant="secondary"
                className="w-full"
              >
                Conhecer Vantagens
              </HeroButton>
            </div>
          </div>

          {/* Lado Direito: Vídeo */}
          <div className="w-full max-w-xl mx-auto lg:max-w-none">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-xl shadow-2xl">
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

        {/* Botão "Saiba Mais" - Visível apenas em Desktop */}
        {!isMobile && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={scrollToBenefits}
              className="group flex flex-col items-center gap-2 text-libra-navy transition-opacity hover:opacity-80"
              aria-label="Rolar para a próxima seção"
            >
              <span className="text-sm font-medium">Saiba Mais</span>
              <ChevronDown className="h-6 w-6 animate-bounce group-hover:animate-none" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroPremium;