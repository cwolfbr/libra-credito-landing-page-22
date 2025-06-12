/**
 * Serviço para gerenciamento de posts do blog
 * 
 * @service BlogService
 * @description Gerencia CRUD de posts do blog, categorias e configurações
 */

import { supabaseApi, type BlogPostData, type Database } from '@/lib/supabase';

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
  },
  {
    id: '6',
    title: 'Capital de giro para o agronegócio: utilize sua fazenda como garantia e alcance seus objetivos',
    description: 'Descubra como produtores rurais em Ribeirão Preto podem obter capital de giro usando sua propriedade rural como garantia.',
    category: 'credito-rural',
    imageUrl: 'https://www.libracredito.com.br/image/posts/1000/500/uMycX6hJNj7fPDTbntXg76kH85sTNGRcSRQPTCKq.png',
    slug: 'capital-de-giro-agronegocio-fazenda-garantia',
    content: `
      <h2>A Importância do Capital de Giro no Agronegócio</h2>
      <p>O agronegócio é um dos setores mais importantes da economia brasileira, representando uma parcela significativa do PIB nacional. No entanto, produtores rurais frequentemente enfrentam desafios financeiros que podem limitar suas operações e crescimento. Uma das principais necessidades é o acesso a capital de giro para manter as atividades produtivas em funcionamento.</p>

      <p>O capital de giro no agronegócio é fundamental para cobrir despesas operacionais como:</p>
      <ul>
        <li>Compra de sementes, fertilizantes e defensivos agrícolas</li>
        <li>Manutenção de equipamentos e maquinário</li>
        <li>Pagamento de mão de obra</li>
        <li>Custos de armazenamento e transporte</li>
        <li>Investimentos em melhorias e expansão da propriedade</li>
      </ul>

      <h2>A Solução da Libra Crédito para Produtores Rurais</h2>
      <p>A Libra Crédito, com mais de 40 anos de experiência do Grupo Construtora Stefani, oferece uma solução inovadora para produtores rurais da região de Ribeirão Preto: o Crédito Rural com Garantia de Propriedade Rural, também conhecido como "Farm Equity".</p>

      <p>Esta modalidade permite que produtores rurais utilizem suas propriedades como garantia para obter financiamento com condições especiais, mantendo suas atividades produtivas enquanto acessam o capital necessário para seus projetos.</p>

      <h2>Vantagens do Crédito Rural com Garantia de Propriedade</h2>
      
      <h3>1. Maiores Valores de Empréstimo</h3>
      <p>Utilizando sua propriedade rural como garantia, é possível acessar valores significativamente maiores do que outras modalidades de crédito, permitindo investimentos mais robustos em sua atividade agropecuária.</p>

      <h3>2. Taxas de Juros Reduzidas</h3>
      <p>A garantia real oferecida pela propriedade rural resulta em taxas de juros mais baixas, reduzindo o custo do capital e melhorando a viabilidade dos investimentos.</p>

      <h3>3. Prazos Estendidos</h3>
      <p>Os prazos de pagamento são adequados ao ciclo produtivo do agronegócio, com possibilidade de carência e parcelamento que respeita a sazonalidade da atividade rural.</p>

      <h3>4. Flexibilidade no Uso dos Recursos</h3>
      <p>Os recursos podem ser destinados a diversas finalidades:</p>
      <ul>
        <li>Capital de giro para custeio da safra</li>
        <li>Aquisição de equipamentos e maquinário</li>
        <li>Melhorias na infraestrutura da propriedade</li>
        <li>Expansão da área produtiva</li>
        <li>Investimento em tecnologia agrícola</li>
        <li>Diversificação das atividades rurais</li>
      </ul>

      <h3>5. Manutenção das Atividades Produtivas</h3>
      <p>O produtor continua utilizando sua propriedade normalmente, mantendo suas atividades agropecuárias sem interrupção, apenas oferecendo a garantia real para o empréstimo.</p>

      <h2>Diferenciais da Libra Crédito no Agronegócio</h2>

      <h3>Experiência no Setor</h3>
      <p>Com décadas de atuação no mercado financeiro e imobiliário, a Libra Crédito compreende as especificidades do agronegócio e oferece soluções personalizadas para cada produtor rural.</p>

      <h3>Atendimento Especializado</h3>
      <p>Nossa equipe é treinada para entender as necessidades específicas do setor rural, oferecendo consultoria personalizada desde a análise inicial até a liberação dos recursos.</p>

      <h3>Processo Ágil e Eficiente</h3>
      <p>Sabemos que o tempo é crucial no agronegócio. Por isso, nosso processo de análise e aprovação é otimizado para atender aos prazos do produtor rural.</p>

      <h3>Acompanhamento Contínuo</h3>
      <p>Oferecemos suporte durante todo o período do financiamento, com uma equipe dedicada ao atendimento pós-venda e acompanhamento dos contratos rurais.</p>

      <h2>Como Obter Capital de Giro Usando sua Fazenda como Garantia</h2>

      <h3>1. Análise Inicial</h3>
      <p>O primeiro passo é realizar uma análise da viabilidade do financiamento, considerando o valor da propriedade rural, a capacidade de pagamento do produtor e o projeto a ser financiado.</p>

      <h3>2. Documentação da Propriedade</h3>
      <p>É necessário apresentar a documentação completa da propriedade rural, incluindo escrituras, certidões e comprovação de regularidade fundiária.</p>

      <h3>3. Avaliação da Propriedade</h3>
      <p>Uma avaliação técnica da propriedade é realizada por profissionais especializados, considerando fatores como localização, qualidade do solo, benfeitorias e potencial produtivo.</p>

      <h3>4. Análise de Crédito Personalizada</h3>
      <p>Nossa equipe analisa o perfil do produtor rural, histórico de crédito e a viabilidade do projeto apresentado, sempre considerando as particularidades do setor agropecuário.</p>

      <h3>5. Estruturação da Proposta</h3>
      <p>Com base na análise, estruturamos uma proposta personalizada com condições adequadas ao perfil do produtor e às características do projeto rural.</p>

      <h3>6. Formalização e Liberação</h3>
      <p>Após aprovação, os contratos são formalizados e registrados, e os recursos são liberados de acordo com as necessidades específicas do projeto agropecuário.</p>

      <h2>Oportunidades para o Agronegócio em Ribeirão Preto</h2>
      <p>A região de Ribeirão Preto é um importante polo do agronegócio brasileiro, com forte tradição na produção de cana-de-açúcar, café, citros e outros cultivos. A localização estratégica, infraestrutura desenvolvida e proximidade com centros de pesquisa fazem da região um ambiente propício para investimentos no setor rural.</p>

      <p>Com o apoio financeiro adequado, produtores rurais da região podem:</p>
      <ul>
        <li>Modernizar suas operações com tecnologia de ponta</li>
        <li>Expandir a área de cultivo</li>
        <li>Diversificar a produção</li>
        <li>Investir em sustentabilidade e práticas ambientalmente corretas</li>
        <li>Aumentar a produtividade e competitividade</li>
      </ul>

      <h2>Consultoria Financeira Personalizada</h2>
      <p>Na Libra Crédito, oferecemos mais do que apenas financiamento. Nossa equipe de consultores especializados em agronegócio está preparada para orientar produtores rurais na estruturação de seus projetos e na otimização de seus investimentos.</p>

      <p>Nossos serviços incluem:</p>
      <ul>
        <li>Análise de viabilidade econômica de projetos rurais</li>
        <li>Orientação sobre melhores práticas financeiras no agronegócio</li>
        <li>Acompanhamento durante todo o ciclo do financiamento</li>
        <li>Suporte na adequação a normas e regulamentações</li>
        <li>Consultoria para maximização do retorno sobre investimento</li>
      </ul>

      <h2>Conclusão</h2>
      <p>O crédito rural com garantia de propriedade representa uma oportunidade única para produtores rurais acessarem recursos com condições favoráveis, mantendo suas atividades produtivas e impulsionando o crescimento de seus negócios.</p>

      <p>Na Libra Crédito, entendemos as necessidades específicas do agronegócio e oferecemos soluções financeiras personalizadas que respeitam o ciclo produtivo e as particularidades de cada propriedade rural.</p>

      <p>Se você é produtor rural na região de Ribeirão Preto e busca capital de giro para seus projetos, entre em contato conosco e descubra como sua fazenda pode ser a chave para alcançar seus objetivos no agronegócio.</p>

      <p><strong>A Libra Crédito: transformando patrimônio rural em oportunidades de crescimento.</strong></p>
    `,
    readTime: 15,
    published: true,
    featuredPost: true,
    createdAt: '2024-04-22T00:00:00.000Z',
    updatedAt: '2024-04-22T00:00:00.000Z'
  }
];

