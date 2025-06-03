import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { TrendingDown, Clock, Calculator, ShieldCheck, Wallet, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Vantagens = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Vantagens | Libra Crédito | Benefícios do Crédito com Garantia";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conheça as vantagens do crédito com garantia de imóvel: taxas mais baixas, prazos maiores e aprovação facilitada.');
    }
  }, []);

  const vantagens = [
    {
      icon: TrendingDown,
      title: "Menores Taxas",
      description: "Taxa a partir de 1,19% a.m. + IPCA",
      benefit: "Economia de até 70%"
    },
    {
      icon: Clock,
      title: "Prazo Estendido",
      description: "Até 180 meses para pagar",
      benefit: "Parcelas menores"
    },
    {
      icon: Calculator,
      title: "Valores Maiores",
      description: "Até 60% do valor do imóvel",
      benefit: "Realize grandes projetos"
    },
    {
      icon: ShieldCheck,
      title: "Aprovação Facilitada",
      description: "Análise simplificada",
      benefit: "Menos burocracia"
    },
    {
      icon: Wallet,
      title: "Uso Livre",
      description: "Dinheiro na conta",
      benefit: "Liberdade financeira"
    },
    {
      icon: BadgeCheck,
      title: "Credibilidade",
      description: "40 anos de mercado",
      benefit: "Grupo Stéfani"
    }
  ];

  const handleSimular = () => {
    navigate('/simulacao');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="page-section">
          <div className="container mx-auto">
            <h1 className="page-title">
              Vantagens do Crédito com Garantia
            </h1>
            <p className="page-subtitle">
              Descubra por que o crédito com garantia de imóvel é a melhor opção para realizar seus projetos com as melhores condições do mercado.
            </p>
          </div>
        </section>

        {/* Grid de Vantagens */}
        <section className="page-section">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vantagens.map((vantagem, index) => {
                const Icon = vantagem.icon;
                return (
                  <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-6">
                      <div className="bg-libra-blue/10 p-3 rounded-lg">
                        <Icon className="w-8 h-8 text-libra-blue" />
                      </div>
                      <h3 className="text-xl font-bold text-libra-navy ml-4">{vantagem.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{vantagem.description}</p>
                    <div className="bg-libra-light rounded-lg p-3">
                      <p className="text-libra-navy font-medium">{vantagem.benefit}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="page-section bg-libra-navy text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl text-libra-silver mb-8 max-w-2xl mx-auto">
              Faça uma simulação agora mesmo e descubra quanto você pode obter com seu imóvel como garantia.
            </p>
            <Button 
              onClick={handleSimular}
              variant="goldContrast" 
              size="xl"
              className="min-h-[48px] min-w-[200px]"
            >
              Simular Agora
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Vantagens;
