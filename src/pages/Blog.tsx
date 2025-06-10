import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Wallet, Home, Building, FileText, CreditCard, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlogService, type BlogPost as BlogPostType } from '@/services/blogService';
import { useIsMobile } from '@/hooks/use-mobile';

// Usar o tipo do BlogService
type BlogPost = BlogPostType;

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

const Blog = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Blog | Libra Crédito | Artigos e Dicas Financeiras";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Confira artigos e dicas sobre capital de giro, consolidação de dívidas e financiamento para reformas. Mantenha-se informado com o blog da Libra Crédito.');
    }

    // Carregar posts do BlogService
    const loadPosts = async () => {
      try {
        const allPosts = await BlogService.getPublishedPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleSimular = () => {
    navigate('/simulacao');
  };

  const filteredPosts = posts.filter(post => {
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
                  <span className="text-sm font-semibold text-center">{category.name}</span>
                  <p className="text-xs text-gray-600 text-center hidden lg:block">{category.description}</p>
                </Button>
              );
            })}
          </div>

          {/* Blog Posts */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
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
                        <span>{new Date(post.createdAt || '').toLocaleDateString('pt-BR')}</span>
                        <span>{post.readTime} min de leitura</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">Nenhum post encontrado</div>
              <p className="text-gray-400">Tente ajustar os filtros ou termo de busca</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <section className={`${isMobile ? 'py-6' : 'py-8 md:py-12'} bg-[#00ccff] text-white`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-3 md:mb-4`}>
              Pronto para começar?
            </h2>
            <p className={`${isMobile ? 'text-sm px-2' : 'text-base md:text-lg'} mb-4 md:mb-6 max-w-2xl mx-auto opacity-90`}>
              Faça uma simulação agora mesmo e descubra quanto você pode obter com seu imóvel como garantia.
            </p>
            <Button 
              onClick={handleSimular}
              variant="goldContrast" 
              size={isMobile ? "default" : "xl"}
              className={`${isMobile ? 'min-h-[40px] min-w-[160px]' : 'min-h-[40px] md:min-h-[48px] min-w-[180px] md:min-w-[200px]'} bg-white text-libra-navy hover:bg-white/90`}
            >
              Simular Agora
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;