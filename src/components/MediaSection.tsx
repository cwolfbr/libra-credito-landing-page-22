
import React from 'react';
import { ExternalLink, Newspaper } from 'lucide-react';

const MediaSection: React.FC = () => {
  const mediaLinks = [
    {
      name: 'G1 Globo',
      url: 'https://g1.globo.com/sp/ribeirao-preto-franca/especial-publicitario/libra-credito-solucoes-financeiras/noticia/2022/10/28/a-libra-credito-tem-solucoes-financeiras-com-as-menores-taxas-no-pos-pandemia.ghtml',
      icon: '🌐'
    },
    {
      name: 'Estadão',
      url: 'https://bluestudioexpress.estadao.com.br/conteudo/2023/08/24/libra-simplifica-processo-para-emprestimo-com-garantia-de-imovel/',
      icon: '📰'
    },
    {
      name: 'A Cidade ON',
      url: 'https://www.acidadeon.com/ribeiraopreto/conteudo-patrocinado/libracredito/libra-credito-oferece-emprestimo-de-baixo-custo-e-personalizado/',
      icon: '🏙️'
    },
    {
      name: 'Revide',
      url: 'https://www.revide.com.br/noticias/revista/a-revolucao-do-credito/',
      icon: '📝'
    }
  ];

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="media-section-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 id="media-section-title" className="text-2xl md:text-3xl font-bold text-libra-navy mb-2 flex items-center justify-center gap-2">
            <Newspaper className="w-8 h-8 text-libra-blue" />
            A Libra na Mídia
          </h2>
          <p className="text-gray-600">Confira as principais matérias sobre a Libra Crédito</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {mediaLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleLinkClick(link.url)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              aria-label={`Ler matéria no ${link.name}`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{link.icon}</div>
                <h3 className="font-semibold text-libra-navy text-sm mb-2">{link.name}</h3>
                <ExternalLink className="w-4 h-4 text-libra-blue mx-auto group-hover:scale-110 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
