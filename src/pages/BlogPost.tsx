import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  slug: string;
  date: string;
  readTime: number;
  content: string;
}

const BLOG_POSTS: { [key: string]: BlogPost } = {
  // Home Equity Posts
  'home-equity-o-que-e-como-conseguir': {
    id: '1',
    title: 'Home Equity: O que é e como conseguir esse tipo de crédito',
    description: 'Guia completo sobre Home Equity - modalidade que permite usar seu imóvel como garantia para obter crédito com melhores condições.',
    category: 'Home Equity',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'home-equity-o-que-e-como-conseguir',
    date: '2024-03-25',
    readTime: 8,
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
    `
  },

  'home-equity-guia-completo-modalidade': {
    id: '2',
    title: 'Home Equity: Guia Completo para Entender a Modalidade de Uma Vez por Todas',
    description: 'Tudo sobre crédito com garantia de imóvel: taxas desde 1,09% a.m., prazos até 15 anos e como funciona.',
    category: 'Home Equity',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'home-equity-guia-completo-modalidade',
    date: '2024-03-24',
    readTime: 12,
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
    `
  },

  'como-investir-sem-descapitalizar-home-equity': {
    id: '3',
    title: 'Como Investir sem Descapitalizar usando Home Equity',
    description: 'Descubra como usar seu imóvel como fonte de investimento acessível, obtendo crédito sem se descapitalizar.',
    category: 'Home Equity',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'como-investir-sem-descapitalizar-home-equity',
    date: '2024-03-23',
    readTime: 10,
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
        <li><strong>Ações:</strong> Participação no mercado de capitais</li>
        <li><strong>Imóveis para renda:</strong> Compra de imóveis para locação</li>
        <li><strong>Negócio próprio:</strong> Investimento em empreendimento</li>
      </ul>

      <h2>Cálculo de Viabilidade</h2>
      <p>Para que a estratégia seja eficaz, o retorno dos investimentos deve superar o custo do financiamento. Com as taxas atrativas do Home Equity, esta equação é frequentemente favorável.</p>

      <h3>Exemplo prático:</h3>
      <ul>
        <li>Taxa do Home Equity: 1,2% a.m. (15,4% a.a.)</li>
        <li>Investimento em CDB: 100% do CDI (13,75% a.a.)</li>
        <li>Diferencial: Negativo no curto prazo, positivo no longo prazo com diversificação</li>
        <li>Valorização imobiliária: 5-8% a.a. histórica</li>
      </ul>

      <h2>Gestão de Riscos</h2>
      <p>Como qualquer estratégia de investimento, é importante gerenciar riscos adequadamente e manter reserva de emergência.</p>

      <h2>Acompanhamento Profissional</h2>
      <p>Nossa equipe oferece orientação financeira para ajudar você a tomar as melhores decisões de investimento com os recursos obtidos.</p>
    `
  },

  'simplificando-pos-venda-guia-boletos': {
    id: '4',
    title: 'Simplificando o Pós-venda: Um Guia para Retirar seus Boletos',
    description: 'Conheça as ferramentas disponíveis para clientes: Chat Bot e Portal do Cliente para retirada de boletos.',
    category: 'Home Equity',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'simplificando-pos-venda-guia-boletos',
    date: '2024-03-22',
    readTime: 5,
    content: `
      <h2>Ferramentas Digitais para Clientes</h2>
      <p>A Libra Crédito disponibiliza ferramentas modernas e seguras para que nossos clientes tenham acesso facilitado aos seus documentos e boletos, proporcionando conveniência e agilidade no atendimento.</p>

      <h2>Chat Bot Inteligente</h2>
      <p>Nosso Chat Bot oferece suporte instantâneo 24 horas por dia, 7 dias por semana, permitindo acesso rápido e seguro aos seus documentos.</p>

      <h3>Como usar o Chat Bot:</h3>
      <ol>
        <li>Acesse o site oficial da Libra Crédito</li>
        <li>Clique no ícone do chat no canto inferior direito</li>
        <li>Informe seus dados para identificação segura</li>
        <li>Solicite a segunda via do boleto ou documento</li>
        <li>Receba o arquivo instantaneamente por email</li>
      </ol>

      <h2>Portal do Cliente Completo</h2>
      <p>O Portal do Cliente é uma plataforma abrangente onde você tem controle total sobre sua conta e pode gerenciar todos os aspectos do seu contrato.</p>

      <h3>Funcionalidades disponíveis:</h3>
      <ul>
        <li>Consulta de boletos em aberto e vencidos</li>
        <li>Histórico completo de pagamentos</li>
        <li>Download de documentos contratuais</li>
        <li>Atualização de dados cadastrais</li>
        <li>Solicitação de segunda via de documentos</li>
        <li>Canal direto com nossa equipe de suporte</li>
        <li>Acompanhamento do status do contrato</li>
        <li>Calculadora de antecipação</li>
      </ul>

      <h2>Segurança e Privacidade</h2>
      <p>Todas as nossas ferramentas digitais seguem rigorosos protocolos de segurança, incluindo criptografia SSL, autenticação em duas etapas e backup seguro de dados.</p>

      <h3>Medidas de segurança:</h3>
      <ul>
        <li>Criptografia SSL 256 bits</li>
        <li>Autenticação multifator</li>
        <li>Monitoramento 24/7</li>
        <li>Backup automático</li>
        <li>Compliance com LGPD</li>
      </ul>

      <h2>Suporte Humanizado</h2>
      <p>Além das ferramentas digitais, nossa equipe está sempre disponível para atendimento personalizado quando você precisar de ajuda adicional.</p>
    `
  },

  'processo-registro-liberacao-home-equity': {
    id: '5',
    title: 'Processo de Registro e Liberação de Recurso no Home Equity',
    description: 'Passo a passo completo das etapas após formalização do contrato de empréstimo com garantia imobiliária.',
    category: 'Home Equity',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'processo-registro-liberacao-home-equity',
    date: '2024-03-21',
    readTime: 8,
    content: `
      <h2>Etapas Pós-Contratação do Home Equity</h2>
      <p>Após a aprovação e assinatura do contrato, iniciamos um processo estruturado que garante segurança jurídica e agilidade na liberação dos recursos. Cada etapa é acompanhada de perto por nossa equipe especializada.</p>

      <h2>Etapa 1: Preparação da Documentação</h2>
      <p>Nossa equipe prepara toda a documentação necessária para o registro cartorário, garantindo que todos os documentos estejam corretos e completos.</p>

      <h3>Documentos preparados:</h3>
      <ul>
        <li>Contrato de alienação fiduciária</li>
        <li>Termo de outorga de garantia</li>
        <li>Certidões atualizadas do imóvel</li>
        <li>Documentos pessoais validados</li>
        <li>Formulários específicos do cartório</li>
      </ul>

      <h2>Etapa 2: Registro no Cartório de Imóveis</h2>
      <p>O registro cartorário é fundamental para garantir a segurança jurídica da operação. Nossa equipe acompanha todo o processo no cartório competente.</p>

      <h3>Processo de registro:</h3>
      <ol>
        <li>Protocolação dos documentos no cartório</li>
        <li>Análise jurídica pelos oficiais registradores</li>
        <li>Pagamento das taxas de registro</li>
        <li>Averbação da garantia na matrícula do imóvel</li>
        <li>Emissão de certidão atualizada</li>
        <li>Confirmação do registro</li>
      </ol>

      <h2>Etapa 3: Liberação dos Recursos</h2>
      <p>Com o registro concluído e a garantia devidamente averbada, procede-se à liberação dos recursos conforme acordado no contrato.</p>

      <h3>Modalidades de liberação:</h3>
      <ul>
        <li><strong>Transferência bancária (TED):</strong> Mais comum e rápida</li>
        <li><strong>PIX:</strong> Liberação instantânea</li>
        <li><strong>Depósito em conta:</strong> Para contas da Libra Crédito</li>
        <li><strong>Pagamento direto:</strong> Quitação de dívidas específicas</li>
        <li><strong>Liberação parcial:</strong> Conforme cronograma acordado</li>
      </ul>

      <h2>Prazos do Processo</h2>
      <p>O tempo total do processo varia conforme a complexidade da documentação e a demanda do cartório, mas seguimos rigorosamente os prazos estabelecidos.</p>

      <h3>Cronograma típico:</h3>
      <ul>
        <li>Preparação de documentos: 1-2 dias úteis</li>
        <li>Protocolo no cartório: 1 dia útil</li>
        <li>Análise cartorária: 5-15 dias úteis</li>
        <li>Registro e averbação: 1-2 dias úteis</li>
        <li>Liberação de recursos: Mesmo dia</li>
      </ul>

      <h2>Acompanhamento em Tempo Real</h2>
      <p>Fornecemos atualizações constantes sobre o andamento do processo através do Portal do Cliente e contato direto com nossa equipe.</p>

      <h2>Suporte Pós-Liberação</h2>
      <p>Após a liberação, continuamos oferecendo suporte completo através de todos os nossos canais de atendimento, garantindo uma experiência excepcional durante todo o período do contrato.</p>
    `
  },

  'analise-renda-endividamento-home-equity': {
    id: '6',
    title: 'Análise de Renda e Endividamento para Home Equity',
    description: 'Como a Libra avalia renda e níveis de endividamento para aprovação de empréstimos com garantia.',
    category: 'Score e Crédito',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'analise-renda-endividamento-home-equity',
    date: '2024-03-20',
    readTime: 7,
    content: `
      <h2>Processo de Análise de Crédito da Libra</h2>
      <p>A Libra Crédito possui um processo criterioso e justo de análise de renda e endividamento, considerando múltiplos fatores para garantir que o empréstimo seja adequado ao perfil de cada cliente.</p>

      <h2>Análise de Renda Detalhada</h2>
      <p>Aceitamos diversos tipos de comprovação de renda, entendendo que cada pessoa tem uma realidade financeira específica.</p>

      <h3>Tipos de renda aceitos:</h3>
      <ul>
        <li><strong>Renda formal:</strong> Salário com carteira assinada</li>
        <li><strong>Aposentadoria/Pensão:</strong> INSS ou privada</li>
        <li><strong>Profissional liberal:</strong> Médicos, advogados, engenheiros</li>
        <li><strong>Renda empresarial:</strong> Pró-labore ou distribuição de lucros</li>
        <li><strong>Rendimentos financeiros:</strong> Aplicações e investimentos</li>
        <li><strong>Renda passiva:</strong> Aluguéis e royalties</li>
        <li><strong>Atividade rural:</strong> Comprovação específica do setor</li>
      </ul>

      <h2>Avaliação de Endividamento</h2>
      <p>Analisamos cuidadosamente o comprometimento de renda atual para assegurar sustentabilidade financeira.</p>

      <h3>Fatores analisados:</h3>
      <ul>
        <li>Relação entre renda líquida e gastos fixos</li>
        <li>Histórico de pagamentos nos órgãos de proteção</li>
        <li>Compromissos financeiros existentes</li>
        <li>Capacidade de pagamento residual</li>
        <li>Perfil de gastos e histórico bancário</li>
        <li>Margem consignável disponível</li>
      </ul>

      <h2>Score de Crédito e Análise Comportamental</h2>
      <p>O score é importante, mas não determinante. Realizamos análise contextual completa, considerando justificativas para eventuais restrições.</p>

      <h3>Análise complementar inclui:</h3>
      <ul>
        <li>Tempo de relacionamento bancário</li>
        <li>Padrão de movimentação financeira</li>
        <li>Histórico profissional e estabilidade</li>
        <li>Patrimônio declarado e bens</li>
        <li>Referências pessoais e comerciais</li>
        <li>Análise de perfil de pagador</li>
      </ul>

      <h2>Critérios de Aprovação</h2>
      <p>Nossa análise busca equilibrar segurança institucional com acesso ao crédito, oferecendo oportunidades para diferentes perfis de clientes.</p>

      <h3>Fatores positivos:</h3>
      <ul>
        <li>Renda comprovada estável</li>
        <li>Baixo endividamento</li>
        <li>Histórico de bom pagador</li>
        <li>Relacionamento bancário sólido</li>
        <li>Imóvel bem avaliado e documentado</li>
      </ul>

      <h2>Documentação Necessária</h2>
      <p>Solicitamos documentação adequada para cada tipo de renda, sempre priorizando a praticidade para o cliente.</p>

      <h2>Processo Transparente</h2>
      <p>Mantemos comunicação clara sobre critérios e status da análise, garantindo transparência total no processo decisório.</p>
    `
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug && BLOG_POSTS[slug]) {
      setPost(BLOG_POSTS[slug]);
      document.title = `${BLOG_POSTS[slug].title} | Blog Libra Crédito`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', BLOG_POSTS[slug].description);
      }
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-header pb-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-libra-navy mb-4">Post não encontrado</h1>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-header pb-8 md:pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="mb-6 mt-8">
            <Link to="/blog">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>

          {/* Post Header */}
          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            
            <div className="p-6 md:p-8">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min de leitura
                </span>
              </div>

              {/* Title and Description */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-libra-navy mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {post.description}
              </p>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-libra-navy prose-links:text-libra-blue prose-a:text-libra-blue hover:prose-a:text-libra-navy"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-br from-libra-blue to-libra-navy rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Precisa de crédito com garantia de imóvel?
              </h2>
              <p className="text-lg mb-6">
                Simule agora e descubra as melhores condições para você
              </p>
              <Link to="/simulacao">
                <Button variant="secondary" size="lg">
                  Fazer Simulação
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;