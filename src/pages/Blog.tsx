
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | Libra Crédito | Dicas e Informações Financeiras";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Fique por dentro das últimas novidades sobre crédito imobiliário, dicas financeiras e tendências do mercado no blog da Libra Crédito.');
    }
  }, []);

  const artigos = [
    {
      id: 1,
      titulo: "Home Equity: O que é e como funciona o empréstimo com garantia de imóvel",
      resumo: "Entenda todos os detalhes sobre o empréstimo com garantia de imóvel e como ele pode ser a solução para suas necessidades financeiras.",
      autor: "Equipe Libra",
      data: "15 de Maio, 2024",
      categoria: "Educação Financeira",
      imagem: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      destaque: true
    },
    {
      id: 2,
      titulo: "Como usar o home equity para quitar dívidas caras",
      resumo: "Descubra como o empréstimo com garantia de imóvel pode ajudar você a se livrar das dívidas do cartão de crédito e cheque especial.",
      autor: "Maria Silva",
      data: "10 de Maio, 2024",
      categoria: "Dicas",
      imagem: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      titulo: "Investindo em imóveis com recursos do home equity",
      resumo: "Saiba como usar o dinheiro do empréstimo com garantia para expandir seu patrimônio imobiliário de forma inteligente.",
      autor: "João Santos",
      data: "5 de Maio, 2024",
      categoria: "Investimentos",
      imagem: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      titulo: "Taxa Selic em queda: oportunidade para o home equity",
      resumo: "Analise como a redução da taxa básica de juros impacta nas condições dos empréstimos com garantia de imóvel.",
      autor: "Ana Costa",
      data: "1 de Maio, 2024",
      categoria: "Mercado",
      imagem: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
    },
    {
      id: 5,
      titulo: "Documentação necessária para o empréstimo com garantia",
      resumo: "Lista completa dos documentos que você precisa ter em mãos para solicitar seu empréstimo com garantia de imóvel.",
      autor: "Carlos Oliveira",
      data: "28 de Abril, 2024",
      categoria: "Guias",
      imagem: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop"
    },
    {
      id: 6,
      titulo: "Capital de giro: como o home equity pode ajudar sua empresa",
      resumo: "Entenda como empresários podem usar o empréstimo com garantia de imóvel para financiar o crescimento do negócio.",
      autor: "Equipe Libra",
      data: "25 de Abril, 2024",
      categoria: "Negócios",
      imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
    }
  ];

  const categorias = ["Todas", "Educação Financeira", "Dicas", "Investimentos", "Mercado", "Guias", "Negócios"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-libra-light to-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-libra-navy mb-6">
              Blog Libra Crédito
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fique por dentro das últimas novidades sobre crédito imobiliário, dicas financeiras e tendências do mercado.
            </p>
          </div>
        </section>

        {/* Artigo em Destaque */}
        {artigos.filter(artigo => artigo.destaque).map(artigo => (
          <section key={artigo.id} className="py-16 md:py-24">
            <div className="container mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative">
                    <img 
                      src={artigo.imagem} 
                      alt={artigo.titulo}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-libra-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                        Destaque
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-libra-blue/10 text-libra-blue px-3 py-1 rounded-full text-sm font-medium">
                        {artigo.categoria}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-libra-navy mb-4">
                      {artigo.titulo}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {artigo.resumo}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {artigo.autor}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {artigo.data}
                        </div>
                      </div>
                      <button className="flex items-center gap-2 text-libra-blue hover:text-libra-navy transition-colors font-semibold">
                        Ler mais
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Filtros */}
        <section className="py-8 bg-libra-light">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {categorias.map(categoria => (
                <button
                  key={categoria}
                  className="px-4 py-2 rounded-full border border-libra-blue text-libra-blue hover:bg-libra-blue hover:text-white transition-colors"
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid de Artigos */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artigos.filter(artigo => !artigo.destaque).map(artigo => (
                <article key={artigo.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img 
                      src={artigo.imagem} 
                      alt={artigo.titulo}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-libra-blue/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {artigo.categoria}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-libra-navy mb-3 line-clamp-2">
                      {artigo.titulo}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {artigo.resumo}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {artigo.autor}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {artigo.data}
                        </div>
                      </div>
                      <button className="text-libra-blue hover:text-libra-navy transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 md:py-24 bg-libra-navy">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Receba nossos conteúdos em primeira mão
            </h2>
            <p className="text-libra-silver mb-8 max-w-2xl mx-auto">
              Assine nossa newsletter e fique por dentro das últimas novidades sobre crédito imobiliário e dicas financeiras.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-libra-gold"
              />
              <button className="bg-libra-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-libra-gold/90 transition-colors">
                Assinar
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
