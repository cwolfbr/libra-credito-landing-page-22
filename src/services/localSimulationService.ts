/**
 * Serviço de simulação local sem APIs externas
 * 
 * @service LocalSimulationService
 * @description Substitui o SimulationService mantendo todas as funcionalidades
 * mas usando dados locais ao invés de APIs externas
 * 
 * @features
 * - Mantém mesmas interfaces do SimulationService original
 * - Validação de cidades via JSON local
 * - Cálculos SAC/PRICE locais
 * - Mensagens contextuais baseadas em LTV da cidade
 * - Armazenamento local opcional (localStorage)
 * - Compatibilidade total com componentes existentes
 */

import { validateCity, validateLTV } from '@/utils/cityLtvService';
import { calculateLoan, getInterestRate, validateLoanParameters } from '@/utils/loanCalculator';
import { validateEmail, validatePhone, formatPhone } from '@/utils/validations';
import { supabaseApi, SimulacaoData, supabase } from '@/lib/supabase';

// Reutilizar interfaces do serviço original
export interface SimulationInput {
  sessionId: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  cidade: string;
  valorEmprestimo: number;
  valorImovel: number;
  parcelas: number;
  tipoAmortizacao: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface SimulationResult {
  id: string;
  valor: number;
  amortizacao: string;
  parcelas: number;
  primeiraParcela?: number;
  ultimaParcela?: number;
  valorEmprestimo: number;
  valorImovel: number;
  cidade: string;
  sessionId: string;
}

export interface ContactFormInput {
  simulationId: string;
  sessionId: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  imovelProprio: 'proprio' | 'terceiro';
  observacoes?: string;
}

// Classe principal do serviço local
export class LocalSimulationService {
  
  /**
   * Realiza simulação usando apenas dados locais
   * Mantém mesma interface do SimulationService original
   */
  static async performSimulation(input: SimulationInput): Promise<SimulationResult> {
    try {
      console.log('🎯 Iniciando simulação local:', input);
      
      // 1. Validar dados de entrada
      this.validateSimulationInput(input);
      
      // 2. Validar cidade e LTV
      const cityValidation = validateCity(input.cidade);
      console.log('🏘️ Validação da cidade:', cityValidation);
      
      if (!cityValidation.found) {
        throw new Error('Cidade não encontrada em nossa base de dados');
      }

      // Para cidades que não trabalhamos (LTV 0), bloquear completamente
      if (cityValidation.status === 'not_working') {
        throw new Error(`Ainda não trabalhamos em ${input.cidade}. Nossa equipe está expandindo nossa cobertura.`);
      }

      // Para imóveis rurais (LTV 1), permitir cálculo mas com aviso
      let isRuralProperty = false;
      if (cityValidation.status === 'rural_only') {
        isRuralProperty = true;
        console.log('🏡 Imóvel rural detectado para', input.cidade);
      }

      // 3. Validar LTV específico da cidade (apenas se não for rural sem limitações)
      let ltvValidation = { valid: true, message: 'OK' };
      
      if (cityValidation.status !== 'rural_only') {
        ltvValidation = validateLTV(input.valorEmprestimo, input.valorImovel, input.cidade);
        console.log('📊 Validação de LTV:', ltvValidation);
        
        if (!ltvValidation.valid) {
          // Retornar erro com sugestão de ajuste
          let errorMessage = ltvValidation.message;
          if (ltvValidation.suggestedLoanAmount) {
            errorMessage += `. Valor máximo recomendado: R$ ${ltvValidation.suggestedLoanAmount.toLocaleString('pt-BR')}`;
          }
          throw new Error(errorMessage);
        }
      } else {
        // Para imóveis rurais (LTV 1), aplicar limite de 30% do valor do imóvel
        const ltvCalculado = (input.valorEmprestimo / input.valorImovel) * 100;
        if (ltvCalculado > 30) {
          const valorMaximo = Math.floor((input.valorImovel * 30) / 100);
          throw new Error(`Para a cidade ${input.cidade}, trabalhamos apenas com imóveis rurais com limite de empréstimo de até 30% do valor do imóvel. Valor máximo: R$ ${valorMaximo.toLocaleString('pt-BR')}`);
        }
      }

      // 4. Validar parâmetros do empréstimo
      const paramValidation = validateLoanParameters(input.valorEmprestimo, input.parcelas);
      if (!paramValidation.valid) {
        throw new Error(paramValidation.error || 'Parâmetros inválidos');
      }

      // 5. Calcular empréstimo
      const taxaJuros = getInterestRate();
      const calculation = calculateLoan(input.valorEmprestimo, taxaJuros, input.parcelas);
      
      console.log('💰 Cálculo realizado:', calculation);

      // 6. Preparar resultado no formato esperado
      const simulationId = this.generateSimulationId();
      const result: SimulationResult = {
        id: simulationId,
        valor: input.tipoAmortizacao === 'PRICE' ? calculation.parcelaPrice : calculation.parcelaSac.inicial,
        amortizacao: input.tipoAmortizacao,
        parcelas: input.parcelas,
        primeiraParcela: calculation.parcelaSac.inicial,
        ultimaParcela: calculation.parcelaSac.final,
        valorEmprestimo: input.valorEmprestimo,
        valorImovel: input.valorImovel,
        cidade: input.cidade,
        sessionId: input.sessionId
      };

      // 7. Salvar no Supabase (mantendo integração original)
      try {
        const supabaseData = {
          session_id: input.sessionId,
          nome_completo: input.nomeCompleto || 'Simulação Anônima', // Temporário até preenchimento do contato
          email: input.email || 'nao-informado@temp.com',
          telefone: input.telefone || '(00) 00000-0000',
          cidade: input.cidade,
          valor_emprestimo: input.valorEmprestimo,
          valor_imovel: input.valorImovel,
          parcelas: input.parcelas,
          tipo_amortizacao: input.tipoAmortizacao,
          parcela_inicial: calculation.parcelaSac.inicial,
          parcela_final: calculation.parcelaSac.final,
          user_agent: input.userAgent || '',
          ip_address: input.ipAddress || '',
          status: 'simulacao_realizada' // Status inicial
        };

        const supabaseResult = await supabaseApi.createSimulacao(supabaseData);
        console.log('✅ Simulação salva no Supabase:', supabaseResult);
        
        // Usar ID do Supabase se disponível
        if (supabaseResult?.id) {
          result.id = supabaseResult.id;
        }
      } catch (supabaseError) {
        console.warn('⚠️ Erro ao salvar no Supabase (continuando):', supabaseError);
      }

      // 8. Armazenar localmente como backup
      this.saveSimulationLocally(result, input);

      console.log('✅ Simulação local realizada com sucesso:', result);
      return result;

    } catch (error) {
      console.error('❌ Erro na simulação local:', error);
      throw error;
    }
  }

