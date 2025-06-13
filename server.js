/**
 * Servidor Express para servir a aplicação e API de upload
 * 
 * Este arquivo deve ser executado para habilitar upload de imagens
 * Execute: node server.js
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const uploadRouter = require('./api/upload');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (incluindo imagens uploaded)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.use('/api', uploadRouter);

// Fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📁 Uploads serão salvos em: ${path.join(__dirname, 'public/images/blog/uploads')}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
});

// Criar diretórios necessários
const fs = require('fs');
const uploadDir = path.join(__dirname, 'public/images/blog/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`📂 Diretório de uploads criado: ${uploadDir}`);
}