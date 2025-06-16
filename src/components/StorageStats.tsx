import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogService } from '@/services/blogService';

const StorageStats: React.FC = () => {
  const [stats, setStats] = useState({ usedMB: 0, posts: 0, hasBase64Images: 0 });

  const updateStats = () => {
    const storageStats = BlogService.getStorageStats();
    setStats(storageStats);
  };

  const handleClearCache = () => {
    if (confirm('Deseja limpar o cache local? Os posts permanecerão no Supabase.')) {
      BlogService.clearLocalStorage();
      updateStats();
      alert('Cache limpo com sucesso!');
    }
  };

  useEffect(() => {
    updateStats();
  }, []);

  const getStorageColor = () => {
    if (stats.usedMB > 8) return 'text-red-600';
    if (stats.usedMB > 5) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>📊 Estatísticas de Armazenamento</CardTitle>
        <p className="text-sm text-gray-600">
          Monitor do cache local do navegador
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.posts}</p>
            <p className="text-sm text-gray-600">Posts em Cache</p>
          </div>
          
          <div className="text-center">
            <p className={`text-2xl font-bold ${getStorageColor()}`}>
              {stats.usedMB} MB
            </p>
            <p className="text-sm text-gray-600">Espaço Usado</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{stats.hasBase64Images}</p>
            <p className="text-sm text-gray-600">Imagens Base64</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round((10 - stats.usedMB) * 10) / 10} MB
            </p>
            <p className="text-sm text-gray-600">Espaço Livre</p>
          </div>
        </div>

        {stats.usedMB > 7 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-700">
              ⚠️ <strong>Atenção:</strong> Armazenamento local quase cheio. 
              Considere limpar o cache ou reduzir o uso de imagens grandes.
            </p>
          </div>
        )}

        {stats.hasBase64Images > 0 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-700">
              💡 <strong>Dica:</strong> {stats.hasBase64Images} imagens estão sendo armazenadas 
              localmente. Para economizar espaço, use o Supabase Storage.
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={updateStats}
            variant="outline"
            size="sm"
          >
            🔄 Atualizar
          </Button>
          
          <Button 
            onClick={handleClearCache}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            🧹 Limpar Cache
          </Button>
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
          <p className="font-medium mb-1">ℹ️ Sobre o cache local:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Usado para melhorar a performance do AdminDashboard</li>
            <li>Posts ficam sincronizados com o Supabase automaticamente</li>
            <li>Imagens base64 ocupam muito espaço (use Supabase Storage)</li>
            <li>Limite típico: ~10MB por domínio</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageStats;