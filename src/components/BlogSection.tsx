
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToBlog = () => {
    navigate('/blog');
  };

  const latestPosts = [
    {
      title: "Como calcular o valor do empréstimo com garantia de imóvel",
      excerpt: "Descubra como determinar o valor ideal para seu empréstimo baseado no valor do seu imóvel.",
      date: "15 de Janeiro, 2024",
      readTime: "5 min"
    },
    {
      title: "Vantagens do Home Equity vs Financiamento Tradicional",
      excerpt: "Compare as modalidades e entenda qual é a melhor opção para seu perfil e necessidades.",
      date: "10 de Janeiro, 2024",
      readTime: "7 min"
    },
    {
      title: "Documentos necessários para crédito com garantia de imóvel",
      excerpt: "Lista completa dos documentos necessários para agilizar seu processo de aprovação.",
      date: "5 de Janeiro, 2024",
      readTime: "4 min"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-4">
            Blog Libra Crédito
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Fique por dentro das novidades e dicas sobre crédito com garantia de imóvel
          </p>
          
          <Button 
            onClick={handleGoToBlog}
            variant="goldContrast"
            size="lg"
            className="mb-12"
          >
            Ver Todos os Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {latestPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date} • {post.readTime} de leitura
                </div>
                <CardTitle className="text-lg leading-tight text-libra-navy">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto text-libra-blue hover:text-libra-blue/80"
                  onClick={handleGoToBlog}
                >
                  Ler mais
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
