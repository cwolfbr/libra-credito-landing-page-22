# 🔧 Instruções Corrigidas - Supabase

## ❌ **Problema Identificado**
O erro `syntax error at or near "SECURITY"` aconteceu porque o Supabase não suporta `SECURITY INVOKER` em views.

## ✅ **Solução Corrigida**

Dividi o script em **3 partes menores** para execução segura:

### **📁 Arquivos Criados:**
1. `CORRECAO_SUPABASE_COMPATIVEL.sql` - Parte 1
2. `CORRECAO_SUPABASE_PARTE2.sql` - Parte 2  
3. `CORRECAO_SUPABASE_PARTE3.sql` - Parte 3

---

## 🚀 **Como Executar (Passo a Passo)**

### **Passo 1: Executar Parte 1**
1. Acesse **Supabase Dashboard > SQL Editor**
2. **Copie e cole** todo conteúdo de `CORRECAO_SUPABASE_COMPATIVEL.sql`
3. **Execute** (botão RUN)
4. ✅ **Deve executar sem erro**

### **Passo 2: Executar Parte 2**  
1. **Copie e cole** todo conteúdo de `CORRECAO_SUPABASE_PARTE2.sql`
2. **Execute** (botão RUN)
3. ✅ **Deve executar sem erro**

### **Passo 3: Executar Parte 3**
1. **Copie e cole** todo conteúdo de `CORRECAO_SUPABASE_PARTE3.sql` 
2. **Execute** (botão RUN)
3. ✅ **Deve executar sem erro**

---

## 🔍 **O que Cada Parte Faz**

### **Parte 1:**
- ✅ Cria tabela `data_cleanup_log`
- ✅ Habilita RLS 
- ✅ Cria políticas básicas
- ✅ Recria view `simulacoes_dashboard` (compatível)
- ✅ Corrige função `get_simulacao_stats`

### **Parte 2:**
- ✅ Corrige função `cleanup_old_data`
- ✅ Corrige função `update_updated_at_column`
- ✅ Corrige função `get_parceiros_stats`
- ✅ Cria índices para performance

### **Parte 3:**
- ✅ Cria políticas RLS para todas as tabelas
- ✅ Configura permissões adequadas
- ✅ Verificação final do status

---

## ⚡ **Execução Rápida**

Se preferir, pode executar cada seção individualmente:

```sql
-- APENAS SEÇÃO 1 (exemplo)
CREATE TABLE IF NOT EXISTS public.data_cleanup_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    table_name TEXT NOT NULL,
    deleted_rows INTEGER DEFAULT 0,
    cleanup_date TIMESTAMPTZ DEFAULT NOW(),
    details TEXT
);
```

---

## 🎯 **Resultado Final**

Após executar as 3 partes, você deve ver:

```
✅ RLS Habilitado - data_cleanup_log
✅ RLS Habilitado - simulacoes  
✅ RLS Habilitado - parceiros
✅ RLS Habilitado - user_journey
```

---

## 🆘 **Se Der Erro**

1. **Erro de tabela não existe**: Execute Parte 1 primeiro
2. **Erro de função não existe**: Execute Parte 2 primeiro  
3. **Erro de política**: Execute Parte 3 por último

---

## ✅ **Verificação**

Após executar tudo, execute no SQL Editor:

```sql
-- Verificar se RLS está habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('data_cleanup_log', 'simulacoes', 'parceiros');
```

**Resultado esperado:** Todas as tabelas com `rowsecurity = t`

---

> 🎉 **Agora deve funcionar perfeitamente!** Os warnings de segurança vão desaparecer do Dashboard.