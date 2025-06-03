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
      imagem: "/images/media/blog-credito-garantia.jpg",
      data: "15 de Março de 2024",
      autor: "Equipe Libra",
      destaque: true
    },
    {
      id: 2,
      titulo: "5 dicas para usar o crédito com inteligência",
      resumo: "Aprenda a utilizar o crédito de forma consciente e estratégica para alcançar seus objetivos.",
      imagem: "/images/media/blog-dicas-credito.jpg",
      data: "10 de Março de 2024",
      autor: "Equipe Libra"
    },
    {
      id: 3,
      titulo: "Investir ou quitar dívidas: o que fazer primeiro?",
      resumo: "Uma análise detalhada para ajudar você a tomar a melhor decisão financeira.",
      imagem: "/images/media/blog-investir-quitar.jpg",
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
              Conteúdo relevante sobre finanças, crédito e mercado imobiliário
            </p>
          </div>
        </section>

        {/* Artigo em Destaque */}
        {artigos.find(artigo => artigo.destaque) && (
          <section className="page-section bg-gray-50">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
                  <ImageOptimizer
                    src={artigos.find(artigo => artigo.destaque)?.imagem || ''}
                    alt={artigos.find(artigo => artigo.destaque)?.titulo || ''}
                    className="object-cover"
                    aspectRatio={16/9}
                  />
                </div>
                <div>
                  <span className="text-sm text-libra-blue font-medium">Em destaque</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-libra-navy mt-2 mb-4">
                    {artigos.find(artigo => artigo.destaque)?.titulo}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {artigos.find(artigo => artigo.destaque)?.resumo}
                  </p>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="text-libra-navy border-libra-navy hover:bg-libra-navy hover:text-white">
                      Ler mais
                    </Button>
                    <div className="text-sm text-gray-500">
                      <p>{artigos.find(artigo => artigo.destaque)?.data}</p>
                      <p>{artigos.find(artigo => artigo.destaque)?.autor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Lista de Artigos */}
        <section className="page-section">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artigos.filter(artigo => !artigo.destaque).map(artigo => (
                <article key={artigo.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <ImageOptimizer
                      src={artigo.imagem}
                      alt={artigo.titulo}
                      className="object-cover"
                      aspectRatio={16/9}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-libra-navy mb-2">
                      {artigo.titulo}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {artigo.resumo}
                    </p>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" className="text-libra-navy border-libra-navy hover:bg-libra-navy hover:text-white">
                        Ler mais
                      </Button>
                      <div className="text-sm text-gray-500 text-right">
                        <p>{artigo.data}</p>
                        <p>{artigo.autor}</p>
                      </div>
                    </div>
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
