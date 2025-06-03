import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ImageOptimizer from '@/components/ImageOptimizer';

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | Libra Crédito | Dicas e Novidades sobre Crédito Imobiliário";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Fique por dentro das últimas novidades sobre crédito imobiliário, dicas financeiras e tendências do mercado.');
    }
  }, []);

  const artigos = [
    {
      id: 1,
      titulo: "Como funciona o crédito com garantia de imóvel?",
      resumo: "Entenda o passo a passo do processo de obtenção de crédito usando seu imóvel como garantia.",
      imagem: "/lovable-uploads/blog-credito-garantia.jpg",
      data: "15 de Março de 2024",
      autor: "Equipe Libra",
      destaque: true
    },
    {
      id: 2,
      titulo: "5 dicas para usar o crédito com inteligência",
      resumo: "Aprenda a utilizar o crédito de forma consciente e estratégica para alcançar seus objetivos.",
      imagem: "/lovable-uploads/blog-dicas-credito.jpg",
      data: "10 de Março de 2024",
      autor: "Equipe Libra"
    },
    {
      id: 3,
      titulo: "Investir ou quitar dívidas: o que fazer primeiro?",
      resumo: "Uma análise detalhada para ajudar você a tomar a melhor decisão financeira.",
      imagem: "/lovable-uploads/blog-investir-quitar.jpg",
      data: "5 de Março de 2024",
      autor: "Equipe Libra"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="page-section">
          <div className="container mx-auto">
            <h1 className="page-title">
              Blog Libra Crédito
            </h1>
            <p className="page-subtitle">
              Fique por dentro das últimas novidades sobre crédito imobiliário, dicas financeiras e tendências do mercado.
            </p>
          </div>
        </section>

        {/* Artigo em Destaque */}
        {artigos.filter(artigo => artigo.destaque).map(artigo => (
          <section key={artigo.id} className="page-section">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <ImageOptimizer
                    src={artigo.imagem}
                    alt={artigo.titulo}
                    className="rounded-lg shadow-xl"
                    aspectRatio={16/9}
                  />
                </div>
                <div>
                  <span className="text-libra-blue text-sm font-medium mb-2 block">Artigo em Destaque</span>
                  <h2 className="text-3xl font-bold text-libra-navy mb-4">{artigo.titulo}</h2>
                  <p className="text-gray-600 mb-4">{artigo.resumo}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span>{artigo.data}</span>
                    <span className="mx-2">•</span>
                    <span>{artigo.autor}</span>
                  </div>
                  <Button variant="goldContrast" size="lg">
                    Ler Artigo
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Lista de Artigos */}
        <section className="page-section bg-libra-light">
          <div className="container mx-auto">
            <h2 className="page-section-title">Artigos Recentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artigos.filter(artigo => !artigo.destaque).map(artigo => (
                <article key={artigo.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <ImageOptimizer
                    src={artigo.imagem}
                    alt={artigo.titulo}
                    className="w-full"
                    aspectRatio={16/9}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-libra-navy mb-3">{artigo.titulo}</h3>
                    <p className="text-gray-600 mb-4">{artigo.resumo}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>{artigo.data}</span>
                      <span className="mx-2">•</span>
                      <span>{artigo.autor}</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Ler Artigo
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
