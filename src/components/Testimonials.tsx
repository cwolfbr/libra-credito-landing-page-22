
import React from 'react';
import { MessageSquare, User } from 'lucide-react';

const testimonials = [
  {
    name: "Carlos Silva",
    occupation: "Empresário",
    text: "Consegui capital de giro para minha empresa com taxas muito menores do que eu pagava nos bancos tradicionais. O processo foi rápido e sem burocracia."
  },
  {
    name: "Maria Oliveira",
    occupation: "Professora",
    text: "Utilizei o crédito para quitar dívidas com juros altos. Agora pago uma parcela única com juros menores e organizei minha vida financeira."
  },
  {
    name: "João Santos",
    occupation: "Engenheiro",
    text: "Fiz a reforma dos meus sonhos sem precisar usar todas as minhas economias. As condições de pagamento são excelentes."
  }
];

const TestimonialCard: React.FC<{name: string, occupation: string, text: string}> = ({ name, occupation, text }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-gray-100 rounded-full p-2">
          <User className="w-4 h-4 text-libra-navy" />
        </div>
        <div>
          <h4 className="font-bold text-libra-navy">{name}</h4>
          <p className="text-sm text-gray-500">{occupation}</p>
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
            {/* Substitua pelo ID do vídeo real do YouTube ou outro serviço */}
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Depoimento Cliente - Libra Crédito"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-6 h-6 text-libra-gold" />
              <h3 className="text-2xl font-bold text-libra-navy">Depoimentos de Clientes</h3>
            </div>
            
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  name={testimonial.name}
                  occupation={testimonial.occupation}
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
