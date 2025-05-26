
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Handshake, Shield, Award, Users } from 'lucide-react';

const Parceiros = () => {
  useEffect(() => {
    document.title = "Parceiros | Libra Crédito | Rede de Instituições Financeiras";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conheça nossa rede de parceiros: instituições financeiras autorizadas pelo Banco Central que garantem segurança e as melhores condições.');
    }
  }, []);

  const parceiros = [
    {
      nome: "Banco Pine",
      descricao: "Especialista em crédito imobiliário com soluções inovadoras para pessoas físicas e jurídicas.",
      categoria: "Banco de Investimento"
    },
    {
      nome: "Creditas",
      descricao: "Fintech líder em empréstimos com garantia de veículos e imóveis no Brasil.",
      categoria: "Fintech"
    },
    {
      nome: "Banco BMG",
      descricao: "Banco com ampla experiência em crédito pessoal e soluções financeiras diversificadas.",
      categoria: "Banco Múltiplo"
    },
    {
      nome: "Banco BV",
      descricao: "Instituição focada em soluções de crédito e financiamento para diversos segmentos.",
      categoria: "Banco Múltiplo"
    },
    {
      nome: "Itaú Unibanco",
      descricao: "Um dos maiores bancos do Brasil, oferecendo soluções completas em crédito imobiliário.",
      categoria: "Banco Múltiplo"
    },
    {
      nome: "Banco Safra",
      descricao: "Banco tradicional com forte atuação em crédito especializado e soluções personalizadas.",
      categoria: "Banco Múltiplo"
    }
  ];

  const beneficios = [
    {
      icon: Shield,
      titulo: "Segurança Garantida",
      descricao: "Todos os nossos parceiros são instituições financeiras autorizadas e regulamentadas pelo Banco Central do Brasil."
    },
    {
      icon: Award,
      titulo: "Melhores Condições",
      descricao: "Nossa rede de parceiros permite oferecermos as melhores taxas e condições do mercado para nossos clientes."
    },
    {
      icon: Users,
      titulo: "Diversidade de Opções",
      descricao: "Com múltiplos parceiros, conseguimos atender diferentes perfis e necessidades de crédito."
    },
    {
      icon: Handshake,
      titulo: "Relacionamento de Confiança",
      descricao: "Mantemos relacionamentos sólidos e de longa data com instituições renomadas do mercado financeiro."
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
              Nossos Parceiros
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trabalhamos com uma rede selecionada de instituições financeiras autorizadas pelo Banco Central, garantindo segurança e as melhores condições para nossos clientes.
            </p>
          </div>
        </section>

        {/* Benefícios da Parceria */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-12 text-center">
              Por que Trabalhamos com Parceiros
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {beneficios.map((beneficio, index) => {
                const IconComponent = beneficio.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-libra-blue/10 rounded-full mb-6 mx-auto">
                      <IconComponent className="w-10 h-10 text-libra-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-libra-navy mb-4">{beneficio.titulo}</h3>
                    <p className="text-gray-600">{beneficio.descricao}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lista de Parceiros */}
        <section className="py-16 md:py-24 bg-libra-light">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-12 text-center">
              Instituições Parceiras
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {parceiros.map((parceiro, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="mb-4">
                    <span className="bg-libra-blue/10 text-libra-blue px-3 py-1 rounded-full text-sm font-medium">
                      {parceiro.categoria}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-libra-navy mb-4">{parceiro.nome}</h3>
                  <p className="text-gray-600">{parceiro.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-12 text-center">
              Como Funciona a Parceria
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-libra-blue text-white rounded-full font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-libra-navy mb-2">Análise do Perfil</h3>
                      <p className="text-gray-600">Analisamos seu perfil e necessidades para identificar o parceiro ideal para sua situação.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-libra-blue text-white rounded-full font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-libra-navy mb-2">Seleção do Parceiro</h3>
                      <p className="text-gray-600">Direcionamos sua solicitação para a instituição financeira que oferece as melhores condições.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-libra-blue text-white rounded-full font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-libra-navy mb-2">Acompanhamento</h3>
                      <p className="text-gray-600">Acompanhamos todo o processo até a liberação do crédito, garantindo transparência total.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-libra-navy p-8 rounded-xl text-white">
                <h3 className="text-2xl font-bold mb-6">Vantagens da Nossa Rede</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-libra-gold rounded-full"></div>
                    <span>Taxas competitivas negociadas especialmente</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-libra-gold rounded-full"></div>
                    <span>Processo de aprovação otimizado</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-libra-gold rounded-full"></div>
                    <span>Suporte especializado da Libra Crédito</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-libra-gold rounded-full"></div>
                    <span>Segurança jurídica garantida</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-libra-gold rounded-full"></div>
                    <span>Transparência em todas as etapas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-libra-blue to-libra-navy">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Quer Fazer Parte da Nossa Rede?
            </h2>
            <p className="text-libra-silver mb-8 max-w-3xl mx-auto">
              Se sua instituição financeira tem interesse em fazer parte da nossa rede de parceiros, entre em contato conosco para conhecer nossas condições de parceria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-libra-gold text-black px-8 py-4 rounded-lg font-semibold hover:bg-libra-gold/90 transition-colors">
                Seja um Parceiro
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-libra-navy transition-colors">
                Fale Conosco
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Parceiros;
