/**
 * Gerenciador de imagens do blog
 * 
 * @component ImageManager
 * @description Interface para visualizar e gerenciar todas as imagens uploaded
 */

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Trash2, Copy, Download, Search, Image as ImageIcon, FileText } from 'lucide-react';
import { UploadService, type StoredImage } from '../services/uploadService';

export default function ImageManager() {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<StoredImage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalImages: 0,
    totalSize: '0',
    storageUsed: 0
  });

  useEffect(() => {
    loadImages();
    loadStats();
  }, []);

  useEffect(() => {
    filterImages();
  }, [images, searchTerm]);

  const loadImages = () => {
    const imageList = UploadService.listImages();
    setImages(imageList);
  };

  const loadStats = () => {
    const storageStats = UploadService.getStorageStats();
    setStats({
      totalImages: storageStats.totalImages,
      totalSize: storageStats.totalSizeMB,
      storageUsed: storageStats.storageUsed
    });
  };

  const filterImages = () => {
    if (!searchTerm) {
      setFilteredImages(images);
      return;
    }

    const filtered = images.filter(img => 
      img.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered);
  };

  const handleDeleteImage = (fileName: string) => {
    if (confirm('Tem certeza que deseja deletar esta imagem?')) {
      const success = UploadService.deleteImage(fileName);
      if (success) {
        loadImages();
        loadStats();
      }
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copiada para a área de transferência!');
  };

  const handleExportData = () => {
    const data = UploadService.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-images-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCleanup = () => {
    if (confirm('Isso manterá apenas as 50 imagens mais recentes. Continuar?')) {
      UploadService.cleanupOldImages();
      loadImages();
      loadStats();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Imagens</p>
                <p className="text-2xl font-bold">{stats.totalImages}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Tamanho Total</p>
                <p className="text-2xl font-bold">{stats.totalSize} MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div>
                <p className="text-sm font-medium text-gray-600">Armazenamento</p>
                <p className="text-2xl font-bold">{Math.round(stats.storageUsed / 1024)} KB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Imagens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Busca */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar imagens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleExportData} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={handleCleanup} variant="outline">
              Limpar Antigas
            </Button>
          </div>

          {/* Lista de Imagens */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredImages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'Nenhuma imagem encontrada' : 'Nenhuma imagem armazenada'}
              </div>
            ) : (
              filteredImages.map((image) => (
                <div
                  key={image.fileName}
                  className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50"
                >
                  {/* Preview da imagem */}
                  <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={image.data}
                      alt={image.originalName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Informações */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{image.originalName}</p>
                    <p className="text-xs text-gray-500 truncate">{image.fileName}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {formatFileSize(image.size)}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDate(image.uploadedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyUrl(image.url)}
                      title="Copiar URL"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteImage(image.fileName)}
                      title="Deletar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}