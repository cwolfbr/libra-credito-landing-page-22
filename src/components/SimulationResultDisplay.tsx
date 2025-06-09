import React from 'react';
import { Calculator, CheckCircle, Home, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
 * Componente visual para exibir resultado da simulação lado a lado com o formulário
 */
const SimulationResultDisplay: React.FC<SimulationResultDisplayProps> = ({
  resultado,
  valorEmprestimo,
  valorImovel,
  cidade,
  onNewSimulation
}) => {
  const { valor, amortizacao, parcelas, primeiraParcela, ultimaParcela } = resultado;
  
  return (
    <div className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
      {/* Header Premium com Gradiente */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative flex items-center gap-4 mb-6">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Simulação Concluída!</h3>
            <p className="text-green-100 text-base">Sua proposta personalizada está pronta</p>
          </div>
        </div>

        {/* Informações da Simulação */}
        <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <div className="text-green-100 text-sm">Localização</div>
                <div className="font-semibold">{cidade}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <div className="text-green-100 text-sm">Sistema</div>
                <div className="font-semibold">{amortizacao}</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
            <div>
              <div className="text-green-100 text-sm">Valor do Imóvel</div>
              <div className="text-xl font-bold">R$ {valorImovel.toLocaleString('pt-BR')}</div>
            </div>
            <div>
              <div className="text-green-100 text-sm">Valor do Empréstimo</div>
              <div className="text-xl font-bold text-yellow-300">R$ {valorEmprestimo.toLocaleString('pt-BR')}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo Principal */}
      <div className="p-8">

        {/* Valores das Parcelas Premium */}
        <div className="space-y-6 mb-8">
          <h4 className="text-2xl font-bold text-gray-800 text-center mb-6">
            💳 Suas Parcelas
          </h4>
          
          {amortizacao === 'SAC' && primeiraParcela && ultimaParcela ? (
            // Sistema SAC - mostra primeira e última parcela
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="text-center">
                  <div className="text-blue-100 text-sm mb-2 font-medium">Parcela Inicial</div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    R$ {primeiraParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-blue-200 text-sm">Primeira parcela</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="text-center">
                  <div className="text-emerald-100 text-sm mb-2 font-medium">Parcela Final</div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    R$ {ultimaParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-emerald-200 text-sm">Última parcela</div>
                </div>
              </div>
            </div>
          ) : (
            // Sistema PRICE ou valor único
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center shadow-xl">
              <div className="text-indigo-100 text-lg mb-3 font-medium">Valor da Parcela</div>
              <div className="text-5xl md:text-6xl font-bold mb-3">
                R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-indigo-200 text-base">Parcela fixa</div>
            </div>
          )}
          
          {/* Informações sobre as parcelas */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-gray-600 text-sm">Prazo de Pagamento</div>
                <div className="text-xl font-bold text-gray-800">{parcelas} parcelas</div>
              </div>
              <div className="ml-auto">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {amortizacao}
                </div>
              </div>
            </div>
            
            {amortizacao === 'SAC' && (
              <div className="bg-blue-100 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 text-blue-800">
                  <span className="text-lg">📉</span>
                  <div>
                    <div className="font-semibold">Sistema SAC</div>
                    <div className="text-sm">As parcelas diminuem ao longo do tempo</div>
                  </div>
                </div>
              </div>
            )}
            
            {amortizacao === 'PRICE' && (
              <div className="bg-indigo-100 rounded-lg p-4 border-l-4 border-indigo-500">
                <div className="flex items-center gap-2 text-indigo-800">
                  <span className="text-lg">📈</span>
                  <div>
                    <div className="font-semibold">Sistema PRICE</div>
                    <div className="text-sm">Todas as parcelas têm o mesmo valor</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informações Adicionais Premium */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <h5 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <span>📝</span>
            Informações Importantes
          </h5>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-yellow-800 text-sm leading-relaxed">
                <strong>Parcelas calculadas</strong> pelo sistema {amortizacao} com taxa de juros de <strong>1,09% a.m. + IPCA</strong>. 
                Esta taxa pode sofrer alterações de acordo com a análise do crédito.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-yellow-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Já estão <strong>inclusos</strong> custos com avaliação do imóvel, cartório e impostos.
              </p>
            </div>
          </div>
        </div>

        {/* Formulário de Contato Premium */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🎉</div>
            <h4 className="text-2xl font-bold mb-2">Gostou? Continue o processo!</h4>
            <p className="text-green-100 text-base leading-relaxed">
              Preencha os campos abaixo e nossa equipe especializada entrará em contato para finalizar sua proposta
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <ContactForm 
              simulationResult={resultado}
              compact={true}
              className="space-y-4"
              inputClassName="bg-white/90 text-gray-800 placeholder-gray-500 rounded-xl py-3 px-4 border-0"
              buttonClassName="w-full bg-white text-green-600 hover:bg-green-50 font-bold py-4 rounded-xl text-lg transition-all duration-300 hover:-translate-y-1 shadow-lg"
            />
          </div>
        </div>
        
        {/* Botão para Nova Simulação */}
        <div className="text-center mt-8">
          <button
            onClick={onNewSimulation}
            className="px-6 py-3 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 mx-auto"
          >
            <Calculator className="w-5 h-5" />
            Nova Simulação
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulationResultDisplay;
