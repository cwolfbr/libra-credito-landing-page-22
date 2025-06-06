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
import { SimulacaoData } from '@/lib/supabase';
import { Eye, Download, RefreshCw, Users, Calculator, TrendingUp, Clock } from 'lucide-react';
import { formatBRL } from '@/utils/formatters';

const AdminDashboard: React.FC = () => {
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

  // Carregar dados
  useEffect(() => {
    loadSimulacoes();
  }, []);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo': return 'bg-blue-100 text-blue-800';
      case 'interessado': return 'bg-green-100 text-green-800';
      case 'contatado': return 'bg-purple-100 text-purple-800';
      case 'finalizado': return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin - Libra Crédito</h1>
        <p className="text-gray-600">Gestão de simulações e leads</p>
      </div>

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
    </div>
  );
};

export default AdminDashboard;
