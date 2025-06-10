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
  
  // Taxa de juros (campo único enviado para API)
  juros: number;
  
  // Carência (campo único enviado para API) 
  carencia: number;
  
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
    content: `
      <h2>O que é Home Equity?</h2>
      <p>Home Equity é uma modalidade de crédito onde você utiliza seu imóvel como garantia para obter empréstimos com condições muito mais vantajosas. Esta modalidade permite acessar até 50% do valor de avaliação do imóvel com taxas reduzidas e prazos estendidos.</p>

      <h2>Como Funciona o Home Equity</h2>
      <p>O processo é simples: seu imóvel serve como garantia real para o empréstimo, o que reduz o risco para a instituição financeira e resulta em melhores condições para você. O imóvel continua sendo seu e você pode continuar morando nele normalmente.</p>

      <h3>Principais características:</h3>
      <ul>
        <li>Taxa de juros reduzida (a partir de 1,09% a.m.)</li>
        <li>Prazos de até 15 anos para pagamento</li>
        <li>Liberação de até 50% do valor do imóvel</li>
        <li>Sem comprovação de finalidade do uso</li>
        <li>Flexibilidade total no uso do recurso</li>
      </ul>

      <h2>Vantagens do Home Equity</h2>
      <p>O crédito com garantia de imóvel oferece as melhores condições do mercado financeiro, permitindo que você realize seus projetos com economia significativa em juros.</p>

      <h3>Benefícios principais:</h3>
      <ul>
        <li>Juros muito menores que outras modalidades</li>
        <li>Maior valor liberado</li>
        <li>Prazos mais longos para pagamento</li>
        <li>Facilidade na aprovação</li>
        <li>Processo 100% digital</li>
      </ul>

      <h2>Quem Pode Contratar?</h2>
      <p>Qualquer pessoa física ou jurídica que possua um imóvel quitado ou com financiamento em fase final pode solicitar o Home Equity. O imóvel deve estar regularizado e com documentação em ordem.</p>

      <h2>Crescimento do Mercado</h2>
      <p>O crédito com garantia imobiliária atingiu R$ 19,7 bilhões em dezembro de 2023, representando crescimento de 19,3% em relação a 2022. Este crescimento demonstra a confiança dos brasileiros nesta modalidade.</p>
    `,
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
    content: `
      <h2>Home Equity: Entendendo Completamente a Modalidade</h2>
      <p>O Home Equity representa uma revolução no mercado de crédito brasileiro, oferecendo condições excepcionais para quem possui imóvel próprio. Com taxas a partir de 1,09% ao mês e prazos de até 15 anos, esta modalidade transforma seu patrimônio imobiliário em uma ferramenta financeira poderosa.</p>

      <h2>Características Técnicas Detalhadas</h2>
      <p>A Libra Crédito, com mais de 40 anos de experiência do Grupo Construtora Stefani, oferece todas as vantagens do mercado nesta modalidade.</p>

      <h3>Especificações da modalidade:</h3>
      <ul>
        <li><strong>Taxa de juros:</strong> A partir de 1,09% ao mês</li>
        <li><strong>Prazo máximo:</strong> Até 15 anos (180 meses)</li>
        <li><strong>Valor liberado:</strong> Até 50% do valor de avaliação</li>
        <li><strong>Carência:</strong> Até 6 meses (opcional)</li>
        <li><strong>Amortização:</strong> Sistema SAC ou Tabela Price</li>
        <li><strong>Garantia:</strong> Alienação fiduciária do imóvel</li>
      </ul>

      <h2>Processo Completo de Contratação</h2>
      <p>O processo foi otimizado para ser 100% digital, garantindo agilidade e segurança em todas as etapas.</p>

      <h3>Etapas do processo:</h3>
      <ol>
        <li><strong>Simulação online:</strong> Calcule valores e condições</li>
        <li><strong>Envio de documentos:</strong> Upload seguro da documentação</li>
        <li><strong>Análise de crédito:</strong> Avaliação em até 48 horas</li>
        <li><strong>Avaliação do imóvel:</strong> Laudo técnico profissional</li>
        <li><strong>Aprovação:</strong> Proposta final personalizada</li>
        <li><strong>Assinatura:</strong> Contrato digital ou presencial</li>
        <li><strong>Registro:</strong> Averbação no cartório de imóveis</li>
        <li><strong>Liberação:</strong> Recursos disponibilizados</li>
      </ol>

      <h2>Avaliação Imobiliária Profissional</h2>
      <p>A avaliação é realizada por engenheiros especializados, seguindo normas da ABNT NBR 14653. Consideramos localização, estado de conservação, área útil, documentação e potencial de valorização.</p>

      <h2>Segurança Jurídica Total</h2>
      <p>Todos os contratos seguem as determinações do Banco Central e são registrados em cartório, garantindo segurança jurídica completa para ambas as partes.</p>

      <h2>Atendimento Personalizado</h2>
      <p>Nossa equipe oferece acompanhamento personalizado em todas as etapas, garantindo que você compreenda completamente o processo e tenha suporte sempre que necessário.</p>
    `,
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
    content: `
      <h2>A Estratégia de Investimento sem Descapitalização</h2>
      <p>O Home Equity permite uma estratégia financeira inteligente: usar o valor do seu imóvel para investir sem precisar vendê-lo ou comprometer sua moradia. Esta abordagem maximiza o potencial do seu patrimônio imobiliário.</p>

      <h2>Como Funciona na Prática</h2>
      <p>Ao invés de vender seu imóvel para ter capital de investimento, você utiliza o Home Equity para acessar recursos com taxas baixas, mantendo a propriedade e ainda podendo se beneficiar de sua valorização.</p>

      <h3>Vantagens desta estratégia:</h3>
      <ul>
        <li>Mantém a propriedade do imóvel</li>
        <li>Acessa capital com taxas reduzidas</li>
        <li>Beneficia-se da valorização imobiliária</li>
        <li>Flexibilidade total no uso dos recursos</li>
        <li>Preserva seu local de moradia</li>
      </ul>

      <h2>Oportunidades de Investimento</h2>
      <p>Com os recursos do Home Equity, você pode diversificar seus investimentos e construir uma carteira mais robusta.</p>

      <h3>Opções de investimento:</h3>
      <ul>
        <li><strong>Mercado financeiro:</strong> CDBs, LCIs, LCAs, Tesouro Direto</li>
        <li><strong>Fundos imobiliários:</strong> Diversificação no setor imobiliário</li>
        <li><strong>Ações:</strong> Participação no crescimento das empresas</li>
        <li><strong>Empreendimentos:</strong> Abertura ou expansão de negócios</li>
        <li><strong>Educação:</strong> Cursos e especializações</li>
      </ul>
    `,
    readTime: 10,
    published: true,
    featuredPost: false,
    createdAt: '2024-03-23T00:00:00.000Z',
    updatedAt: '2024-03-23T00:00:00.000Z'
  },
  {
    id: '4',
    title: 'Simplificando o Pós-venda: Um Guia para Retirar seus Boletos',
    description: 'Conheça as ferramentas disponíveis para clientes: Chat Bot e Portal do Cliente para retirada de boletos.',
    category: 'home-equity',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'simplificando-pos-venda-guia-boletos',
    content: `
      <h2>Atendimento Pós-Venda Digital</h2>
      <p>Na Libra Crédito, oferecemos diversas ferramentas digitais para facilitar o relacionamento com nossos clientes após a contratação do Home Equity.</p>

      <h2>Chat Bot Inteligente</h2>
      <p>Nosso chat bot está disponível 24/7 para auxiliar na retirada de boletos e esclarecimento de dúvidas básicas sobre seu contrato.</p>

      <h2>Portal do Cliente</h2>
      <p>Acesse seu Portal do Cliente para visualizar e baixar seus boletos, acompanhar seu histórico de pagamentos e muito mais.</p>
    `,
    readTime: 5,
    published: true,
    featuredPost: false,
    createdAt: '2024-03-22T00:00:00.000Z',
    updatedAt: '2024-03-22T00:00:00.000Z'
  },
  {
    id: '5',
    title: 'Processo de Registro e Liberação de Recurso no Home Equity',
    description: 'Passo a passo completo das etapas após formalização do contrato de empréstimo com garantia imobiliária.',
    category: 'home-equity',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'processo-registro-liberacao-home-equity',
    content: `
      <h2>Etapas do Registro</h2>
      <p>Após a assinatura do contrato, iniciamos o processo de registro no cartório de imóveis para formalizar a garantia.</p>

      <h2>Liberação dos Recursos</h2>
      <p>Uma vez registrado, os recursos são liberados conforme acordo estabelecido no contrato.</p>
    `,
    readTime: 8,
    published: true,
    featuredPost: false,
    createdAt: '2024-03-21T00:00:00.000Z',
    updatedAt: '2024-03-21T00:00:00.000Z'
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
        const posts = JSON.parse(stored);
        // Se temos poucos posts, reinicializar com todos os posts existentes
        if (posts.length < 5) {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(EXISTING_POSTS));
          return EXISTING_POSTS;
        }
        return posts;
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
        
        // Taxa de juros (enviada para API)
        juros: 1.19,
        
        // Carência (enviada para API)
        carencia: 1,
        
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