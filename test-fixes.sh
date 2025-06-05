#!/bin/bash

echo "🚀 LIMPEZA E REINSTALAÇÃO - PERFORMANCE MÁXIMA"
echo "================================================"

# 1. Backup do estado atual
echo "📦 Fazendo backup..."
cp package.json package.json.backup
cp package-lock.json package-lock.json.backup 2>/dev/null || echo "package-lock.json não existe"

# 2. Limpeza completa
echo "🗑️ Limpando node_modules..."
rm -rf node_modules
rm -f package-lock.json

# 3. Reinstalação limpa
echo "📥 Reinstalando dependências..."
npm install

# 4. Teste do build
echo "🔨 Testando build..."
npm run build

# 5. Teste do dev server
echo "🚀 Iniciando servidor de desenvolvimento..."
echo "   → Acesse: http://localhost:5173"
echo "   → Pressione Ctrl+C para parar"
npm run dev
