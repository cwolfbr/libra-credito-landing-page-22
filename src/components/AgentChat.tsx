
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const AgentChat: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="agent-chat" className={`${isMobile ? 'py-8' : 'py-16 md:py-24'} bg-gradient-to-b from-white to-libra-light`}>
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-libra-navy mb-2 md:mb-4`}>
            Fale com nosso Assistente Virtual
          </h2>
          <p className={`${isMobile ? 'text-sm px-4' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            Tire suas dúvidas sobre o crédito com garantia de imóvel e descubra como podemos ajudar você.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-2 md:p-4 border border-gray-200">
          <div className={`w-full ${isMobile ? 'aspect-auto h-[600px]' : 'aspect-[16/9]'}`}>
            <iframe 
              src="https://dash.superagentes.ai/agents/cmamik9ma01wi139bksnao43i/iframe" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="clipboard-write"
              title="Assistente Virtual Libra Crédito"
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentChat;
