/**
 * Serviço para gerenciamento de posts do blog
 * 
 * @service BlogService
 * @description Gerencia CRUD de posts do blog, categorias e configurações
 */

export interface BlogPost {
  id?: string;
  title: string;
  description: string;
  category: BlogCategory;
  imageUrl: string;
  slug: string;
  content: string;
  readTime: number;
  published: boolean;
  featuredPost: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type BlogCategory = 
  | 'home-equity'
  | 'cgi'
  | 'consolidacao'
  | 'reformas'
  | 'credito-rural'
  | 'documentacao'
  | 'score-credito'
  | 'educacao-financeira';

export interface BlogCategory {
  id: BlogCategory;
  name: string;
  description: string;
  icon: string;
}

export interface SimulationConfig {
  // Limites de valor
  valorMinimo: number;
  valorMaximo: number;
  
  // Limites de parcelas  
  parcelasMin: number;
  parcelasMax: number;
  
  // Taxas de juros
  taxaJurosMin: number;
  taxaJurosMax: number;
  taxaPadrao: number;
  
  // Configurações do imóvel
  percentualMaximo: number; // % máximo do valor do imóvel
  multiplicadorMinimo: number; // quantas vezes o valor deve ser maior que o empréstimo
  
  // Configurações de carência
  carenciaPadrao: number;
  carenciaMinima: number;
  carenciaMaxima: number;
  
  // URL da API
  apiUrl: string;
  
  // Configurações gerais
  custoOperacional: number;
  updateAt?: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'home-equity',
    name: 'Home Equity',
    description: 'Crédito com garantia de imóvel - melhores condições',
    icon: 'Home'
  },
  {
    id: 'cgi',
    name: 'Capital de Giro',
    description: 'Soluções inteligentes para capital de giro empresarial',
    icon: 'TrendingUp'
  },
  {
    id: 'consolidacao',
    name: 'Consolidação de Dívidas',
    description: 'Organize suas finanças e reduza juros',
    icon: 'Wallet'
  },
  {
    id: 'credito-rural',
    name: 'Crédito Rural',
    description: 'Financiamento para propriedades rurais e agronegócio',
    icon: 'Building'
  },
  {
    id: 'documentacao',
    name: 'Documentação',
    description: 'Guias sobre documentos e regularização',
    icon: 'FileText'
  },
  {
    id: 'score-credito',
    name: 'Score e Crédito',
    description: 'Dicas para melhorar seu score e análise de crédito',
    icon: 'CreditCard'
  },
  {
    id: 'educacao-financeira',
    name: 'Educação Financeira',
    description: 'Conhecimento para decisões financeiras conscientes',
    icon: 'BookOpen'
  },
  {
    id: 'reformas',
    name: 'Projetos/Reformas',
    description: 'Realize seus projetos com as melhores condições',
    icon: 'Home'
  }
];

// Posts existentes do site para inicialização
const EXISTING_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Home Equity: O que é e como conseguir esse tipo de crédito',
    description: 'Guia completo sobre Home Equity - modalidade que permite usar seu imóvel como garantia para obter crédito com melhores condições.',
    category: 'home-equity',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'home-equity-o-que-e-como-conseguir',
    content: 'Home Equity é uma modalidade de crédito que permite usar seu imóvel como garantia...',
    readTime: 8,
    published: true,
    featuredPost: true,
    createdAt: '2024-03-25T00:00:00.000Z',
    updatedAt: '2024-03-25T00:00:00.000Z'
  },
  {
    id: '2', 
    title: 'Home Equity: Guia Completo para Entender a Modalidade de Uma Vez por Todas',
    description: 'Tudo sobre crédito com garantia de imóvel: taxas desde 1,09% a.m., prazos até 15 anos e como funciona.',
    category: 'home-equity',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'home-equity-guia-completo-modalidade',
    content: 'Este é o guia definitivo sobre Home Equity. Vamos explicar tudo que você precisa saber...',
    readTime: 12,
    published: true,
    featuredPost: false,
    createdAt: '2024-03-24T00:00:00.000Z',
    updatedAt: '2024-03-24T00:00:00.000Z'
  },
  {
    id: '3',
    title: 'Como Investir sem Descapitalizar usando Home Equity',
    description: 'Descubra como usar seu imóvel como fonte de investimento acessível, obtendo crédito sem se descapitalizar.',
    category: 'home-equity',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'como-investir-sem-descapitalizar-home-equity',
    content: 'Investir sem descapitalizar é o sonho de todo empreendedor...',
    readTime: 10,
    published: true,
    featuredPost: false,
    createdAt: '2024-03-23T00:00:00.000Z',
    updatedAt: '2024-03-23T00:00:00.000Z'
  }
];

export class BlogService {
  private static readonly STORAGE_KEY = 'libra_blog_posts';
  private static readonly CONFIG_KEY = 'libra_simulation_config';

