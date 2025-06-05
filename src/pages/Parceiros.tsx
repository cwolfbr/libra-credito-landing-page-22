import React, { useEffect } from 'react';
import { HandshakeIcon, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Parceiros = () => {
  useEffect(() => {
    document.title = "Seja Parceiro | Libra Crédito";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Torne-se um parceiro da Libra Crédito e cresça conosco. Acesse também a área exclusiva para parceiros.');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de envio do formulário
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FF]">
      <Header />
      
      <main className="flex-1 pt-header px-4 py-12 sm:px-6 md:px-8 lg:px-16 lg:py-20">
        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Formulário para Novos Parceiros */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-libra-navy mb-8">Seja um parceiro</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Nome"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                    <Input
                      type="tel"
                      placeholder="Telefone"
                      required
                    />
                    </div>
                    <div>
                    <Input
                      type="text"
                      placeholder="Cidade"
                      required
                    />
                    </div>
                    <div>
                    <Input
                      type="text"
                      placeholder="CNPJ"
                      required
                    />
                  </div>
                    </div>

                    <div>
                  <p className="text-gray-700 mb-2">Trabalha a quanto tempo com Home Equity (empréstimo com garantia de imóvel)?</p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menos-1">Menos de 1 ano</SelectItem>
                      <SelectItem value="1-2">1 a 2 anos</SelectItem>
                      <SelectItem value="2-5">2 a 5 anos</SelectItem>
                      <SelectItem value="mais-5">Mais de 5 anos</SelectItem>
                    </SelectContent>
                  </Select>
                    </div>

                <div>
                  <p className="text-gray-700 mb-2">Qual perfil de cliente?</p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pf">Pessoa Física</SelectItem>
                      <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                      <SelectItem value="ambos">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                  </div>

                <div>
                  <p className="text-gray-700 mb-2">Ramo de atuação?</p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="correspondente">Correspondente Bancário</SelectItem>
                      <SelectItem value="corretor">Corretor de Imóveis</SelectItem>
                      <SelectItem value="consultor">Consultor Financeiro</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-gray-700 mb-2">Como chegou até nós?</p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="redes-sociais">Redes Sociais</SelectItem>
                      <SelectItem value="indicacao">Indicação</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
              </div>

                <div>
                  <Textarea
                    placeholder="Mensagem"
                    className="min-h-[120px]"
                  />
              </div>

                <Button 
                  type="submit"
                  className="w-full bg-libra-navy hover:bg-libra-navy/90 text-white"
                >
                  Enviar Solicitação
                </Button>
              </form>
            </div>

            {/* Área de Acesso para Parceiros */}
            <div className="lg:flex lg:items-center">
              <div className="bg-libra-navy rounded-xl p-6 md:p-8 text-white text-center w-full">
                <div className="flex justify-center mb-6">
                  <LockKeyhole className="w-16 h-16 text-libra-blue" />
          </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Área do Parceiro</h2>
                
                <p className="text-libra-silver mb-8">
                  Já é nosso parceiro? Acesse a área exclusiva para ter acesso a materiais, 
                  relatórios e ferramentas especiais.
                </p>

                <Button 
                  onClick={() => window.location.href = "https://parceiros.libracredito.com.br/login"}
                  className="w-full bg-libra-blue hover:bg-libra-blue/90 text-white"
                >
                  Já sou Parceiro
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Parceiros;
