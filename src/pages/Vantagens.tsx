import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingDown, Clock, Calculator, ShieldCheck, Wallet, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Vantagens: React.FC = () => {
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
      benefit: "Economia de até 90%"
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
      description: "Até 50% do valor do imóvel",
      benefit: "Realize grandes projetos"
    },
    {
      icon: ShieldCheck,
      title: "Aprovação Facilitada",
      description: "Análise personalizada",
      benefit: "Maior Flexibilidade"
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
      benefit: <a href="https://www.construtorastefani.com.br/" target="_blank" rel="noopener noreferrer" className="text-libra-blue hover:underline">Grupo Stéfani</a>
    }
  ];

  const taxasJuros = [
    {
      nome: "Libra Crédito",
      taxa: 1.19,
      destaque: true
    },
    {
      nome: "Crédito Consignado",
      taxa: 2.24,
      destaque: false
    },
    {
      nome: "Crédito Pessoal",
      taxa: 6.72,
      destaque: false
    },
    {
      nome: "Cheque Especial",
      taxa: 6.74,
      destaque: false
    },
    {
      nome: "Cartão de Crédito Rotativo",
      taxa: 14.84,
      destaque: false
    }
  ];

  const handleSimular = () => {
    navigate('/simulacao');
  };

  const maxTaxa = Math.max(...taxasJuros.map(item => item.taxa));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-header bg-gray-50">
        {/* Hero Section */}
        <section className="py-6 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-libra-navy text-center mb-2 md:mb-4">
              Vantagens do Crédito com Garantia
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto text-center">
              Descubra por que o crédito com garantia de imóvel é a melhor opção para realizar seus projetos com as melhores condições do mercado.
            </p>
          </div>
        </section>

        {/* Grid de Vantagens e Comparativo */}
        <section className="py-6 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Vantagens */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-4">
                  {vantagens.map((vantagem, index) => {
                    const Icon = vantagem.icon;
                    return (
                      <div key={index} className="bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2 md:mb-3">
                          <div className="bg-libra-blue/10 p-1.5 md:p-2 rounded-lg">
                            <Icon className="w-4 h-4 md:w-6 md:h-6 text-libra-blue" />
                          </div>
                          <h3 className="text-base md:text-lg font-bold text-libra-navy ml-2 md:ml-3">{vantagem.title}</h3>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 mb-1.5 md:mb-2">{vantagem.description}</p>
                        <div className="bg-libra-light rounded-lg p-1.5 md:p-2">
                          <p className="text-libra-navy font-medium text-xs md:text-sm">{vantagem.benefit}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comparativo de Taxas */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-libra-navy mb-2">Comparativo de Taxas de Juros</h2>
                  <p className="text-xs md:text-sm text-gray-500 mb-6 md:mb-8">Fonte: Dados abertos do BACEN - Janeiro 2025</p>
                  <div className="space-y-4 md:space-y-6">
                    {taxasJuros.map((item, index) => (
                      <div key={index} className="space-y-1.5 md:space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`font-medium text-sm md:text-base ${item.destaque ? 'text-libra-navy font-bold' : 'text-gray-700'}`}>
                            {item.nome}
                          </span>
                          <span className={`font-bold text-sm md:text-base ${item.destaque ? 'text-libra-navy' : 'text-gray-700'}`}>
                            {item.taxa.toFixed(2)}% a.m.
                          </span>
                        </div>
                        <Progress 
                          value={(item.taxa / maxTaxa) * 100} 
                          className={`h-3 md:h-4 rounded-full bg-gray-100 [&>div]:transition-all ${
                            item.destaque 
                              ? '[&>div]:bg-libra-navy' 
                              : '[&>div]:bg-red-400/70'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 md:py-12 bg-gradient-to-r from-libra-navy to-libra-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              Pronto para começar?
            </h2>
            <p className="text-base md:text-lg mb-4 md:mb-6 max-w-2xl mx-auto opacity-90">
              Faça uma simulação agora mesmo e descubra quanto você pode obter com seu imóvel como garantia.
            </p>
            <Button 
              onClick={handleSimular}
              variant="goldContrast" 
              size="xl"
              className="min-h-[40px] md:min-h-[48px] min-w-[180px] md:min-w-[200px] bg-white text-libra-navy hover:bg-white/90"
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
