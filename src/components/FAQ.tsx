
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useIsMobile } from '@/hooks/use-mobile';

const FAQ: React.FC = () => {
  const isMobile = useIsMobile();
  
  const faqs = [
    {
      question: "Como funciona o crédito com garantia de imóvel?",
      answer: "O crédito com garantia de imóvel é uma modalidade de empréstimo onde você oferece seu imóvel como garantia, conseguindo taxas de juros menores e prazos maiores para pagamento. Você pode utilizar até 50% do valor do seu imóvel."
    },
    {
      question: "Quais são as principais vantagens?",
      answer: "As principais vantagens incluem: taxas de juros mais baixas do mercado (a partir de 1,19% a.m.), prazos de até 180 meses, valores altos liberados, e você continua morando no seu imóvel normalmente."
    },
    {
      question: "Quais documentos são necessários?",
      answer: "São necessários: documentos pessoais (RG, CPF, comprovante de renda), documentos do imóvel (escritura, IPTU, certidões negativas), e comprovantes de renda dos últimos 3 meses."
    },
    {
      question: "Quanto tempo demora para aprovação?",
      answer: "O processo de aprovação pode levar de 15 a 30 dias úteis, dependendo da complexidade da documentação e da avaliação do imóvel."
    },
    {
      question: "Posso quitar antecipadamente?",
      answer: "Sim, você pode quitar antecipadamente sem multas ou taxas adicionais, com desconto proporcional dos juros."
    },
    {
      question: "A Libra cobra alguma taxa antecipada?",
      answer: "Não! A Libra não realiza nenhum tipo de cobrança até a efetiva liberação do crédito. Cuidado com empresas que pedem pagamentos antecipados."
    }
  ];

  return (
    <section id="faq" className={`${isMobile ? 'py-8' : 'py-16'} bg-gray-50`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-libra-navy mb-3 md:mb-4`}>
            Perguntas Frequentes
          </h2>
          <p className={`${isMobile ? 'text-base px-2' : 'text-lg'} text-gray-600 max-w-2xl mx-auto`}>
            Esclarecemos as principais dúvidas sobre crédito com garantia de imóvel
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm border"
              >
                <AccordionTrigger className={`${isMobile ? 'px-4 py-3' : 'px-6 py-4'} text-left hover:no-underline`}>
                  <span className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-libra-navy pr-2`}>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className={`${isMobile ? 'px-4 pb-3' : 'px-6 pb-4'}`}>
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed`}>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
