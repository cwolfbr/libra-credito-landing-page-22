
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PoliticaPrivacidade = () => {
  useEffect(() => {
    document.title = "Política de Privacidade | Libra Crédito";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Política de Privacidade da Libra Crédito - Como tratamos e protegemos seus dados pessoais.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-libra-light pt-header px-4 py-12 sm:px-6 md:px-8 lg:px-16 lg:py-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-libra-navy text-center">
                Política de Privacidade
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="text-gray-600 mb-6">
                Nós, da Libra Crédito ("Empresa", "nós"), levamos a sua privacidade e a proteção dos seus dados a sério. Este documento explica como tratamos seus dados pessoais, quais são os seus direitos e como você pode exercê-los.
              </p>

              <h2 className="text-xl font-bold text-libra-navy mt-8 mb-4">Quem é a Libra Crédito?</h2>
              <p className="text-gray-600 mb-6">
                A Libra Crédito, de que trata esta Política, é uma fintech integrante do mesmo grupo econômico da Construtora Stéfani e nasceu para criar oportunidades de crédito justo, sustentável e equilibrado. Todos os aspectos relacionados a seu propósito de descomplicar o processo de contratação de empréstimos com garantia de imóvel, contam com todo o know-how, experiência e solidez adquiridos ao longo de mais de 40 anos de história do grupo no mercado imobiliário.
              </p>

              <h2 className="text-xl font-bold text-libra-navy mt-8 mb-4">1. CONCEITOS BÁSICOS</h2>
              <div className="space-y-4 text-gray-600">
                <p><strong>Dado Pessoal:</strong> É uma informação relacionada a uma pessoa física e que seja capaz de identificá-la ou tornar possível a sua identificação.</p>
                <p><strong>Tratamento:</strong> É todo uso que podemos fazer dos seus Dados Pessoais, incluindo coleta, armazenamento, consulta, uso, compartilhamento, transmissão, classificação, reprodução, exclusão e avaliação.</p>
                <p><strong>Titular:</strong> É você, a pessoa física a quem os Dados Pessoais se referem.</p>
              </div>

              <h2 className="text-xl font-bold text-libra-navy mt-8 mb-4">2. TIPOS DE DADOS COLETADOS</h2>
              <div className="space-y-4 text-gray-600">
                <p><strong>Dados de identificação pessoal:</strong> Nome completo, endereço, RG, CPF, CNH, e-mail, telefone.</p>
                <p><strong>Dados de características pessoais:</strong> Data de nascimento, sexo, nacionalidade, estado civil, profissão.</p>
                <p><strong>Dados financeiros:</strong> Contas bancárias, extratos de pagamento, garantias, seguros.</p>
                <p><strong>Dados de composição familiar:</strong> Regime de casamento, dados do cônjuge/companheiro.</p>
              </div>

              <h2 className="text-xl font-bold text-libra-navy mt-8 mb-4">3. FINALIDADES DO TRATAMENTO</h2>
              <p className="text-gray-600 mb-4">Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Possibilitar oportunidades de crédito e cumprimento do contrato</li>
                <li>Enviar comunicações pertinentes ao objeto do contrato</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Realizar estudos analíticos e pesquisas de marketing</li>
                <li>Buscar direitos decorrentes da celebração do contrato</li>
              </ul>

              <h2 className="text-xl font-bold text-libra-navy mt-8 mb-4">4. COMPARTILHAMENTO DE DADOS</h2>
              <p className="text-gray-600 mb-4">Compartilhamos dados apenas quando necessário com:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Instituições financeiras parceiras</li>
                <li>Investidores</li>
                <li>Órgãos de proteção ao crédito</li>
                <li>Cartórios de registro de imóveis</li>
                <li>Seguradoras</li>
                <li>Prestadores de serviços</li>
              </ul>

              <h2 className="text-xl font-bold text-libra-navy mt-8 mb-4">5. SEUS DIREITOS</h2>
              <p className="text-gray-600 mb-4">Você tem direito a:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Confirmação e acesso aos seus dados</li>
                <li>Correção de dados incompletos ou inexatos</li>
                <li>Anonimização, bloqueio ou eliminação de dados</li>
                <li>Portabilidade dos dados</li>
                <li>Informação sobre compartilhamento</li>
                <li>Revogação do consentimento</li>
                <li>Oposição ao tratamento</li>
              </ul>

              <h2 className="text-xl font-bold text-libra-navy mt-8 mb-4">6. SEGURANÇA</h2>
              <p className="text-gray-600 mb-6">
                Adotamos medidas técnicas e organizativas compatíveis com o padrão de mercado para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>

              <h2 className="text-xl font-bold text-libra-navy mt-8 mb-4">7. CONTATO</h2>
              <div className="text-gray-600 space-y-2">
                <p><strong>Encarregado:</strong> Carolina Barbosa da Cunha</p>
                <p><strong>Endereço:</strong> R. Eliseu Guilherme, 879 – Jardim Sumaré, Ribeirão Preto – SP, 14025-020</p>
                <p><strong>E-mail:</strong> privacidade@libracredito.com.br</p>
              </div>

              <div className="mt-8 p-4 bg-libra-light rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Data da última atualização:</strong> 14 de junho de 2023
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
