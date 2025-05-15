
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';

const AgentChat: React.FC = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  // Load iframe only when this component is closer to viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Start loading when 10% of the element is visible
    );
    
    const element = document.getElementById('agent-chat');
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, []);
  
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
          <div className={`w-full ${isMobile ? 'aspect-auto h-[600px]' : 'aspect-[16/9]'} relative`}>
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>
            )}
            
            {shouldLoad && (
              <iframe 
                src="https://dash.superagentes.ai/agents/cmamik9ma01wi139bksnao43i/iframe" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allow="clipboard-write"
                title="Assistente Virtual Libra Crédito"
                className={`w-full h-full rounded-lg ${isLoaded ? '' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentChat;
