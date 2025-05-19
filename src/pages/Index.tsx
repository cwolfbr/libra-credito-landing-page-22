
import React, { useEffect, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import { Skeleton } from "@/components/ui/skeleton";

// Import critical components eagerly (for LCP)
import Hero from '@/components/Hero';

// Lazy load components that are below the fold
const Benefits = lazy(() => import('@/components/Benefits'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const AgentChat = lazy(() => import('@/components/AgentChat'));
const LoanSimulator = lazy(() => import('@/components/LoanSimulator'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

// Simple loading component
const SectionLoader = () => (
  <div className="w-full py-16">
    <div className="container mx-auto">
      <Skeleton className="h-8 w-1/3 mx-auto mb-4" />
      <Skeleton className="h-4 w-2/3 mx-auto mb-8" />
      <Skeleton className="h-40 w-full mx-auto" />
    </div>
  </div>
);

// Component that loads when it becomes visible in viewport
const LazyLoadOnVisible = ({ children, placeholder }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load component when it's 200px from viewport
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {isVisible ? children : placeholder}
    </div>
  );
};

const Index = () => {
  useEffect(() => {
    // Update page title for SEO
    document.title = "Libra Crédito | Empréstimo com Garantia de Imóvel | Home Equity";
    
    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Crédito com garantia de imóvel com as melhores taxas do mercado. Home Equity e empréstimo com garantia para consolidação de dívidas, capital de giro e mais.');
    }
    
    // Preload components that will be visible soon
    const preloadComponents = () => {
      import('@/components/Benefits').catch(() => {});
      import('@/components/Testimonials').catch(() => {});
    };
    
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadComponents, { timeout: 2000 });
    } else {
      setTimeout(preloadComponents, 1000);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        {/* Hero section is critical and should load first */}
        <Hero />
        
        {/* Lazy load below-the-fold content */}
        <LazyLoadOnVisible placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Benefits />
          </Suspense>
        </LazyLoadOnVisible>
        
        <LazyLoadOnVisible placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
        </LazyLoadOnVisible>
        
        <LazyLoadOnVisible placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <AgentChat />
          </Suspense>
        </LazyLoadOnVisible>
        
        <LazyLoadOnVisible placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <LoanSimulator />
          </Suspense>
        </LazyLoadOnVisible>
        
        <LazyLoadOnVisible placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>
        </LazyLoadOnVisible>
      </main>
      
      <LazyLoadOnVisible placeholder={<div className="h-20 bg-gray-100" />}>
        <Suspense fallback={<div className="h-20 bg-gray-100" />}>
          <Footer />
        </Suspense>
      </LazyLoadOnVisible>
    </div>
  );
};

export default Index;
