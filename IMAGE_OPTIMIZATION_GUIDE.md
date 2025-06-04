# Guia de Otimização de Imagens

## Passo 1: Instalar ferramentas necessárias

```bash
# Instalar sharp-cli globalmente
npm install -g sharp-cli

# Ou adicionar ao projeto
npm install --save-dev sharp-cli
```

## Passo 2: Criar script de conversão

Crie um arquivo `convert-images.js` na raiz do projeto:

```javascript
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function convertImages() {
  const imagesDirs = [
    './public/images/logos',
    './public/images/media',
    './public/lovable-uploads'
  ];

  for (const dir of imagesDirs) {
    try {
      const files = await fs.readdir(dir);
      
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const inputPath = path.join(dir, file);
          const baseName = path.basename(file, ext);
          
          // Converter para WebP
          await sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(path.join(dir, `${baseName}.webp`));
          
          // Converter para AVIF (melhor compressão)
          await sharp(inputPath)
            .avif({ quality: 80 })
            .toFile(path.join(dir, `${baseName}.avif`));
          
          console.log(`✅ Convertido: ${file}`);
        }
      }
    } catch (error) {
      console.error(`Erro ao processar ${dir}:`, error);
    }
  }
}

convertImages();
```

## Passo 3: Adicionar script ao package.json

```json
"scripts": {
  "convert-images": "node convert-images.js"
}
```

## Passo 4: Executar conversão

```bash
npm run convert-images
```

## Passo 5: Usar o componente OptimizedImage

Substituir todas as tags `<img>` e usos do `ImageOptimizer` pelo novo componente:

```tsx
import OptimizedImage from '@/components/OptimizedImage';

// Antes:
<img src="/images/logos/logo.png" alt="Logo" />

// Depois:
<OptimizedImage 
  src="/images/logos/logo.png" 
  alt="Logo"
  width={200}
  height={50}
  priority={true}
/>
```

## Tamanhos recomendados

- **Logos**: 200x50 (ou proporcional)
- **Imagens de conteúdo**: 800x600 máximo para mobile
- **Thumbnails**: 400x300

## Checklist de otimização

- [ ] Converter todas as imagens para WebP/AVIF
- [ ] Definir largura e altura em todas as imagens
- [ ] Usar `priority={true}` apenas para imagens above-the-fold
- [ ] Adicionar `sizes` apropriado para responsividade
