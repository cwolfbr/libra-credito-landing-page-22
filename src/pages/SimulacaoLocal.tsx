import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocalSimulationForm from '@/components/LocalSimulationForm';

const SimulacaoLocal = () => {
  useEffect(() => {
    // Atualiza o título da página para SEO
    document.title = "Simulação Local de Crédito | Libra Crédito";
    
    // Adiciona meta description para SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Simule seu crédito instantaneamente sem APIs. Calcule parcelas SAC e PRICE com base na sua cidade e valor do imóvel.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-libra-light pt-header">
        <LocalSimulationForm />
      </main>
      <Footer />
    </div>
  );
};

export default SimulacaoLocal;