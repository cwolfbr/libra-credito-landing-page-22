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
  taxaJurosMin: number;
  taxaJurosMax: number;
  valorMinimo: number;
  valorMaximo: number;
  parcelasMin: number;
  parcelasMax: number;
  percentualMaximo: number;
  taxaPadrao: number;
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
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      return [];
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
        taxaJurosMin: 1.09,
        taxaJurosMax: 2.5,
        valorMinimo: 100000,
        valorMaximo: 5000000,
        parcelasMin: 36,
        parcelasMax: 180,
        percentualMaximo: 70,
        taxaPadrao: 1.19,
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