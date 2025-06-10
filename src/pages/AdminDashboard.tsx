/**
 * Página de administração simples
 * 
 * @page AdminDashboard
 * @description Dashboard básico para visualizar simulações e dados coletados
 * 
 * @features
 * - Lista de simulações
 * - Filtros básicos
 * - Dados de jornada do usuário
 * - Export simples
 * - Atualização de status
 * 
 * @security
 * - Acesso via URL simples (sem autenticação por ora)
 * - Dados sensíveis mascarados
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SimulationService } from '@/services/simulationService';
import { PartnersService } from '@/services/partnersService';
import { BlogService, type BlogPost, type SimulationConfig } from '@/services/blogService';
import { SimulacaoData, ParceiroData } from '@/lib/supabase';
import { Eye, Download, RefreshCw, Users, Calculator, TrendingUp, Clock, Handshake, UserCheck, Building, FileText, Settings, Plus, Edit, Trash2, Save } from 'lucide-react';
import { formatBRL } from '@/utils/formatters';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulacoes' | 'parceiros' | 'blog' | 'configuracoes'>('simulacoes');
  
  // Estados para simulações
  const [simulacoes, setSimulacoes] = useState<SimulacaoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [filtroNome, setFiltroNome] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    novos: 0,
    interessados: 0,
    contatados: 0
  });
  
  // Estados para parceiros
  const [parceiros, setParceiros] = useState<ParceiroData[]>([]);
  
  // Estados para blog
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({});
  const [loadingBlog, setLoadingBlog] = useState(false);
  
  // Estados para configurações de simulação
  const [simulationConfig, setSimulationConfig] = useState<SimulationConfig>({
    taxaJurosMin: 1.09,
    taxaJurosMax: 2.5,
    valorMinimo: 100000,
    valorMaximo: 5000000,
    parcelasMin: 36,
    parcelasMax: 180,
    percentualMaximo: 70,
    taxaPadrao: 1.19,
    custoOperacional: 0.5
  });
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [loadingParceiros, setLoadingParceiros] = useState(false);
  const [filtroStatusParceiros, setFiltroStatusParceiros] = useState<string>('todos');
  const [filtroNomeParceiros, setFiltroNomeParceiros] = useState('');
  const [statsParceiros, setStatsParceiros] = useState({
    total: 0,
    pendentes: 0,
    aprovados: 0,
    rejeitados: 0
  });

  // Carregar dados
  useEffect(() => {
    loadSimulacoes();
    loadParceiros();
    loadBlogPosts();
    loadSimulationConfig();
  }, []);
  
  // Carregar posts do blog
  const loadBlogPosts = async () => {
    setLoadingBlog(true);
    try {
      const posts = await BlogService.getAllPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoadingBlog(false);
    }
  };
  
  // Carregar configurações de simulação
  const loadSimulationConfig = async () => {
    try {
      const config = await BlogService.getSimulationConfig();
      setSimulationConfig(config);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };
  
  // Salvar post
  const handleSavePost = async () => {
    if (!postForm.title || !postForm.description || !postForm.category || !postForm.content) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      // Gerar slug se não fornecido
      if (!postForm.slug) {
        postForm.slug = BlogService.generateSlug(postForm.title);
      }
      
      if (editingPost?.id) {
        await BlogService.updatePost(editingPost.id, postForm);
      } else {
        await BlogService.createPost({
          ...postForm,
          published: true,
          featuredPost: false
        } as BlogPost);
      }
      
      await loadBlogPosts();
      setShowPostEditor(false);
      setPostForm({});
      setEditingPost(null);
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      alert('Erro ao salvar post: ' + (error as Error).message);
    }
  };
  
  // Deletar post
  const handleDeletePost = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return;
    
    try {
      await BlogService.deletePost(id);
      await loadBlogPosts();
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      alert('Erro ao deletar post');
    }
  };
  
  // Salvar configurações
  const handleSaveConfig = async () => {
    setLoadingConfig(true);
    try {
      await BlogService.saveSimulationConfig(simulationConfig);
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      alert('Erro ao salvar configurações');
    } finally {
      setLoadingConfig(false);
    }
  };
  
  // Carregar parceiros
  const loadParceiros = async () => {
    setLoadingParceiros(true);
    try {
      const data = await PartnersService.getParceiros(100);
      setParceiros(data);
      calculateStatsParceiros(data);
    } catch (error) {
      console.error('Erro ao carregar parceiros:', error);
    } finally {
      setLoadingParceiros(false);
    }
  };
  
  const calculateStatsParceiros = (data: ParceiroData[]) => {
    const stats = {
      total: data.length,
      pendentes: data.filter(p => p.status === 'pendente').length,
      aprovados: data.filter(p => p.status === 'aprovado').length,
      rejeitados: data.filter(p => p.status === 'rejeitado').length
    };
    setStatsParceiros(stats);
  };
  
  const updateParceiroStatus = async (id: string, newStatus: string) => {
    try {
      await PartnersService.updatePartnerStatus(id, newStatus);
      await loadParceiros(); // Recarregar dados
    } catch (error) {
      console.error('Erro ao atualizar status do parceiro:', error);
    }
  };

  const loadSimulacoes = async () => {
    setLoading(true);
    try {
      const data = await SimulationService.getSimulacoes(100);
      setSimulacoes(data);
      calculateStats(data);
    } catch (error) {
      console.error('Erro ao carregar simulações:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: SimulacaoData[]) => {
    const stats = {
      total: data.length,
      novos: data.filter(s => s.status === 'novo').length,
      interessados: data.filter(s => s.status === 'interessado').length,
      contatados: data.filter(s => s.status === 'contatado').length
    };
    setStats(stats);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await SimulationService.updateSimulationStatus(id, newStatus);
      await loadSimulacoes(); // Recarregar dados
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const exportToCSV = () => {
    const filteredData = getFilteredSimulacoes();
    const csv = [
      // Header
      'Data,Nome,Email,Telefone,Cidade,Valor Emprestimo,Valor Imovel,Parcelas,Sistema,Status',
      // Data
      ...filteredData.map(s => [
        new Date(s.created_at!).toLocaleDateString(),
        s.nome_completo,
        s.email,
        s.telefone,
        s.cidade,
        s.valor_emprestimo,
        s.valor_imovel,
        s.parcelas,
        s.tipo_amortizacao,
        s.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simulacoes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getFilteredSimulacoes = () => {
    return simulacoes.filter(s => {
      const matchStatus = filtroStatus === 'todos' || s.status === filtroStatus;
      const matchNome = !filtroNome || s.nome_completo.toLowerCase().includes(filtroNome.toLowerCase());
      return matchStatus && matchNome;
    });
  };
  
  const getFilteredParceiros = () => {
    return parceiros.filter(p => {
      const matchStatus = filtroStatusParceiros === 'todos' || p.status === filtroStatusParceiros;
      const matchNome = !filtroNomeParceiros || p.nome.toLowerCase().includes(filtroNomeParceiros.toLowerCase());
      return matchStatus && matchNome;
    });
  };
  
  const exportParceirosToCsv = () => {
    const filteredData = getFilteredParceiros();
    const csv = [
      // Header
      'Data,Nome,Email,Telefone,Cidade,CNPJ,Tempo Home Equity,Perfil Cliente,Ramo Atuacao,Origem,Status',
      // Data
      ...filteredData.map(p => [
        new Date(p.created_at!).toLocaleDateString(),
        p.nome,
        p.email,
        p.telefone,
        p.cidade,
        p.cnpj || '',
        p.tempo_home_equity,
        p.perfil_cliente,
        p.ramo_atuacao,
        p.origem,
        p.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parceiros_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo': return 'bg-blue-100 text-blue-800';
      case 'interessado': return 'bg-green-100 text-green-800';
      case 'contatado': return 'bg-purple-100 text-purple-800';
      case 'finalizado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getParceiroStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'aprovado': return 'bg-green-100 text-green-800';
      case 'rejeitado': return 'bg-red-100 text-red-800';
      case 'em_analise': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPhone = (phone: string) => {
    // Mascarar telefone parcialmente
    if (phone.length > 6) {
      return phone.substring(0, phone.length - 4) + '****';
    }
    return phone;
  };

  const formatEmail = (email: string) => {
    // Mascarar email parcialmente
    const [user, domain] = email.split('@');
    if (user.length > 3) {
      return user.substring(0, 3) + '***@' + domain;
    }
    return email;
  };

  const filteredSimulacoes = getFilteredSimulacoes();
  const filteredParceiros = getFilteredParceiros();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin - Libra Crédito</h1>
        <p className="text-gray-600">Gestão de simulações, leads e parceiros</p>
        
        {/* Navigation Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('simulacoes')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'simulacoes'
                  ? 'border-libra-blue text-libra-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calculator className="w-4 h-4 inline mr-2" />
              Simulações
            </button>
            <button
              onClick={() => setActiveTab('parceiros')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'parceiros'
                  ? 'border-libra-blue text-libra-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Handshake className="w-4 h-4 inline mr-2" />
              Parceiros
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'blog'
                  ? 'border-libra-blue text-libra-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Blog
            </button>
            <button
              onClick={() => setActiveTab('configuracoes')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'configuracoes'
                  ? 'border-libra-blue text-libra-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Configurações
            </button>
          </nav>
        </div>
      </div>

      {/* Simulações Tab */}
      {activeTab === 'simulacoes' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Simulações</p>
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Novos Leads</p>
                <p className="text-3xl font-bold text-green-600">{stats.novos}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interessados</p>
                <p className="text-3xl font-bold text-purple-600">{stats.interessados}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contatados</p>
                <p className="text-3xl font-bold text-orange-600">{stats.contatados}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros e Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Buscar por nome..."
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
              />
            </div>
            
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="interessado">Interessado</SelectItem>
                <SelectItem value="contatado">Contatado</SelectItem>
                <SelectItem value="finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={loadSimulacoes} disabled={loading} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>

            <Button onClick={exportToCSV} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Simulações ({filteredSimulacoes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Empréstimo</TableHead>
                  <TableHead>Sistema</TableHead>
                  <TableHead>Parcelas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSimulacoes.map((simulacao) => (
                  <TableRow key={simulacao.id}>
                    <TableCell className="text-sm">
                      {new Date(simulacao.created_at!).toLocaleDateString()}
                      <br />
                      <span className="text-gray-500 text-xs">
                        {new Date(simulacao.created_at!).toLocaleTimeString()}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">
                      {simulacao.nome_completo}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{formatEmail(simulacao.email)}</div>
                      <div className="text-gray-500">{formatPhone(simulacao.telefone)}</div>
                    </TableCell>
                    <TableCell>{simulacao.cidade}</TableCell>
                    <TableCell className="text-sm">
                      <div className="font-semibold text-green-600">
                        {formatBRL(simulacao.valor_emprestimo.toString())}
                      </div>
                      <div className="text-gray-500 text-xs">
                        Imóvel: {formatBRL(simulacao.valor_imovel.toString())}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{simulacao.tipo_amortizacao}</Badge>
                    </TableCell>
                    <TableCell>{simulacao.parcelas}x</TableCell>
                    <TableCell>
                      <Select 
                        value={simulacao.status || 'novo'} 
                        onValueChange={(value) => updateStatus(simulacao.id!, value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="novo">Novo</SelectItem>
                          <SelectItem value="interessado">Interessado</SelectItem>
                          <SelectItem value="contatado">Contatado</SelectItem>
                          <SelectItem value="finalizado">Finalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSimulacoes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma simulação encontrada.
            </div>
          )}
        </CardContent>
      </Card>
        </>
      )}
      
      {/* Parceiros Tab */}
      {activeTab === 'parceiros' && (
        <>
          {/* Stats Cards para Parceiros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Parceiros</p>
                    <p className="text-3xl font-bold text-blue-600">{statsParceiros.total}</p>
                  </div>
                  <Handshake className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendentes</p>
                    <p className="text-3xl font-bold text-yellow-600">{statsParceiros.pendentes}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aprovados</p>
                    <p className="text-3xl font-bold text-green-600">{statsParceiros.aprovados}</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rejeitados</p>
                    <p className="text-3xl font-bold text-red-600">{statsParceiros.rejeitados}</p>
                  </div>
                  <Building className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions para Parceiros */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtros e Ações - Parceiros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    placeholder="Buscar por nome..."
                    value={filtroNomeParceiros}
                    onChange={(e) => setFiltroNomeParceiros(e.target.value)}
                  />
                </div>
                
                <Select value={filtroStatusParceiros} onValueChange={setFiltroStatusParceiros}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="aprovado">Aprovado</SelectItem>
                    <SelectItem value="rejeitado">Rejeitado</SelectItem>
                    <SelectItem value="em_analise">Em Análise</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={loadParceiros} disabled={loadingParceiros} variant="outline">
                  <RefreshCw className={`w-4 h-4 mr-2 ${loadingParceiros ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>

                <Button onClick={exportParceirosToCsv} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Table de Parceiros */}
          <Card>
            <CardHeader>
              <CardTitle>Parceiros ({filteredParceiros.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Cidade</TableHead>
                      <TableHead>CNPJ</TableHead>
                      <TableHead>Experiência</TableHead>
                      <TableHead>Ramo</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParceiros.map((parceiro) => (
                      <TableRow key={parceiro.id}>
                        <TableCell className="text-sm">
                          {new Date(parceiro.created_at!).toLocaleDateString()}
                          <br />
                          <span className="text-gray-500 text-xs">
                            {new Date(parceiro.created_at!).toLocaleTimeString()}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">
                          {parceiro.nome}
                        </TableCell>
                        <TableCell className="text-sm">
                          <div>{formatEmail(parceiro.email)}</div>
                          <div className="text-gray-500">{formatPhone(parceiro.telefone)}</div>
                        </TableCell>
                        <TableCell>{parceiro.cidade}</TableCell>
                        <TableCell className="text-sm">
                          {parceiro.cnpj ? 
                            `${parceiro.cnpj.substring(0, 8)}****` : 
                            'Não informado'
                          }
                        </TableCell>
                        <TableCell className="text-sm">
                          <Badge variant="outline">{parceiro.tempo_home_equity}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {parceiro.ramo_atuacao}
                        </TableCell>
                        <TableCell className="text-sm">
                          {parceiro.origem}
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={parceiro.status || 'pendente'} 
                            onValueChange={(value) => updateParceiroStatus(parceiro.id!, value)}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pendente">Pendente</SelectItem>
                              <SelectItem value="em_analise">Em Análise</SelectItem>
                              <SelectItem value="aprovado">Aprovado</SelectItem>
                              <SelectItem value="rejeitado">Rejeitado</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredParceiros.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhum parceiro encontrado.
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
      
      {/* Blog Tab */}
      {activeTab === 'blog' && (
        <>
          {/* Header do Blog */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gerenciar Blog</h2>
              <p className="text-gray-600">Criar, editar e gerenciar posts do blog</p>
            </div>
            <Button 
              onClick={() => {
                setEditingPost(null);
                setPostForm({});
                setShowPostEditor(true);
              }}
              className="bg-libra-blue hover:bg-libra-blue/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Button>
          </div>

          {/* Editor de Post */}
          {showPostEditor && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingPost ? 'Editar Post' : 'Novo Post'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Título</label>
                    <Input 
                      placeholder="Título do post" 
                      value={postForm.title || ''}
                      onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Categoria</label>
                    <Select 
                      value={postForm.category || ''} 
                      onValueChange={(value) => setPostForm({...postForm, category: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home-equity">Home Equity</SelectItem>
                        <SelectItem value="cgi">Capital de Giro</SelectItem>
                        <SelectItem value="consolidacao">Consolidação</SelectItem>
                        <SelectItem value="educacao-financeira">Educação Financeira</SelectItem>
                        <SelectItem value="score-credito">Score e Crédito</SelectItem>
                        <SelectItem value="credito-rural">Crédito Rural</SelectItem>
                        <SelectItem value="documentacao">Documentação</SelectItem>
                        <SelectItem value="reformas">Reformas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <Input 
                    placeholder="Breve descrição do post" 
                    value={postForm.description || ''}
                    onChange={(e) => setPostForm({...postForm, description: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                  <Input 
                    placeholder="https://..." 
                    value={postForm.imageUrl || ''}
                    onChange={(e) => setPostForm({...postForm, imageUrl: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <Input 
                      placeholder="url-do-post" 
                      value={postForm.slug || ''}
                      onChange={(e) => setPostForm({...postForm, slug: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tempo de Leitura (min)</label>
                    <Input 
                      type="number" 
                      placeholder="5" 
                      value={postForm.readTime || ''}
                      onChange={(e) => setPostForm({...postForm, readTime: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Conteúdo</label>
                  <textarea 
                    className="w-full h-64 p-3 border border-gray-300 rounded-md"
                    placeholder="Conteúdo do post em Markdown..."
                    value={postForm.content || ''}
                    onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="bg-libra-blue hover:bg-libra-blue/90"
                    onClick={handleSavePost}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPostEditor(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Posts do Blog</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loadingBlog ? (
                  <div className="text-center py-8 text-gray-500">
                    Carregando posts...
                  </div>
                ) : blogPosts.length > 0 ? (
                  blogPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/blog/capital-giro.jpg';
                          }}
                        />
                        <div>
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-sm text-gray-600">
                            Categoria: {post.category} • {post.readTime} min
                          </p>
                          <p className="text-xs text-gray-500">
                            {post.published ? 'Publicado' : 'Rascunho'} em {new Date(post.createdAt || '').toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setEditingPost(post);
                            setPostForm(post);
                            setShowPostEditor(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDeletePost(post.id!)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum post encontrado. Crie seu primeiro post!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
      
      {/* Configurações Tab */}
      {activeTab === 'configuracoes' && (
        <>
          <div className="space-y-8">
            {/* Parâmetros de Simulação */}
            <Card>
              <CardHeader>
                <CardTitle>Parâmetros de Simulação</CardTitle>
                <p className="text-gray-600">Configure os limites e taxas do sistema de simulação</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Taxa de Juros Mínima (%)</label>
                    <Input 
                      type="number" 
                      step="0.01"
                      value={simulationConfig.taxaJurosMin}
                      onChange={(e) => setSimulationConfig({
                        ...simulationConfig, 
                        taxaJurosMin: parseFloat(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Taxa de Juros Máxima (%)</label>
                    <Input 
                      type="number" 
                      step="0.01"
                      value={simulationConfig.taxaJurosMax}
                      onChange={(e) => setSimulationConfig({
                        ...simulationConfig, 
                        taxaJurosMax: parseFloat(e.target.value)
                      })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor Mínimo de Empréstimo (R$)</label>
                    <Input 
                      type="number"
                      value={simulationConfig.valorMinimo}
                      onChange={(e) => setSimulationConfig({
                        ...simulationConfig, 
                        valorMinimo: parseInt(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor Máximo de Empréstimo (R$)</label>
                    <Input 
                      type="number"
                      value={simulationConfig.valorMaximo}
                      onChange={(e) => setSimulationConfig({
                        ...simulationConfig, 
                        valorMaximo: parseInt(e.target.value)
                      })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Parcelas Mínimas</label>
                    <Input 
                      type="number"
                      value={simulationConfig.parcelasMin}
                      onChange={(e) => setSimulationConfig({
                        ...simulationConfig, 
                        parcelasMin: parseInt(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Parcelas Máximas</label>
                    <Input 
                      type="number"
                      value={simulationConfig.parcelasMax}
                      onChange={(e) => setSimulationConfig({
                        ...simulationConfig, 
                        parcelasMax: parseInt(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">% Máximo do Imóvel</label>
                    <Input 
                      type="number"
                      value={simulationConfig.percentualMaximo}
                      onChange={(e) => setSimulationConfig({
                        ...simulationConfig, 
                        percentualMaximo: parseInt(e.target.value)
                      })}
                    />
                  </div>
                </div>
                
                <Button 
                  className="bg-libra-blue hover:bg-libra-blue/90"
                  onClick={handleSaveConfig}
                  disabled={loadingConfig}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loadingConfig ? 'Salvando...' : 'Salvar Configurações'}
                </Button>
              </CardContent>
            </Card>
            
            {/* Configurações Gerais */}
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <p className="text-gray-600">Configurações do sistema e notificações</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações por Email</h4>
                    <p className="text-sm text-gray-600">Receber notificações de novas simulações</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Backup Automático</h4>
                    <p className="text-sm text-gray-600">Backup diário dos dados</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email para Notificações</label>
                  <Input placeholder="admin@libracredito.com.br" />
                </div>
                
                <Button className="bg-libra-blue hover:bg-libra-blue/90">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
