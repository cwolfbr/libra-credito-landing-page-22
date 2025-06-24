import React, { useEffect } from 'react';
import MobileLayout from '@/components/MobileLayout';

const PoliticaCookies: React.FC = () => {
  useEffect(() => {
    document.title = "Política de Cookies | Libra Crédito";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Política de Cookies da Libra Crédito. Saiba como utilizamos cookies para melhorar sua experiência em nosso site.');
    }
  }, []);

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-libra-navy text-center mb-8">
              Política de Cookies
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg text-center text-libra-blue font-semibold mb-8">
                Utilizamos cookies para melhorar o desempenho e a sua experiência em nosso site.
              </p>

              <section>
                <h2 className="text-2xl font-bold text-libra-navy mb-4">O que são cookies?</h2>
                <p>
                  São pequenos arquivos de texto que um site, quando visitado, coloca no computador do usuário ou no seu dispositivo móvel, através do navegador de internet (browser). A colocação de cookies ajudará o site a reconhecer o seu dispositivo numa próxima visita. Usamos o termo cookies nesta política para referir todos os arquivos que recolhem informações desta forma.
                </p>
                <p>
                  Os cookies utilizados não recolhem informação que identifica o usuário, no entanto, se já for nosso cliente poderemos monitorar suas visitas ao site desde que, pelo menos, por uma vez, tenha iniciado a sua navegação a partir de alguma comunicação enviada por nós, por exemplo, SMS e e-mail.
                </p>
                <p>
                  Os cookies recolhem também informações genéricas, designadamente a forma como os usuários chegam e utilizam os sites ou a zona do país/países através do qual acessem ao site, etc.
                </p>
                <p>
                  Os cookies retêm apenas informação relacionada com as suas preferências.
                </p>
                <p>
                  A qualquer momento o usuário pode, através do seu navegador de internet (browser) decidir ser notificado sobre a recepção de cookies, bem como bloquear a respectiva entrada no seu sistema.
                </p>
                <p>
                  A recusa de uso de cookies no site pode resultar na impossibilidade de ter acesso a algumas das suas áreas ou de receber informação personalizada.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-libra-navy mb-4">Que tipo de cookies utilizamos?</h2>
                <p className="mb-4">Nossos cookies têm diferentes funções:</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-libra-navy mb-2">Cookies essenciais</h3>
                    <p>
                      Alguns cookies são essenciais para acessar áreas específicas o nosso site. Permitem a navegação no site e a utilização das suas aplicações, tal como acessar áreas seguras através de login. Sem estes cookies, os serviços que o exijam não podem ser prestados.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-libra-navy mb-2">Cookies analíticos</h3>
                    <p>
                      Utilizamos estes para analisar a forma como os usuários usam o site e monitorar a performance deste. Isto permite-nos fornecer uma experiência de alta qualidade ao personalizar a nossa oferta e rapidamente identificar e corrigir quaisquer problemas que surjam. Por exemplo, usamos cookies de desempenho para saber quais as páginas mais populares, qual o método de ligação entre páginas que é mais eficaz, ou para determinar a razão de algumas páginas receberem mensagens de erro. Baseado na utilização do site, podemos também utilizar estes cookies para destacar artigos ou serviços do site que pensamos ser do interesse dos usuários. Estes cookies são utilizados apenas para efeitos de criação e análise estatística, sem nunca recolher informação de caráter pessoal.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-libra-navy mb-2">Cookies de funcionalidade</h3>
                    <p>
                      Utilizamos para nos permitir relembrar as preferências do usuário. Por exemplo, os cookies evitam digitar o nome do utilizador cada vez que este acesse o site. Também usamos cookies de funcionalidade para fornecer serviços avançados ao usuário, como por exemplo efetuar comentários a um artigo. Em resumo, os cookies de funcionalidade guardam as preferências do usuário referente à utilização do site, de forma que não seja necessário voltar a configurar o site cada vez que o visita.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-libra-navy mb-2">Cookies de terceiros</h3>
                    <p>
                      Servem para medir o sucesso de aplicações e a eficácia da publicidade de terceiros no nosso site.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-libra-navy mb-2">Cookies de publicidade</h3>
                    <p>
                      Servem para direcionar a publicidade em função dos interesses de cada usuário e do número de visitas que realizou, permitindo limitar o número de vezes da exibição do anúncio. Estes cookies ajudam a medir a eficácia da publicidade.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-libra-navy mb-4">Tipos de cookies por duração</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-libra-navy mb-2">Cookies permanentes</h3>
                    <p>
                      Ficam armazenados ao nível do navegador de internet (browser) nos seus dispositivos de acesso (PC, mobile e tablet) e são utilizados sempre que o usuário faz uma nova visita ao site. Geralmente são utilizados para direcionar a navegação de acordo com os interesses do usuário, permitindo-nos prestar um serviço mais personalizado.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-libra-navy mb-2">Cookies de sessão</h3>
                    <p>
                      São temporários, permanecem nos cookies do seu navegador de internet (browser) até sair do site. A informação obtida permite identificar problemas e oferecer uma melhor experiência de navegação.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-libra-navy mb-4">Como desativar cookies</h2>
                <p>
                  Depois de autorizar o uso de cookies, o usuário pode sempre desativar parte ou a totalidade dos nossos cookies.
                </p>
                <p>
                  Todos os browsers permitem ao utilizador aceitar, recusar ou apagar cookies nomeadamente por meio da seleção das definições apropriadas no respectivo navegador. Pode configurar os cookies no menu "opções" ou "preferências" do seu browser.
                </p>
                <p>
                  Note-se que, ao desativar cookies, o usuário pode impedir que alguns serviços da web funcionem corretamente, afetando, parcial ou totalmente, a navegação no website.
                </p>
                <p className="font-semibold text-libra-navy">
                  Recordamos que ao desativar os cookies, partes do nosso site podem não funcionar corretamente, afetando a sua experiência com usuário.
                </p>
              </section>

              <div className="bg-libra-blue/10 p-6 rounded-lg mt-8">
                <p className="text-center text-libra-navy font-medium">
                  Para mais informações sobre nossa política de cookies ou para esclarecer dúvidas, entre em contato conosco através dos nossos canais de atendimento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PoliticaCookies;