  /**
   * Processa contato pós-simulação
   * Integra com API Ploomes e Supabase
   */
  static async processContact(input: ContactFormInput & {
    valorDesejadoEmprestimo?: number;
    valorImovelGarantia?: number;
    quantidadeParcelas?: number;
    tipoAmortizacao?: string;
    valorParcelaCalculada?: number;
    aceitaPolitica?: boolean;
  }): Promise<{success: boolean, message: string}> {
    try {
      console.log('📧 Processando contato com integração:', input);
      
      // Validar dados
      if (!validateEmail(input.email)) {
        throw new Error('Email inválido');
      }
      
      if (!validatePhone(input.telefone)) {
        throw new Error('Telefone inválido');
      }

      // Obter dados da simulação do Supabase
      let simulationData = null;
      try {
        if (input.simulationId) {
          const { data } = await supabase
            .from('simulacoes')
            .select('*')
            .eq('id', input.simulationId)
            .single();
          simulationData = data;
          console.log('📊 Dados da simulação obtidos:', simulationData);
        }
      } catch (supabaseError) {
        console.warn('⚠️ Erro ao obter simulação do Supabase:', supabaseError);
      }

      // Preparar payload para API Ploomes com validação de tipos
      const ploomesPayload = {
        cidade: simulationData?.cidade || 'Não informado',
        valorDesejadoEmprestimo: Number(input.valorDesejadoEmprestimo || simulationData?.valor_emprestimo || 0),
        valorImovelGarantia: Number(input.valorImovelGarantia || simulationData?.valor_imovel || 0),
        quantidadeParcelas: Number(input.quantidadeParcelas || simulationData?.parcelas || 36),
        tipoAmortizacao: (input.tipoAmortizacao || simulationData?.tipo_amortizacao || 'PRICE').toUpperCase(),
        valorParcelaCalculada: Number(input.valorParcelaCalculada || simulationData?.parcela_inicial || 0),
        nomeCompleto: input.nomeCompleto.trim(),
        email: input.email.trim().toLowerCase(),
        telefone: input.telefone.replace(/\D/g, ''), // Remove all non-digits
        imovelProprio: input.imovelProprio === 'proprio' ? 'Imóvel próprio' : 'Imóvel de terceiro',
        aceitaPolitica: Boolean(input.aceitaPolitica)
      };

      // Validar campos obrigatórios
      if (!ploomesPayload.nomeCompleto) {
        throw new Error('Nome completo é obrigatório');
      }
      if (!ploomesPayload.email || !ploomesPayload.email.includes('@')) {
        throw new Error('Email válido é obrigatório');
      }
      if (!ploomesPayload.telefone || ploomesPayload.telefone.length < 10) {
        throw new Error('Telefone válido é obrigatório');
      }
      if (ploomesPayload.valorDesejadoEmprestimo <= 0) {
        throw new Error('Valor do empréstimo deve ser maior que zero');
      }
      if (ploomesPayload.valorImovelGarantia <= 0) {
        throw new Error('Valor do imóvel deve ser maior que zero');
      }
      if (ploomesPayload.valorParcelaCalculada <= 0) {
        throw new Error('Valor da parcela deve ser maior que zero');
      }

      console.log('🚀 Enviando para API Ploomes:', ploomesPayload);

      // Enviar para API Ploomes
      const ploomesResponse = await fetch('https://api-ploomes.vercel.app/cadastro/online/env', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ploomesPayload)
      });

