import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OptimizedYouTube from './OptimizedYouTube';

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
    <section className="pt-40 md:pt-48 pb-16 bg-libra-navy relative" aria-labelledby="hero-heading">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Lado Esquerdo */}
          <div className="text-white space-y-6">
            <div className="mb-8">
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Crédito com<br />
                Garantia de Imóvel
              </h1>
              <div className="space-y-6">
                <p className="text-xl text-white/90 leading-relaxed font-medium">
                  A Libra Crédito está a 5 anos auxiliando os clientes à encontrar capital dentro de casa e sem sair de casa!
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  Taxas à partir de 1,19% a.m. e até 180 meses de prazo.
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  Simule agora e veja como a parcela encaixa no orçamento!
                </p>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-row gap-4">
              <Button 
                onClick={scrollToSimulator} 
                className="min-h-[48px] text-base font-bold bg-[#00D1FF] text-white hover:bg-[#00D1FF]/90" 
                size="lg"
              >
                Simular Agora
              </Button>
              <Button 
                onClick={goToVantagens} 
                variant="outline" 
                className="min-h-[48px] text-base font-medium bg-transparent text-white border-2 border-white hover:bg-white/10" 
                size="lg"
              >
                Conheça as Vantagens
              </Button>
            </div>
          </div>

          {/* Vídeo */}
          <div className="relative h-full flex items-center">
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
              <OptimizedYouTube 
                videoId="E9lwL6R2l1s"
                title="Vídeo institucional Libra Crédito"
                priority={true}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Botão Saiba Mais */}
        <div className="flex justify-center mt-12">
          <button
            onClick={scrollToBenefits}
            className="text-white flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Rolar para benefícios"
          >
            <span className="text-sm font-medium">Saiba mais</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
