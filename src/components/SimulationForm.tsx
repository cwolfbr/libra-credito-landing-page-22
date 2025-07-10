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
import { LocalSimulationService, SimulationResult } from '@/services/localSimulationService';
import { useUserJourney } from '@/hooks/useUserJourney';
import { useIsMobile } from '@/hooks/use-mobile';
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
import { analyzeLocalMessage } from '@/utils/localMessageAnalyzer';
import { formatBRL, norm } from '@/utils/formatters';
import { getAllCities } from '@/utils/cityLtvService';

const SimulationForm: React.FC = () => {
  const { sessionId, trackSimulation } = useUserJourney();
  const isMobile = useIsMobile();
  const [emprestimo, setEmprestimo] = useState('');
  const [garantia, setGarantia] = useState('');
  const [parcelas, setParcelas] = useState<number>(180);
  const [amortizacao, setAmortizacao] = useState('');
  const [cidade, setCidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<SimulationResult | null>(null);
  const [erro, setErro] = useState('');
  const [erroTipo, setErroTipo] = useState<'error' | 'warning' | 'info'>('error');
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

  // Detectar cidade automaticamente usando geolocalização
  const fetchCityFromLocation = () => {
    if (!navigator.geolocation) {
      setErro('Geolocaliza\u00e7\u00e3o n\u00e3o suportada pelo navegador.');
      setErroTipo('warning');
      return;
    }

    setErro('');
    setErroTipo('info');

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords;
          const key = import.meta.env.VITE_OPENCAGE_API_KEY;
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}&language=pt-BR`;
          const resp = await fetch(url);
          const data = await resp.json();
          const comp = data.results?.[0]?.components;
          const cityName = comp?.city || comp?.town || comp?.village;
          const state = comp?.state_code;
          if (cityName && state) {
            const formatted = `${cityName.toUpperCase()} - ${state}`;
            const all = getAllCities();
            if (all.includes(formatted)) {
              setCidade(formatted);
              setErro('');
            } else {
              setCidade(formatted);
              setErro('Cidade detectada diferente do padr\u00e3o. Confirme ou ajuste manualmente.');
              setErroTipo('warning');
            }
          } else {
            setErro('N\u00e3o foi poss\u00edvel determinar sua cidade.');
            setErroTipo('warning');
          }
        } catch (err) {
          console.error('Erro ao buscar cidade:', err);
          setErro('Erro ao obter cidade pela localiza\u00e7\u00e3o.');
          setErroTipo('error');
        }
      },
      error => {
        console.error('Geo erro', error);
        if (error.code === error.PERMISSION_DENIED) {
          setErro('Permiss\u00e3o de localiza\u00e7\u00e3o negada.');
          setErroTipo('warning');
        } else {
          setErro('N\u00e3o foi poss\u00edvel acessar sua localiza\u00e7\u00e3o.');
          setErroTipo('error');
        }
      }
    );
  };

  // Função para rolar para o resultado no mobile
  const scrollToResult = () => {
    if (isMobile) {
      setTimeout(() => {
        const resultElement = document.querySelector('[data-result-section="true"]');
        if (resultElement) {
          (resultElement as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300); // Delay para garantir que o resultado seja renderizado
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validation.formularioValido || !sessionId) return;

    setLoading(true);
    setErro('');
    setErroTipo('error');
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

      // Usar o serviço local sem APIs
      const result = await LocalSimulationService.performSimulation(simulationInput);

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
      
      // Rolar para o resultado no mobile
      scrollToResult();

    } catch (error) {
      console.error('Erro na simulação:', error);
      
      if (error instanceof Error) {
        // Analisar a mensagem usando analisador local
        const analysis = analyzeLocalMessage(error.message);
        
        if (analysis.type !== 'unknown_error') {
          // É uma mensagem estruturada do serviço local
          setApiMessage(analysis);
          setErro(''); // Limpar erro genérico
          setErroTipo('error');
        } else {
          // É um erro genérico
          let errorMessage = 'Erro desconhecido ao realizar simulação';
          
          if (error.message.includes('HTTP') || error.message.includes('fetch')) {
            errorMessage = 'Erro de conexão com o servidor. Verifique sua internet e tente novamente.';
          } else {
            errorMessage = error.message;
          }
          
          setErro(errorMessage);
          setErroTipo('error');
          setApiMessage(null);
        }
      } else {
        setErro('Erro desconhecido ao realizar simulação');
        setErroTipo('error');
        setApiMessage(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmprestimo('');
    setGarantia('');
    setParcelas(180);
    setAmortizacao('');
    setCidade('');
    setResultado(null);
    setErro('');
    setErroTipo('error');
    setApiMessage(null);
    setIsRuralProperty(false);
  };

  // Função para ajustar valores automaticamente (30%) e executar simulação
  const handleAdjustValues = async (novoEmprestimo: number, isRural: boolean = false) => {
    // Ajustar os valores - usar valor completo com formatação
    setEmprestimo(formatBRL(novoEmprestimo.toString()));
    setIsRuralProperty(isRural);
    setApiMessage(null);
    setErro('');
    setErroTipo('error');

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

        const result = await LocalSimulationService.performSimulation(simulationInput);

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
        
        // Rolar para o resultado no mobile
        scrollToResult();

      } catch (error) {
        console.error('Erro na simulação automática:', error);
        
        if (error instanceof Error) {
          const analysis = analyzeLocalMessage(error.message);
          
          if (analysis.type !== 'unknown_error') {
            setApiMessage(analysis);
            setErro('');
            setErroTipo('error');
            setErroTipo('error');
          } else {
            let errorMessage = 'Erro ao processar simulação automática';
            
            if (error.message.includes('HTTP') || error.message.includes('fetch')) {
              errorMessage = 'Erro de conexão. Tente novamente.';
            } else {
              errorMessage = error.message;
            }
            
            setErro(errorMessage);
            setErroTipo('error');
            setApiMessage(null);
          }
        } else {
          setErro('Erro desconhecido na simulação automática');
          setErroTipo('error');
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
    setErroTipo('error');
    setResultado(null);
    // Manter os valores preenchidos para facilitar nova tentativa
  };

  // Função para nova simulação (limpa resultado mas mantém valores)
  const handleNewSimulation = () => {
    setResultado(null);
    setApiMessage(null);
    setErro('');
    setErroTipo('error');
    // Manter valores para facilitar nova simulação
  };

  // Função para trocar para tabela PRICE e refazer simulação
  const handleSwitchToPrice = async () => {
    if (!sessionId || !cidade) return;

    // Alterar amortização para PRICE
    setAmortizacao('PRICE');
    setApiMessage(null);
    setErro('');
    setErroTipo('error');
    setLoading(true);

    // Aguardar um pouco para garantir que o estado seja atualizado
    setTimeout(async () => {
      try {
        const simulationInput = {
          sessionId,
          nomeCompleto: 'Lead Anônimo',
          email: 'nao-informado@temp.com',
          telefone: '(00) 00000-0000',
          cidade: cidade,
          valorEmprestimo: validation.emprestimoValue,
          valorImovel: validation.garantiaValue,
          parcelas: parcelas,
          tipoAmortizacao: 'PRICE',
          userAgent: navigator.userAgent,
          ipAddress: undefined
        };

        console.log('🔄 Refazendo simulação com tabela PRICE:', simulationInput);

        const result = await LocalSimulationService.performSimulation(simulationInput);

        console.log('✅ Simulação PRICE realizada com sucesso:', result);

        // Rastrear simulação na jornada do usuário
        trackSimulation({
          simulationId: result.id,
          valorEmprestimo: result.valorEmprestimo,
          valorImovel: result.valorImovel,
          parcelas: result.parcelas,
          cidade: result.cidade
        });

        setResultado(result);
        
        // Rolar para o resultado no mobile
        scrollToResult();

      } catch (error) {
        console.error('Erro na simulação PRICE:', error);
        
        if (error instanceof Error) {
          const analysis = analyzeLocalMessage(error.message);
          
          if (analysis.type !== 'unknown_error') {
            setApiMessage(analysis);
            setErro('');
          } else {
            setErro('Erro ao refazer simulação com tabela PRICE');
            setErroTipo('error');
            setApiMessage(null);
          }
        } else {
          setErro('Erro desconhecido ao refazer simulação');
          setErroTipo('error');
          setApiMessage(null);
        }
      } finally {
        setLoading(false);
      }
    }, 100);
  };

  const isLtvMessage =
    apiMessage &&
    (apiMessage.type === 'limit_30_general' || apiMessage.type === 'limit_30_rural');

  const showSideComplement = !isMobile && (resultado || isLtvMessage);

  return (
    <div
      className={`container mx-auto px-3 ${
        isMobile ? 'py-2 pb-4' : 'py-2 min-h-[calc(100vh-4rem)]'
      } ${showSideComplement ? 'max-w-6xl' : 'max-w-xl'}`}
    >
      <div className={`${showSideComplement ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : ''}`}>
        {/* Formulário de Simulação */}
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg md:text-xl font-bold text-green-500 mb-1">
              Sua simulação em um clique!
            </CardTitle>
            <p className="text-gray-600 text-xs">
              Com apenas algumas informações você já entende se as parcelas que cabem no orçamento!
            </p>
          </CardHeader>
          
          <CardContent className="p-3 md:p-4">
            <form onSubmit={handleSubmit} className="space-y-2">
              
              <CityAutocomplete value={cidade} onCityChange={setCidade} />
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-1 text-xs"
                  onClick={fetchCityFromLocation}
                >
                  Detectar minha cidade
                </Button>
              </div>

              <LoanAmountField value={emprestimo} onChange={handleEmprestimoChange} />

              <GuaranteeAmountField 
                value={garantia} 
                onChange={handleGarantiaChange}
                showError={validation.emprestimoExcedeGarantia}
              />

              <InstallmentsField value={parcelas} onChange={setParcelas} />

              <AmortizationField value={amortizacao} onChange={setAmortizacao} />

              {/* Botões */}
              <div className="flex gap-2 pt-2">
                <Button
                type="submit"
                disabled={!validation.formularioValido || loading}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 text-sm font-semibold min-h-[44px]"
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
              {apiMessage && (!isLtvMessage || isMobile) && (
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
                    type={erroTipo}
                      onRetry={() => {
                        setErro('');
                        setErroTipo('error');
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

        {/* Resultado ou Complemento */}
        {(resultado || (isLtvMessage && apiMessage)) && (
          <div data-result-section="true" className={`${showSideComplement ? '' : 'mt-4'} scroll-mt-header`}>
            {resultado ? (
              <SimulationResultDisplay
                resultado={resultado}
                valorEmprestimo={validation.emprestimoValue}
                valorImovel={validation.garantiaValue}
                cidade={cidade}
                onNewSimulation={handleNewSimulation}
                onSwitchToPrice={handleSwitchToPrice}
              />
            ) : (
              <SmartApiMessage
                analysis={apiMessage as ApiMessageAnalysis}
                valorImovel={validation.garantiaValue}
                onAdjustValues={handleAdjustValues}
                onTryAgain={handleTryAgain}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationForm;
