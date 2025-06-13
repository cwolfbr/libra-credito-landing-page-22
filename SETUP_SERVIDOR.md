# 🚀 Configuração do Servidor para Upload de Imagens

## 📋 Pré-requisitos
- Node.js instalado (versão 16 ou superior)
- NPM ou Yarn

## 🛠️ Passo a Passo

### 1. Instalar Dependências do Servidor
```bash
# Na pasta raiz do projeto
npm install express multer cors sharp nodemon
```

### 2. Criar Estrutura de Pastas
```bash
# Criar pasta para uploads
mkdir -p public/images/blog/uploads
```

### 3. Iniciar o Servidor
```bash
# Em um terminal separado (deixe rodando)
node server.js
```

### 4. Verificar se Funciona
- Acesse: http://localhost:3001
- O servidor deve mostrar a aplicação normalmente
- Teste o upload de imagens no admin

### 5. Desenvolvimento (Opcional)
Se quiser que o servidor reinicie automaticamente:
```bash
# Instalar nodemon globalmente
npm install -g nodemon

# Usar nodemon para desenvolvimento
nodemon server.js
```

## 🔧 Estrutura Criada

```
projeto/
├── server.js              # Servidor principal
├── api/upload.js          # API de upload
├── package-server.json    # Dependências do servidor
└── public/
    └── images/
        └── blog/
            └── uploads/   # Imagens salvas aqui
```

## ✅ Como Testar

1. **Iniciar servidor**: `node server.js`
2. **Abrir aplicação**: http://localhost:3001/admin
3. **Fazer login** no painel admin
4. **Ir para aba "Blog"**
5. **Criar novo post** com imagem
6. **Testar em outro dispositivo**: acessar mesmo endereço

## 🌐 Acesso em Outros Dispositivos

Para testar em outros dispositivos na mesma rede:

1. **Descobrir IP local**:
   ```bash
   # Linux/Mac
   ip addr show | grep inet
   
   # Windows
   ipconfig
   ```

2. **Acessar via IP**: http://[SEU_IP]:3001
   - Exemplo: http://192.168.1.100:3001

## 🐛 Solução de Problemas

### Erro de Permissão
```bash
sudo mkdir -p public/images/blog/uploads
sudo chmod 755 public/images/blog/uploads
```

### Porta Ocupada
Edite `server.js` e mude a linha:
```javascript
const PORT = process.env.PORT || 3002; // Mude para 3002 ou outra porta
```

### Módulos Não Encontrados
```bash
npm install --save express multer cors sharp
```

## 📱 Resultado Esperado

Após seguir estes passos:
- ✅ Imagens ficam salvas no servidor
- ✅ Funcionam em qualquer dispositivo
- ✅ Persistem entre sessões
- ✅ Editor rico funciona normalmente

## 🔄 Processo de Deploy (Futuro)

Para produção, você precisará:
1. Configurar servidor na nuvem
2. Ajustar URLs no código
3. Configurar backup das imagens
4. SSL/HTTPS para uploads seguros

---

**🎯 Execute estes comandos na ordem e o sistema funcionará perfeitamente!**