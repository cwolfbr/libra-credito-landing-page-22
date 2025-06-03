import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OptimizedYouTube from './OptimizedYouTube';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[100vh] pt-20 pb-4 bg-gradient-to-br from-[#003399] via-[#0066cc] to-[#00ccff]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div className="text-white space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Crédito com<br />
              Garantia de Imóvel
            </h1>
            <div className="space-y-3">
              <p className="text-lg md:text-xl text-white/90 font-medium">
                A Libra Crédito está a 5 anos auxiliando os clientes à encontrar capital dentro de casa e sem sair de casa!
              </p>
              <p className="text-base md:text-lg text-white/90">
                Taxas à partir de 1,19% a.m. e até 180 meses de prazo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => navigate('/simulacao')}
                className="h-12 text-base font-bold bg-[#00D1FF] text-white hover:bg-[#00D1FF]/90"
              >
                Simular Agora
              </Button>
              <Button 
                onClick={() => navigate('/vantagens')}
                variant="outline" 
                className="h-12 text-base bg-transparent text-white border-2 border-white hover:bg-white/10"
              >
                Conheça as Vantagens
              </Button>
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto lg:max-w-none">
            <div className="rounded-xl overflow-hidden shadow-2xl bg-black">
              <OptimizedYouTube 
                videoId="E9lwL6R2l1s"
                title="Vídeo institucional Libra Crédito"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              const benefitsSection = document.getElementById('benefits');
              benefitsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-white flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Rolar para benefícios"
          >
            <span className="text-sm">Saiba mais</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
