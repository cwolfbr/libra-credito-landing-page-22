import React, { useEffect } from 'react';
import MobileLayout from '@/components/MobileLayout';
import WaveSeparator from '@/components/ui/WaveSeparator';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { TrendingDown, Clock, Calculator, ShieldCheck, Wallet, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Vantagens: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
      description: "Grupo Stéfani - 40+ anos",
      benefit: <a href="https://www.construtorastefani.com.br/" target="_blank" rel="noopener noreferrer" className="text-libra-blue hover:underline">Tradição e confiança</a>
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
    <MobileLayout>
      {/* Faixa Separadora Superior Invertida - Exatamente como na home */}
      <WaveSeparator variant="hero" height={isMobile ? "sm" : "md"} inverted />
      
      <div className="bg-white">
        {/* Hero Section - Otimizado */}
        <section className={`${isMobile ? 'py-6' : 'py-8'}`}>
          <div className="container mx-auto px-4">
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-libra-navy text-center mb-3`}>
              Vantagens do Crédito com Garantia
            </h1>
            <p className={`${isMobile ? 'text-base px-2' : 'text-lg'} text-gray-600 max-w-3xl mx-auto text-center`}>
              As melhores condições do mercado para realizar seus projetos
            </p>
          </div>
        </section>

        {/* Grid de Vantagens e Comparativo */}
        <section className={`${isMobile ? 'pt-1 pb-4' : 'pt-1 pb-6'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
              {/* Vantagens */}
              <div className="lg:col-span-5">
                <div className={`grid grid-cols-2 sm:grid-cols-2 ${isMobile ? 'gap-3' : 'gap-4'}`}>
                  {vantagens.map((vantagem, index) => {
                    const Icon = vantagem.icon;
                    return (
                      <div key={index} className={`bg-white ${isMobile ? 'p-3' : 'p-4'} rounded-lg shadow-sm hover:shadow-md transition-shadow`}>
                        <div className={`flex items-center ${isMobile ? 'mb-2' : 'mb-3'}`}>
                          <div className={`bg-libra-blue/10 ${isMobile ? 'p-1.5' : 'p-2'} rounded-lg`}>
                            <Icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-libra-blue`} />
                          </div>
                          <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-libra-navy ml-2`}>{vantagem.title}</h3>
                        </div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 ${isMobile ? 'mb-2' : 'mb-3'}`}>{vantagem.description}</p>
                        <div className={`bg-libra-light rounded-lg ${isMobile ? 'p-2' : 'p-2'}`}>
                          <p className={`text-libra-navy font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>{vantagem.benefit}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comparativo de Taxas */}
              <div className="lg:col-span-7">
                <div className={`bg-white rounded-lg shadow-lg ${isMobile ? 'p-4' : 'p-6'}`}>
                  <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-libra-navy mb-2`}>Comparativo de Taxas de Juros</h2>
                  <p className={`${isMobile ? 'text-sm' : 'text-sm'} text-gray-500 ${isMobile ? 'mb-4' : 'mb-4'}`}>Fonte: Dados abertos do BACEN - Janeiro 2025</p>
                  <div className={`${isMobile ? 'space-y-3' : 'space-y-3'}`}>
                    {taxasJuros.map((item, index) => (
                      <div key={index} className={`${isMobile ? 'space-y-2' : 'space-y-2'}`}>
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${isMobile ? 'text-sm' : 'text-base'} ${item.destaque ? 'text-libra-navy font-bold' : 'text-gray-700'}`}>
                            {item.nome}
                          </span>
                          <span className={`font-bold ${isMobile ? 'text-sm' : 'text-base'} ${item.destaque ? 'text-libra-navy' : 'text-gray-700'}`}>
                            {item.taxa.toFixed(2)}% a.m.
                          </span>
                        </div>
                        <Progress 
                          value={(item.taxa / maxTaxa) * 100} 
                          className={`${isMobile ? 'h-2' : 'h-3'} rounded-full bg-gray-100 [&>div]:transition-all ${
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
        <section className="py-12 bg-libra-blue">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-4`}>
                Viu as vantagens? Hora de agir!
              </h2>
              <p className={`${isMobile ? 'text-base' : 'text-lg'} text-white/90 mb-6`}>
                Use nossa tecnologia inteligente para simular suas condições personalizadas
              </p>
              <Button 
                onClick={handleSimular}
                size="lg"
                className="bg-white text-libra-blue hover:bg-gray-50 font-semibold px-8 py-3 text-lg"
              >
                Simular Agora
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MobileLayout>
  );
};

export default Vantagens;
