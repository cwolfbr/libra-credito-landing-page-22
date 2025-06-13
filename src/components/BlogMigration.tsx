/**
 * Componente para migração e teste do sistema de blog
 * 
 * @component BlogMigration
 * @description Interface para migrar posts do localStorage para Supabase e testar funcionalidades
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { supabaseApi } from '../lib/supabase';
import BlogService from '../services/blogService';

interface MigrationStatus {
  isRunning: boolean;
  results: {
    migrated: number;
    errors: string[];
  } | null;
}

export default function BlogMigration() {
  const [migrationStatus, setMigrationStatus] = useState<MigrationStatus>({
    isRunning: false,
    results: null
  });
  const [testResults, setTestResults] = useState<string[]>([]);

  const handleMigration = async () => {
    setMigrationStatus({ isRunning: true, results: null });
    
    try {
      const results = await BlogService.migrateLocalPostsToSupabase();
      setMigrationStatus({ isRunning: false, results });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setMigrationStatus({
        isRunning: false,
        results: { migrated: 0, errors: [errorMessage] }
      });
    }
  };

  const testConnection = async () => {
    const tests: string[] = [];
    
    try {
      // Teste 1: Conexão Supabase
      tests.push('🔍 Testando conexão Supabase...');
      const connectionOk = await supabaseApi.testConnection();
      tests.push(connectionOk ? '✅ Conexão Supabase OK' : '❌ Falha na conexão Supabase');

      // Teste 2: Buscar posts do Supabase
      tests.push('🔍 Testando busca de posts...');
      const posts = await supabaseApi.getBlogPosts(5);
      tests.push(`✅ Encontrados ${posts.length} posts no Supabase`);

      // Teste 3: Posts publicados
      tests.push('🔍 Testando posts publicados...');
      const publishedPosts = await supabaseApi.getPublishedBlogPosts(5);
      tests.push(`✅ Encontrados ${publishedPosts.length} posts publicados`);

      // Teste 4: Posts em destaque
      tests.push('🔍 Testando posts em destaque...');
      const featuredPosts = await supabaseApi.getFeaturedBlogPosts();
      tests.push(`✅ Encontrados ${featuredPosts.length} posts em destaque`);

      // Teste 5: BlogService integrado
      tests.push('🔍 Testando BlogService integrado...');
      const blogServicePosts = await BlogService.getPublishedPosts();
      tests.push(`✅ BlogService retornou ${blogServicePosts.length} posts`);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      tests.push(`❌ Erro nos testes: ${errorMessage}`);
    }

    setTestResults(tests);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Migração do Blog para Supabase</CardTitle>
          <CardDescription>
            Migre os posts existentes do localStorage para o Supabase para persistência permanente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button 
              onClick={handleMigration}
              disabled={migrationStatus.isRunning}
              variant="default"
            >
              {migrationStatus.isRunning ? '⏳ Migrando...' : '🚀 Iniciar Migração'}
            </Button>
            
            <Button 
              onClick={testConnection}
              variant="outline"
            >
              🧪 Testar Conexão
            </Button>
          </div>

          {migrationStatus.results && (
            <div className="space-y-2">
              <h4 className="font-semibold">Resultados da Migração:</h4>
              <div className="flex gap-2">
                <Badge variant="default">
                  {migrationStatus.results.migrated} posts migrados
                </Badge>
                {migrationStatus.results.errors.length > 0 && (
                  <Badge variant="destructive">
                    {migrationStatus.results.errors.length} erros
                  </Badge>
                )}
              </div>
              
              {migrationStatus.results.errors.length > 0 && (
                <div className="bg-red-50 p-3 rounded-md">
                  <h5 className="font-medium text-red-800">Erros:</h5>
                  <ul className="mt-2 text-sm text-red-700">
                    {migrationStatus.results.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {testResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Resultados dos Testes:</h4>
              <div className="bg-gray-50 p-3 rounded-md font-mono text-sm">
                {testResults.map((result, index) => (
                  <div key={index}>{result}</div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instruções para Configuração</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">1. Criar tabela no Supabase:</h4>
            <p className="text-sm text-gray-600">
              Execute o arquivo SQL <code>create_posts_table.sql</code> no painel do Supabase para criar a tabela de posts.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">2. Executar migração:</h4>
            <p className="text-sm text-gray-600">
              Clique em "Iniciar Migração" para transferir os posts existentes do localStorage para o Supabase.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">3. Testar funcionalidade:</h4>
            <p className="text-sm text-gray-600">
              Use "Testar Conexão" para verificar se tudo está funcionando corretamente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}