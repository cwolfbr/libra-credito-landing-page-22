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
      className="min-h-[100vh] pt-header pb-4 bg-hero-pattern relative flex flex-col justify-center overflow-hidden" 
      aria-labelledby="hero-heading"
    >
      {/* Overlay premium com gradiente sofisticado */}
      <div className="absolute inset-0 bg-gradient-to-br from-libra-navy/90 via-libra-blue/80 to-libra-accent-800/90"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-libra-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
      <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Lado Esquerdo */}
          <div className="text-white space-y-6 md:space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
                <Shield className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium text-white/90">Regulamentado pelo Banco Central</span>
              </div>
              
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transforme seu <span className="text-yellow-400">Patrimônio</span><br />
                em Oportunidades
              </h1>
              
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-white/95 max-w-lg leading-relaxed">
                  Crédito inteligente para quem construiu história.
                  Até <strong className="text-libra-gold">R$ 5 milhões</strong> com as menores taxas do mercado.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                  <div className="text-center sm:text-left">
                    <div className="text-2xl font-bold text-yellow-400">1,19%</div>
                    <div className="text-sm text-white/80">a.m. a partir de</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl font-bold text-yellow-400">180</div>
                    <div className="text-sm text-white/80">meses para pagar</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl font-bold text-yellow-400">100%</div>
                    <div className="text-sm text-white/80">online</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões Premium */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToSimulator} 
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 shadow-lg group"
              >
                <span className="mr-2">📊</span>
                Simular Agora
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button 
                onClick={goToVantagens} 
                className="px-8 py-4 bg-white text-blue-900 border-2 border-blue-200 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1"
              >
                Conheça as Vantagens
              </button>
            </div>
          </div>

          {/* Vídeo Premium */}
          <div className="w-full max-w-2xl mx-auto lg:max-w-none">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-libra-gold/20 to-libra-blue/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2 shadow-premium">
                <OptimizedYouTube
                  videoId="E9lwL6R2l1s"
                  title="Vídeo institucional Libra Crédito"
                  priority={true}
                  className="w-full h-full rounded-xl overflow-hidden"
                  thumbnailSrc="/images/video-thumbnail.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botão Saiba Mais Premium */}
        <div className="flex justify-center mt-8 md:mt-12">
          <button
            onClick={scrollToBenefits}
            className="group flex flex-col items-center gap-2 text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-1"
            aria-label="Rolar para benefícios"
          >
            <span className="text-sm font-medium">Descubra mais</span>
            <div className="w-6 h-6 border border-white/40 rounded-full flex items-center justify-center group-hover:border-white/80 transition-colors">
              <ChevronDown className="w-4 h-4 group-hover:animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
