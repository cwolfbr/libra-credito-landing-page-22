# 🚨 SOLUÇÃO RÁPIDA PARA O ERRO DE PARCEIROS

## ❌ O Problema
O formulário de parceiros está dando erro porque **a tabela "parceiros" não foi criada no Supabase**.

## ✅ A Solução (5 minutos)

### 1️⃣ **Acesse o Supabase**
- Vá para: https://app.supabase.com
- Faça login na sua conta
- Selecione o projeto: **libra-credito**

### 2️⃣ **Abra o SQL Editor**
- No menu lateral esquerdo, clique em **"SQL Editor"**
- Clique no botão **"+ New query"**

### 3️⃣ **Execute o Script**
- Abra o arquivo: `FIX_PARCEIROS_SQL.sql`
- **Copie todo o conteúdo** do arquivo
- **Cole no SQL Editor** do Supabase
- Clique em **"Run"** (botão azul)

### 4️⃣ **Verifique se Funcionou**
Se não houver erros vermelhos, execute este teste:
```sql
SELECT * FROM parceiros LIMIT 5;
```

### 5️⃣ **Teste o Formulário**
- Volte para: http://localhost:5173/parceiros
- Preencha o formulário
- Clique em "Enviar Solicitação"
- **Agora deve funcionar!** ✅

---

## 🔧 Se Ainda Não Funcionar

### Opção A: **Diagnóstico Automático**
1. Abra o arquivo: `debug-parceiros.html` no seu navegador
2. Execute todos os testes
3. Veja qual específico está falhando

### Opção B: **Script de Correção**
1. Execute: `correcao-parceiros.bat`
2. Siga as instruções na tela

### Opção C: **Verificação Manual**
Abra o console do navegador (F12) e procure por:
- ❌ `42P01` = Tabela não existe
- ❌ `42501` = Sem permissão  
- ❌ `Failed to fetch` = Problema de conexão

---

## 🎯 **TL;DR (Resumo Ultra-Rápido)**

1. **Acesse**: https://app.supabase.com
2. **Vá em**: SQL Editor
3. **Execute**: Conteúdo do arquivo `FIX_PARCEIROS_SQL.sql`
4. **Teste**: Formulário de parceiros novamente

**Tempo estimado**: 2-3 minutos

---

## 📞 **Se Nada Funcionar**

Se ainda assim não funcionar, o problema pode ser:
- 🔑 **API Key incorreta** no arquivo `supabase.ts`
- 🌐 **URL do Supabase incorreta**
- 🔒 **Permissões do projeto** no Supabase
- 🚫 **Firewall/Antivírus** bloqueando conexão

**Nesses casos**, verifique:
1. As credenciais do Supabase em `src/lib/supabase.ts`
2. Se você é o **Owner** do projeto no Supabase
3. Se sua conexão com internet está funcionando

---

**🚀 Na maioria dos casos, executar o SQL resolve 100% dos problemas!**
