import React, { useEffect, useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import WaveSeparator from '@/components/ui/WaveSeparator';
import { Button } from '@/components/ui/button';
import { TrendingDown, Clock, Calculator, ShieldCheck, Wallet, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Vantagens: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([]);

  // Dados das taxas de juros (movido para cima)
  const taxasJuros = [
    {
      nome: "Cartão de Crédito Rotativo",
      taxa: 14.84,
      destaque: false
    },
    {
      nome: "Cheque Especial",
      taxa: 6.74,
      destaque: false
    },
    {
      nome: "Crédito Pessoal",
      taxa: 6.72,
      destaque: false
    },
    {
      nome: "Crédito Consignado",
      taxa: 2.24,
      destaque: false
    },
    {
      nome: "Libra Crédito",
      taxa: 1.19,
      destaque: true
    }
  ];

  const maxTaxa = Math.max(...taxasJuros.map(item => item.taxa));

  useEffect(() => {
    document.title = "Vantagens | Libra Crédito | Benefícios do Crédito com Garantia";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conheça as vantagens do crédito com garantia de imóvel: taxas mais baixas, prazos maiores e aprovação facilitada.');
    }
  }, []);

  // Animação das barras da tabela
  useEffect(() => {
    if (!isTableVisible) return;

    // Inicializar valores em 0
    setAnimatedValues(new Array(taxasJuros.length).fill(0));

    // Animar cada barra sequencialmente
    taxasJuros.forEach((item, index) => {
      setTimeout(() => {
        const targetValue = (item.taxa / maxTaxa) * 100;
        let currentValue = 0;
        const increment = targetValue / 30; // 30 frames de animação
        
        const animationTimer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(animationTimer);
          }
          
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = currentValue;
            return newValues;
          });
        }, 30); // 30ms por frame
      }, index * 200); // Delay escalonado de 200ms entre cada barra
    });
  }, [isTableVisible, taxasJuros, maxTaxa]);

  // Observer para detectar quando a tabela entra na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTableVisible) {
          setIsTableVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    // Observar ambas as tabelas (desktop e mobile)
    const desktopTable = document.getElementById('comparison-table-desktop');
    const mobileTable = document.getElementById('comparison-table-mobile');
    
    if (desktopTable) observer.observe(desktopTable);
    if (mobileTable) observer.observe(mobileTable);

    return () => observer.disconnect();
  }, [isTableVisible]);

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

  const handleSimular = () => {
    navigate('/simulacao');
  };

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

              {/* Comparativo de Taxas - apenas desktop */}
              {!isMobile && (
                <div className="lg:col-span-7">
                  <div id="comparison-table-desktop" className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-libra-navy mb-2">Comparativo de Taxas de Juros</h2>
                    <p className="text-sm text-gray-500 mb-4">Fonte: Dados abertos do BACEN - Janeiro 2025</p>
                    <div className="space-y-3">
                      {taxasJuros.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className={`font-medium text-base ${item.destaque ? 'text-libra-navy font-bold' : 'text-gray-700'}`}>
                              {item.nome}
                            </span>
                            <span className={`font-bold text-base ${item.destaque ? 'text-libra-navy' : 'text-gray-700'}`}>
                              {item.taxa.toFixed(2)}% a.m.
                            </span>
                          </div>
                          <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ease-out ${
                                item.destaque 
                                  ? 'bg-libra-navy' 
                                  : 'bg-red-400/70'
                              }`}
                              style={{ width: `${animatedValues[index] || 0}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Ondas ao redor do comparativo - apenas mobile, fora do grid */}
        {isMobile && (
          <>
            <WaveSeparator variant="hero" height="md" />
            <div className="py-8" style={{ backgroundColor: '#003399' }}>
              <div className="container mx-auto px-4">
                <div id="comparison-table-mobile" className="bg-white rounded-lg shadow-lg p-4">
                  <h2 className="text-lg font-bold text-libra-navy mb-2">Comparativo de Taxas de Juros</h2>
                  <p className="text-sm text-gray-500 mb-4">Fonte: Dados abertos do BACEN - Janeiro 2025</p>
                  <div className="space-y-3">
                    {taxasJuros.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`font-medium text-sm ${item.destaque ? 'text-libra-navy font-bold' : 'text-gray-700'}`}>
                            {item.nome}
                          </span>
                          <span className={`font-bold text-sm ${item.destaque ? 'text-libra-navy' : 'text-gray-700'}`}>
                            {item.taxa.toFixed(2)}% a.m.
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ease-out ${
                              item.destaque 
                                ? 'bg-libra-navy' 
                                : 'bg-red-400/70'
                            }`}
                            style={{ width: `${animatedValues[index] || 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <WaveSeparator variant="hero" height="md" inverted />
          </>
        )}

        {/* CTA Section */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-libra-navy mb-4`}>
                Viu as vantagens? Hora de agir!
              </h2>
              <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 mb-6`}>
                Use nossa tecnologia inteligente para simular suas condições personalizadas
              </p>
              <Button 
                onClick={handleSimular}
                size="lg"
                className="bg-libra-blue text-white hover:bg-libra-navy font-semibold px-8 py-3 text-lg"
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
