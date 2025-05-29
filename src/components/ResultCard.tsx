
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface ResultCardProps {
  valor: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ valor }) => {
  const valorFormatado = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return (
    <Card className="mt-6 bg-gradient-to-r from-libra-blue to-libra-navy shadow-xl">
      <CardContent className="p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
          <h3 className="text-xl font-bold text-white">
            Simulação Realizada!
          </h3>
        </div>
        
        <div className="bg-white rounded-lg p-4 inline-block">
          <p className="text-sm text-gray-600 mb-1">Primeira parcela:</p>
          <p className="text-3xl font-bold text-libra-navy">
            {valorFormatado}
          </p>
        </div>
        
        <p className="text-white/90 text-sm mt-4">
          *Valores sujeitos à análise de crédito e avaliação do imóvel
        </p>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
