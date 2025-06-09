
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
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-header">
        {/* Hero Header da Simulação */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Simulador de <span className="text-yellow-400">Crédito</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Descubra em segundos quanto você pode emprestar com as melhores condições do mercado
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">1,19%</div>
                <div className="text-sm text-blue-200">Taxa a partir de</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">R$ 5Mi</div>
                <div className="text-sm text-blue-200">Até este valor</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">180x</div>
                <div className="text-sm text-blue-200">Meses para pagar</div>
              </div>
            </div>
          </div>
        </div>
        <SimulationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Simulacao;
