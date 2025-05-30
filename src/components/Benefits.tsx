
import React from 'react';
import { Shield, TrendingUp, Clock, Users, CheckCircle, Award } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Taxas Competitivas',
      description: 'A partir de 1,19% ao mês, as melhores condições do mercado',
      highlight: '1,19% a.m.',
      color: 'text-green-500'
    },
    {
      icon: Clock,
      title: 'Aprovação Rápida',
      description: 'Análise em até 24h com documentação simplificada',
      highlight: '24 horas',
      color: 'text-blue-500'
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description: 'Processo totalmente seguro e regulamentado pelo Banco Central',
      highlight: 'Regulamentado',
      color: 'text-libra-gold'
    },
    {
      icon: Users,
      title: 'Atendimento Especializado',
      description: 'Equipe dedicada para orientar você em cada etapa',
      highlight: 'Suporte VIP',
      color: 'text-purple-500'
    },
    {
      icon: CheckCircle,
      title: 'Sem Cobrança Prévia',
      description: 'Não cobramos nenhuma taxa até a liberação do seu crédito',
      highlight: 'Taxa Zero',
      color: 'text-emerald-500'
    },
    {
      icon: Award,
      title: 'Até 180 Meses',
      description: 'Prazo estendido para pagamento com parcelas que cabem no seu bolso',
      highlight: '15 anos',
      color: 'text-orange-500'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-white to-libra-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-libra-navy mb-6">
            Por que escolher a <span className="text-libra-gold">Libra?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 15 anos de experiência no mercado financeiro, oferecendo as melhores soluções em crédito com garantia de imóvel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-libra-light/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg mb-6 ${benefit.color}`}>
                  <benefit.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-libra-navy group-hover:text-libra-blue transition-colors">
                      {benefit.title}
                    </h3>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r from-libra-gold/20 to-libra-gold/10 ${benefit.color} border border-current/20`}>
                      {benefit.highlight}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-libra-gold to-libra-blue rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-libra-navy to-libra-blue rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-libra-gold mb-2">15+</div>
              <div className="text-sm md:text-base opacity-90">Anos de mercado</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-libra-gold mb-2">5.000+</div>
              <div className="text-sm md:text-base opacity-90">Clientes atendidos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-libra-gold mb-2">R$ 1B+</div>
              <div className="text-sm md:text-base opacity-90">Em crédito liberado</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-libra-gold mb-2">98%</div>
              <div className="text-sm md:text-base opacity-90">Satisfação dos clientes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
