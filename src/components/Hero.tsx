
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Shield, TrendingUp, Clock } from 'lucide-react';
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
    document.getElementById('benefits')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-libra-navy via-libra-navy/95 to-libra-blue/80 overflow-hidden" aria-labelledby="hero-heading">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-libra-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-libra-blue/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            {/* Trust Indicators */}
            <div className="flex items-center gap-4 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-libra-gold" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-libra-gold" />
                <span>Melhores Taxas</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-libra-gold" />
                <span>Aprovação Rápida</span>
              </div>
            </div>

            <div className="space-y-6">
              <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold leading-tight">
                Crédito com
                <span className="block text-libra-gold">Garantia de Imóvel</span>
              </h1>
              
              <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl">
                Taxas a partir de <span className="font-bold text-libra-gold">1,19% ao mês</span>, 
                as melhores condições do mercado para realizar seus projetos.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-libra-gold">1,19%</div>
                    <div className="text-sm opacity-80">Taxa mínima</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-libra-gold">180</div>
                    <div className="text-sm opacity-80">Meses para pagar</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-libra-gold">5M</div>
                    <div className="text-sm opacity-80">Limite até R$</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToSimulator} 
                className="group relative overflow-hidden bg-libra-gold hover:bg-libra-gold/90 text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-libra-gold/25 transition-all duration-300 hover:scale-105" 
                size="xl"
                aria-label="Simular crédito agora"
              >
                <span className="relative z-10">Simular Agora</span>
                <div className="absolute inset-0 bg-gradient-to-r from-libra-gold to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
              <Button 
                onClick={goToVantagens} 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-libra-navy font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105" 
                size="xl"
                aria-label="Conheça as vantagens"
              >
                Conheça as Vantagens
              </Button>
            </div>
          </div>

          {/* Video Preview Card */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-libra-navy to-libra-blue relative group cursor-pointer">
                <img
                  src="https://img.youtube.com/vi/E9lwL6R2l1s/maxresdefault.jpg"
                  alt="Crédito com Garantia de Imóvel - Libra Crédito"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 bg-libra-gold rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[16px] border-r-0 border-b-[10px] border-t-[10px] border-l-black border-t-transparent border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-white font-semibold">Veja como é simples</h3>
                <p className="text-white/70 text-sm">Entenda o processo em 2 minutos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={scrollToBenefits} 
            className="group flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors" 
            aria-label="Rolar para seção de benefícios"
          >
            <span className="text-sm">Descubra mais</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
