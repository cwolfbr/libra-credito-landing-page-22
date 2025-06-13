/**
 * Serviço para gerenciamento de imagens
 * 
 * @service ImageService
 * @description Upload e gerenciamento de imagens do blog
 * @deprecated Use UploadService para novas implementações
 */

import { UploadService } from './uploadService';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class ImageService {
  /**
   * Fazer upload de uma imagem (delegado para UploadService)
   */
  static async uploadImage(file: File): Promise<UploadResult> {
    return UploadService.uploadImage(file);
  }

  /**
   * Obter URL de uma imagem armazenada (delegado para UploadService)
   */
  static getImageUrl(fileName: string): string | null {
    return UploadService.getImageData(fileName);
  }

  /**
   * Listar todas as imagens (delegado para UploadService)
   */
  static listImages() {
    return UploadService.listImages();
  }

  /**
   * Deletar uma imagem (delegado para UploadService)
   */
  static deleteImage(fileName: string): boolean {
    return UploadService.deleteImage(fileName);
  }

  /**
   * Validar URL de imagem
   */
  static validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  /**
   * Otimizar tamanho da imagem (redimensionar se necessário)
   */
  static async resizeImage(file: File, maxWidth: number = 1200, maxHeight: number = 800, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calcular novas dimensões mantendo proporção
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Desenhar imagem redimensionada
        ctx?.drawImage(img, 0, 0, width, height);

        // Converter para blob
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(resizedFile);
          } else {
            resolve(file); // Fallback para arquivo original
          }
        }, file.type, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Obter informações de uma imagem
   */
  static getImageInfo(file: File): Promise<{
    width: number;
    height: number;
    size: number;
    type: string;
  }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          size: file.size,
          type: file.type
        });
      };
      
      img.onerror = () => reject(new Error('Não foi possível carregar a imagem'));
      img.src = URL.createObjectURL(file);
    });
  }
}

export default ImageService;