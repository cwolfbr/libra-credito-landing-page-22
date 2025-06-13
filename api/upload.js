/**
 * API endpoint para upload de imagens
 * 
 * Este endpoint deve ser configurado em um servidor Node.js/Express
 * ou similar para salvar arquivos na pasta public/images/blog/
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp'); // Para otimização de imagens

const router = express.Router();

// Configuração do diretório de upload
const uploadDir = path.join(__dirname, '../public/images/blog/uploads');

// Criar diretório se não existir
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer para upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Gerar nome único
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = path.extname(file.originalname).toLowerCase();
    const fileName = `blog-${timestamp}-${randomString}${extension}`;
    cb(null, fileName);
  }
});

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não suportado. Use JPG, PNG, WebP ou GIF.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

// Endpoint de upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Nenhum arquivo enviado'
      });
    }

    const inputPath = req.file.path;
    const outputPath = path.join(uploadDir, req.file.filename);

    // Otimizar imagem com Sharp
    try {
      await sharp(inputPath)
        .resize(1200, 800, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: 85 })
        .png({ quality: 85 })
        .webp({ quality: 85 })
        .toFile(outputPath + '.optimized');

      // Substituir arquivo original pelo otimizado
      fs.renameSync(outputPath + '.optimized', outputPath);
    } catch (optimizeError) {
      console.warn('Erro na otimização, mantendo arquivo original:', optimizeError.message);
    }

    // URL pública da imagem
    const imageUrl = `/images/blog/uploads/${req.file.filename}`;

    res.json({
      success: true,
      url: imageUrl,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erro interno do servidor'
    });
  }
});

// Endpoint para listar imagens
router.get('/images', (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);
    const images = files.map(file => {
      const filePath = path.join(uploadDir, file);
      const stats = fs.statSync(filePath);
      
      return {
        fileName: file,
        url: `/images/blog/uploads/${file}`,
        size: stats.size,
        uploadedAt: stats.mtime.toISOString()
      };
    }).sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    res.json({
      success: true,
      images: images,
      total: images.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Endpoint para deletar imagem
router.delete('/images/:fileName', (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(uploadDir, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({
        success: true,
        message: 'Imagem deletada com sucesso'
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Imagem não encontrada'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;