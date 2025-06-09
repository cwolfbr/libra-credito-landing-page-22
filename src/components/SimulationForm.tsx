/**
 * Formulário avançado de simulação de crédito
 * 
 * @component SimulationForm
 * @description Implementa o formulário completo de simulação de crédito com garantia de imóvel,
 * incluindo validações avançadas, cálculos precisos e integração com API.
 * 
 * @features
 * - Integração com API de simulação
 * - Suporte a diferentes sistemas de amortização (SAC/PRICE)
 * - Validações em tempo real
 * - Feedback visual de erros
 * - Loading states
 * - Formulário de contato pós-simulação
 * 
 * @businessRules
 * - Validação de valores mínimos e máximos
 * - Verificação de proporção empréstimo/garantia
 * - Cálculo de parcelas com juros + IPCA
 * - Tratamento de casos especiais (carência, etc)
 * 
 * @errorHandling
 * - Validação de entrada de dados
 * - Tratamento de erros da API
 * - Feedback visual de erros
 * - Logs de depuração
 * 
 * @integration
 * - Integração com serviço simulationApi
 * - Formatação de dados para API
 * - Parsing de resposta
 * 
 * @example
 * ```tsx
 * <SimulationForm />
 * ```
 * 
 * @see {@link simulateCredit} para detalhes da integração com API
 * @see {@link validateForm} para regras de validação
 * @see {@link formatBRL} para formatação de valores
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateForm } from '@/utils/validations';
import { SimulationService, SimulationResult } from '@/services/simulationService';
import { useUserJourney } from '@/hooks/useUserJourney';
import CityAutocomplete from './form/CityAutocomplete';
import LoanAmountField from './form/LoanAmountField';
import GuaranteeAmountField from './form/GuaranteeAmountField';
import InstallmentsField from './form/InstallmentsField';
import AmortizationField from './form/AmortizationField';
import ResultCard from './ResultCard';
import ContactForm from './ContactForm';
import ApiMessageDisplay from './ApiMessageDisplay';
import SmartApiMessage from './messages/SmartApiMessage';
import SimulationResultDisplay from './SimulationResultDisplay';
import { analyzeApiMessage, ApiMessageAnalysis } from '@/utils/apiMessageAnalyzer';
import { formatBRL, norm } from '@/utils/formatters';

const SimulationForm: React.FC = () => {
  const { sessionId, trackSimulation } = useUserJourney();
  const [emprestimo, setEmprestimo] = useState('');
  const [garantia, setGarantia] = useState('');
  const [parcelas, setParcelas] = useState<number>(36);
  const [amortizacao, setAmortizacao] = useState('');
  const [cidade, setCidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<SimulationResult | null>(null);
  const [erro, setErro] = useState('');
  const [apiMessage, setApiMessage] = useState<ApiMessageAnalysis | null>(null);
  const [isRuralProperty, setIsRuralProperty] = useState(false);

  // Validações
  const validation = validateForm(emprestimo, garantia, parcelas, amortizacao, cidade);

  const handleEmprestimoChange = (value: string) => {
    setEmprestimo(formatBRL(value));
  };

  const handleGarantiaChange = (value: string) => {
    setGarantia(formatBRL(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validation.formularioValido || !sessionId) return;

    setLoading(true);
    setErro('');
    setResultado(null);

    try {
      // Preparar dados para o serviço (sem dados pessoais ainda)
      const simulationInput = {
        sessionId,
        nomeCompleto: 'Lead Anônimo', // Temporário até preenchimento do contato
        email: 'nao-informado@temp.com',
        telefone: '(00) 00000-0000',
        cidade: cidade,
        valorEmprestimo: validation.emprestimoValue,
        valorImovel: validation.garantiaValue,
        parcelas: parcelas,
        tipoAmortizacao: amortizacao,
        userAgent: navigator.userAgent,
        ipAddress: undefined
      };

      console.log('🎯 Iniciando simulação:', simulationInput);

      // Usar o novo serviço integrado
      const result = await SimulationService.performSimulation(simulationInput);

      console.log('✅ Simulação realizada com sucesso:', result);

      // Rastrear simulação na jornada do usuário
      trackSimulation({
        simulationId: result.id,
        valorEmprestimo: result.valorEmprestimo,
        valorImovel: result.valorImovel,
        parcelas: result.parcelas,
        cidade: result.cidade
      });

      setResultado(result);

    } catch (error) {
      console.error('Erro na simulação:', error);
      
      if (error instanceof Error) {
        // Analisar a mensagem para ver se é um dos padrões conhecidos
        const analysis = analyzeApiMessage(error.message);
        
        if (analysis.type !== 'unknown_error') {
          // É uma mensagem estruturada da API
          setApiMessage(analysis);
          setErro(''); // Limpar erro genérico
        } else {
          // É um erro genérico
          let errorMessage = 'Erro desconhecido ao realizar simulação';
          
          if (error.message.includes('HTTP') || error.message.includes('fetch')) {
            errorMessage = 'Erro de conexão com o servidor. Verifique sua internet e tente novamente.';
          } else {
            errorMessage = error.message;
          }
          
          setErro(errorMessage);
          setApiMessage(null);
        }
      } else {
        setErro('Erro desconhecido ao realizar simulação');
        setApiMessage(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmprestimo('');
    setGarantia('');
    setParcelas(36);
    setAmortizacao('');
    setCidade('');
    setResultado(null);
    setErro('');
    setApiMessage(null);
    setIsRuralProperty(false);
  };

  // Função para ajustar valores automaticamente (30%) e executar simulação
  const handleAdjustValues = async (novoEmprestimo: number, isRural: boolean = false) => {
    // Ajustar os valores
    setEmprestimo(formatBRL(novoEmprestimo.toString()));
    setIsRuralProperty(isRural);
    setApiMessage(null);
    setErro('');

    // Aguardar um pouco para garantir que os estados sejam atualizados
    setTimeout(async () => {
      // Verificar se temos todos os dados necessários para simular
      if (!sessionId || !cidade || !amortizacao) {
        console.log('⚠️ Dados insuficientes para simulação automática');
        return;
      }

      // Recalcular validação com novos valores
      const newValidation = validateForm(
        formatBRL(novoEmprestimo.toString()), 
        garantia, 
        parcelas, 
        amortizacao, 
        cidade
      );

      if (!newValidation.formularioValido) {
        console.log('⚠️ Formulário inválido após ajuste');
        return;
      }

      // Executar simulação automaticamente
      setLoading(true);

      try {
        const simulationInput = {
          sessionId,
          nomeCompleto: 'Lead Anônimo',
          email: 'nao-informado@temp.com',
          telefone: '(00) 00000-0000',
          cidade: cidade,
          valorEmprestimo: newValidation.emprestimoValue,
          valorImovel: newValidation.garantiaValue,
          parcelas: parcelas,
          tipoAmortizacao: amortizacao,
          userAgent: navigator.userAgent,
          ipAddress: undefined
        };

        console.log('🎯 Executando simulação automática após ajuste:', simulationInput);

        const result = await SimulationService.performSimulation(simulationInput);

        console.log('✅ Simulação automática realizada com sucesso:', result);

        // Rastrear simulação na jornada do usuário
        trackSimulation({
          simulationId: result.id,
          valorEmprestimo: result.valorEmprestimo,
          valorImovel: result.valorImovel,
          parcelas: result.parcelas,
          cidade: result.cidade
        });

        setResultado(result);

      } catch (error) {
        console.error('Erro na simulação automática:', error);
        
        if (error instanceof Error) {
          const analysis = analyzeApiMessage(error.message);
          
          if (analysis.type !== 'unknown_error') {
            setApiMessage(analysis);
            setErro('');
          } else {
            let errorMessage = 'Erro ao processar simulação automática';
            
            if (error.message.includes('HTTP') || error.message.includes('fetch')) {
              errorMessage = 'Erro de conexão. Tente novamente.';
            } else {
              errorMessage = error.message;
            }
            
            setErro(errorMessage);
            setApiMessage(null);
          }
        } else {
          setErro('Erro desconhecido na simulação automática');
          setApiMessage(null);
        }
      } finally {
        setLoading(false);
      }
    }, 100); // Pequeno delay para garantir que os estados sejam atualizados
  };

  // Função para tentar novamente
  const handleTryAgain = () => {
    setApiMessage(null);
    setErro('');
    setResultado(null);
    // Manter os valores preenchidos para facilitar nova tentativa
  };

  // Função para nova simulação (limpa resultado mas mantém valores)
  const handleNewSimulation = () => {
    setResultado(null);
    setApiMessage(null);
    setErro('');
    // Manter valores para facilitar nova simulação
  };

  return (
    <div className={`container mx-auto px-4 py-12 min-h-[calc(100vh-4rem)] ${
      resultado ? 'max-w-7xl' : 'max-w-2xl'
    }`}>
      <div className={`${resultado ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : ''}`}>
        {/* Formulário de Simulação Premium */}
        <Card className="bg-white/90 backdrop-blur-lg shadow-2xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-8">
            <CardTitle className="text-2xl md:text-3xl font-bold mb-3">
              💰 Sua simulação em um clique!
            </CardTitle>
            <p className="text-blue-100 text-base md:text-lg max-w-md mx-auto leading-relaxed">
              Com apenas algumas informações você já encontrará a proposta ideal, com parcelas que cabem no seu bolso!
            </p>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <CityAutocomplete value={cidade} onCityChange={setCidade} />

              <LoanAmountField value={emprestimo} onChange={handleEmprestimoChange} />
              
              {validation.emprestimoForaRange && (
                <div className="text-red-500 text-xs">
                  O empréstimo deve estar entre R$ 100.000 e R$ 5.000.000
                </div>
              )}

              <GuaranteeAmountField 
                value={garantia} 
                onChange={handleGarantiaChange}
                showError={validation.emprestimoExcedeGarantia}
              />

              <InstallmentsField value={parcelas} onChange={setParcelas} />

              <AmortizationField value={amortizacao} onChange={setAmortizacao} />

              {/* Botões Premium */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={!validation.formularioValido || loading}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none min-h-[56px]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Calculando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>📊</span>
                      <span>CALCULAR AGORA</span>
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-4 text-blue-600 border-2 border-blue-200 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 min-h-[56px]"
                >
                  LIMPAR
                </button>
              </div>

              {/* Mensagem inteligente da API */}
              {apiMessage && (
                <div className="mt-3">
                  <SmartApiMessage
                    analysis={apiMessage}
                    valorImovel={validation.garantiaValue}
                    onAdjustValues={handleAdjustValues}
                    onTryAgain={handleTryAgain}
                  />
                </div>
              )}
              
              {/* Erro genérico */}
              {erro && !apiMessage && (
                <div className="mt-3">
                  <ApiMessageDisplay 
                    message={erro}
                    type="error"
                    onRetry={() => {
                      setErro('');
                      if (validation.formularioValido) {
                        handleSubmit(new Event('submit') as any);
                      }
                    }}
                    showRetryButton={validation.formularioValido}
                  />
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Resultado da Simulação */}
        {resultado && (
          <SimulationResultDisplay
            resultado={resultado}
            valorEmprestimo={validation.emprestimoValue}
            valorImovel={validation.garantiaValue}
            cidade={cidade}
            onNewSimulation={handleNewSimulation}
          />
        )}
      </div>
    </div>
  );
};

export default SimulationForm;
