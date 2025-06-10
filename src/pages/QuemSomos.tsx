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
        {/* Hero Section */}
        <section className="py-4 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-libra-navy text-center mb-2 md:mb-4">
              Quem Somos
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto text-center">
              A Libra Crédito é uma fintech que nasceu para criar oportunidades de crédito justo, sustentável e equilibrado.
            </p>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-4 md:py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-libra-navy text-center mb-4 md:mb-8">Nossa História</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
              <div className="space-y-4">
                <p className="text-base md:text-lg text-gray-600">
                  Somos do <a href="https://www.construtorastefani.com.br/" target="_blank" rel="noopener noreferrer" className="text-libra-blue hover:text-libra-navy transition-colors">Grupo Construtora Stéfani</a> e agregamos em nossos serviços todo o know-how, experiência e solidez adquiridos ao longo de mais de 40 anos de história no mercado imobiliário.
                </p>
                <p className="text-base md:text-lg text-gray-600">
                  Clique aqui e entenda as <Link to="/vantagens" className="text-libra-blue hover:text-libra-navy transition-colors">vantagens</Link> que oferecemos para equiLIBRAr a sua vida financeira.
                </p>
                <p className="text-base md:text-lg text-gray-600">
                  Faça uma <Link to="/simulacao" className="text-libra-blue hover:text-libra-navy transition-colors">simulação</Link> e fale com um consultor!
                </p>
              </div>
              <div className="relative">
              <ImageOptimizer
                  src="/images/media/timelibra.png"
                  alt="Time Libra Crédito"
                  className="rounded-lg shadow-xl"
                  aspectRatio={16/9}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="py-4 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-libra-navy text-center mb-4 md:mb-8">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {valores.map((valor, index) => {
                const Icon = valor.icon;
                return (
                  <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-3 md:mb-4">
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-libra-blue mr-2 md:mr-3" />
                      <h3 className="text-lg md:text-xl font-bold text-libra-navy">{valor.title}</h3>
                    </div>
                    <p className="text-sm md:text-base text-gray-600">{valor.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Imagem Institucional */}
        <section className="py-4 md:py-12">
          <div className="container mx-auto px-4">
            <div className="relative w-full max-w-3xl mx-auto">
              <ImageOptimizer
                src="/images/media/quemsomos.png"
                alt="Libra Crédito - Quem Somos"
                className="rounded-xl shadow-lg w-full"
                aspectRatio={16/9}
              />
            </div>
          </div>
        </section>

        {/* Nossa Missão */}
        <section className="py-4 md:py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-libra-navy text-center mb-4 md:mb-8">Nossa Missão</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                Democratizar o acesso ao crédito no Brasil, oferecendo soluções financeiras justas e transparentes que ajudem nossos clientes a realizarem seus sonhos e alcançarem a liberdade financeira.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`${isMobile ? 'py-6' : 'py-8 md:py-12'} bg-[#00ccff] text-[#003399]`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-3 md:mb-4`}>
              Pronto para começar?
            </h2>
            <p className={`${isMobile ? 'text-sm px-2' : 'text-base md:text-lg'} mb-4 md:mb-6 max-w-2xl mx-auto opacity-80`}>
              Faça uma simulação agora mesmo e descubra quanto você pode obter com seu imóvel como garantia.
            </p>
            <Button 
              onClick={handleSimular}
              variant="goldContrast" 
              size={isMobile ? "default" : "xl"}
              className={`${isMobile ? 'min-h-[40px] min-w-[160px]' : 'min-h-[40px] md:min-h-[48px] min-w-[180px] md:min-w-[200px]'} bg-white text-libra-navy hover:bg-white/90`}
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

export default QuemSomos;
