import React, { useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/MobileLayout';
import PremiumLoading from '@/components/ui/PremiumLoading';

<<<<<<< HEAD
// Hero não deve ser lazy loaded pois contém o LCP
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import WaveSeparator from '@/components/ui/WaveSeparator';
import RateHighlight from '@/components/RateHighlight';
=======
// Hero minimalista não deve ser lazy loaded pois contém o LCP
import HeroMinimal from '@/components/HeroMinimal';
import TrustBarMinimal from '@/components/TrustBarMinimal';
>>>>>>> 299d015aa40094989c54e99152b36dea25a89d32

// Lazy loading dos componentes pesados
const Benefits = lazy(() => import('@/components/Benefits'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const MediaSection = lazy(() => import('@/components/MediaSection'));
const FAQ = lazy(() => import('@/components/FAQ'));
const BlogSection = lazy(() => import('@/components/BlogSection'));

// Componente de fallback premium para lazy loading
const SectionLoader: React.FC = () => (
  <div className="w-full h-[300px] flex items-center justify-center">
    <PremiumLoading 
      variant="pulse" 
      size="lg" 
      color="blue" 
      text="Carregando..."
    />
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
      <HeroMinimal />
      
<<<<<<< HEAD
      {/* Faixa Separadora com Ondas - Posição Exata da Libra */}
      <WaveSeparator variant="hero" height="md" />
      
      {/* Seção de Destaque da Taxa 1,19% */}
      <RateHighlight />
      
      <TrustBar />
=======
      <TrustBarMinimal />
>>>>>>> 299d015aa40094989c54e99152b36dea25a89d32
      
      <Suspense fallback={<SectionLoader />}>
        <Benefits />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <MediaSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>
      
      {/* Botão Conheça a Libra Minimalista */}
      <section 
        className="py-12 bg-gray-50"
        aria-label="Conheça mais sobre a Libra Crédito"
      >
        <div className="container mx-auto text-center">
          <div className="max-w-lg mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold gradient-libra-text">
              Conheça a Libra
            </h2>
            
            <div>
              <Button 
                onClick={goToQuemSomos}
                className="group bg-gradient-to-r from-[#003399] to-[#00ccff] hover:from-[#002266] hover:to-[#0099cc] text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-libra-glow transition-all duration-300 transform hover:scale-105"
                aria-label="Clique para conhecer mais sobre a Libra Crédito"
              >
                <span className="flex items-center space-x-2">
                  <span>Nossa História</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Suspense fallback={<SectionLoader />}>
        <BlogSection />
      </Suspense>
    </MobileLayout>
  );
};

export default Index;