export class BlogService {
  private static readonly CONFIG_KEY = 'libra_simulation_config';

  // Converters entre camelCase e snake_case
  private static fromDb(data: BlogPostData): BlogPost {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category as BlogCategory,
      imageUrl: data.image_url,
      slug: data.slug,
      content: data.content,
      readTime: data.read_time,
      published: data.published,
      featuredPost: data.featured_post,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      tags: data.tags || undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  private static toDb(data: Partial<BlogPost>): Partial<BlogPostData> {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category as any,
      image_url: data.imageUrl,
      slug: data.slug,
      content: data.content,
      read_time: data.readTime,
      published: data.published,
      featured_post: data.featuredPost,
      meta_title: data.metaTitle,
      meta_description: data.metaDescription,
      tags: data.tags,
      created_at: data.createdAt,
      updated_at: data.updatedAt
    };
  }

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
      const data = await supabaseApi.getBlogPosts(1000);
      if (!data || data.length === 0) {
        return EXISTING_POSTS;
      }
      return data.map(post => this.fromDb(post));
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      return EXISTING_POSTS;
    }
  }

  /**
   * Obter post por ID
   */
  static async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const data = await supabaseApi.getBlogPostById(id);
      return data ? this.fromDb(data) : null;
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      return null;
    }
  }

  /**
   * Obter post por slug
   */
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const post = await supabaseApi.getBlogPostBySlug(slug);
      return post ? this.fromDb(post) : null;
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      return null;
    }
  }

  /**
   * Criar novo post
   */
  static async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const errors = this.validatePost(postData);
    if (errors.length > 0) {
      throw new Error(`Dados inválidos: ${errors.join(', ')}`);
    }

    const dbData = this.toDb({
      ...postData,
      readTime: postData.readTime || this.calculateReadTime(postData.content),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    const created = await supabaseApi.createBlogPost(dbData as Database['public']['Tables']['blog_posts']['Insert']);
    return this.fromDb(created);
  }

  /**
   * Atualizar post existente
   */
  static async updatePost(id: string, postData: Partial<BlogPost>): Promise<BlogPost> {
    const posts = await this.getAllPosts();
    const existing = posts.find(post => post.id === id);

    if (!existing) {
      throw new Error('Post não encontrado');
    }

    const errors = this.validatePost({ ...existing, ...postData });
    if (errors.length > 0) {
      throw new Error(`Dados inválidos: ${errors.join(', ')}`);
    }

    // Verificar se novo slug já existe em outro post
    if (postData.slug && posts.some(p => p.id !== id && p.slug === postData.slug)) {
      throw new Error('Slug já existe. Escolha outro.');
    }

    const updated: Partial<BlogPost> = {
      ...existing,
      ...postData,
      updatedAt: new Date().toISOString(),
      readTime: postData.content ? this.calculateReadTime(postData.content) : existing.readTime
    };

    const dbData = this.toDb(updated);
    const result = await supabaseApi.updateBlogPost(id, dbData as Database['public']['Tables']['blog_posts']['Update']);
    return this.fromDb(result);
  }

  /**
   * Deletar post
   */
  static async deletePost(id: string): Promise<boolean> {
    await supabaseApi.deleteBlogPost(id);
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