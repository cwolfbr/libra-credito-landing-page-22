
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, TrendingDown, Clock, Shield, Calculator, Heart } from 'lucide-react';

const Vantagens = () => {
  useEffect(() => {
    document.title = "Vantagens | Libra Crédito | Empréstimo com Garantia de Imóvel";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Descubra todas as vantagens do empréstimo com garantia de imóvel da Libra Crédito: menores taxas, prazos maiores e mais flexibilidade.');
    }
  }, []);

  const vantagens = [
    {
      icon: TrendingDown,
      title: "Menores Taxas de Juros",
      description: "Taxa a partir de 1,09% ao mês + IPCA, muito mais baixa que empréstimos pessoais convencionais.",
      benefit: "Economia de até 70% nos juros"
    },
    {
      icon: Clock,
      title: "Prazos Estendidos",
      description: "Financiamento de até 180 meses (15 anos) para reduzir o valor das parcelas.",
      benefit: "Parcelas que cabem no seu orçamento"
    },
    {
      icon: Calculator,
      title: "Valores Altos",
      description: "Empréstimos de até 50% do valor do imóvel, chegando a milhões de reais.",
      benefit: "Até R$ 5 milhões disponíveis"
    },
    {
      icon: Shield,
      title: "Maior Segurança",
      description: "Operações regulamentadas pelo Banco Central através de instituições financeiras parceiras.",
      benefit: "Segurança jurídica garantida"
    },
    {
      icon: Heart,
      title: "Sem Comprovação de Renda",
      description: "Para alguns perfis, não é necessário comprovar renda, apenas a capacidade de pagamento.",
      benefit: "Processo mais simples e ágil"
    },
    {
      icon: CheckCircle,
      title: "Flexibilidade de Uso",
      description: "Use o dinheiro para qualquer finalidade: quitar dívidas, investir, reformar ou capital de giro.",
      benefit: "Total liberdade de uso"
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
              Vantagens do Empréstimo com Garantia de Imóvel
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Descubra por que milhares de brasileiros escolhem o home equity como a melhor opção para suas necessidades financeiras.
            </p>
          </div>
        </section>

        {/* Vantagens Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vantagens.map((vantagem, index) => {
                const IconComponent = vantagem.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-libra-blue/10 rounded-full mb-6 mx-auto">
                      <IconComponent className="w-8 h-8 text-libra-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-libra-navy mb-4 text-center">
                      {vantagem.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-center">
                      {vantagem.description}
                    </p>
                    <div className="bg-libra-gold/10 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-libra-navy text-center">
                        ✨ {vantagem.benefit}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparação */}
        <section className="py-16 md:py-24 bg-libra-light">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-12 text-center">
              Comparação com Outras Modalidades
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg">
                <thead className="bg-libra-navy text-white">
                  <tr>
                    <th className="p-4 text-left">Modalidade</th>
                    <th className="p-4 text-center">Taxa de Juros</th>
                    <th className="p-4 text-center">Prazo Máximo</th>
                    <th className="p-4 text-center">Valor Máximo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 bg-libra-gold/5">
                    <td className="p-4 font-semibold text-libra-navy">Home Equity (Libra)</td>
                    <td className="p-4 text-center text-green-600 font-semibold">1,09% a.m. + IPCA</td>
                    <td className="p-4 text-center text-green-600 font-semibold">180 meses</td>
                    <td className="p-4 text-center text-green-600 font-semibold">Até R$ 5 milhões</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4">Empréstimo Pessoal</td>
                    <td className="p-4 text-center text-red-600">3% a 15% a.m.</td>
                    <td className="p-4 text-center">60 meses</td>
                    <td className="p-4 text-center">Até R$ 300 mil</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4">Cartão de Crédito</td>
                    <td className="p-4 text-center text-red-600">10% a 20% a.m.</td>
                    <td className="p-4 text-center">12 meses</td>
                    <td className="p-4 text-center">Limitado ao limite</td>
                  </tr>
                  <tr>
                    <td className="p-4">Cheque Especial</td>
                    <td className="p-4 text-center text-red-600">8% a 12% a.m.</td>
                    <td className="p-4 text-center">30 dias</td>
                    <td className="p-4 text-center">Limitado ao limite</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Vantagens;