      if (!ploomesResponse.ok) {
        const errorText = await ploomesResponse.text();
        console.error('❌ Erro na API Ploomes:', {
          status: ploomesResponse.status,
          statusText: ploomesResponse.statusText,
          headers: Object.fromEntries(ploomesResponse.headers.entries()),
          errorText,
          sentPayload: ploomesPayload
        });
        throw new Error(`Erro na API Ploomes: ${ploomesResponse.status} - ${errorText}`);
      }

      const ploomesResult = await ploomesResponse.json();
      console.log('✅ Sucesso na API Ploomes:', ploomesResult);

      // Atualizar contato no Supabase com dados completos
      try {
        if (input.simulationId) {
          const updateData = {
            nome_completo: input.nomeCompleto,
            email: input.email,
            telefone: input.telefone,
            imovel_proprio: input.imovelProprio,
            status: 'lead_capturado'
          };
          
          console.log('🔄 Atualizando simulação no Supabase:', {
            simulationId: input.simulationId,
            updateData,
            inputData: {
              nomeCompleto: input.nomeCompleto,
              email: input.email,
              telefone: input.telefone,
              imovelProprio: input.imovelProprio
            }
          });
          
          // Primeiro verificar se a simulação existe
          const { data: existingData, error: selectError } = await supabase
            .from('simulacoes')
            .select('id, nome_completo, email, telefone, imovel_proprio, status')
            .eq('id', input.simulationId)
            .single();
            
          if (selectError) {
            console.error('❌ Erro ao buscar simulação:', selectError);
            throw new Error(`Simulação não encontrada: ${selectError.message}`);
          }
          
          console.log('📊 Dados antes da atualização:', existingData);
          
          const { data, error } = await supabase
            .from('simulacoes')
            .update(updateData)
            .eq('id', input.simulationId)
            .select();
            
          if (error) {
            console.error('❌ Erro ao atualizar Supabase:', {
              error,
              code: error.code,
              message: error.message,
              details: error.details,
              hint: error.hint
            });
            throw error;
          }
          
          console.log('✅ Contato atualizado no Supabase:', {
            antes: existingData,
            depois: data?.[0],
            success: !!data?.[0]
          });
          
          if (!data || data.length === 0) {
            throw new Error('Nenhuma linha foi atualizada no Supabase');
          }
        } else {
          throw new Error('ID da simulação não fornecido para atualização');
        }
      } catch (supabaseError) {
        console.error('❌ Erro crítico ao atualizar contato no Supabase:', supabaseError);
        // Re-throw para mostrar erro ao usuário se for crítico
        if (supabaseError instanceof Error && 
            (supabaseError.message.includes('não encontrada') || 
             supabaseError.message.includes('ID da simulação'))) {
          throw supabaseError;
        }
        // Para outros erros, apenas avisar mas continuar
        console.warn('⚠️ Continuando apesar do erro no Supabase');
      }

