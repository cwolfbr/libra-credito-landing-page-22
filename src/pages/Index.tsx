import React, { useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/MobileLayout';
import LoadingSpinner from '@/components/ui/loading-spinner';

// Hero não deve ser lazy loaded pois contém o LCP
import Hero from '@/components/Hero';
import TrustBarMinimal from '@/components/TrustBarMinimal';
import WaveSeparator from '@/components/ui/WaveSeparator';

// Lazy loading dos componentes pesados
const Benefits = lazy(() => import('@/components/Benefits'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const MediaSection = lazy(() => import('@/components/MediaSection'));
const FAQ = lazy(() => import('@/components/FAQ'));
const BlogSection = lazy(() => import('@/components/BlogSection'));

// Componente de fallback para lazy loading
const SectionLoader: React.FC = () => (
  <div className="w-full h-[300px] flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Libra Crédito | Empréstimo com Garantia de Imóvel";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Empréstimo com garantia de imóvel com as melhores taxas do mercado. Simule agora e descubra quanto você pode obter com seu imóvel como garantia.');
    }
  }, []);

  const goToQuemSomos = () => {
    navigate('/quem-somos');
  };

  return (
    <MobileLayout>
      {/* Faixa Separadora Superior Invertida - Ondas para baixo */}
      <WaveSeparator variant="hero" height="md" inverted />
      
      <Hero />
      
      {/* Faixa Separadora com Ondas - Apenas adicionada, sem alterar o resto */}
      <WaveSeparator variant="hero" height="md" />
      
      <TrustBarMinimal />
      
      <Suspense fallback={<SectionLoader />}>
        <Benefits />
      </Suspense>
      
      <WaveSeparator variant="hero" height="md" inverted />
      
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      
      <WaveSeparator variant="hero" height="md" />
      
      <Suspense fallback={<SectionLoader />}>
        <MediaSection />
      </Suspense>
      
      <WaveSeparator variant="hero" height="md" inverted />
      
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>
      
      {/* Botão Conheça a Libra */}
      <section 
        className="py-8 bg-libra-light"
        aria-label="Conheça mais sobre a Libra Crédito"
      >
        <div className="container mx-auto text-center">
          <Button 
            onClick={goToQuemSomos}
            className="min-h-[48px] min-w-[200px] bg-libra-navy text-white hover:bg-libra-navy/90"
            size="xl"
            aria-label="Clique para conhecer mais sobre a Libra Crédito"
          >
            Conheça a Libra
          </Button>
        </div>
      </section>
      
      <Suspense fallback={<SectionLoader />}>
        <BlogSection />
      </Suspense>
    </MobileLayout>
  );
};

export default Index;