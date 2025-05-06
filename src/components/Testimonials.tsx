
import React from 'react';
import { MessageSquare, User } from 'lucide-react';

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

const TestimonialCard: React.FC<{name: string, age: string, text: string}> = ({ name, age, text }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-gray-100 rounded-full p-2">
          <User className="w-4 h-4 text-libra-navy" />
        </div>
        <div>
          <h4 className="font-bold text-libra-navy">{name}</h4>
          <p className="text-sm text-gray-500">{age}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">{text}</p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-4">O que nossos clientes dizem</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Veja como o crédito com garantia de imóvel transformou a vida financeira de nossos clientes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden shadow-xl">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/E9lwL6R2l1s" 
              title="Depoimento Cliente - Libra Crédito"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-6 h-6 text-libra-blue" />
              <h3 className="text-2xl font-bold text-libra-navy">Depoimentos de Clientes</h3>
            </div>
            
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  name={testimonial.name}
                  age={testimonial.age}
                  text={testimonial.text}
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
