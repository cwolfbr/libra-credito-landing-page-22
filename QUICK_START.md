# 🚀 SETUP RÁPIDO - SUPABASE INTEGRATION

## ⚡ Execução em 5 Minutos

### 1. **Instalar Dependências** (2 min)
```bash
# Windows
.\setup-supabase.bat

# Mac/Linux  
npm install @supabase/supabase-js@^2.39.0 uuid@^9.0.1
npm install --save-dev @types/uuid@^9.0.7
```

### 2. **Configurar Banco** (2 min)
1. Acesse: https://app.supabase.com
2. Vá em **SQL Editor**
3. Execute o arquivo: `create_supabase_tables.sql`

### 3. **Testar** (1 min)
```bash
npm run dev
```
- Acesse: http://localhost:5173/test-supabase
- Deve mostrar todos os testes ✅

---

## 🎯 URLs Importantes

| Função | URL | Descrição |
|--------|-----|-----------|
| 🏠 Site | http://localhost:5173 | Homepage |
| 🧮 Simulação | http://localhost:5173/simulacao | Formulário de simulação |
| 📊 Admin | http://localhost:5173/admin | Dashboard administrativo |
| 🧪 Teste | http://localhost:5173/test-supabase | Verificação do sistema |
| 💾 Supabase | https://app.supabase.com | Banco de dados |

---

## ✅ Checklist de Funcionamento

- [ ] Dependências instaladas (`npm list @supabase/supabase-js`)
- [ ] Tabelas criadas no Supabase
- [ ] Teste /test-supabase passa
- [ ] Simulação salva dados (verificar no admin)
- [ ] Admin mostra simulações

---

## 🆘 Problemas Comuns

**❌ "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**❌ "Supabase connection failed"**
- Verificar URL e API Key em `src/lib/supabase.ts`
- Verificar se tabelas existem no Supabase

**❌ "No data in admin"**
- Fazer uma simulação primeiro
- Verificar console do navegador (F12)

---

## 📞 Suporte

- 📖 **Manual Completo:** `SUPABASE_INTEGRATION_README.md`
- 🧪 **Página de Teste:** `/test-supabase`
- 🐛 **Debug:** Console do navegador (F12)

**🎉 Tudo funcionando? Parabéns! Seu sistema de tracking está pronto!**
