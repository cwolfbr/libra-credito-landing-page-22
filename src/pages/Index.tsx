
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import AgentChat from '@/components/AgentChat';
import LoanSimulator from '@/components/LoanSimulator';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Atualiza o título da página para SEO
    document.title = "Libra Crédito | Empréstimo com Garantia de Imóvel | Home Equity";
    
    // Adiciona meta description para SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Crédito com garantia de imóvel com as melhores taxas do mercado. Home Equity e empréstimo com garantia para consolidação de dívidas, capital de giro e mais.');
    }

    // Adicionar preload para os recursos críticos
    const preloadCriticalResources = () => {
      const head = document.head;
      
      // Preload para a imagem logo
      const logoPreload = document.createElement('link');
      logoPreload.rel = 'preload';
      logoPreload.as = 'image';
      logoPreload.href = '/lovable-uploads/75b290f8-4c51-45af-b45c-b737f5e1ca37.png';
      head.appendChild(logoPreload);
    };
    
    preloadCriticalResources();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Testimonials />
        <AgentChat />
        <LoanSimulator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
