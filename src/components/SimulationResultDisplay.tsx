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
    <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white shadow-xl">
      {/* Header com Ícone de Sucesso */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white/20 p-3 rounded-full">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Simulação Realizada!</h3>
          <p className="text-green-100 text-sm">Sua proposta está pronta</p>
        </div>
      </div>

      {/* Informações da Simulação */}
      <div className="bg-white/10 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>Cidade: <strong>{cidade}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span>Sistema: <strong>{amortizacao}</strong></span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm mt-3">
          <div>Valor do imóvel: <strong>R$ {valorImovel.toLocaleString('pt-BR')}</strong></div>
          <div>Empréstimo: <strong>R$ {valorEmprestimo.toLocaleString('pt-BR')}</strong></div>
        </div>
      </div>

      {/* Valores das Parcelas */}
      <div className="space-y-4 mb-6">
        {amortizacao === 'SAC' && primeiraParcela && ultimaParcela ? (
          // Sistema SAC - mostra primeira e última parcela
          <>
            <div className="bg-white rounded-lg p-4 text-gray-800">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Parcela Inicial</div>
                <div className="text-2xl font-bold text-blue-600">
                  R$ {primeiraParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-gray-800">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Parcela Final</div>
                <div className="text-2xl font-bold text-green-600">
                  R$ {ultimaParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </>
        ) : (
          // Sistema PRICE ou valor único
          <div className="bg-white rounded-lg p-4 text-gray-800">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Valor da Parcela</div>
              <div className="text-3xl font-bold text-blue-600">
                R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        )}
        
        {/* Informações sobre as parcelas */}
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Em <strong>{parcelas} parcelas</strong> no sistema <strong>{amortizacao}</strong></span>
          </div>
          
          {amortizacao === 'SAC' && (
            <div className="text-xs text-green-100 mt-2">
              💡 No SAC as parcelas diminuem ao longo do tempo
            </div>
          )}
          
          {amortizacao === 'PRICE' && (
            <div className="text-xs text-green-100 mt-2">
              💡 No PRICE todas as parcelas têm o mesmo valor
            </div>
          )}
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="bg-white/10 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-100 mb-2">
          <strong>Parcelas calculadas</strong> pelo sistema {amortizacao} com taxa de juros de 1,09% a.m. + IPCA. 
          Esta taxa pode sofrer alterações de acordo com a análise do crédito.
        </p>
        <p className="text-xs text-green-200">
          Já estão inclusos custos com avaliação do imóvel, cartório e impostos.
        </p>
      </div>

      {/* Formulário de Contato Integrado */}
      <div className="bg-white/10 rounded-lg p-4">
        <div className="text-center mb-4">
          <h4 className="font-semibold text-lg">Gostou? Continue o processo!</h4>
          <p className="text-sm text-green-100">
            Preencha os campos abaixo e nossa equipe entrará em contato
          </p>
        </div>
        
        <ContactForm 
          simulationResult={resultado}
          compact={true}
          className="space-y-3"
          inputClassName="bg-white/90 text-gray-800 placeholder-gray-500"
          buttonClassName="bg-white text-green-600 hover:bg-green-50 font-semibold py-3"
        />
      </div>
      
      {/* Botão para Nova Simulação */}
      <div className="text-center mt-4">
        <Button
          onClick={onNewSimulation}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          size="sm"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Nova Simulação
        </Button>
      </div>
    </div>
  );
};

export default SimulationResultDisplay;
