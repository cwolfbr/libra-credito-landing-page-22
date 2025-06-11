import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageOptimizer from '@/components/ImageOptimizer';
import { Button } from '@/components/ui/button';
import { Users, Target, Award, Shield, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const QuemSomos = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = "Quem Somos | Libra Crédito | Nossa História e Missão";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conheça a Libra Crédito: nossa história, missão e valores. Especialistas em empréstimo com garantia de imóvel.');
    }
  }, []);

  const handleSimular = () => {
    navigate('/simulacao');
  };

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
      <main className="pt-header">
        {/* Hero Section - Compacto */}
        <section className="py-2 lg:py-3">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-libra-navy text-center mb-1 lg:mb-2">
              Quem Somos
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto text-center leading-tight">
              Fintech do Grupo Stéfani com 40+ anos criando oportunidades de crédito justo
            </p>
          </div>
        </section>

        {/* História + Valores Combinados - Compacto */}
        <section className="py-2 lg:py-3">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
              {/* Nossa História - Lado Esquerdo */}
              <div className="lg:col-span-5 space-y-2">
                <h2 className="text-lg lg:text-xl font-bold text-libra-navy mb-2">Nossa História</h2>
                <p className="text-sm lg:text-base text-gray-600 leading-tight">
                  Do <a href="https://www.construtorastefani.com.br/" target="_blank" rel="noopener noreferrer" className="text-libra-blue hover:text-libra-navy transition-colors">Grupo Stéfani</a> com 40+ anos no mercado imobiliário. 
                  <Link to="/vantagens" className="text-libra-blue hover:text-libra-navy transition-colors"> Veja as vantagens</Link> e 
                  <Link to="/simulacao" className="text-libra-blue hover:text-libra-navy transition-colors"> simule agora</Link>!
                </p>
                <div className="relative mt-2">
                  <ImageOptimizer
                    src="/images/media/timelibra.png"
                    alt="Time Libra Crédito"
                    className="rounded-lg shadow-lg"
                    aspectRatio={16/9}
                  />
                </div>
              </div>

              {/* Nossos Valores - Lado Direito */}
              <div className="lg:col-span-7">
                <h2 className="text-lg lg:text-xl font-bold text-libra-navy mb-2">Nossos Valores</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                  {valores.slice(0, 4).map((valor, index) => {
                    const Icon = valor.icon;
                    return (
                      <div key={index} className="bg-white p-2 lg:p-3 rounded-lg shadow-sm">
                        <div className="flex items-center mb-1">
                          <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-libra-blue mr-2" />
                          <h3 className="text-sm lg:text-base font-bold text-libra-navy">{valor.title}</h3>
                        </div>
                        <p className="text-xs lg:text-sm text-gray-600 leading-tight">{valor.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missão + CTA Combinados - Compacto */}
        <section className="py-2 lg:py-4 bg-[#00ccff] text-[#003399]">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-lg lg:text-xl font-bold mb-1 lg:mb-2">Nossa Missão</h2>
              <p className="text-sm lg:text-base mb-3 lg:mb-4 max-w-2xl mx-auto opacity-90 leading-tight">
                Democratizar o acesso ao crédito com soluções justas e transparentes para liberdade financeira
              </p>
              <Button 
                onClick={handleSimular}
                variant="goldContrast" 
                size={isMobile ? "default" : "lg"}
                className={`${isMobile ? 'min-h-[40px] min-w-[160px]' : 'min-h-[40px] lg:min-h-[44px] min-w-[160px] lg:min-w-[180px]'} bg-white text-libra-navy hover:bg-white/90`}
              >
                Simular Agora
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuemSomos;
