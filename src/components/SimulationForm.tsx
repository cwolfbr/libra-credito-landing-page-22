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
import SmartCityField from './form/SmartCityField';
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
import { LtvValidationResult } from '@/data/cityLtvData';

const SimulationForm: React.FC = () => {
  const { sessionId, trackSimulation } = useUserJourney();
  const [emprestimo, setEmprestimo] = useState('');
  const [garantia, setGarantia] = useState('');
  const [parcelas, setParcelas] = useState<number>(36);
  const [amortizacao, setAmortizacao] = useState('');
  const [cidade, setCidade] = useState<{cidade: string, uf: string} | null>(null);
  const [isRural, setIsRural] = useState(false);
  const [cityValidation, setCityValidation] = useState<LtvValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<SimulationResult | null>(null);
  const [erro, setErro] = useState('');
  const [apiMessage, setApiMessage] = useState<ApiMessageAnalysis | null>(null);
  const [isRuralProperty, setIsRuralProperty] = useState(false);

  // Validações
  const cityString = cidade ? `${cidade.cidade} - ${cidade.uf}` : '';
  const validation = validateForm(emprestimo, garantia, parcelas, amortizacao, cityString);

  const handleEmprestimoChange = (value: string) => {
    setEmprestimo(formatBRL(value));
  };

  const handleGarantiaChange = (value: string) => {
    setGarantia(formatBRL(value));
  };

  // Função para lidar com mudanças na validação da cidade
  const handleCityValidationChange = (validation: LtvValidationResult | null) => {
    setCityValidation(validation);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar se a cidade é válida antes de prosseguir
    if (cityValidation && !cityValidation.isValid) {
      setErro(cityValidation.error || 'Cidade inválida');
      return;
    }
    
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
        cidade: cityString,
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
    setCidade(null);
    setIsRural(false);
    setCityValidation(null);
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
        cityString
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
          cidade: cityString,
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
    <div className={`container mx-auto px-3 py-2 min-h-[calc(100vh-4rem)] ${
      resultado ? 'max-w-6xl' : 'max-w-xl'
    }`}>
      <div className={`${resultado ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : ''}`}>
        {/* Formulário de Simulação */}
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg md:text-xl font-bold text-libra-navy mb-1">
              Sua simulação em um clique!
            </CardTitle>
            <p className="text-gray-600 text-xs">
              Com apenas algumas informações você já encontrará a proposta ideal, com parcelas que cabem no seu bolso!
            </p>
          </CardHeader>
          
          <CardContent className="p-3 md:p-4">
            <form onSubmit={handleSubmit} className="space-y-2">
              
              <SmartCityField
                value={cidade}
                onChange={setCidade}
                loanAmount={norm(emprestimo)}
                guaranteeAmount={norm(garantia)}
                isRural={isRural}
                onValidationChange={handleCityValidationChange}
              />

              <LoanAmountField value={emprestimo} onChange={handleEmprestimoChange} />

              <GuaranteeAmountField 
                value={garantia} 
                onChange={handleGarantiaChange}
                showError={validation.emprestimoExcedeGarantia}
              />

              <InstallmentsField value={parcelas} onChange={setParcelas} />

              <AmortizationField value={amortizacao} onChange={setAmortizacao} />

              {/* Toggle para imóvel rural quando necessário */}
              {cityValidation?.error?.includes("rural") && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={isRural}
                      onChange={(e) => setIsRural(e.target.checked)}
                      className="rounded"
                    />
                    <span>Este é um imóvel rural</span>
                  </label>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-2 pt-2">
                <Button
                type="submit"
                disabled={!validation.formularioValido || loading || (cityValidation && !cityValidation.isValid)}
                className="flex-1 bg-libra-blue hover:bg-libra-blue/90 text-white py-2 text-sm font-semibold min-h-[44px]"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Calculando...
                    </div>
                  ) : (
                    'CALCULAR'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="px-4 py-2 text-libra-blue border-libra-blue hover:bg-libra-light min-h-[44px] text-sm"
                >
                  LIMPAR
                </Button>
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
            cidade={cityString}
            onNewSimulation={handleNewSimulation}
          />
        )}
      </div>
    </div>
  );
};

export default SimulationForm;
