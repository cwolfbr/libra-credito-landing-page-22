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

      if (!cityValidation.allowCalculation) {
        // Retornar mensagens específicas baseadas no LTV da cidade
        switch (cityValidation.status) {
          case 'not_working':
            throw new Error(`Ainda não trabalhamos em ${input.cidade}. Nossa equipe está expandindo nossa cobertura.`);
          case 'rural_only':
            throw new Error(`Para a cidade ${input.cidade}, trabalhamos apenas com imóveis rurais. Confirme se seu imóvel é rural.`);
          default:
            throw new Error(cityValidation.message);
        }
      }

      // 3. Validar LTV específico da cidade
      const ltvValidation = validateLTV(input.valorEmprestimo, input.valorImovel, input.cidade);
      console.log('📊 Validação de LTV:', ltvValidation);
      
      if (!ltvValidation.valid) {
        // Retornar erro com sugestão de ajuste
        let errorMessage = ltvValidation.message;
        if (ltvValidation.suggestedLoanAmount) {
          errorMessage += `. Valor máximo recomendado: R$ ${ltvValidation.suggestedLoanAmount.toLocaleString('pt-BR')}`;
        }
        throw new Error(errorMessage);
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
      const result: SimulationResult = {
        id: this.generateSimulationId(),
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

      // 7. Armazenar localmente (opcional)
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
   * Mantém interface do serviço original
   */
  static async processContact(input: ContactFormInput): Promise<{success: boolean, message: string}> {
    try {
      console.log('📧 Processando contato local:', input);
      
      // Validar dados
      if (!validateEmail(input.email)) {
        throw new Error('Email inválido');
      }
      
      if (!validatePhone(input.telefone)) {
        throw new Error('Telefone inválido');
      }

      // Salvar contato localmente
      this.saveContactLocally(input);

      console.log('✅ Contato processado localmente');
      return {
        success: true,
        message: 'Dados salvos com sucesso! Nossa equipe entrará em contato.'
      };

    } catch (error) {
      console.error('❌ Erro ao processar contato:', error);
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