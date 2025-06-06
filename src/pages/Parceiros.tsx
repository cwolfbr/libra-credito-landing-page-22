import React, { useEffect, useState } from 'react';
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
import { PartnersService } from '@/services/partnersService';
import { useUserJourney } from '@/hooks/useUserJourney';

const Parceiros = () => {
  const { sessionId } = useUserJourney();
  
  // Debug do sessionId
  useEffect(() => {
    console.log('🔍 DEBUG - useUserJourney sessionId:', sessionId);
    console.log('🔍 DEBUG - sessionId tipo:', typeof sessionId);
    console.log('🔍 DEBUG - sessionId válido:', !!sessionId);
    
    if (!sessionId) {
      console.warn('⚠️ WARNING: sessionId é undefined/null/empty');
    } else {
      console.log('✅ SUCCESS: sessionId encontrado:', sessionId);
    }
  }, [sessionId]);
  
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [tempoHomeEquity, setTempoHomeEquity] = useState('');
  const [perfilCliente, setPerfilCliente] = useState('');
  const [ramoAtuacao, setRamoAtuacao] = useState('');
  const [origem, setOrigem] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Debug dos estados do formulário
  const [debugMode, setDebugMode] = useState(false);
  useEffect(() => {
    document.title = "Seja Parceiro | Libra Crédito";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Torne-se um parceiro da Libra Crédito e cresça conosco. Acesse também a área exclusiva para parceiros.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionId) {
      console.error('🚨 Session ID não encontrado!');
      alert('Erro: Session ID não encontrado. Tente recarregar a página.');
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = {
        sessionId,
        nome,
        email,
        telefone,
        cidade,
        cnpj,
        tempoHomeEquity,
        perfilCliente,
        ramoAtuacao,
        origem,
        mensagem,
        userAgent: navigator.userAgent,
        ipAddress: undefined
      };
      
      console.log('🤝 Dados do formulário preparados:', formData);
      console.log('📊 Validações básicas:', {
        nomeValido: nome.length >= 3,
        emailValido: email.includes('@'),
        telefoneValido: telefone.length >= 10,
        cidadeValida: cidade.length >= 2,
        tempoValido: !!tempoHomeEquity,
        perfilValido: !!perfilCliente,
        ramoValido: !!ramoAtuacao,
        origemValida: !!origem
      });
      
      console.log('🔄 Iniciando chamada para PartnersService...');
      
      // Usar o serviço de parceiros
      const result = await PartnersService.createPartnership(formData);
      
      console.log('✅ Resposta do serviço:', result);
      
      setSuccess(true);
      
      // Limpar formulário
      setNome('');
      setEmail('');
      setTelefone('');
      setCidade('');
      setCnpj('');
      setTempoHomeEquity('');
      setPerfilCliente('');
      setRamoAtuacao('');
      setOrigem('');
      setMensagem('');
      
      alert('🎉 Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.');
      
    } catch (error: any) {
      console.error('❌ Erro completo capturado:', {
        message: error?.message,
        stack: error?.stack,
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
        originalError: error
      });
      
      // Mensagens de erro mais específicas
      let errorMessage = 'Erro ao enviar solicitação. Verifique os dados e tente novamente.';
      
      if (error?.message?.includes('TABELA_NAO_EXISTE')) {
        errorMessage = '🚨 ERRO TÉCNICO: A tabela de parceiros ainda não foi criada no banco de dados. Execute o script CORRECAO_DEFINITIVA_PARCEIROS.sql no Supabase.';
      } else if (error?.message?.includes('DUPLICATE_EMAIL')) {
        errorMessage = '⚠️ Este email já foi cadastrado como parceiro. Use outro email ou entre em contato conosco.';
      } else if (error?.message?.includes('CONEXAO_FALHOU')) {
        errorMessage = '🌐 Problema de conexão. Verifique sua internet e tente novamente.';
      } else if (error?.message?.includes('API_KEY_INVALIDA')) {
        errorMessage = '🔑 Erro de configuração do sistema. Verifique as credenciais do Supabase.';
      } else if (error?.message?.includes('PERMISSAO_NEGADA')) {
        errorMessage = '🚫 Erro de permissão no sistema. Execute o script de correção no Supabase.';
      } else if (error?.code === '42P01') {
        errorMessage = '🚨 Tabela "parceiros" não existe. Execute o script CORRECAO_DEFINITIVA_PARCEIROS.sql no Supabase.';
      } else if (error?.code === '42501') {
        errorMessage = '🚫 Sem permissão para inserir dados. Execute o script de correção no Supabase.';
      }
      
      alert(errorMessage);
      
      // Abrir debug automaticamente em caso de erro
      if (confirm('Erro detectado! Deseja abrir a ferramenta de debug para investigar?')) {
        window.open('debug-parceiros.html', '_blank');
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FF]">
      <Header />
      
      <main className="flex-1 pt-header pb-8 md:pb-12">
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
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                    <Input
                      type="tel"
                      placeholder="Telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      required
                    />
                    </div>
                    <div>
                    <Input
                      type="text"
                      placeholder="Cidade"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      required
                    />
                    </div>
                    <div>
                    <Input
                      type="text"
                      placeholder="CNPJ"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                    />
                  </div>
                    </div>

                    <div>
                  <p className="text-gray-700 mb-2">Trabalha a quanto tempo com Home Equity (empréstimo com garantia de imóvel)?</p>
                  <Select value={tempoHomeEquity} onValueChange={setTempoHomeEquity}>
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
                  <Select value={perfilCliente} onValueChange={setPerfilCliente}>
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
                  <Select value={ramoAtuacao} onValueChange={setRamoAtuacao}>
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
                  <Select value={origem} onValueChange={setOrigem}>
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
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                  />
              </div>

                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-libra-navy hover:bg-libra-navy/90 text-white"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Enviando...
                    </div>
                  ) : (
                    'Enviar Solicitação'
                  )}
                </Button>
                
                {/* Botão de Debug */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">🔧 Debug & Teste</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      type="button"
                      onClick={() => {
                        console.log('🔍 DEBUG MANUAL - Estado do componente:');
                        console.log('sessionId:', sessionId);
                        console.log('Dados do formulário:', { nome, email, telefone, cidade, tempoHomeEquity, perfilCliente, ramoAtuacao, origem });
                        alert('Debug executado! Verifique o console (F12).');
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      🔍 Debug Console
                    </Button>
                    <Button 
                      type="button"
                      onClick={() => window.open('debug-formulario-parceiros.html', '_blank')}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      🛠️ Debug Completo
                    </Button>
                    <Button 
                      type="button"
                      onClick={() => {
                        // Preencher formulário automaticamente para teste
                        setNome('Teste Debug');
                        setEmail('debug@test.com');
                        setTelefone('11999999999');
                        setCidade('São Paulo');
                        setTempoHomeEquity('1-2');
                        setPerfilCliente('pf');
                        setRamoAtuacao('correspondente');
                        setOrigem('google');
                        setMensagem('Preenchimento automático para teste');
                        alert('Formulário preenchido automaticamente!');
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      ⚡ Auto-preencher
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    SessionId: {sessionId ? `✅ ${sessionId.substring(0, 20)}...` : '❌ Não encontrado'}
                  </p>
                </div>
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
