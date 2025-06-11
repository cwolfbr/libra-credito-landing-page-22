import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, CheckCircle, Home, Calendar, Users, Info, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';

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
  
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [aceiteTermos, setAceiteTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Cálculo da renda mínima familiar
  const calcularRendaMinima = () => {
    if (amortizacao === 'SAC' && primeiraParcela) {
      return primeiraParcela * 3.33;
    } else {
      return valor * 3.33;
    }
  };
  
  const rendaMinima = calcularRendaMinima();
  
  const handleSubmitContato = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aceiteTermos) return;
    
    setLoading(true);
    // Implementar envio do formulário
    setTimeout(() => {
      setLoading(false);
      alert('Solicitação enviada com sucesso! Nossa equipe entrará em contato.');
    }, 2000);
  };
  
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
        
        <form onSubmit={handleSubmitContato} className="space-y-3">
          <Input
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="bg-white/90 text-gray-800"
            required
          />
          <Input
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="bg-white/90 text-gray-800"
            required
          />
          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/90 text-gray-800"
            required
          />
          
          <div className="flex items-start gap-2 text-xs">
            <Checkbox
              checked={aceiteTermos}
              onCheckedChange={setAceiteTermos}
              className="bg-white"
            />
            <span className="text-white/90">
              Concordo com a <Link to="/politica-privacidade" className="text-yellow-300 underline">política de privacidade</Link> e autorizo o contato
            </span>
          </div>
          
          <Button
            type="submit"
            disabled={!aceiteTermos || loading}
            className="w-full bg-white text-[#003399] hover:bg-gray-100 font-bold"
          >
            {loading ? 'Enviando...' : 'Continuar Processo'}
          </Button>
        </form>
      </div>
    );
  }
  
  // Layout Desktop - Expandido e detalhado
  return (
    <div className="bg-gradient-to-br from-[#003399] to-[#004080] rounded-2xl p-8 text-white shadow-2xl">
      {/* Header elegante */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-4 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Simulação Realizada!</h3>
            <p className="text-blue-200">Sua proposta personalizada está pronta</p>
          </div>
        </div>
        <Button
          onClick={onNewSimulation}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Nova Simulação
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna 1: Informações da Parcela */}
        <div className="lg:col-span-2 space-y-6">
          {/* Destaque da parcela */}
          <div className="bg-white rounded-2xl p-6 text-gray-800">
            {amortizacao === 'SAC' && primeiraParcela && ultimaParcela ? (
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Parcela Inicial</div>
                  <div className="text-3xl font-bold text-[#003399] mb-2">
                    R$ {primeiraParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-500">Sistema SAC - Parcelas decrescentes</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Parcela Final</div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    R$ {ultimaParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-500">Economia ao longo do tempo</div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Parcela Fixa</div>
                <div className="text-4xl font-bold text-[#003399] mb-2">
                  R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-gray-500">Sistema PRICE - {parcelas} parcelas</div>
              </div>
            )}
          </div>

          {/* Renda mínima familiar */}
          <div className="bg-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-200" />
              <h4 className="text-lg font-semibold">Renda Mínima Familiar</h4>
              <TooltipInfo content="Renda familiar podendo ser composta por até 4 pessoas">
                <Info className="w-4 h-4 text-blue-200 hover:text-white transition-colors" />
              </TooltipInfo>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-300">
                R$ {rendaMinima.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-blue-200 mt-1">
                Baseado em 3,33x o valor da {amortizacao === 'SAC' ? 'maior' : ''} parcela
              </div>
              
              {amortizacao === 'SAC' && (
                <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 text-sm text-yellow-300">
                    <TrendingUp className="w-4 h-4" />
                    <span>💡 Ao contratar o crédito na tabela PRICE a comprovação de renda necessária é consideravelmente menor</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informações sobre taxa e custos */}
          <div className="bg-white/5 rounded-xl p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div>
                <div className="text-blue-200">Empréstimo</div>
                <div className="font-semibold">R$ {valorEmprestimo.toLocaleString('pt-BR')}</div>
              </div>
              <div>
                <div className="text-blue-200">Garantia</div>
                <div className="font-semibold">R$ {valorImovel.toLocaleString('pt-BR')}</div>
              </div>
              <div>
                <div className="text-blue-200">Sistema</div>
                <div className="font-semibold">{amortizacao}</div>
              </div>
              <div>
                <div className="text-blue-200">Cidade</div>
                <div className="font-semibold">{cidade}</div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 space-y-2">
              <p className="text-sm text-blue-200">
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
        <div className="bg-white/10 rounded-xl p-6">
          <div className="mb-6 text-center">
            <h4 className="text-2xl font-bold mb-2 text-yellow-300">🎉 Gostou dos valores?</h4>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-lg p-3 mb-3">
              <p className="font-bold text-lg">Solicite uma consultoria gratuita!</p>
            </div>
            <p className="text-blue-200 text-sm">
              Preencha seus dados e nossa equipe especializada entrará em contato em até 24h
            </p>
          </div>
          
          <form onSubmit={handleSubmitContato} className="space-y-4">
            <div>
              <label className="block text-sm text-blue-200 mb-1">Nome Completo</label>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="bg-white/90 text-gray-800 border-white/20"
                placeholder="Seu nome completo"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-blue-200 mb-1">Telefone</label>
              <Input
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="bg-white/90 text-gray-800 border-white/20"
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-blue-200 mb-1">E-mail</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/90 text-gray-800 border-white/20"
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                checked={aceiteTermos}
                onCheckedChange={setAceiteTermos}
                className="bg-white mt-1"
              />
              <span className="text-sm text-blue-200 leading-relaxed">
                Concordo com a <Link to="/politica-privacidade" className="text-yellow-300 underline hover:text-yellow-200">política de privacidade</Link> e autorizo o contato da equipe Libra Crédito
              </span>
            </div>
            
            <Button
              type="submit"
              disabled={!aceiteTermos || loading}
              className="w-full bg-white text-[#003399] hover:bg-gray-100 font-bold py-3 text-lg mt-6"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#003399]"></div>
                  Enviando...
                </div>
              ) : (
                'Solicitar Proposta'
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-xs text-blue-200 text-center">
            <p>🔒 Seus dados estão protegidos</p>
            <p>Nossa equipe entrará em contato em até 24h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationResultDisplay;
