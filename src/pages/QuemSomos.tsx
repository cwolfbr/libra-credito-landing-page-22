import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageOptimizer from '@/components/ImageOptimizer';
import { Users, Target, Award, Shield, TrendingUp } from 'lucide-react';

const QuemSomos = () => {
  useEffect(() => {
    document.title = "Quem Somos | Libra Crédito | Nossa História e Missão";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conheça a Libra Crédito: nossa história, missão e valores. Especialistas em empréstimo com garantia de imóvel.');
    }
  }, []);

  const valores = [
    {
      icon: TrendingUp,
      title: "Ser Melhor que Ontem",
      description: "Buscamos evolução contínua, visando inovação e excelência em todos os serviços que oferecemos."
    },
    {
      icon: Shield,
      title: "Honestidade",
      description: "Operamos com total honestidade e transparência em todas as nossas relações."
    },
    {
      icon: Target,
      title: "Cumprir o que Prometer",
      description: "Nossa palavra é nossa garantia. Cumprimos rigorosamente todos os nossos compromissos."
    },
    {
      icon: Users,
      title: "Humildade",
      description: "Mantemos a humildade como base de nossas relações e crescimento contínuo."
    },
    {
      icon: Award,
      title: "Orgulho de Pertencer",
      description: "Temos orgulho de fazer parte do Grupo Construtora Stéfani e de nossa trajetória."
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
              Quem Somos
            </h1>
            <p className="page-subtitle">
              A Libra Crédito é uma fintech que nasceu para criar oportunidades de crédito justo, sustentável e equilibrado.
            </p>
          </div>
        </section>

        {/* Nossa História */}
        <section className="page-section">
          <div className="container mx-auto">
            <h2 className="page-section-title">Nossa História</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-600 mb-6">
                  Nascemos da visão de transformar o mercado de crédito no Brasil, tornando-o mais acessível e justo para todos.
                </p>
                <p className="text-lg text-gray-600">
                  Com anos de experiência no mercado imobiliário através do Grupo Construtora Stéfani, identificamos a necessidade de oferecer soluções de crédito mais flexíveis e transparentes.
                </p>
              </div>
              <div className="relative">
                <ImageOptimizer
                  src="/images/media/quem-somos-historia.jpg"
                  alt="História da Libra Crédito"
                  className="rounded-lg shadow-xl"
                  aspectRatio={16/9}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="page-section bg-gray-50">
          <div className="container mx-auto">
            <h2 className="page-section-title">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valores.map((valor, index) => {
                const Icon = valor.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <Icon className="w-8 h-8 text-libra-blue mr-3" />
                      <h3 className="text-xl font-bold text-libra-navy">{valor.title}</h3>
                    </div>
                    <p className="text-gray-600">{valor.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Nossa Missão */}
        <section className="page-section">
          <div className="container mx-auto">
            <h2 className="page-section-title">Nossa Missão</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-gray-600 leading-relaxed">
                Democratizar o acesso ao crédito no Brasil, oferecendo soluções financeiras justas e transparentes que ajudem nossos clientes a realizarem seus sonhos e alcançarem a liberdade financeira.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuemSomos;
