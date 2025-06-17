/**
 * Página de administração simplificada
 * 
 * @page AdminDashboard
 * @description Dashboard para configuração dos parâmetros da simulação
 * 
 * @features
 * - Configuração dos parâmetros do simulador
 * 
 * @security
 * - Acesso via autenticação
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AuthService, type LoginCredentials, type AuthUser } from '@/services/authService';
import AdminLogin from '@/components/AdminLogin';
import { Settings, Save, LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Estados de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [activeTab] = useState<'configuracoes'>('configuracoes');
  
  // Estados para configurações do simulador
  const [simulationConfig, setSimulationConfig] = useState({
    valorMinimo: 100000,
    valorMaximo: 5000000,
    parcelasMin: 36,
    parcelasMax: 180,
    juros: 1.19,
    custoOperacional: 11.0
  });
  const [loadingConfig, setLoadingConfig] = useState(false);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const checkAuth = async () => {
      if (AuthService.isAuthenticated() && AuthService.isTokenValid()) {
        const user = AuthService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      }
      setCheckingAuth(false);
    };
    
    checkAuth();
  }, []);

  // Carregar dados quando autenticado
  useEffect(() => {
    if (isAuthenticated) {
      loadSimulationConfig();
    }
  }, [isAuthenticated]);

  // Funções de autenticação
  const handleLogin = async (credentials: LoginCredentials) => {
    setLoginLoading(true);
    setLoginError('');

    try {
      const user = await AuthService.login(credentials);
      setCurrentUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      setLoginError((error as Error).message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };
  
  // Carregar configurações do simulador local
  const loadSimulationConfig = async () => {
    try {
      const storedConfig = localStorage.getItem('libra_simulation_config');
      if (storedConfig) {
        const config = JSON.parse(storedConfig);
        setSimulationConfig({
          valorMinimo: config.valorMinimo || 100000,
          valorMaximo: config.valorMaximo || 5000000,
          parcelasMin: config.parcelasMin || 36,
          parcelasMax: config.parcelasMax || 180,
          juros: config.juros || 1.19,
          custoOperacional: config.custoOperacional || 11.0
        });
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };
  
  // Salvar configurações do simulador local
  const handleSaveConfig = async () => {
    setLoadingConfig(true);
    try {
      localStorage.setItem('libra_simulation_config', JSON.stringify(simulationConfig));
      console.log('✅ Configurações do simulador salvas:', simulationConfig);
      alert('Configurações do simulador salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      alert('Erro ao salvar configurações');
    } finally {
      setLoadingConfig(false);
    }
  };
  

  // Mostrar loading durante verificação inicial
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-libra-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Mostrar tela de login se não autenticado
  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLogin={handleLogin}
        loading={loginLoading}
        error={loginError}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin - Libra Crédito</h1>
            <p className="text-gray-600">Gestão de simulações, leads e parceiros</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-xs text-gray-500">{currentUser?.email}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
        
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <div className="py-2 px-1 border-b-2 border-libra-blue text-libra-blue font-medium text-sm">
              <Settings className="w-4 h-4 inline mr-2" />
              Configurações do Simulador
            </div>
          </nav>
        </div>
      </div>

      {
        <div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Simulador Interno</CardTitle>
                <p className="text-gray-600">Configure os parâmetros do simulador local. Essas configurações serão aplicadas em todas as simulações do site.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Limites de Valor do Empréstimo</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Valor Mínimo (R$)</label>
                      <Input 
                        type="number"
                        value={simulationConfig.valorMinimo}
                        onChange={(e) => setSimulationConfig({
                          ...simulationConfig, 
                          valorMinimo: parseInt(e.target.value)
                        })}
                      />
                      <p className="text-xs text-gray-500 mt-1">Valor mínimo para empréstimo</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Valor Máximo (R$)</label>
                      <Input 
                        type="number"
                        value={simulationConfig.valorMaximo}
                        onChange={(e) => setSimulationConfig({
                          ...simulationConfig, 
                          valorMaximo: parseInt(e.target.value)
                        })}
                      />
                      <p className="text-xs text-gray-500 mt-1">Valor máximo para empréstimo</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Limites de Parcelas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <p className="text-xs text-gray-500 mt-1">Quantidade mínima de parcelas</p>
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
                      <p className="text-xs text-gray-500 mt-1">Quantidade máxima de parcelas</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Taxa de Juros e Custos Operacionais</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Taxa de Juros (% a.m.)</label>
                      <Input 
                        type="number" 
                        step="0.01"
                        value={simulationConfig.juros}
                        onChange={(e) => setSimulationConfig({
                          ...simulationConfig, 
                          juros: parseFloat(e.target.value)
                        })}
                      />
                      <p className="text-xs text-gray-500 mt-1">Taxa de juros mensal para cálculos (ex: 1.19 = 1,19% a.m.)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">% de Custos da Operação</label>
                      <Input 
                        type="number" 
                        step="0.1"
                        value={simulationConfig.custoOperacional}
                        onChange={(e) => setSimulationConfig({
                          ...simulationConfig, 
                          custoOperacional: parseFloat(e.target.value)
                        })}
                      />
                      <p className="text-xs text-gray-500 mt-1">Percentual de custos inclusos (avaliação, cartório, impostos)</p>
                    </div>
                  </div>
                </div>

                
                <div className="pt-4 border-t">
                  <Button 
                    className="bg-libra-blue hover:bg-libra-blue/90"
                    onClick={handleSaveConfig}
                    disabled={loadingConfig}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loadingConfig ? 'Salvando...' : 'Salvar Todas as Configurações'}
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    ✅ Configurações são aplicadas automaticamente ao simulador interno
                  </p>
                  <div className="text-xs text-gray-500 mt-3 space-y-1">
                    <p><strong>Valores atuais:</strong></p>
                    <p>• Empréstimo: R$ {simulationConfig.valorMinimo.toLocaleString()} a R$ {simulationConfig.valorMaximo.toLocaleString()}</p>
                    <p>• Parcelas: {simulationConfig.parcelasMin} a {simulationConfig.parcelasMax} meses</p>
                    <p>• Taxa: {simulationConfig.juros}% a.m. + {simulationConfig.custoOperacional}% de custos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
          </div>
        </div>
      }
    </div>
  );
};

export default AdminDashboard;