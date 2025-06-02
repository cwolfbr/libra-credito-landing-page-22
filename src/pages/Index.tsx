import React, { useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/ui/loading-spinner';

// Lazy loading dos componentes pesados
const Hero = lazy(() => import('@/components/Hero'));
const Benefits = lazy(() => import('@/components/Benefits'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const MediaSection = lazy(() => import('@/components/MediaSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));
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
    // SEO Optimizations
    document.title = "Libra Crédito | Empréstimo com Garantia de Imóvel | Home Equity";
    
    // Meta tags para SEO
    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMetaTag('description', 'Crédito com garantia de imóvel com as melhores taxas do mercado. Home Equity e empréstimo com garantia para consolidação de dívidas, capital de giro e mais.');
    updateMetaTag('keywords', 'home equity, empréstimo com garantia, crédito imobiliário, financiamento, libra crédito');
    updateMetaTag('robots', 'index, follow');
  }, []);

  const goToQuemSomos = () => {
    navigate('/quem-somos');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main role="main" className="flex-grow">
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
        
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
        
        {/* Botão Conheça a Libra */}
        <section 
          className="py-8 bg-libra-light"
          aria-label="Conheça mais sobre a Libra Crédito"
        >
          <div className="container mx-auto text-center">
            <Button 
              onClick={goToQuemSomos}
              variant="goldContrast"
              size="xl"
              className="min-h-[48px] min-w-[200px]"
              aria-label="Clique para conhecer mais sobre a Libra Crédito"
            >
              Conheça a Libra
            </Button>
          </div>
        </section>
        
        <Suspense fallback={<SectionLoader />}>
          <BlogSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
