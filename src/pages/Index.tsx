
import React, { useEffect, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load components that are below the fold
const Hero = React.lazy(() => import('@/components/Hero'));
const Benefits = React.lazy(() => import('@/components/Benefits'));
const Testimonials = React.lazy(() => import('@/components/Testimonials'));
const AgentChat = React.lazy(() => import('@/components/AgentChat'));
const LoanSimulator = React.lazy(() => import('@/components/LoanSimulator'));
const ContactSection = React.lazy(() => import('@/components/ContactSection'));
const Footer = React.lazy(() => import('@/components/Footer'));

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

const Index = () => {
  useEffect(() => {
    // Update page title for SEO
    document.title = "Libra Crédito | Empréstimo com Garantia de Imóvel | Home Equity";
    
    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Crédito com garantia de imóvel com as melhores taxas do mercado. Home Equity e empréstimo com garantia para consolidação de dívidas, capital de giro e mais.');
    }
    
    // Preload critical sections
    const preloadComponents = () => {
      // Preload components that will be needed soon
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
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
        
        {/* Use IntersectionObserver-based loading via Suspense for below-the-fold content */}
        <Suspense fallback={<SectionLoader />}>
          <Benefits />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AgentChat />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <LoanSimulator />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="h-20 bg-gray-100" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
