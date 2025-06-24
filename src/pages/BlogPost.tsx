import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WaveSeparator from '@/components/ui/WaveSeparator';
import { BlogService, type BlogPost as BlogPostType } from '@/services/blogService';

type BlogPost = BlogPostType;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const foundPost = await BlogService.getPostBySlug(slug);
        if (foundPost) {
          setPost(foundPost);
          document.title = `${foundPost.title} | Blog Libra Crédito`;
          
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', foundPost.description);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <WaveSeparator variant="hero" height="md" inverted />
        <div className="bg-white flex-1 pb-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-libra-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando post...</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <WaveSeparator variant="hero" height="md" inverted />
        <div className="bg-white flex-1 pb-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-libra-navy mb-4">Post não encontrado</h1>
            <p className="text-gray-600 mb-6">O post que você está procurando não existe ou foi removido.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </div>
      </MobileLayout>
    );
  }

  // Função para renderizar Markdown como HTML simples
  const renderContent = (content: string) => {
    if (!content) return '';
    
    // Se já é HTML, retorna como está
    if (content.includes('<h2>') || content.includes('<p>')) {
      return content;
    }
    
    // Conversão básica de Markdown para HTML
    let html = content
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" class="text-libra-blue hover:underline">$1</a>')
      // Line breaks
      .replace(/\n\n/gim, '</p><p>')
      // Lists (basic)
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      // Wrap in paragraphs if not already wrapped
      .replace(/^(?!<[hul])/gim, '<p>')
      .replace(/(?!<\/[hul]>)$/gim, '</p>');
    
    return html;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <WaveSeparator variant="hero" height="md" inverted />
      
      <div className="bg-white flex-1 pb-8 md:pb-12">
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
                  {new Date(post.createdAt || '').toLocaleDateString('pt-BR')}
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
                dangerouslySetInnerHTML={{ __html: renderContent(post.content || '') }}
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