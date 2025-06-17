import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import PremiumButton from '@/components/ui/PremiumButton';
import { ChevronDown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OptimizedYouTube from './OptimizedYouTube';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroMinimal: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSimulator = () => {
    navigate('/simulacao');
  };

  const goToVantagens = () => {
    navigate('/vantagens');
  };

  const scrollToBenefits = () => {
    const trustbarSection = document.getElementById('trustbar');
    if (trustbarSection) {
      const headerOffsetMobile = 96;
      const headerOffsetDesktop = 120;
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

  const FloatingElement = ({ children, delay = 0, className = "" }: { 
    children: React.ReactNode; 
    delay?: number; 
    className?: string; 
  }) => (
    <div 
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  return (
    <section 
      className="min-h-screen relative overflow-hidden"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Background Minimalista com Cores da Marca */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003399] to-[#00ccff]">
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-black/5"></div>
        
        {/* Elementos geométricos minimalistas */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-white/3 rounded-full blur-2xl"></div>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 min-h-screen flex items-center pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Lado Esquerdo - Conteúdo Minimalista */}
            <div className="text-white space-y-8">
              
              {/* Título Principal */}
              <FloatingElement delay={200}>
                <h1 
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="block text-white">
                    Empréstimo com
                  </span>
                  <span className="block text-[#00ccff] font-extrabold">
                    Garantia Real
                  </span>
                </h1>
              </FloatingElement>

              {/* Descrição Minimalista */}
              <FloatingElement delay={400}>
                <p className="text-xl md:text-2xl text-white/90 font-medium">
                  <span className="text-[#00ccff] font-bold">Até R$ 5 milhões</span> com taxas a partir de{' '}
                  <span className="text-[#00ccff] font-bold">0,99% ao mês</span>
                </p>
              </FloatingElement>

              {/* Trust Badge Minimalista */}
              <FloatingElement delay={600}>
                <div className="flex items-center space-x-3 text-white/80">
                  <Shield className="w-5 h-5 text-[#00ccff]" />
                  <span className="text-sm font-medium">100% Seguro | Análise em 24h</span>
                </div>
              </FloatingElement>

              {/* CTAs Minimalistas */}
              <FloatingElement delay={800}>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button 
                    onClick={scrollToSimulator}
                    className="group bg-[#00ccff] hover:bg-[#00ccff]/90 text-[#003399] font-bold text-lg px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#00ccff]/25"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Simular Agora</span>
                      <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    </span>
                  </Button>
                  
                  <Button 
                    onClick={goToVantagens}
                    className="border-2 border-white/30 text-white hover:bg-white/10 font-medium text-lg px-8 py-6 rounded-lg transition-all duration-300 hover:border-[#00ccff] hover:text-[#00ccff]"
                  >
                    Ver Vantagens
                  </Button>
                </div>
              </FloatingElement>
            </div>

            {/* Lado Direito - Vídeo Original Minimalista */}
            <FloatingElement delay={400} className="relative">
              <div className="relative group">
                {/* Container do vídeo minimalista */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20">
                  
                  {/* Vídeo Original */}
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <OptimizedYouTube
                      videoId="E9lwL6R2l1s"
                      title="Vídeo institucional Libra Crédito"
                      priority={true}
                      className="w-full aspect-video"
                      thumbnailSrc="/images/video-thumbnail.jpg"
                    />
                  </div>

                  {/* Indicadores minimalistas */}
                  <div className="flex justify-center space-x-8 mt-6 text-sm text-white/80">
                    <div className="text-center">
                      <div className="font-bold text-lg text-[#00ccff]">24h</div>
                      <div>Aprovação</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-[#00ccff]">0,99%</div>
                      <div>ao mês</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-[#00ccff]">R$ 5M</div>
                      <div>máximo</div>
                    </div>
                  </div>
                </div>
              </div>
            </FloatingElement>
          </div>

          {/* Scroll Indicator Minimalista */}
          <FloatingElement delay={1000}>
            <div className="flex justify-center mt-16">
              <button
                onClick={scrollToBenefits}
                className="group flex flex-col items-center space-y-2 text-white/60 hover:text-[#00ccff] transition-all duration-300"
                aria-label="Scroll para ver mais informações"
              >
                <span className="text-sm font-medium">Saiba mais</span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-[#00ccff] transition-colors">
                  <ChevronDown className="w-4 h-4 mt-2 animate-bounce" />
                </div>
              </button>
            </div>
          </FloatingElement>
        </div>
      </div>
    </section>
  );
};

export default HeroMinimal;