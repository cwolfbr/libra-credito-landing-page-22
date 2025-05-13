
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSimulator = () => {
    const simulatorSection = document.getElementById('simulator');
    if (simulatorSection) {
      simulatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToAgentChat = () => {
    const agentChatSection = document.getElementById('agent-chat');
    if (agentChatSection) {
      agentChatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-hero-pattern bg-cover bg-center relative">
      <div className="absolute inset-0 bg-libra-navy/70"></div>
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Crédito com Garantia de Imóvel
            </h1>
            <p className="text-lg md:text-xl mb-6 text-libra-silver">
              Taxas a partir de 1,09% ao mês, as melhores condições do mercado para você realizar seus projetos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToSimulator}
                className="bg-libra-blue hover:bg-white hover:text-libra-navy text-white font-semibold text-lg px-8 py-6"
              >
                Simular Agora
              </Button>
              <Button 
                onClick={scrollToAgentChat}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-libra-navy font-semibold text-lg px-8 py-6"
              >
                Fale com Assistente
              </Button>
            </div>
          </div>
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-xl animate-fade-in">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/E9lwL6R2l1s" 
              title="Crédito com Garantia de Imóvel - Libra Crédito"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
            className="animate-bounce bg-white/10 p-3 rounded-full"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
