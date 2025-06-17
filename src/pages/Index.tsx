import React, { useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/MobileLayout';
import PremiumLoading from '@/components/ui/PremiumLoading';

// Hero premium não deve ser lazy loaded pois contém o LCP
import HeroPremium from '@/components/HeroPremium';
import TrustBarPremium from '@/components/TrustBarPremium';

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
      <HeroPremium />
      
      <TrustBarPremium />
      
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
      
      {/* Botão Conheça a Libra Premium */}
      <section 
        className="py-16 bg-gradient-to-r from-blue-50 to-indigo-100 relative overflow-hidden"
        aria-label="Conheça mais sobre a Libra Crédito"
      >
        {/* Background decorativo */}
        <div className="absolute inset-0">
          <div className="absolute top-8 left-8 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Conheça Nossa{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                História
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Descubra como nos tornamos referência em crédito imobiliário no Brasil
            </p>
            
            <div className="pt-4">
              <Button 
                onClick={goToQuemSomos}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-h-[56px] min-w-[240px]"
                aria-label="Clique para conhecer mais sobre a Libra Crédito"
              >
                <span className="flex items-center space-x-2">
                  <span>Conheça a Libra</span>
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
