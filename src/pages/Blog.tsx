import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Wallet, Home, Building, FileText, CreditCard, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: 'cgi' | 'consolidacao' | 'reformas' | 'home-equity' | 'credito-rural' | 'documentacao' | 'score-credito' | 'educacao-financeira';
  imageUrl: string;
  slug: string;
  date: string;
  readTime: number;
  content?: string;
}

const CATEGORIES = [
  {
    id: 'home-equity',
    name: 'Home Equity',
    icon: Home,
    description: 'Crédito com garantia de imóvel - melhores condições'
  },
  {
    id: 'cgi',
    name: 'Capital de Giro',
    icon: TrendingUp,
    description: 'Soluções inteligentes para capital de giro empresarial'
  },
  {
    id: 'consolidacao',
    name: 'Consolidação de Dívidas',
    icon: Wallet,
    description: 'Organize suas finanças e reduza juros'
  },
  {
    id: 'credito-rural',
    name: 'Crédito Rural',
    icon: Building,
    description: 'Financiamento para propriedades rurais e agronegócio'
  },
  {
    id: 'documentacao',
    name: 'Documentação',
    icon: FileText,
    description: 'Guias sobre documentos e regularização'
  },
  {
    id: 'score-credito',
    name: 'Score e Crédito',
    icon: CreditCard,
    description: 'Dicas para melhorar seu score e análise de crédito'
  },
  {
    id: 'educacao-financeira',
    name: 'Educação Financeira',
    icon: BookOpen,
    description: 'Conhecimento para decisões financeiras conscientes'
  },
  {
    id: 'reformas',
    name: 'Projetos/Reformas',
    icon: Home,
    description: 'Realize seus projetos com as melhores condições'
  }
];

