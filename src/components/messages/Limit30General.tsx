import React from 'react';
import { Info, Calculator, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Limit30GeneralProps {
  cidade: string;
  valorSugerido: number;
  valorImovel: number;
  onAdjustValues: (novoEmprestimo: number) => void;
  onTryAgain: () => void;
}

/**
 * Componente para quando a cidade tem limite de 30% geral
 */
const Limit30General: React.FC<Limit30GeneralProps> = ({
  cidade,
  valorSugerido,
  valorImovel,
  onAdjustValues,
  onTryAgain
}) => {
  // CORRIGIDO: Calcular 30% do valor do IMÓVEL, não do empréstimo
  const valor30PercentImovel = Math.floor(valorImovel * 0.3);
  // Usar o valor sugerido da API se disponível, senão usar o cálculo
  const valorMaximoEmprestimo = valorSugerido || valor30PercentImovel;

  const handleAdjustClick = () => {
    // Ajustar o valor do EMPRÉSTIMO para o máximo permitido
    onAdjustValues(valorMaximoEmprestimo);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-full">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Limite Especial para {cidade}
          </h3>
          
          <div className="text-blue-800 text-sm mb-3">
            <p className="mb-2">
              Na cidade de <strong>{cidade}</strong>, o valor máximo de empréstimo 
              é limitado a <strong>30% do valor do imóvel</strong>.
            </p>
            
            <div className="bg-white rounded p-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Cálculo para seu imóvel:</span>
              </div>
              <div className="text-sm space-y-1">
                <div>Valor do imóvel: <strong>R$ {valorImovel.toLocaleString('pt-BR')}</strong></div>
                <div>Máximo para empréstimo (30%): <strong>R$ {valorMaximoEmprestimo.toLocaleString('pt-BR')}</strong></div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleAdjustClick}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              size="sm"
            >
              <Calculator className="w-4 h-4" />
              Ajustar para R$ {valorMaximoEmprestimo.toLocaleString('pt-BR')}
            </Button>
            
            <Button
              onClick={onTryAgain}
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
              size="sm"
            >
              Tentar Outra Cidade
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Limit30General;
