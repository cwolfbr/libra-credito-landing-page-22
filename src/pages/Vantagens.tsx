import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModernCTA from '@/components/ModernCTA';
import WaveSeparator from '@/components/ui/WaveSeparator';
import { Progress } from '@/components/ui/progress';
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
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Faixa de waves azul definitiva */}
      <div className="w-full h-32 bg-[#003399] relative overflow-hidden">
        <svg
          className="absolute left-0 w-full bottom-0"
          style={{ height: '128px' }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="#ffffff"
        >
          <path
            style={{ opacity: 0.25 }}
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          />
          <path
            style={{ opacity: 0.5 }}
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          />
          <path
            style={{ opacity: 1 }}
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          />
        </svg>
      </div>
      <main className="bg-gray-50">
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
        <section className={`${isMobile ? 'py-4' : 'py-6'}`}>
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

        <ModernCTA 
          onSimulate={handleSimular}
          title="Viu as vantagens? Hora de agir!"
          subtitle="Use nossa tecnologia inteligente para simular suas condições personalizadas"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Vantagens;
