# 🖼️ OTIMIZAÇÃO DE IMAGENS - LIBRA CRÉDITO

## 📋 IMAGENS PARA OTIMIZAR

### **PRIORITÁRIAS (LCP):**
1. **video-thumbnail.jpg** → video-thumbnail.webp → video-thumbnail.avif
   - Dimensões: 480x360px
   - Qualidade: 85% (WebP), 80% (AVIF)
   - Localização: `/public/images/`

### **SECUNDÁRIAS:**
2. **logo.png** → logo.webp → logo.avif
   - Dimensões: 150x50px
   - Qualidade: 90% (lossless se possível)

3. **favicon.ico** → favicon.webp (se aplicável)
   - Dimensões: 32x32px

## 🛠️ COMANDOS PARA GERAR IMAGENS OTIMIZADAS

### **Usando Sharp (Node.js):**
```javascript
const sharp = require('sharp');

// Converter para WebP
sharp('video-thumbnail.jpg')
  .resize(480, 360)
  .webp({ quality: 85 })
  .toFile('video-thumbnail.webp');

// Converter para AVIF
sharp('video-thumbnail.jpg')
  .resize(480, 360)
  .avif({ quality: 80 })
  .toFile('video-thumbnail.avif');
```

### **Usando Online Tools:**
1. **Squoosh.app** - Google's image compressor
2. **TinyPNG.com** - PNG/JPEG compression
3. **AVIF.io** - AVIF conversion

### **Usando Command Line:**
```bash
# WebP
cwebp -q 85 video-thumbnail.jpg -o video-thumbnail.webp

# AVIF (requires avifenc)
avifenc --min 30 --max 50 video-thumbnail.jpg video-thumbnail.avif
```

## 📊 ECONOMIA ESPERADA

| Imagem | Original | WebP | AVIF | Economia |
|--------|----------|------|------|----------|
| Video Thumbnail | ~150KB | ~85KB | ~70KB | 50-55% |
| Logo | ~10KB | ~6KB | ~5KB | 40-50% |
| **Total** | **~160KB** | **~91KB** | **~75KB** | **~53%** |

## 🎯 IMPLEMENTAÇÃO

### **1. Adicionar imagens na pasta public/images/:**
```
public/
  images/
    video-thumbnail.jpg (original - fallback)
    video-thumbnail.webp (otimizada)
    video-thumbnail.avif (mais otimizada)
    logo.png (original)
    logo.webp (otimizada)
    logo.avif (mais otimizada)
```

### **2. Atualizar Hero.tsx:**
```tsx
<OptimizedYouTube
  videoId="E9lwL6R2l1s"
  title="Vídeo institucional Libra Crédito"
  priority={true}
  thumbnailSrc="/images/video-thumbnail.jpg"
  className="w-full h-full"
/>
```

### **3. Atualizar preload no index.html:**
```html
<!-- Mudar de YouTube para local -->
<link rel="preload" href="/images/video-thumbnail.webp" as="image" fetchpriority="high">
```

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Baixar thumbnail do YouTube em alta qualidade
- [ ] Converter para WebP (qualidade 85%)
- [ ] Converter para AVIF (qualidade 80%)
- [ ] Colocar arquivos em `/public/images/`
- [ ] Atualizar Hero.tsx para usar imagem local
- [ ] Atualizar preload no index.html
- [ ] Testar em PageSpeed Insights
- [ ] Verificar economia de bandwidth

## 🎯 RESULTADO ESPERADO

**Melhoria no PageSpeed:**
- **Render Blocking:** Reduzido significativamente
- **Image Optimization:** +315KB economia
- **LCP:** -500ms (imagem local vs YouTube)
- **Performance Score:** +3-5 pontos

---

**💡 DICA:** Use a imagem local como LCP e mantenha o YouTube como fallback para compatibilidade.
