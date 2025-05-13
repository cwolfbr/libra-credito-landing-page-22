
import React from 'react';

const AgentChat: React.FC = () => {
  return (
    <section id="agent-chat" className="py-16 md:py-24 bg-gradient-to-b from-white to-libra-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-4">Fale com nosso Assistente Virtual</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tire suas dúvidas sobre o crédito com garantia de imóvel e descubra como podemos ajudar você.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <div className="w-full aspect-[4/5] md:aspect-[16/9]">
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
