/**
 * Configuração do cliente Supabase
 * 
 * @file supabase.ts
 * @description Configuração centralizada do cliente Supabase para integração com banco de dados
 * 
 * @features
 * - Cliente configurado com URL e API Key
 * - Tipos TypeScript para tabelas
 * - Configurações de segurança
 * 
 * @security
 * - API Key anônima (somente leitura/escrita conforme RLS)
 * - URLs e keys em variáveis de ambiente para produção
 * 
 * @database_schema
 * - simulacoes: Dados de simulação de crédito
 * - user_journey: Tracking de jornada do usuário
 */

import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const supabaseUrl = 'https://plqljbugvhrffmvdsmsb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscWxqYnVndmhyZmZtdmRzbXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDIyNjYsImV4cCI6MjA2NDgxODI2Nn0.D9n_r-aQeApj9fADGhiiOBKoaqV3rzuBvWCAx3g3exY';

// Tipos TypeScript para as tabelas
export interface SimulacaoData {
  id?: string;
  session_id: string;
  nome_completo: string;
  email: string;
  telefone: string;
  cidade: string;
  valor_emprestimo: number;
  valor_imovel: number;
  parcelas: number;
  tipo_amortizacao: string;
  parcela_inicial?: number;
  parcela_final?: number;
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
  status?: string;
}

export interface UserJourneyData {
  id?: string;
  session_id: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page: string;
  pages_visited: PageVisit[];
  time_on_site?: number;
  device_info?: DeviceInfo;
  ip_address?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PageVisit {
  url: string;
  timestamp: string;
  time_spent?: number;
}

export interface DeviceInfo {
  user_agent: string;
  screen_resolution: string;
  viewport_size: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
}

// Schema do banco para TypeScript
export interface Database {
  public: {
    Tables: {
      simulacoes: {
        Row: SimulacaoData;
        Insert: Omit<SimulacaoData, 'id' | 'created_at'>;
        Update: Partial<Omit<SimulacaoData, 'id' | 'created_at'>>;
      };
      user_journey: {
        Row: UserJourneyData;
        Insert: Omit<UserJourneyData, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserJourneyData, 'id' | 'created_at'>>;
      };
    };
  };
}

// Cliente Supabase tipado
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // Não precisamos de autenticação de usuário
  }
});

// Funções auxiliares para operações no banco
export const supabaseApi = {
  // Simulações
  async createSimulacao(data: Database['public']['Tables']['simulacoes']['Insert']) {
    const { data: result, error } = await supabase
      .from('simulacoes')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async getSimulacoes(limit = 50) {
    const { data, error } = await supabase
      .from('simulacoes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async updateSimulacaoStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('simulacoes')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // User Journey
  async createUserJourney(data: Database['public']['Tables']['user_journey']['Insert']) {
    const { data: result, error } = await supabase
      .from('user_journey')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async updateUserJourney(sessionId: string, data: Database['public']['Tables']['user_journey']['Update']) {
    const { data: result, error } = await supabase
      .from('user_journey')
      .update(data)
      .eq('session_id', sessionId)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async getUserJourney(sessionId: string) {
    const { data, error } = await supabase
      .from('user_journey')
      .select('*')
      .eq('session_id', sessionId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    return data;
  },

  // Analytics
  async getSimulacaoStats() {
    const { data, error } = await supabase
      .rpc('get_simulacao_stats'); // Função SQL customizada
    
    if (error) throw error;
    return data;
  }
};

export default supabase;
