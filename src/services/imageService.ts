/**
 * Serviço para gerenciamento de imagens
 * 
 * @service ImageService
 * @description Upload e gerenciamento de imagens do blog
 */

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class ImageService {
  private static readonly UPLOAD_ENDPOINT = '/api/upload';
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  /**
   * Fazer upload de uma imagem
   */
  static async uploadImage(file: File): Promise<UploadResult> {
    try {
      // Validações
      if (!this.ALLOWED_TYPES.includes(file.type)) {
        return {
          success: false,
          error: 'Tipo de arquivo não suportado. Use JPG, PNG, WebP ou GIF.'
        };
      }

      if (file.size > this.MAX_FILE_SIZE) {
        return {
          success: false,
          error: 'Arquivo muito grande. Máximo 5MB.'
        };
      }

      // Gerar nome único
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2);
      const extension = file.name.split('.').pop()?.toLowerCase();
      const fileName = `blog-${timestamp}-${randomString}.${extension}`;

      // Em um ambiente real, isso faria upload para um servidor
      // Por enquanto, vamos simular o processo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);

      // Simular upload
      await this.simulateUpload(file, fileName);

      const imageUrl = `/images/blog/uploads/${fileName}`;
      
      return {
        success: true,
        url: imageUrl
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao fazer upload'
      };
    }
  }

  /**
   * Simular upload salvando no localStorage para desenvolvimento
   */
  private static async simulateUpload(file: File, fileName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          // Salvar no localStorage para simular persistência
          const imageData = reader.result as string;
          const images = this.getStoredImages();
          images[fileName] = {
            data: imageData,
            originalName: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString()
          };
          
          localStorage.setItem('blog_images', JSON.stringify(images));
          resolve();
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
  static getStoredImages(): Record<string, any> {
    try {
      const stored = localStorage.getItem('blog_images');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  /**
   * Obter URL de uma imagem armazenada
   */
  static getImageUrl(fileName: string): string | null {
    const images = this.getStoredImages();
    return images[fileName]?.data || null;
  }

  /**
   * Listar todas as imagens
   */
  static listImages(): Array<{
    fileName: string;
    originalName: string;
    size: number;
    type: string;
    uploadedAt: string;
    url: string;
  }> {
    const images = this.getStoredImages();
    
    return Object.entries(images).map(([fileName, data]) => ({
      fileName,
      originalName: data.originalName,
      size: data.size,
      type: data.type,
      uploadedAt: data.uploadedAt,
      url: `/images/blog/uploads/${fileName}`
    }));
  }

  /**
   * Deletar uma imagem
   */
  static deleteImage(fileName: string): boolean {
    try {
      const images = this.getStoredImages();
      delete images[fileName];
      localStorage.setItem('blog_images', JSON.stringify(images));
      return true;
    } catch {
      return false;
    }
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