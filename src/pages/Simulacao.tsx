
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SimulationForm from '@/components/SimulationForm';

const Simulacao = () => {
  useEffect(() => {
    // Atualiza o título da página para SEO
    document.title = "Simulação de Crédito | Libra Crédito";
    
    // Adiciona meta description para SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Simule seu crédito com garantia de imóvel em poucos cliques. Descubra o valor da sua parcela e as melhores condições do mercado.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-libra-light pt-20">
        <SimulationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Simulacao;
