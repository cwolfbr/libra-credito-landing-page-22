/**
 * Serviço para upload e gerenciamento de arquivos
 * 
 * @service UploadService
 * @description Sistema de upload de imagens para o blog com fallback inteligente
 */

export interface UploadResult {
  success: boolean;
  url?: string;
  fileName?: string;
  error?: string;
}

export interface StoredImage {
  data: string; // base64
  originalName: string;
  fileName: string;
  size: number;
  type: string;
  uploadedAt: string;
  url: string;
}

export class UploadService {
  private static readonly STORAGE_KEY = 'blog_images_v2';
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

  /**
   * Upload de imagem com múltiplas estratégias
   */
  static async uploadImage(file: File): Promise<UploadResult> {
    try {
      // Validações
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Gerar nome único
      const fileName = this.generateFileName(file);
      
      // Otimizar imagem se necessário
      const optimizedFile = await this.optimizeImage(file);
      
      // Estratégia 1: Tentar upload real (simulado por enquanto)
      try {
        const realUploadResult = await this.attemptRealUpload(optimizedFile, fileName);
        if (realUploadResult.success) {
          return realUploadResult;
        }
      } catch (error) {
        console.log('Upload real falhou, usando fallback');
      }

      // Estratégia 2: Armazenamento local avançado
      const localResult = await this.storeImageLocally(optimizedFile, fileName);
      return localResult;

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  /**
   * Validar arquivo
   */
  private static validateFile(file: File): { valid: boolean; error?: string } {
    if (!this.ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      return {
        valid: false,
        error: 'Tipo de arquivo não suportado. Use JPG, PNG, WebP ou GIF.'
      };
    }

    if (file.size > this.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: 'Arquivo muito grande. Máximo 5MB.'
      };
    }

    return { valid: true };
  }

  /**
   * Gerar nome único para arquivo
   */
  private static generateFileName(file: File): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    return `blog-${timestamp}-${randomString}.${extension}`;
  }

  /**
   * Otimizar imagem (redimensionar e comprimir)
   */
  private static async optimizeImage(file: File, maxWidth: number = 1200, maxHeight: number = 800): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calcular novas dimensões
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

        // Desenhar imagem otimizada
        ctx?.drawImage(img, 0, 0, width, height);

        // Converter para blob com qualidade otimizada
        canvas.toBlob((blob) => {
          if (blob) {
            const optimizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(optimizedFile);
          } else {
            resolve(file);
          }
        }, file.type, 0.85); // 85% de qualidade
      };

      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Tentar upload real (placeholder para implementação futura)
   */
  private static async attemptRealUpload(file: File, fileName: string): Promise<UploadResult> {
    // Em uma implementação real, isso faria uma chamada para um endpoint
    // Por enquanto, sempre falha para usar o fallback local
    throw new Error('Upload real não implementado');
  }

  /**
   * Armazenar imagem localmente (fallback)
   */
  private static async storeImageLocally(file: File, fileName: string): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const base64Data = reader.result as string;
          const storedImage: StoredImage = {
            data: base64Data,
            originalName: file.name,
            fileName,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            url: `/images/blog/uploads/${fileName}`
          };

          // Salvar no localStorage
          const images = this.getStoredImages();
          images[fileName] = storedImage;
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(images));

          resolve({
            success: true,
            url: storedImage.url,
            fileName
          });
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Obter imagens armazenadas
   */
  static getStoredImages(): Record<string, StoredImage> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  /**
   * Obter dados de uma imagem específica
   */
  static getImageData(fileName: string): string | null {
    const images = this.getStoredImages();
    return images[fileName]?.data || null;
  }

  /**
   * Verificar se uma imagem existe
   */
  static imageExists(fileName: string): boolean {
    const images = this.getStoredImages();
    return !!images[fileName];
  }

  /**
   * Obter URL de uma imagem
   */
  static getImageUrl(url: string): string | null {
    // Extrair fileName da URL
    const fileName = url.split('/').pop();
    if (!fileName) return null;

    const imageData = this.getImageData(fileName);
    return imageData || url; // Retorna base64 ou URL original
  }

  /**
   * Listar todas as imagens
   */
  static listImages(): StoredImage[] {
    const images = this.getStoredImages();
    return Object.values(images).sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  }

  /**
   * Deletar imagem
   */
  static deleteImage(fileName: string): boolean {
    try {
      const images = this.getStoredImages();
      delete images[fileName];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(images));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Limpar cache de imagens antigas (manter últimas 50)
   */
  static cleanupOldImages(): void {
    try {
      const images = this.getStoredImages();
      const imageList = Object.entries(images)
        .sort(([,a], [,b]) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
      
      if (imageList.length > 50) {
        const toKeep = imageList.slice(0, 50);
        const cleanedImages = Object.fromEntries(toKeep);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cleanedImages));
      }
    } catch (error) {
      console.warn('Erro na limpeza de imagens:', error);
    }
  }

  /**
   * Obter estatísticas de armazenamento
   */
  static getStorageStats() {
    const images = this.getStoredImages();
    const totalImages = Object.keys(images).length;
    const totalSize = Object.values(images).reduce((sum, img) => sum + img.size, 0);
    
    return {
      totalImages,
      totalSize,
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      storageUsed: localStorage.getItem(this.STORAGE_KEY)?.length || 0
    };
  }

  /**
   * Exportar dados para backup
   */
  static exportData(): string {
    const images = this.getStoredImages();
    return JSON.stringify(images, null, 2);
  }

  /**
   * Importar dados de backup
   */
  static importData(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(parsed));
      return true;
    } catch {
      return false;
    }
  }
}

export default UploadService;