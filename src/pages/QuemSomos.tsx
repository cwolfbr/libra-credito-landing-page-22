
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageOptimizer from '@/components/ImageOptimizer';
import { Users, Target, Award, Shield } from 'lucide-react';

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
      icon: Shield,
      title: "Transparência",
      description: "Operamos com total clareza em todas as etapas do processo, sem taxas ocultas ou surpresas."
    },
    {
      icon: Users,
      title: "Atendimento Humanizado",
      description: "Cada cliente é único e merece um atendimento personalizado e respeitoso."
    },
    {
      icon: Target,
      title: "Foco no Cliente",
      description: "Todas as nossas decisões são tomadas pensando no melhor interesse do nosso cliente."
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Buscamos constantemente a melhoria dos nossos processos e serviços."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-libra-light to-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-libra-navy mb-6">
              Quem Somos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A Libra Crédito nasceu com o propósito de democratizar o acesso ao crédito com garantia de imóvel no Brasil, oferecendo soluções financeiras justas e transparentes.
            </p>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-6">
                  Nossa História
                </h2>
                <p className="text-gray-600 mb-6">
                  Fundada com a visão de transformar o mercado de crédito brasileiro, a Libra Crédito surgiu da necessidade de oferecer alternativas mais justas e acessíveis para quem possui um imóvel e precisa de recursos financeiros.
                </p>
                <p className="text-gray-600 mb-6">
                  Nossa plataforma digital revoluciona o processo tradicional, tornando-o mais ágil, transparente e eficiente. Conectamos clientes a instituições financeiras parceiras autorizadas pelo Banco Central, garantindo segurança e confiabilidade em todas as operações.
                </p>
                <p className="text-gray-600">
                  Hoje, somos referência no segmento de Home Equity, com milhares de clientes atendidos e milhões de reais em crédito liberado, sempre mantendo nosso compromisso com a transparência e excelência no atendimento.
                </p>
              </div>
              <div className="bg-libra-light p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-libra-navy mb-6">Nossos Números</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-libra-blue">5000+</p>
                    <p className="text-sm text-gray-600">Clientes Atendidos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-libra-blue">R$ 500M+</p>
                    <p className="text-sm text-gray-600">Crédito Liberado</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-libra-blue">98%</p>
                    <p className="text-sm text-gray-600">Satisfação dos Clientes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-libra-blue">24h</p>
                    <p className="text-sm text-gray-600">Tempo Médio de Análise</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagem da Equipe */}
            <div className="text-center mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-libra-navy mb-8">
                Nossa Equipe
              </h3>
              <div className="max-w-5xl mx-auto">
                <ImageOptimizer 
                  src="/lovable-uploads/0d3dbfe5-ac3f-4288-b736-f7e69ddc3722.png"
                  alt="Equipe da Libra Crédito reunida em frente ao escritório"
                  className="rounded-xl shadow-lg"
                  aspectRatio={16/9}
                />
                <p className="text-gray-600 mt-4 text-lg">
                  Nossa equipe dedicada trabalha todos os dias para oferecer o melhor atendimento e as melhores soluções em crédito com garantia de imóvel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="py-16 md:py-24 bg-libra-light">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-libra-navy mb-4">Missão</h3>
                <p className="text-gray-600">
                  Democratizar o acesso ao crédito com garantia de imóvel, oferecendo soluções financeiras justas, transparentes e eficientes para nossos clientes.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-libra-navy mb-4">Visão</h3>
                <p className="text-gray-600">
                  Ser a principal plataforma digital de empréstimo com garantia de imóvel do Brasil, reconhecida pela excelência e inovação.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-libra-navy mb-4">Propósito</h3>
                <p className="text-gray-600">
                  Transformar sonhos em realidade através do acesso facilitado ao crédito, respeitando sempre as necessidades individuais de cada cliente.
                </p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-12 text-center">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <section className="py-16 md:py-24">
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