  /**
   * Gerar slug a partir do título
   */
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens múltiplos
      .replace(/^-|-$/g, ''); // Remove hífens do início/fim
  }

  /**
   * Calcular tempo de leitura baseado no conteúdo
   */
  static calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  /**
   * Validar post
   */
  static validatePost(post: Partial<BlogPost>): string[] {
    const errors: string[] = [];
    
    if (!post.title?.trim()) errors.push('Título é obrigatório');
    if (!post.description?.trim()) errors.push('Descrição é obrigatória');
    if (!post.category) errors.push('Categoria é obrigatória');
    if (!post.content?.trim()) errors.push('Conteúdo é obrigatório');
    if (!post.imageUrl?.trim()) errors.push('URL da imagem é obrigatória');
    
    if (post.title && post.title.length > 100) {
      errors.push('Título deve ter no máximo 100 caracteres');
    }
    
    if (post.description && post.description.length > 200) {
      errors.push('Descrição deve ter no máximo 200 caracteres');
    }
    
    if (post.slug && !/^[a-z0-9-]+$/.test(post.slug)) {
      errors.push('Slug deve conter apenas letras minúsculas, números e hífens');
    }
    
    return errors;
  }

  /**
   * Obter todos os posts (em produção viria do banco)
   */
  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      } else {
        // Primeira vez acessando - inicializar com posts existentes
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(EXISTING_POSTS));
        return EXISTING_POSTS;
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      return EXISTING_POSTS;
    }
  }

  /**
   * Obter post por ID
   */
  static async getPostById(id: string): Promise<BlogPost | null> {
    const posts = await this.getAllPosts();
    return posts.find(post => post.id === id) || null;
  }

  /**
   * Obter post por slug
   */
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getAllPosts();
    return posts.find(post => post.slug === slug) || null;
  }

  /**
   * Criar novo post
   */
  static async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const errors = this.validatePost(postData);
    if (errors.length > 0) {
      throw new Error(`Dados inválidos: ${errors.join(', ')}`);
    }

    const posts = await this.getAllPosts();
    
    // Verificar se slug já existe
    const existingSlug = posts.find(p => p.slug === postData.slug);
    if (existingSlug) {
      throw new Error('Slug já existe. Escolha outro.');
    }

    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: postData.readTime || this.calculateReadTime(postData.content)
    };

    posts.unshift(newPost); // Adiciona no início
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
    
    return newPost;
  }

  /**
   * Atualizar post existente
   */
  static async updatePost(id: string, postData: Partial<BlogPost>): Promise<BlogPost> {
    const posts = await this.getAllPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index === -1) {
      throw new Error('Post não encontrado');
    }

    const errors = this.validatePost({ ...posts[index], ...postData });
    if (errors.length > 0) {
      throw new Error(`Dados inválidos: ${errors.join(', ')}`);
    }

    // Verificar se novo slug já existe em outro post
    if (postData.slug && posts.some(p => p.id !== id && p.slug === postData.slug)) {
      throw new Error('Slug já existe. Escolha outro.');
    }

    const updatedPost: BlogPost = {
      ...posts[index],
      ...postData,
      updatedAt: new Date().toISOString(),
      readTime: postData.content ? this.calculateReadTime(postData.content) : posts[index].readTime
    };

    posts[index] = updatedPost;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
    
    return updatedPost;
  }

  /**
   * Deletar post
   */
  static async deletePost(id: string): Promise<boolean> {
    const posts = await this.getAllPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    
    if (filteredPosts.length === posts.length) {
      throw new Error('Post não encontrado');
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredPosts));
    return true;
  }

  /**
   * Buscar posts por categoria
   */
  static async getPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => post.category === category && post.published);
  }

  /**
   * Buscar posts publicados
   */
  static async getPublishedPosts(): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => post.published).sort((a, b) => 
      new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
    );
  }

  /**
   * Obter posts em destaque
   */
  static async getFeaturedPosts(): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => post.published && post.featuredPost);
  }

  /**
   * Configurações de simulação
   */
  static async getSimulationConfig(): Promise<SimulationConfig> {
    try {
      const stored = localStorage.getItem(this.CONFIG_KEY);
      return stored ? JSON.parse(stored) : {
        // Limites de valor (baseado na API atual)
        valorMinimo: 100000,
        valorMaximo: 5000000,
        
        // Limites de parcelas
        parcelasMin: 36,
        parcelasMax: 180,
        
        // Taxas de juros
        taxaJurosMin: 1.09,
        taxaJurosMax: 2.5,
        taxaPadrao: 1.19,
        
        // Configurações do imóvel
        percentualMaximo: 70, // 70% do valor do imóvel
        multiplicadorMinimo: 2, // imóvel deve valer 2x o empréstimo
        
        // Configurações de carência
        carenciaPadrao: 1,
        carenciaMinima: 0,
        carenciaMaxima: 12,
        
        // URL da API
        apiUrl: 'https://api-calculos.vercel.app/simulacao',
        
        // Configurações gerais
        custoOperacional: 0.5
      };
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      throw new Error('Erro ao carregar configurações');
    }
  }

  /**
   * Salvar configurações de simulação
   */
  static async saveSimulationConfig(config: SimulationConfig): Promise<SimulationConfig> {
    try {
      const updatedConfig = {
        ...config,
        updateAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.CONFIG_KEY, JSON.stringify(updatedConfig));
      return updatedConfig;
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      throw new Error('Erro ao salvar configurações');
    }
  }

  /**
   * Estatísticas do blog
   */
  static async getBlogStats() {
    const posts = await this.getAllPosts();
    const published = posts.filter(p => p.published);
    const drafts = posts.filter(p => !p.published);
    const featured = posts.filter(p => p.featuredPost && p.published);
    
    const categoryCounts = BLOG_CATEGORIES.map(cat => ({
      category: cat.name,
      count: published.filter(p => p.category === cat.id).length
    }));

    return {
      total: posts.length,
      published: published.length,
      drafts: drafts.length,
      featured: featured.length,
      categoryCounts
    };
  }
}

export default BlogService;