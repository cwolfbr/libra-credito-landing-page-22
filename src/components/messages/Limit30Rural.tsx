import React, { useState } from 'react';
import { Wheat, Calculator, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Limit30RuralProps {
  cidade: string;
  valorSugerido: number;
  valorImovel: number;
  onAdjustValues: (novoEmprestimo: number, isRural: boolean) => void;
  onTryAgain: () => void;
}

/**
 * Componente para quando a cidade aceita apenas imóveis rurais com limite 30%
 */
const Limit30Rural: React.FC<Limit30RuralProps> = ({
  cidade,
  valorSugerido,
  valorImovel,
  onAdjustValues,
  onTryAgain
}) => {
  const [isRuralConfirmed, setIsRuralConfirmed] = useState(false);
  
  // CORRIGIDO: Calcular 30% do valor do IMÓVEL, não do empréstimo
  const valor30PercentImovel = Math.floor(valorImovel * 0.3);
  // Usar o valor sugerido da API se disponível, senão usar o cálculo
  const valorMaximoEmprestimo = valorSugerido || valor30PercentImovel;

  const handleAdjustClick = () => {
    if (isRuralConfirmed) {
      // Ajustar o valor do EMPRÉSTIMO para o máximo permitido
      onAdjustValues(valorMaximoEmprestimo, true);
    }
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="bg-green-100 p-2 rounded-full">
          <Wheat className="w-5 h-5 text-green-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Empréstimo Rural em {cidade}
          </h3>
          
          <div className="text-green-800 text-sm mb-3">
            <p className="mb-2">
              Na cidade de <strong>{cidade}</strong>, aceitamos apenas <strong>imóveis rurais 
              produtivos e georreferenciados</strong> como garantia, com limite de 
              <strong> 30% do valor do imóvel</strong>.
            </p>
            
            <div className="bg-white rounded p-3 border border-green-100 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-green-600" />
                <span className="font-medium">Cálculo para seu imóvel:</span>
              </div>
              <div className="text-sm space-y-1">
                <div>Valor do imóvel: <strong>R$ {valorImovel.toLocaleString('pt-BR')}</strong></div>
                <div>Máximo para empréstimo (30%): <strong>R$ {valorMaximoEmprestimo.toLocaleString('pt-BR')}</strong></div>
              </div>
            </div>
            
            {/* Checkbox para confirmar imóvel rural */}
            <div className="bg-green-100 rounded p-3 border border-green-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRuralConfirmed}
                  onChange={(e) => setIsRuralConfirmed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <div className="text-sm">
                  <div className="font-medium text-green-900 mb-1">
                    Confirmo que meu imóvel é rural
                  </div>
                  <div className="text-green-700">
                    O imóvel é <strong>rural, produtivo e georreferenciado</strong>, 
                    atendendo aos requisitos para empréstimo nesta cidade.
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleAdjustClick}
              disabled={!isRuralConfirmed}
              className={`flex items-center gap-2 ${
                isRuralConfirmed 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              size="sm"
            >
              {isRuralConfirmed && <CheckCircle className="w-4 h-4" />}
              <Calculator className="w-4 h-4" />
              Continuar com R$ {valorMaximoEmprestimo.toLocaleString('pt-BR')}
            </Button>
            
            <Button
              onClick={onTryAgain}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
              size="sm"
            >
              Tentar Outra Cidade
            </Button>
          </div>
          
          {!isRuralConfirmed && (
            <div className="text-xs text-green-600 mt-2">
              É necessário confirmar que o imóvel é rural para continuar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Limit30Rural;
