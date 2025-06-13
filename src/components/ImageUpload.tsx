/**
 * Componente para upload de imagens
 * 
 * @component ImageUpload
 * @description Upload de imagens com preview e salvamento local
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Upload, X, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { UploadService } from '../services/uploadService';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
  accept?: string;
  maxSize?: number; // em MB
  className?: string;
}

export default function ImageUpload({
  onImageUploaded,
  currentImage,
  accept = "image/*",
  maxSize = 5,
  className = ""
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carregar imagem atual quando o componente monta
  useEffect(() => {
    if (currentImage) {
      // Se for uma imagem local, buscar do localStorage
      if (currentImage.includes('/images/blog/uploads/')) {
        const fileName = currentImage.split('/').pop();
        if (fileName) {
          const localImageData = UploadService.getImageData(fileName);
          if (localImageData) {
            setPreview(localImageData);
          } else {
            setPreview(currentImage);
          }
        }
      } else {
        setPreview(currentImage);
      }
      setUrlInput(currentImage);
    }
  }, [currentImage]);

  const handleFileUpload = async (file: File) => {
    setError('');
    setUploading(true);

    try {
      // Fazer upload usando o novo serviço
      const result = await UploadService.uploadImage(file);
      
      if (result.success && result.url) {
        // Usar a imagem do localStorage para preview
        const fileName = result.url.split('/').pop();
        const storedImageData = UploadService.getImageData(fileName || '');
        
        if (storedImageData) {
          setPreview(storedImageData);
        } else {
          setPreview(result.url);
        }
        
        onImageUploaded(result.url);
      } else {
        throw new Error(result.error || 'Erro ao fazer upload');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer upload';
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput) {
      setPreview(urlInput);
      onImageUploaded(urlInput);
      setError('');
    }
  };

  const clearImage = () => {
    setPreview('');
    setUrlInput('');
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Seletor de modo */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={uploadMode === 'file' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setUploadMode('file')}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Arquivo
        </Button>
        <Button
          type="button"
          variant={uploadMode === 'url' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setUploadMode('url')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          URL Externa
        </Button>
      </div>

      {/* Upload por arquivo */}
      {uploadMode === 'file' && (
        <Card
          className={`border-2 border-dashed transition-colors ${
            dragActive ? 'border-libra-blue bg-blue-50' : 'border-gray-300'
          } ${uploading ? 'opacity-50' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">
                  Arraste uma imagem aqui ou{' '}
                  <button
                    type="button"
                    className="text-libra-blue hover:underline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    clique para selecionar
                  </button>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WebP até {maxSize}MB
                </p>
              </div>
              {uploading && (
                <Badge variant="secondary">Fazendo upload...</Badge>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </CardContent>
        </Card>
      )}

      {/* Upload por URL */}
      {uploadMode === 'url' && (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://exemplo.com/imagem.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleUrlSubmit}
            disabled={!urlInput}
          >
            Usar URL
          </Button>
        </div>
      )}

      {/* Preview da imagem */}
      {preview && (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={clearImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 break-all">
              {uploadMode === 'file' ? 'Arquivo selecionado' : urlInput}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Erro */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}