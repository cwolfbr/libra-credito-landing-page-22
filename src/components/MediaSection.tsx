import React from 'react';
import { Button } from '@/components/ui/button';
import { Newspaper } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const mediaLinks = [
  {
    name: 'G1 Globo',
    logo: '/images/media/g1-logo.png',
    title: 'A Libra Crédito tem soluções financeiras com as menores taxas no pós-pandemia',
    url: 'https://g1.globo.com/sp/ribeirao-preto-franca/especial-publicitario/libra-credito-solucoes-financeiras/noticia/2022/10/28/a-libra-credito-tem-solucoes-financeiras-com-as-menores-taxas-no-pos-pandemia.ghtml'
  },
  {
    name: 'Estadão',
    logo: '/images/media/estadao-logo.png',
    title: 'Libra simplifica processo para empréstimo com garantia de imóvel',
    url: 'https://bluestudioexpress.estadao.com.br/conteudo/2023/08/24/libra-simplifica-processo-para-emprestimo-com-garantia-de-imovel/'
  },
  {
    name: 'A Cidade ON',
    logo: '/images/media/acidadeon-logo.png',
    title: 'Libra Crédito oferece empréstimo de baixo custo e personalizado',
    url: 'https://www.acidadeon.com/ribeiraopreto/conteudo-patrocinado/libracredito/libra-credito-oferece-emprestimo-de-baixo-custo-e-personalizado/'
  },
  {
    name: 'Revide',
    logo: '/images/media/revide-logo.png',
    title: 'A revolução do crédito',
    url: 'https://www.revide.com.br/noticias/revista/a-revolucao-do-credito/'
  }
];

const MediaSection: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Newspaper className="w-6 h-6 text-libra-blue" />
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-libra-navy`}>
              A Libra na Mídia
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confira as principais matérias sobre a Libra Crédito
          </p>
        </div>

        {isMobile ? (
          // Layout Mobile - Grid 2x2 apenas com logos
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {mediaLinks.map((media) => (
              <a 
                key={media.name}
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-center aspect-video"
                aria-label={`Ver matéria da ${media.name}`}
              >
                <img
                  src={media.logo}
                  alt={`Logo ${media.name}`}
                  className="max-w-full h-auto max-h-[40px] object-contain"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        ) : (
          // Layout Desktop - Cards completos
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mediaLinks.map((media) => (
              <div key={media.name} className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
                <div className="h-12 mb-4 flex items-center">
                  <img
                    src={media.logo}
                    alt={`Logo ${media.name}`}
                    className="max-w-full h-auto max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-libra-navy font-medium mb-4 flex-grow">
                  {media.title}
                </p>
                <Button
                  onClick={() => window.open(media.url, '_blank')}
                  variant="outline"
                  className="w-full border-libra-navy text-libra-navy hover:bg-libra-navy hover:text-white transition-colors"
                >
                  ACESSAR
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaSection;
