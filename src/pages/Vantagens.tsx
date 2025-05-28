
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, TrendingDown, Clock, Shield, Calculator, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
      title: "Menores Taxas",
      description: "Taxa a partir de 1,09% a.m. + IPCA",
      benefit: "Economia de até 70%"
    },
    {
      icon: Clock,
      title: "Prazos Estendidos",
      description: "Até 180 meses (15 anos)",
      benefit: "Parcelas menores"
    },
    {
      icon: Calculator,
      title: "Valores Altos",
      description: "Até 50% do valor do imóvel",
      benefit: "Até R$ 5 milhões"
    },
    {
      icon: Shield,
      title: "Maior Segurança",
      description: "Regulamentado pelo Bacen",
      benefit: "Segurança garantida"
    },
    {
      icon: Heart,
      title: "Sem Comprovação",
      description: "Renda não obrigatória",
      benefit: "Processo ágil"
    },
    {
      icon: CheckCircle,
      title: "Total Flexibilidade",
      description: "Use para qualquer finalidade",
      benefit: "Liberdade total"
    }
  ];

  const comparacaoData = [
    {
      modalidade: "Home Equity (Libra)",
      taxa: "1,09% a.m. + IPCA",
      prazo: "180 meses",
      valor: "Até R$ 5MM",
      destaque: true
    },
    {
      modalidade: "Empréstimo Pessoal",
      taxa: "3% a 15% a.m.",
      prazo: "60 meses",
      valor: "Até R$ 300k",
      destaque: false
    },
    {
      modalidade: "Cartão de Crédito",
      taxa: "10% a 20% a.m.",
      prazo: "12 meses",
      valor: "Limitado",
      destaque: false
    },
    {
      modalidade: "Cheque Especial",
      taxa: "8% a 12% a.m.",
      prazo: "30 dias",
      valor: "Limitado",
      destaque: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-24">
        {/* Hero Section - Mais compacto no mobile */}
        <section className="py-8 md:py-16 bg-gradient-to-b from-libra-light to-white">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-2xl md:text-5xl font-bold text-libra-navy mb-3 md:mb-6">
              Vantagens do Home Equity
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 md:mb-8">
              As melhores condições do mercado para suas necessidades financeiras.
            </p>
          </div>
        </section>

        {/* Vantagens Grid - Layout compacto para mobile */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            {/* Mobile: Grid 2x3 compacto */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
              {vantagens.map((vantagem, index) => {
                const IconComponent = vantagem.icon;
                return (
                  <Card key={index} className="p-3 md:p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0 text-center">
                      <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-libra-blue/10 rounded-full mb-2 md:mb-4 mx-auto">
                        <IconComponent className="w-4 h-4 md:w-6 md:h-6 text-libra-blue" />
                      </div>
                      <h3 className="text-xs md:text-lg font-bold text-libra-navy mb-1 md:mb-3">
                        {vantagem.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 leading-tight">
                        {vantagem.description}
                      </p>
                      <div className="bg-libra-gold/10 p-1 md:p-2 rounded text-xs md:text-sm">
                        <p className="font-semibold text-libra-navy">
                          ✨ {vantagem.benefit}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparação - Layout cards para mobile */}
        <section className="py-8 md:py-16 bg-libra-light">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-4xl font-bold text-libra-navy mb-6 md:mb-12 text-center">
              Comparação com Outras Modalidades
            </h2>
            
            {/* Mobile: Cards empilhados */}
            <div className="md:hidden space-y-3">
              {comparacaoData.map((item, index) => (
                <Card key={index} className={`p-4 ${item.destaque ? 'bg-libra-gold/10 border-libra-gold' : 'bg-white'}`}>
                  <CardContent className="p-0">
                    <h3 className={`font-bold mb-3 ${item.destaque ? 'text-libra-navy' : 'text-gray-700'}`}>
                      {item.modalidade}
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Taxa de Juros</p>
                        <p className={`font-semibold ${item.destaque ? 'text-green-600' : 'text-red-600'}`}>
                          {item.taxa}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Prazo Máximo</p>
                        <p className={`font-semibold ${item.destaque ? 'text-green-600' : 'text-gray-700'}`}>
                          {item.prazo}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Valor Máximo</p>
                        <p className={`font-semibold ${item.destaque ? 'text-green-600' : 'text-gray-700'}`}>
                          {item.valor}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop: Tabela tradicional */}
            <div className="hidden md:block">
              <Table className="bg-white rounded-xl shadow-lg">
                <TableHeader>
                  <TableRow className="bg-libra-navy">
                    <TableHead className="text-white font-semibold">Modalidade</TableHead>
                    <TableHead className="text-white font-semibold text-center">Taxa de Juros</TableHead>
                    <TableHead className="text-white font-semibold text-center">Prazo Máximo</TableHead>
                    <TableHead className="text-white font-semibold text-center">Valor Máximo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparacaoData.map((item, index) => (
                    <TableRow key={index} className={item.destaque ? 'bg-libra-gold/5' : ''}>
                      <TableCell className={`font-semibold ${item.destaque ? 'text-libra-navy' : 'text-gray-700'}`}>
                        {item.modalidade}
                      </TableCell>
                      <TableCell className={`text-center font-semibold ${item.destaque ? 'text-green-600' : 'text-red-600'}`}>
                        {item.taxa}
                      </TableCell>
                      <TableCell className={`text-center font-semibold ${item.destaque ? 'text-green-600' : 'text-gray-700'}`}>
                        {item.prazo}
                      </TableCell>
                      <TableCell className={`text-center font-semibold ${item.destaque ? 'text-green-600' : 'text-gray-700'}`}>
                        {item.valor}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Vantagens;
