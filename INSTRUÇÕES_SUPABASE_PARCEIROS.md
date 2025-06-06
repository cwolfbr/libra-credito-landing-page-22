# 🗄️ INSTRUÇÕES PARA SUPABASE - TABELA DE PARCEIROS

## ⚠️ IMPORTANTE: Execute ANTES de testar o formulário!

### 1️⃣ **Acesse o Supabase Dashboard**
- Vá para: https://app.supabase.com
- Faça login na sua conta
- Selecione o projeto: **libra-credito**

### 2️⃣ **Abra o SQL Editor**
- No menu lateral, clique em **SQL Editor**
- Clique em **+ New query**

### 3️⃣ **Execute o Script de Criação**
Cole e execute o seguinte SQL:

```sql
-- ============================================
-- SCRIPT ADICIONAL - TABELA PARCEIROS
-- ============================================

-- 1. TABELA PARCEIROS
CREATE TABLE IF NOT EXISTS public.parceiros (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    cidade TEXT NOT NULL,
    cnpj TEXT,
    tempo_home_equity TEXT NOT NULL,
    perfil_cliente TEXT NOT NULL,
    ramo_atuacao TEXT NOT NULL,
    origem TEXT NOT NULL,
    mensagem TEXT,
    ip_address TEXT,
    user_agent TEXT,
    status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado', 'em_analise')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_parceiros_session_id ON public.parceiros(session_id);
CREATE INDEX IF NOT EXISTS idx_parceiros_created_at ON public.parceiros(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_parceiros_status ON public.parceiros(status);
CREATE INDEX IF NOT EXISTS idx_parceiros_email ON public.parceiros(email);

-- 3. TRIGGER PARA UPDATED_AT
CREATE TRIGGER update_parceiros_updated_at 
    BEFORE UPDATE ON public.parceiros 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. RLS POLICY
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for anonymous users" ON public.parceiros
    FOR ALL USING (true);

-- 5. VIEW PARA DASHBOARD
CREATE OR REPLACE VIEW public.parceiros_dashboard AS
SELECT 
    p.id,
    p.created_at,
    p.nome,
    p.email,
    p.telefone,
    p.cidade,
    p.cnpj,
    p.tempo_home_equity,
    p.perfil_cliente,
    p.ramo_atuacao,
    p.origem,
    p.status,
    uj.utm_source,
    uj.utm_campaign,
    uj.referrer,
    uj.time_on_site,
    (uj.device_info->>'device_type') as device_type,
    (uj.device_info->>'browser') as browser
FROM public.parceiros p
LEFT JOIN public.user_journey uj ON p.session_id = uj.session_id
ORDER BY p.created_at DESC;

-- 6. FUNÇÃO PARA ESTATÍSTICAS DE PARCEIROS
CREATE OR REPLACE FUNCTION get_parceiros_stats()
RETURNS TABLE (
    total_parceiros BIGINT,
    pendentes BIGINT,
    aprovados BIGINT,
    rejeitados BIGINT,
    parceiros_mes BIGINT,
    origem_mais_comum TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total_parceiros,
        COUNT(CASE WHEN status = 'pendente' THEN 1 END)::BIGINT as pendentes,
        COUNT(CASE WHEN status = 'aprovado' THEN 1 END)::BIGINT as aprovados,
        COUNT(CASE WHEN status = 'rejeitado' THEN 1 END)::BIGINT as rejeitados,
        COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END)::BIGINT as parceiros_mes,
        (SELECT origem FROM public.parceiros GROUP BY origem ORDER BY COUNT(*) DESC LIMIT 1) as origem_mais_comum
    FROM public.parceiros;
END;
$$ LANGUAGE plpgsql;
```

### 4️⃣ **Verificar se foi criado**
Execute este comando para testar:

```sql
-- Verificar se a tabela foi criada
SELECT * FROM public.parceiros LIMIT 5;

-- Testar função de estatísticas
SELECT * FROM get_parceiros_stats();
```

### 5️⃣ **Resultado Esperado**
Se tudo deu certo, você deve ver:
- ✅ Tabela `parceiros` criada
- ✅ Índices criados
- ✅ Função `get_parceiros_stats()` funcionando
- ✅ Nenhum erro no console

## 🔧 **Em caso de erro:**

### ❌ Erro: "function update_updated_at_column() does not exist"
Execute primeiro o script principal: `create_supabase_tables.sql`

### ❌ Erro: "permission denied"
Verifique se você está logado como Owner do projeto

### ❌ Erro: "relation already exists"
Tudo bem! A tabela já foi criada. Prossiga com os testes.

## ✅ **Após execução bem-sucedida:**
1. ✅ Execute: `teste-integracao-parceiros.bat`
2. ✅ Teste o formulário em `/parceiros`
3. ✅ Verifique o admin em `/admin`
4. ✅ Confirme os dados no Supabase

---

**🚀 Após executar este SQL, a integração estará 100% funcional!**
