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
  
  // Layout Desktop - 3 Cards Unificados
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Botão Nova Simulação no canto superior direito */}
      <div className="flex justify-end mb-6">
        <Button
          onClick={onNewSimulation}
          variant="outline"
          className="border-[#003399] text-[#003399] hover:bg-[#003399] hover:text-white"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Nova Simulação
        </Button>
      </div>

      {/* Container unificado dos 3 cards */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-stretch">
          
          {/* Card 1: Resultado da Simulação */}
          <div className="bg-white rounded-xl shadow-md border-2 border-[#003399]/10 overflow-hidden flex flex-col h-full">
            <div className="bg-gradient-to-r from-[#003399] to-[#004080] text-white p-6 text-center">
              <Calculator className="w-8 h-8 mx-auto mb-3 text-blue-200" />
              <h4 className="text-lg font-bold">Resultado da Simulação</h4>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {amortizacao === 'SAC' && primeiraParcela && ultimaParcela ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-sm text-gray-600 mb-2">Parcela Inicial (SAC)</div>
                      <div className="text-xl font-bold text-[#003399]">
                        R$ {primeiraParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-sm text-gray-600 mb-2">Parcela Final</div>
                      <div className="text-xl font-bold text-green-600">
                        R$ {ultimaParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 text-center font-medium">
                      Sistema SAC - Parcelas decrescentes
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-3">Parcela Fixa (PRICE)</div>
                    <div className="text-3xl font-bold text-[#003399] mb-3">
                      R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">{parcelas} parcelas</div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-xs">Empréstimo</div>
                  <div className="font-semibold">R$ {valorEmprestimo.toLocaleString('pt-BR')}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-xs">Garantia</div>
                  <div className="font-semibold">R$ {valorImovel.toLocaleString('pt-BR')}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-xs">Sistema</div>
                  <div className="font-semibold">{amortizacao}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-xs">Cidade</div>
                  <div className="font-semibold">{cidade}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Renda Mínima Familiar */}
          <div className="bg-white rounded-xl shadow-md border-2 border-yellow-200 overflow-hidden flex flex-col h-full">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-3 text-yellow-200" />
              <h4 className="text-lg font-bold">Renda Mínima Familiar</h4>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    R$ {rendaMinima.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
                    3,33x o valor da {amortizacao === 'SAC' ? 'maior' : ''} parcela
                    <TooltipInfo content="Renda familiar podendo ser composta por até 4 pessoas">
                      <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </TooltipInfo>
                  </div>
                </div>
                
                {amortizacao === 'SAC' && (
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-6">
                    <div className="flex items-start gap-3 text-sm text-yellow-800">
                      <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>💡 Na tabela PRICE a renda necessária é consideravelmente menor</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3 text-sm">
                <p className="text-gray-600 leading-relaxed">
                  <strong>Parcelas calculadas</strong> pelo sistema {amortizacao} com taxa de 1,19% a.m. + IPCA.
                </p>
                <p className="text-gray-500 text-xs">
                  Taxa pode variar conforme análise. Inclusos custos de avaliação, cartório e impostos.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Formulário de Contato */}
          <div className="bg-white rounded-xl shadow-md border-2 border-green-200 overflow-hidden flex flex-col h-full">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 text-center">
              <div className="text-2xl mb-2">🎉</div>
              <h4 className="text-lg font-bold">Solicite sua Análise</h4>
              <p className="text-green-100 text-sm mt-1">Consultoria gratuita em até 24h</p>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <ContactForm 
                simulationResult={resultado}
                compact={true}
                className="space-y-4 flex-1"
                inputClassName="border-gray-300 text-gray-800 text-sm h-10"
                buttonClassName="bg-[#003399] hover:bg-[#003399]/90 text-white font-bold py-3 text-sm w-full"
              />
              
              <div className="mt-4 text-xs text-gray-500 text-center space-y-1">
                <p>🔒 Seus dados estão protegidos</p>
                <p>Nossa equipe entrará em contato em até 24h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationResultDisplay;