const MOCK_POSTS: BlogPost[] = [
  // Home Equity - Posts principais
  {
    id: '1',
    title: 'Home Equity: O que é e como conseguir esse tipo de crédito',
    description: 'Guia completo sobre Home Equity - modalidade que permite usar seu imóvel como garantia para obter crédito com melhores condições.',
    category: 'home-equity',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'home-equity-o-que-e-como-conseguir',
    date: '2024-03-25',
    readTime: 8
  },
  {
    id: '2',
    title: 'Home Equity: Guia Completo para Entender a Modalidade de Uma Vez por Todas',
    description: 'Tudo sobre crédito com garantia de imóvel: taxas desde 1,09% a.m., prazos até 15 anos e como funciona.',
    category: 'home-equity',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'home-equity-guia-completo-modalidade',
    date: '2024-03-24',
    readTime: 12
  },
  {
    id: '3',
    title: 'Como Investir sem Descapitalizar usando Home Equity',
    description: 'Descubra como usar seu imóvel como fonte de investimento acessível, obtendo crédito sem se descapitalizar.',
    category: 'home-equity',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'como-investir-sem-descapitalizar-home-equity',
    date: '2024-03-23',
    readTime: 10
  },
  {
    id: '4',
    title: 'Simplificando o Pós-venda: Um Guia para Retirar seus Boletos',
    description: 'Conheça as ferramentas disponíveis para clientes: Chat Bot e Portal do Cliente para retirada de boletos.',
    category: 'home-equity',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'simplificando-pos-venda-guia-boletos',
    date: '2024-03-22',
    readTime: 5
  },
  {
    id: '5',
    title: 'Processo de Registro e Liberação de Recurso no Home Equity',
    description: 'Passo a passo completo das etapas após formalização do contrato de empréstimo com garantia imobiliária.',
    category: 'home-equity',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'processo-registro-liberacao-home-equity',
    date: '2024-03-21',
    readTime: 8
  },
  {
    id: '6',
    title: 'Análise de Renda e Endividamento para Home Equity',
    description: 'Como a Libra avalia renda e níveis de endividamento para aprovação de empréstimos com garantia.',
    category: 'score-credito',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'analise-renda-endividamento-home-equity',
    date: '2024-03-20',
    readTime: 7
  },
  {
    id: '7',
    title: 'Requisitos para Empréstimo com Garantia: Documentação Completa',
    description: 'Lista completa de documentos e requisitos necessários para obter empréstimo com garantia imobiliária.',
    category: 'home-equity',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'requisitos-emprestimo-garantia-documentacao',
    date: '2024-03-19',
    readTime: 10
  },

  // Educação Financeira
  {
    id: '8',
    title: 'IPCA e Seu Impacto nas Finanças Pessoais e Investimentos',
    description: 'Entenda como o Índice de Preços ao Consumidor Amplo afeta sua vida financeira e decisões de investimento.',
    category: 'educacao-financeira',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'ipca-impacto-financas-pessoais-investimentos',
    date: '2024-03-18',
    readTime: 6
  },
  {
    id: '9',
    title: 'Independência Financeira: Estratégias e Organização Prática',
    description: 'Estratégias comprovadas para alcançar independência financeira através de organização e planejamento.',
    category: 'educacao-financeira',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'independencia-financeira-estrategias-organizacao',
    date: '2024-03-17',
    readTime: 9
  },
  {
    id: '10',
    title: 'Planilha Gratuita de Controle de Gastos para Liberdade Financeira',
    description: 'Baixe nossa planilha gratuita e aprenda a controlar gastos de forma eficiente para alcançar seus objetivos.',
    category: 'educacao-financeira',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'planilha-controle-gastos-liberdade-financeira',
    date: '2024-03-16',
    readTime: 4
  },
  {
    id: '11',
    title: 'Como Evitar Golpes em Empréstimos: Guia de Segurança Completo',
    description: 'Proteja-se de golpes e fraudes ao buscar empréstimos. Sinais de alerta e como se proteger.',
    category: 'educacao-financeira',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'como-evitar-golpes-emprestimos-seguranca',
    date: '2024-03-15',
    readTime: 7
  },
  {
    id: '12',
    title: 'CET - Custo Efetivo Total: O que Você Precisa Saber',
    description: 'Entenda o que é CET, como é calculado e por que é fundamental na escolha de produtos financeiros.',
    category: 'educacao-financeira',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'cet-custo-efetivo-total-guia-completo',
    date: '2024-03-14',
    readTime: 6
  },

  // Score e Crédito
  {
    id: '13',
    title: 'Como Melhorar Seu Score de Crédito: Soluções Práticas e Eficazes',
    description: 'Dicas comprovadas para aumentar seu score rapidamente e ter acesso às melhores condições de crédito.',
    category: 'score-credito',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'como-melhorar-score-credito-solucoes-praticas',
    date: '2024-03-13',
    readTime: 8
  },
  {
    id: '14',
    title: 'Histórico no BACEN: Como Influencia a Aprovação de Crédito',
    description: 'Entenda como o histórico no Banco Central do Brasil afeta suas chances de aprovação em empréstimos.',
    category: 'score-credito',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'historico-bacen-aprovacao-credito',
    date: '2024-03-12',
    readTime: 6
  },

  // Consolidação de Dívidas
  {
    id: '15',
    title: 'Renegociação de Dívidas: Solução Eficaz para Saúde Financeira',
    description: 'Estratégias eficazes para renegociar dívidas e recuperar sua saúde financeira de forma sustentável.',
    category: 'consolidacao',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'renegociacao-dividas-saude-financeira',
    date: '2024-03-11',
    readTime: 8
  },
  {
    id: '16',
    title: 'Consolidação de Dívidas: O Guia Definitivo',
    description: 'Tudo sobre consolidação de dívidas: como funciona, vantagens e quando é a melhor opção.',
    category: 'consolidacao',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'consolidacao-dividas-guia-definitivo',
    date: '2024-03-10',
    readTime: 10
  },

  // Capital de Giro e Empresarial
  {
    id: '17',
    title: 'Crédito para Empresários: Guia Completo das Melhores Opções',
    description: 'Descubra as melhores opções de financiamento empresarial e como escolher a ideal para seu negócio.',
    category: 'cgi',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'credito-empresarios-guia-completo-opcoes',
    date: '2024-03-09',
    readTime: 12
  },
  {
    id: '18',
    title: 'Planejamento Empresarial em Tempos de Incerteza Econômica',
    description: 'Como manter seu negócio saudável e em crescimento durante períodos de instabilidade econômica.',
    category: 'cgi',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'planejamento-empresarial-incerteza-economica',
    date: '2024-03-08',
    readTime: 9
  },
  {
    id: '19',
    title: 'Tendências de Negócios e Oportunidades para 2024',
    description: 'As principais tendências de mercado e oportunidades de negócio para entrepreneurs em 2024.',
    category: 'cgi',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'tendencias-negocios-oportunidades-2024',
    date: '2024-03-07',
    readTime: 11
  },

  // Crédito Rural
  {
    id: '20',
    title: 'Crédito Rural: Opções Completas para Propriedades e Agronegócio',
    description: 'Conheça todas as opções de crédito para propriedades rurais e atividades do agronegócio.',
    category: 'credito-rural',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'credito-rural-propriedades-agronegocio',
    date: '2024-03-06',
    readTime: 10
  },
  {
    id: '21',
    title: 'Agricultura Digital: Tecnologia e Financiamento no Campo',
    description: 'Como a tecnologia está revolucionando a agricultura e as opções de financiamento disponíveis.',
    category: 'credito-rural',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'agricultura-digital-tecnologia-financiamento',
    date: '2024-03-05',
    readTime: 8
  },

  // Documentação
  {
    id: '22',
    title: 'Documentação Imobiliária: Matrícula, Escritura e Contratos',
    description: 'Guia completo sobre documentos essenciais para operações imobiliárias e de crédito.',
    category: 'documentacao',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'documentacao-imobiliaria-matricula-escritura',
    date: '2024-03-04',
    readTime: 9
  },
  {
    id: '23',
    title: 'Regularização de Imóveis: Guia para Propriedades Irregulares',
    description: 'Processo completo para regularizar propriedades irregulares e obter toda documentação adequada.',
    category: 'documentacao',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'regularizacao-imoveis-propriedades-irregulares',
    date: '2024-03-03',
    readTime: 12
  },
  {
    id: '24',
    title: 'Certidão de Matrícula: Importância e Como Obter',
    description: 'Entenda a importância da certidão de matrícula imobiliária e o processo para obtê-la.',
    category: 'documentacao',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'certidao-matricula-importancia-como-obter',
    date: '2024-03-02',
    readTime: 6
  },
  {
    id: '25',
    title: 'Transferência Formal vs Informal de Imóveis: Riscos e Benefícios',
    description: 'Por que a transferência formal é essencial e os riscos dos contratos informais de imóveis.',
    category: 'documentacao',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'transferencia-formal-informal-imoveis',
    date: '2024-03-01',
    readTime: 7
  },

  // Reformas e Projetos
  {
    id: '26',
    title: 'Financiamento para Reforma: Como Realizar seus Projetos',
    description: 'Opções de financiamento para reformas e projetos imobiliários com as melhores condições.',
    category: 'reformas',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'financiamento-reforma-realizar-projetos',
    date: '2024-02-29',
    readTime: 8
  },
  {
    id: '27',
    title: 'Planejando sua Reforma: Dicas Essenciais para o Sucesso',
    description: 'Guia completo para planejar sua reforma garantindo o melhor resultado com menor custo.',
    category: 'reformas',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'planejando-reforma-dicas-essenciais-sucesso',
    date: '2024-02-28',
    readTime: 9
  },

  // Investimentos
  {
    id: '28',
    title: 'Estratégias de Investimento Imobiliário em 2024',
    description: 'As melhores estratégias para investir no mercado imobiliário em 2024 e maximizar retornos.',
    category: 'educacao-financeira',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'estrategias-investimento-imobiliario-2024',
    date: '2024-02-27',
    readTime: 10
  },
  {
    id: '29',
    title: 'Educação Financeira Internacional: Financiando Estudos no Exterior',
    description: 'Como financiar educação internacional e as melhores estratégias para estudos no exterior.',
    category: 'educacao-financeira',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'educacao-financeira-internacional-exterior',
    date: '2024-02-26',
    readTime: 8
  },
  {
    id: '30',
    title: 'Libra Crédito: 40 Anos de Experiência do Grupo Stefani',
    description: 'Conheça a história e experiência por trás da Libra Crédito, com 4 décadas no mercado imobiliário.',
    category: 'educacao-financeira',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'libra-credito-40-anos-experiencia-grupo-stefani',
    date: '2024-02-25',
    readTime: 6
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Blog | Libra Crédito | Artigos e Dicas Financeiras";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Confira artigos e dicas sobre capital de giro, consolidação de dívidas e financiamento para reformas. Mantenha-se informado com o blog da Libra Crédito.');
    }
  }, []);

  const filteredPosts = MOCK_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-header pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 mt-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-libra-navy mb-4">
              Blog Libra Crédito
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conteúdo relevante sobre finanças, crédito e investimentos para você tomar as melhores decisões.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar artigos..."
                className="pl-10 pr-4 py-3 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant="outline"
                  className={`h-auto p-4 flex flex-col items-center gap-2 hover:bg-libra-blue/5 ${
                    selectedCategory === category.id ? 'border-libra-blue text-libra-blue' : ''
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )}
                >
                  <Icon className="w-6 h-6" />
                  <h2 className="text-sm font-semibold text-center">{category.name}</h2>
                  <p className="text-xs text-gray-600 text-center hidden lg:block">{category.description}</p>
                </Button>
              );
            })}
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <article>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <span className="text-sm text-libra-blue font-medium">
                      {CATEGORIES.find(cat => cat.id === post.category)?.name}
                    </span>
                    <h3 className="text-xl font-bold text-libra-navy mt-2 mb-3 group-hover:text-libra-blue transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                      <span>{post.readTime} min de leitura</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