      // Salvar contato localmente como backup
      this.saveContactLocally(input);

      console.log('✅ Contato processado com sucesso');
      return {
        success: true,
        message: 'Dados enviados com sucesso! Nossa equipe entrará em contato em breve.'
      };

    } catch (error) {
      console.error('❌ Erro ao processar contato:', error);
      
      // Salvar localmente mesmo em caso de erro
      try {
        this.saveContactLocally(input);
        console.log('💾 Dados salvos localmente como backup');
      } catch (localError) {
        console.error('❌ Erro ao salvar localmente:', localError);
      }
      
      throw error;
    }
  }

  /**
   * Validação de entrada (reutilizada do serviço original)
   */
  private static validateSimulationInput(input: SimulationInput): void {
    if (!input.sessionId) {
      throw new Error('Session ID é obrigatório');
    }
    
    if (!input.cidade || input.cidade.trim() === '') {
      throw new Error('Cidade é obrigatória');
    }
    
    if (!input.valorEmprestimo || input.valorEmprestimo <= 0) {
      throw new Error('Valor do empréstimo deve ser maior que zero');
    }
    
    if (!input.valorImovel || input.valorImovel <= 0) {
      throw new Error('Valor do imóvel deve ser maior que zero');
    }
    
    if (!input.parcelas || input.parcelas < 36 || input.parcelas > 180) {
      throw new Error('Número de parcelas deve estar entre 36 e 180 meses');
    }
    
    if (!input.tipoAmortizacao || !['SAC', 'PRICE'].includes(input.tipoAmortizacao)) {
      throw new Error('Tipo de amortização deve ser SAC ou PRICE');
    }
  }

  /**
   * Gera ID único para simulação
   */
  private static generateSimulationId(): string {
    return `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Salva simulação no localStorage
   */
  private static saveSimulationLocally(result: SimulationResult, input: SimulationInput): void {
    try {
      const simulationData = {
        ...result,
        timestamp: new Date().toISOString(),
        userAgent: input.userAgent,
        fullInput: input
      };

      // Obter simulações existentes
      const existing = localStorage.getItem('libra_local_simulations');
      const simulations = existing ? JSON.parse(existing) : [];
      
      // Adicionar nova simulação
      simulations.unshift(simulationData);
      
      // Manter apenas últimas 50 simulações
      const limited = simulations.slice(0, 50);
      
      // Salvar de volta
      localStorage.setItem('libra_local_simulations', JSON.stringify(limited));
      
      console.log('💾 Simulação salva localmente');
    } catch (error) {
      console.warn('⚠️ Erro ao salvar simulação localmente:', error);
    }
  }

  /**
   * Salva contato no localStorage
   */
  private static saveContactLocally(input: ContactFormInput): void {
    try {
      const contactData = {
        ...input,
        timestamp: new Date().toISOString()
      };

      // Obter contatos existentes
      const existing = localStorage.getItem('libra_local_contacts');
      const contacts = existing ? JSON.parse(existing) : [];
      
      // Adicionar novo contato
      contacts.unshift(contactData);
      
      // Manter apenas últimos 100 contatos
      const limited = contacts.slice(0, 100);
      
      // Salvar de volta
      localStorage.setItem('libra_local_contacts', JSON.stringify(limited));
      
      console.log('💾 Contato salvo localmente');
    } catch (error) {
      console.warn('⚠️ Erro ao salvar contato localmente:', error);
    }
  }

  /**
   * Obtém estatísticas das simulações locais
   */
  static getLocalStats(): {
    totalSimulations: number;
    totalContacts: number;
    lastSimulation?: Date;
    lastContact?: Date;
  } {
    try {
      const simulations = JSON.parse(localStorage.getItem('libra_local_simulations') || '[]');
      const contacts = JSON.parse(localStorage.getItem('libra_local_contacts') || '[]');
      
      return {
        totalSimulations: simulations.length,
        totalContacts: contacts.length,
        lastSimulation: simulations.length > 0 ? new Date(simulations[0].timestamp) : undefined,
        lastContact: contacts.length > 0 ? new Date(contacts[0].timestamp) : undefined
      };
    } catch (error) {
      console.warn('⚠️ Erro ao obter estatísticas locais:', error);
      return {
        totalSimulations: 0,
        totalContacts: 0
      };
    }
  }
}