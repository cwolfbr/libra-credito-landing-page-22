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
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-10 shadow-lg">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
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
  onNewSimulation
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
        <div className="bg-white rounded-lg p-4 text-center mb-4">
          {amortizacao === 'SAC' && primeiraParcela ? (
            <div>
              <div className="text-xs text-gray-600 mb-1">Parcela Inicial (SAC)</div>
              <div className="text-2xl font-bold text-[#003399]">
                R$ {primeiraParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Última: R$ {ultimaParcela?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xs text-gray-600 mb-1">Parcela Fixa (PRICE)</div>
              <div className="text-2xl font-bold text-[#003399]">
                R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          )}
        </div>

        {/* Renda mínima */}
        <div className="bg-white/10 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            <span>Renda familiar mínima:</span>
            <TooltipInfo content="Renda familiar podendo ser composta por até 4 pessoas">
              <Info className="w-3 h-3" />
            </TooltipInfo>
          </div>
          <div className="text-lg font-bold mt-1">
            R$ {rendaMinima.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          {amortizacao === 'SAC' && (
            <div className="text-xs text-white/70 mt-2 p-2 bg-white/5 rounded border border-white/10">
              💡 Ao contratar o crédito na tabela PRICE a comprovação de renda necessária é consideravelmente menor
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
          buttonClassName="bg-white text-[#003399] hover:bg-gray-100 font-bold py-3 w-full"
        />
      </div>
    );
  }
  
  // Layout Desktop - Expandido e detalhado
  return (
    <div className="bg-gradient-to-br from-[#003399] to-[#004080] rounded-xl p-4 lg:p-6 text-white shadow-xl max-w-7xl mx-auto">
      {/* Header compacto */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 lg:p-3 rounded-full">
            <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-bold">Simulação Realizada!</h3>
            <p className="text-blue-200 text-xs lg:text-sm">Sua proposta personalizada está pronta</p>
          </div>
        </div>
        <Button
          onClick={onNewSimulation}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 self-start lg:self-auto text-xs px-3 py-2"
          size="sm"
        >
          <Calculator className="w-3 h-3 mr-1" />
          Nova Simulação
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-6">
        {/* Coluna 1: Informações da Parcela */}
        <div className="lg:col-span-5 space-y-4 lg:space-y-5">
          {/* Destaque da parcela */}
          <div className="bg-white rounded-xl p-4 lg:p-5 text-gray-800">
            {amortizacao === 'SAC' && primeiraParcela && ultimaParcela ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-2">Parcela Inicial</div>
                  <div className="text-xl lg:text-2xl font-bold text-[#003399] mb-2">
                    R$ {primeiraParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-500">Sistema SAC - Parcelas decrescentes</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-2">Parcela Final</div>
                  <div className="text-xl lg:text-2xl font-bold text-green-600 mb-2">
                    R$ {ultimaParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-500">Economia ao longo do tempo</div>
                </div>
              </div>
            ) : (
              <div className="text-center p-4 lg:p-5">
                <div className="text-xs lg:text-sm text-gray-600 mb-3">Parcela Fixa</div>
                <div className="text-2xl lg:text-3xl font-bold text-[#003399] mb-3">
                  R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs lg:text-sm text-gray-500">Sistema PRICE - {parcelas} parcelas</div>
              </div>
            )}
          </div>

          {/* Renda mínima familiar */}
          <div className="bg-white/10 rounded-lg p-4 lg:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 lg:w-5 lg:h-5 text-blue-200" />
              <h4 className="text-sm lg:text-base font-semibold">Renda Mínima Familiar</h4>
              <TooltipInfo content="Renda familiar podendo ser composta por até 4 pessoas">
                <Info className="w-3 h-3 lg:w-4 lg:h-4 text-blue-200 hover:text-white transition-colors" />
              </TooltipInfo>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 lg:p-5">
              <div className="text-xl lg:text-2xl font-bold text-yellow-300 mb-2">
                R$ {rendaMinima.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs lg:text-sm text-blue-200 mb-3">
                Baseado em 3,33x o valor da {amortizacao === 'SAC' ? 'maior' : ''} parcela
              </div>
              
              {amortizacao === 'SAC' && (
                <div className="mt-3 p-3 lg:p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start gap-2 text-xs lg:text-sm text-yellow-300">
                    <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 mt-0.5 flex-shrink-0" />
                    <span>💡 Ao contratar o crédito na tabela PRICE a comprovação de renda necessária é consideravelmente menor</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informações sobre taxa e custos */}
          <div className="bg-white/5 rounded-lg p-4 lg:p-5">
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 text-xs lg:text-sm mb-4">
              <div className="text-center lg:text-left">
                <div className="text-blue-200 mb-1">Empréstimo</div>
                <div className="font-semibold text-sm">R$ {valorEmprestimo.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-blue-200 mb-1">Garantia</div>
                <div className="font-semibold text-sm">R$ {valorImovel.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-blue-200 mb-1">Sistema</div>
                <div className="font-semibold text-sm">{amortizacao}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-blue-200 mb-1">Cidade</div>
                <div className="font-semibold text-sm">{cidade}</div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 space-y-2">
              <p className="text-xs lg:text-sm text-blue-200 leading-relaxed">
                <strong>Parcelas calculadas</strong> pelo sistema {amortizacao} com taxa de juros de 1,19% a.m. + IPCA. 
                Esta taxa pode sofrer alterações de acordo com a análise do crédito.
              </p>
              <p className="text-xs text-blue-300">
                Já estão inclusos custos com avaliação do imóvel, cartório e impostos.
              </p>
            </div>
          </div>
        </div>

        {/* Coluna 2: Formulário de Solicitação */}
        <div className="lg:col-span-2 bg-white/10 rounded-lg p-3 lg:p-4">
          <div className="mb-4 text-center">
            <h4 className="text-sm lg:text-base font-bold mb-2 text-yellow-300">🎉 Gostou dos valores?</h4>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-lg p-2 lg:p-3 mb-2">
              <p className="font-bold text-xs lg:text-sm">Solicite uma consultoria gratuita!</p>
            </div>
            <p className="text-blue-200 text-xs leading-relaxed">
              Preencha seus dados e nossa equipe especializada entrará em contato em até 24h
            </p>
          </div>
          
          <ContactForm 
            simulationResult={resultado}
            compact={true}
            className="space-y-2 lg:space-y-3"
            inputClassName="bg-white/90 text-gray-800 border-white/20 text-xs"
            buttonClassName="bg-white text-[#003399] hover:bg-gray-100 font-bold py-2 lg:py-3 text-xs lg:text-sm w-full"
          />
          
          <div className="mt-3 text-xs text-blue-200 text-center space-y-1">
            <p>🔒 Seus dados estão protegidos</p>
            <p>Nossa equipe entrará em contato em até 24h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationResultDisplay;
