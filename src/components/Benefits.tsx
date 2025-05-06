
import React from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    title: "Prazo e Taxa de Juros",
    description: "Taxas a partir de 1,09% ao mês e até 180 meses para pagar com parcelas que cabem no seu bolso."
  },
  {
    title: "Valor e Flexibilidade",
    description: "Libere até 50% do valor de avaliação do seu imóvel com total flexibilidade na utilização do crédito."
  }
];

const mediaPartners = [
  {
    name: "G1",
    logoUrl: "https://logodownload.org/wp-content/uploads/2017/05/g1-logo.png",
    link: "https://g1.globo.com/sp/ribeirao-preto-franca/especial-publicitario/libra-credito-solucoes-financeiras/noticia/2022/10/28/a-libra-credito-tem-solucoes-financeiras-com-as-menores-taxas-no-pos-pandemia.ghtml",
    description: "A Libra Crédito tem soluções financeiras com as menores taxas no pós-pandemia"
  },
  {
    name: "Estadão",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Estadao_logo.svg",
    link: "https://bluestudioexpress.estadao.com.br/conteudo/2023/08/24/libra-simplifica-processo-para-emprestimo-com-garantia-de-imovel/",
    description: "Libra simplifica processo para empréstimo com garantia de imóvel"
  },
  {
    name: "A Cidade On",
    logoUrl: "https://www.acidadeon.com/img/acidadeon_logo.png",
    link: "https://www.acidadeon.com/ribeiraopreto/conteudo-patrocinado/libracredito/libra-credito-oferece-emprestimo-de-baixo-custo-e-personalizado/",
    description: "Libra Crédito oferece empréstimo de baixo custo e personalizado"
  },
  {
    name: "Revide",
    logoUrl: "https://www.revide.com.br/media/cache/revide_logo_redesign_00c943f9dcb668956737fe56cd42a0c8.png",
    link: "https://www.revide.com.br/noticias/revista/a-revolucao-do-credito/#google_vignette",
    description: "A revolução do crédito"
  }
];

const BenefitCard: React.FC<{title: string, description: string}> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="bg-libra-blue rounded-full p-2 flex-shrink-0">
          <Check className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-libra-navy mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const MediaCard: React.FC<{name: string, logoUrl: string, link: string, description: string}> = ({ name, logoUrl, link, description }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="h-16 flex items-center justify-center mb-4">
          <img src={logoUrl} alt={`${name} Logo`} className="max-h-full max-w-full object-contain" />
        </div>
        <p className="text-sm text-gray-600 text-center mb-4 h-12 line-clamp-2">{description}</p>
        <Button 
          variant="outline" 
          className="bg-libra-navy text-white hover:bg-libra-blue w-full"
          onClick={() => window.open(link, '_blank')}
        >
          ACESSAR <ExternalLink className="ml-1 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-libra-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-4">Vantagens do Crédito com Garantia de Imóvel</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            O Home Equity é a solução financeira ideal para quem precisa de um valor expressivo com as melhores condições do mercado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 animate-slide-up">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index} 
              title={benefit.title} 
              description={benefit.description} 
            />
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-12 text-center">Libra na Mídia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
            {mediaPartners.map((partner, index) => (
              <MediaCard
                key={index}
                name={partner.name}
                logoUrl={partner.logoUrl}
                link={partner.link}
                description={partner.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
