import React, { useEffect, useState } from 'react';
import { Search, TrendingUp, Wallet, Home } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: 'cgi' | 'consolidacao' | 'reformas';
  imageUrl: string;
  slug: string;
  date: string;
  readTime: number;
}

const CATEGORIES = [
  {
    id: 'cgi',
    name: 'CGI - Capital de Giro Inteligente',
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
    id: 'reformas',
    name: 'Projetos/Reformas',
    icon: Home,
    description: 'Realize seus projetos com as melhores condições'
  }
];

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Como o Capital de Giro pode impulsionar seu negócio',
    description: 'Descubra as melhores estratégias para utilizar o capital de giro de forma inteligente e alavancar seus resultados.',
    category: 'cgi',
    imageUrl: '/images/blog/capital-giro.jpg',
    slug: 'como-capital-giro-pode-impulsionar-negocio',
    date: '2024-03-15',
    readTime: 5
  },
  {
    id: '2',
    title: 'Consolidação de Dívidas: O guia completo',
    description: 'Entenda como funciona a consolidação de dívidas e como ela pode te ajudar a reorganizar sua vida financeira.',
    category: 'consolidacao',
    imageUrl: '/images/blog/consolidacao.jpg',
    slug: 'consolidacao-dividas-guia-completo',
    date: '2024-03-14',
    readTime: 7
  },
  {
    id: '3',
    title: 'Planejando sua reforma: dicas essenciais',
    description: 'Confira as principais dicas para planejar sua reforma e garantir o melhor resultado com o menor custo.',
    category: 'reformas',
    imageUrl: '/images/blog/reforma.jpg',
    slug: 'planejando-reforma-dicas-essenciais',
    date: '2024-03-13',
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant="outline"
                  className={`h-auto p-6 flex flex-col items-center gap-3 hover:bg-libra-blue/5 ${
                    selectedCategory === category.id ? 'border-libra-blue text-libra-blue' : ''
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )}
                >
                  <Icon className="w-8 h-8" />
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                  <p className="text-sm text-gray-600 text-center">{category.description}</p>
                </Button>
              );
            })}
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
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
                  <h3 className="text-xl font-bold text-libra-navy mt-2 mb-3">
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
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
