import React, { useState } from 'react';
import { Calculator, CheckCircle, Users, Info, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import ContactForm from './ContactForm';

interface SimulationResultDisplayProps {
  resultado: {
    id: string;
    valor: number;
    amortizacao: string;
    parcelas: number;
    primeiraParcela?: number;
    ultimaParcela?: number;
  };
  valorEmprestimo: number;
  valorImovel: number;
  cidade: string;
  onNewSimulation: () => void;
  onSwitchToPrice?: () => void;
}

/**
 * Tooltip component para informações sobre renda familiar
 */
const TooltipInfo: React.FC<{ children: React.ReactNode; content: string }> = ({ children, content }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="cursor-help"
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap z-10 shadow-lg">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

/**
 * Mostra dica para trocar para PRICE quando a renda fica alta
 */
const SwitchPriceTip: React.FC<{ onSwitchToPrice?: () => void }> = ({
  onSwitchToPrice,
}) => {
  const [showTip, setShowTip] = useState(false);
  return (
    <div className="relative inline-block text-yellow-800">
      <div
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        onClick={() => setShowTip(!showTip)}
        className="cursor-pointer font-medium flex items-center gap-1"
      >
        <span role="img" aria-label="dica">💡</span>
        Diminua a Parcela
      </div>
      {showTip && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-60 px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg shadow-lg text-center z-10">
          <div className="text-xs mb-2">Na tabela PRICE a renda necessária é menor!</div>
          {onSwitchToPrice && (
            <Button
              onClick={onSwitchToPrice}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1"
              size="sm"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Ver simulação PRICE
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Componente otimizado para exibir resultado da simulação com layout responsivo
 */
const SimulationResultDisplay: React.FC<SimulationResultDisplayProps> = ({
  resultado,
  valorEmprestimo,
  valorImovel,
  cidade,
  onNewSimulation,
  onSwitchToPrice
}) => {
  const isMobile = useIsMobile();
  const { valor, amortizacao, parcelas, primeiraParcela, ultimaParcela } = resultado;
  
  // Cálculo da renda mínima familiar
  const calcularRendaMinima = () => {
    if (amortizacao === 'SAC' && primeiraParcela) {
      return primeiraParcela * 3.33;
    } else {
      return valor * 3.33;
    }
  };
  
  const rendaMinima = calcularRendaMinima();
  
  if (isMobile) {
    // Layout Mobile - Sucinto e direto
    return (
      <div className="bg-gradient-to-br from-[#003399] to-[#004080] rounded-xl p-4 text-white shadow-xl">
        {/* Header compacto */}
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <div>
            <h3 className="font-bold">Simulação Pronta!</h3>
          </div>
        </div>

        {/* Valor da parcela destacado */}
        <div className="bg-white rounded-lg p-4 mb-4">
          {amortizacao === 'SAC' && primeiraParcela ? (
            <div>
              <div className="text-xs text-libra-navy mb-3 text-center">Sistema SAC - Parcelas Decrescentes</div>
              <div className="grid grid-cols-2 gap-3">
                {/* Primeira parcela - destaque maior */}
                <div className="text-center bg-libra-light rounded-lg p-3 border-2 border-libra-blue/30">
                  <div className="text-xs font-medium text-libra-blue mb-1">1ª Parcela</div>
                  <div className="text-lg font-bold text-libra-navy">
                    R$ {primeiraParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Maior valor</div>
                </div>
                {/* Última parcela */}
                <div className="text-center bg-libra-light rounded-lg p-3 border border-libra-blue/20">
                  <div className="text-xs font-medium text-libra-blue mb-1">Última</div>
                  <div className="text-base font-bold text-libra-navy">
                    R$ {ultimaParcela?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Menor valor</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">Parcela Fixa (PRICE)</div>
              <div className="text-2xl font-bold text-libra-navy">
                R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          )}
        </div>

        {/* Renda mínima */}
        <div className="bg-white/10 rounded-lg p-3 mb-4 text-center relative">
          <div className="text-sm mb-1 flex items-center justify-center gap-1">
            <span>Renda necessária</span>
            <TooltipInfo content="Renda familiar podendo ser composta por até 4 pessoas">
              <Users className="w-3 h-3" />
            </TooltipInfo>
            <TooltipInfo content="Informações sobre comprovação de renda">
              <Info className="w-3 h-3" />
            </TooltipInfo>
          </div>
          <div className="text-lg font-bold">
            R$ {rendaMinima.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          {amortizacao === 'SAC' && (
            <div className="text-xs mt-2">
              <SwitchPriceTip onSwitchToPrice={onSwitchToPrice} />
            </div>
          )}
        </div>

        {/* Informações sobre taxa e custos */}
        <div className="bg-white/5 rounded-lg p-3 mb-4 text-xs">
          <p className="text-white/80 mb-1">
            <strong>Parcelas calculadas</strong> pelo sistema {amortizacao} com taxa de juros de 1,19% a.m. + IPCA.
          </p>
          <p className="text-white/70">
            Já inclusos custos com avaliação do imóvel, cartório e impostos.
          </p>
        </div>

        {/* CTA e Formulário compacto */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-lg p-3 mb-4 text-center">
          <p className="font-bold">🎉 Gostou? Solicite uma consultoria gratuita!</p>
        </div>
        
        <ContactForm
          simulationResult={resultado}
          compact={true}
          className="space-y-3"
          inputClassName="bg-white/90 text-gray-800 placeholder-gray-500"
          buttonClassName="bg-white text-libra-navy hover:bg-gray-100 font-bold py-3 w-full"
        />
      </div>
    );
  }
  
  // Layout Desktop - Adaptação do Mobile na Lateral
  return (
    <div className="bg-gradient-to-br from-[#003399] to-[#004080] rounded-xl p-4 text-white shadow-xl">
      {/* Header compacto */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold">Simulação Pronta!</h3>
        </div>
        <Button
          onClick={onNewSimulation}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs px-3 py-2"
          size="sm"
        >
          <Calculator className="w-3 h-3 mr-1" />
          Nova Simulação
        </Button>
      </div>

      {/* Valor da parcela e Renda mínima empilhados */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        {/* Valor da parcela destacado */}
        <div className="bg-white rounded-lg p-4">
          {amortizacao === 'SAC' && primeiraParcela ? (
            <div>
              <div className="text-xs text-libra-navy mb-3 text-center">Sistema SAC - Parcelas Decrescentes</div>
              <div className="grid grid-cols-2 gap-4">
                {/* Primeira parcela - destaque maior */}
                <div className="text-center bg-libra-light rounded-lg p-4 border-2 border-libra-blue/30">
                  <div className="text-sm font-medium text-libra-blue mb-2">1ª Parcela</div>
                  <div className="text-xl font-bold text-libra-navy">
                    R$ {primeiraParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-600 mt-2">Maior valor</div>
                </div>
                {/* Última parcela */}
                <div className="text-center bg-libra-light rounded-lg p-4 border border-libra-blue/20">
                  <div className="text-sm font-medium text-libra-blue mb-2">Última Parcela</div>
                  <div className="text-lg font-bold text-libra-navy">
                    R$ {ultimaParcela?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-600 mt-2">Menor valor</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">Parcela Fixa (PRICE)</div>
              <div className="text-xl lg:text-2xl font-bold text-libra-navy">
                R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          )}
        </div>

        {/* Renda mínima */}
        <div className="bg-white rounded-lg p-4 text-center relative">
          <div className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1">
            <span>Renda necessária</span>
            <TooltipInfo content="Renda familiar podendo ser composta por até 4 pessoas">
              <Users className="w-3 h-3" />
            </TooltipInfo>
            <TooltipInfo content="Informações sobre comprovação de renda">
              <Info className="w-3 h-3" />
            </TooltipInfo>
          </div>
          <div className="text-xl lg:text-2xl font-bold text-libra-navy">
            R$ {rendaMinima.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          {amortizacao === 'SAC' && (
            <div className="text-xs mt-3">
              <SwitchPriceTip onSwitchToPrice={onSwitchToPrice} />
            </div>
          )}
        </div>
      </div>


      {/* Informações sobre taxa e custos */}
      <div className="bg-white/5 rounded-lg p-3 mb-4 text-xs">
        <p className="text-white/80 mb-1">
          <strong>Parcelas calculadas</strong> pelo sistema {amortizacao} com taxa de juros de 1,19% a.m. + IPCA.
        </p>
        <p className="text-white/70">
          Já inclusos custos com avaliação do imóvel, cartório e impostos.
        </p>
      </div>

      {/* CTA e Formulário compacto */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-lg p-3 mb-4 text-center">
        <p className="font-bold">🎉 Gostou? Solicite uma consultoria gratuita!</p>
      </div>
      
      <ContactForm
        simulationResult={resultado}
        compact={true}
        className="space-y-3"
        inputClassName="bg-white/90 text-gray-800 placeholder-gray-500"
        buttonClassName="bg-white text-libra-navy hover:bg-gray-100 font-bold py-3 w-full"
      />
    </div>
  );
};

export default SimulationResultDisplay;
