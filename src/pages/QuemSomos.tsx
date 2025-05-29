
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
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-libra-light to-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-libra-navy mb-6">
              Quem Somos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A Libra Crédito é uma fintech que nasceu para criar oportunidades de crédito justo, sustentável e equilibrado.
            </p>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-6">
                  Quem Somos
                </h2>
                <p className="text-gray-600 mb-6">
                  A Libra Crédito é uma fintech que nasceu para criar oportunidades de crédito justo, sustentável e equilibrado. Somos do Grupo Construtora Stéfani e agregamos em nossos serviços todo o know-how, experiência e solidez adquiridos ao longo de mais de 40 anos de história no mercado imobiliário.
                </p>
                <p className="text-gray-600 mb-6">
                  Buscamos evolução contínua, visando inovação e excelência em todos os serviços que oferecemos. Para isso, queremos, a cada dia, sermos melhores do que ontem.
                </p>
                <p className="text-gray-600 mb-6">
                  Prezamos por: transparência, cumprir o que prometemos, honestidade e humildade.
                </p>
                <p className="text-gray-600">
                  Acreditamos que com estes valores cumpriremos a nossa missão de melhorar a vida financeira dos brasileiros através da oferta de produtos que gerem valor para toda a sociedade.
                </p>
                <p className="text-libra-blue font-semibold mt-4">
                  Não deixe seus problemas serem maiores que os seus sonhos, vem que a gente equiLIBRA.
                </p>
              </div>

              {/* Imagem da Equipe */}
              <div>
                <ImageOptimizer 
                  src="/lovable-uploads/0d3dbfe5-ac3f-4288-b736-f7e69ddc3722.png"
                  alt="Equipe da Libra Crédito reunida em frente ao escritório"
                  className="rounded-xl shadow-lg"
                  aspectRatio={16/9}
                />
                <p className="text-gray-600 mt-4 text-center">
                  Nossa equipe dedicada trabalha todos os dias para oferecer o melhor atendimento e as melhores soluções em crédito com garantia de imóvel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-12 md:py-16 bg-libra-light">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-12 text-center">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valores.map((valor, index) => {
                const IconComponent = valor.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-libra-blue/10 rounded-full mb-4 mx-auto">
                      <IconComponent className="w-8 h-8 text-libra-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-libra-navy mb-3">{valor.title}</h3>
                    <p className="text-gray-600">{valor.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Regulamentação */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-8">
              Regulamentação e Segurança
            </h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <p className="text-gray-600 mb-6">
                A Libra Crédito opera em total conformidade com as regulamentações do Banco Central do Brasil. Todas as operações de empréstimo com garantia de imóvel são realizadas através de instituições financeiras parceiras devidamente autorizadas e regulamentadas.
              </p>
              <div className="bg-libra-light p-6 rounded-lg">
                <p className="text-sm text-libra-navy font-semibold">
                  <strong>CNPJ:</strong> 34.308.576/0001-32<br />
                  <strong>Endereço:</strong> Rua Eliseu Guilherme, 879, sala 01 – Jardim Sumaré, Ribeirão Preto – SP, 14025-020
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuemSomos;
