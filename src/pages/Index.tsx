
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Testimonials />
        <LoanSimulator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
