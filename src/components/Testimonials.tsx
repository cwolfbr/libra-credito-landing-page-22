import React, { memo, useEffect, useState } from 'react';
import { MessageSquare, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import OptimizedYouTube from './OptimizedYouTube';

const testimonials = [
  {
    name: "José Augusto Felix",
    age: "61 anos",
    text: "Dentre as possibilidades que haviam no mercado, optei por fechar com a Libra, justamente pelo excelente atendimento e taxas competitivas. Recebi toda a assistência necessária e fiquei bastante satisfeito."
  },
  {
    name: "Alcidemir Francisco de Oliveira",
    age: "59 anos",
    text: "Conheci a Libra pelo Instagram e as conversas iniciais foram rápidas e eficientes. Aprecio muito a atenção aos detalhes e o processo transparente. Eu achei a experiência geral, positiva e útil para o meu objetivo, que era reduzir dívidas."
  },
  {
    name: "Emanuele Cristina Presenti",
    age: "27 anos",
    text: "Meu primeiro contato com a Libra foi pelo Google, pesquisei mais detalhes sobre a empresa e entrei em contato. A primeira comunicação foi ótima e os consultores também! Fiz cotação com outras empresas, mas o valor que a Libra liberou foi maior, e as condições de pagamento e taxa de juros também foram melhores."
  }
];

const TestimonialCard = memo(({ name, age, text, isMobile, isActive, currentIndex, totalTestimonials, onNavigate }: {
  name: string, 
  age: string, 
  text: string, 
  isMobile: boolean, 
  isActive: boolean,
  currentIndex: number,
  totalTestimonials: number,
  onNavigate: (index: number) => void
}) => {
  return (
    <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100 h-full flex flex-col">
        <div className="flex items-start gap-3 mb-2">
          <User className="w-6 h-6 text-libra-navy mt-1" />
          <div>
            <h4 className="font-bold text-libra-navy">{name}</h4>
            <p className="text-sm text-gray-500">{age}</p>
          </div>
        </div>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 italic flex-grow mb-2`}>{text}</p>
        
        {/* Navegação dentro do card */}
        <div className="flex justify-center gap-2 pt-3 border-t border-gray-100">
          {Array.from({ length: totalTestimonials }).map((_, index) => (
            <button
              key={index}
              className={`${isMobile ? 'w-3 h-3' : 'w-2 h-2'} rounded-full transition-all duration-300 touch-target ${
                currentIndex === index ? 'bg-libra-navy' : 'bg-gray-300'
              }`}
              onClick={() => onNavigate(index)}
              aria-label={`Ver depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

const Testimonials: React.FC = () => {
  const isMobile = useIsMobile();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Troca a cada 5 segundos
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="testimonials" className={`${isMobile ? 'py-8' : 'py-16 md:py-24'} bg-white scroll-mt-[88px]`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-libra-navy mb-2 md:mb-4`}>
            O que nossos clientes dizem
          </h2>
          <p className={`${isMobile ? 'text-sm px-4' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            Veja como o crédito com garantia de imóvel transformou a vida financeira de nossos clientes com taxas a partir de 1,19% a.m. e prazo de até 180 meses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center max-w-6xl mx-auto">
          <div className="w-full max-w-xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl bg-black">
              <OptimizedYouTube 
                videoId="ETQRA4cvADk" 
                title="Depoimento Cliente - Libra Crédito"
                priority={false}
                className="w-full h-full"
              />
            </div>
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-libra-blue" />
              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-libra-navy`}>
                Depoimentos de Clientes
              </h3>
            </div>
            
            <div className="relative h-[300px] md:h-[260px]">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  name={testimonial.name}
                  age={testimonial.age}
                  text={testimonial.text}
                  isMobile={isMobile}
                  isActive={currentTestimonial === index}
                  currentIndex={currentTestimonial}
                  totalTestimonials={testimonials.length}
                  onNavigate={setCurrentTestimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
