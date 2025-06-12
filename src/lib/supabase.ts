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
  imovel_proprio?: 'proprio' | 'terceiro';
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
  status?: string;
}

export interface ParceiroData {
  id?: string;
  session_id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  cnpj?: string;
  tempo_home_equity: string;
  perfil_cliente: string;
  ramo_atuacao: string;
  origem: string;
  mensagem?: string;
  ip_address?: string;
  user_agent?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
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

export interface BlogPostData {
  id?: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  slug: string;
  content: string;
  read_time: number;
  published: boolean;
  featured_post: boolean;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
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
      parceiros: {
        Row: ParceiroData;
        Insert: Omit<ParceiroData, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ParceiroData, 'id' | 'created_at'>>;
      };
      user_journey: {
        Row: UserJourneyData;
        Insert: Omit<UserJourneyData, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserJourneyData, 'id' | 'created_at'>>;
      };
      blog_posts: {
        Row: BlogPostData;
        Insert: Omit<BlogPostData, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BlogPostData, 'id' | 'created_at'>>;
      };
    };
  };
}

// Cliente Supabase tipado
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // Não precisamos de autenticação de usuário
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
});

// Funções auxiliares para operações no banco
export const supabaseApi = {
  // Teste de conexão
  async testConnection() {
    try {
      const { data, error } = await supabase
        .from('parceiros')
        .select('count')
        .limit(1);
      
      if (error) {
        // Log silencioso para evitar poluição do console
        if (process.env.NODE_ENV === 'development') {
          console.warn('Supabase connection issue:', error.message);
        }
        return false;
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Conexão Supabase OK');
      }
      return true;
    } catch (error) {
      // Evitar console errors em produção
      if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase connection failed:', error);
      }
      return false;
    }
  },

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

  // Parceiros
  async createParceiro(data: Database['public']['Tables']['parceiros']['Insert']) {
    const { data: result, error } = await supabase
      .from('parceiros')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async getParceiros(limit = 50) {
    const { data, error } = await supabase
      .from('parceiros')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async updateParceiroStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('parceiros')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Blog Posts
  async createBlogPost(data: Database['public']['Tables']['blog_posts']['Insert']) {
    const { data: result, error } = await supabase
      .from('blog_posts')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async getBlogPosts(limit = 50) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getBlogPostById(id: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getBlogPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateBlogPost(id: string, data: Database['public']['Tables']['blog_posts']['Update']) {
    const { data: result, error } = await supabase
      .from('blog_posts')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async deleteBlogPost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // User Journey
  async createUserJourney(data: Database['public']['Tables']['user_journey']['Insert']) {
    // Usar insert simples primeiro, depois upsert se necessário
    const { data: result, error } = await supabase
      .from('user_journey')
      .insert(data)
      .select()
      .maybeSingle();
    
    if (error) {
      // Se der erro de conflito, tentar upsert
      if (error.code === '23505') { // código de unique constraint violation
        const { data: upsertResult, error: upsertError } = await supabase
          .from('user_journey')
          .upsert(data, { onConflict: 'session_id' })
          .select()
          .maybeSingle();
        
        if (upsertError) throw upsertError;
        return upsertResult;
      }
      throw error;
    }
    return result;
  },

  async updateUserJourney(sessionId: string, data: Database['public']['Tables']['user_journey']['Update']) {
    const { data: result, error } = await supabase
      .from('user_journey')
      .update(data)
      .eq('session_id', sessionId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return result;
  },

  async getUserJourney(sessionId: string) {
    const { data, error } = await supabase
      .from('user_journey')
      .select('*')
      .eq('session_id', sessionId)
      .maybeSingle(); // Use maybeSingle ao invés de single para evitar erro quando não encontrar
    
    if (error) throw error;
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
