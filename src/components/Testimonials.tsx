
import React, { memo } from 'react';
import { MessageSquare, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
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

const TestimonialCard = memo(({ name, age, text, isMobile }: {name: string, age: string, text: string, isMobile: boolean}) => {
  return (
    <div className={`bg-white p-4 ${!isMobile && 'md:p-6'} rounded-lg shadow-md border border-gray-100 h-full`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-gray-100 rounded-full p-2">
          <User className="w-4 h-4 text-libra-navy" />
        </div>
        <div>
          <h4 className="font-bold text-libra-navy">{name}</h4>
          <p className="text-sm text-gray-500">{age}</p>
        </div>
      </div>
      <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 italic`}>{text}</p>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

const Testimonials: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className={`${isMobile ? 'py-8' : 'py-16 md:py-24'} bg-white`}>
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-libra-navy mb-2 md:mb-4`}>
            O que nossos clientes dizem
          </h2>
          <p className={`${isMobile ? 'text-sm px-4' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            Veja como o crédito com garantia de imóvel transformou a vida financeira de nossos clientes com taxas a partir de 1,09% a.m. e prazo de até 180 meses.
          </p>
        </div>
        
        <div className={`grid grid-cols-1 ${!isMobile && 'lg:grid-cols-2'} gap-6 items-center`}>
          <div className={`w-full aspect-[16/9] max-w-xl mx-auto rounded-lg overflow-hidden shadow-xl ${isMobile ? 'mb-4' : ''}`}>
            <OptimizedYouTube 
              videoId="ETQRA4cvADk" 
              title="Depoimento Cliente - Libra Crédito"
              priority={false}
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-libra-blue" />
              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-libra-navy`}>
                Depoimentos de Clientes
              </h3>
            </div>
            
            {isMobile ? (
              <div className="relative">
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                      <CarouselItem key={index}>
                        <TestimonialCard 
                          name={testimonial.name}
                          age={testimonial.age}
                          text={testimonial.text}
                          isMobile={isMobile}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-12 bg-white/80" />
                  <CarouselNext className="-right-12 bg-white/80" />
                </Carousel>
              </div>
            ) : (
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard 
                    key={index}
                    name={testimonial.name}
                    age={testimonial.age}
                    text={testimonial.text}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
