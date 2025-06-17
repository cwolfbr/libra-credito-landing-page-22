import React, { useEffect, useState } from 'react';
import { Shield, MapPin, Award } from 'lucide-react';

const TrustBarMinimal: React.FC = () => {
  const [counters, setCounters] = useState({
    cities: 0,
    satisfaction: 0,
    years: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  // Animação de contador
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('trustbar');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targets = {
      cities: 3000,
      satisfaction: 98,
      years: 5
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        cities: Math.round(targets.cities * progress),
        satisfaction: Math.round(targets.satisfaction * progress),
        years: Math.round(targets.years * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const trustStats = [
    {
      icon: MapPin,
      value: counters.cities.toLocaleString('pt-BR'),
      suffix: '+',
      label: 'Cidades Atendidas'
    },
    {
      icon: Award,
      value: counters.satisfaction,
      suffix: '%',
      label: 'Satisfação'
    },
    {
      icon: Shield,
      value: counters.years,
      suffix: '+ anos',
      label: 'De Experiência'
    }
  ];

  return (
    <section 
      id="trustbar"
      className="py-12 bg-white relative"
    >
      <div className="container mx-auto px-4">
        {/* Grid de estatísticas minimalista */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustStats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-3 group"
            >
              {/* Ícone */}
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003399] to-[#00ccff] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-[#00ccff]/25 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Valor animado */}
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#003399]">
                  {stat.value}
                  <span className="text-[#00ccff] font-bold">
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-600 mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustBarMinimal;