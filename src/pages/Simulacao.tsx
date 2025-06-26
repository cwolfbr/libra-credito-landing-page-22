
import React, { useEffect } from 'react';
import MobileLayout from '@/components/MobileLayout';
import SimulationForm from '@/components/SimulationForm';
import WaveSeparator from '@/components/ui/WaveSeparator';
import { useIsMobile } from '@/hooks/use-mobile';

const Simulacao = () => {
  const isMobile = useIsMobile();

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
    <MobileLayout>
      <WaveSeparator variant="hero" height="md" inverted />
      <div className="bg-white">
        <SimulationForm />
      </div>
    </MobileLayout>
  );
};

export default Simulacao;
