-- ============================================
-- SCRIPT DE CORREÇÃO DEFINITIVA - PARCEIROS
-- ============================================
-- 
-- 🎯 Este script vai resolver TODOS os problemas
-- Execute no SQL Editor do Supabase
--

-- 1️⃣ LIMPAR E RECRIAR A TABELA (se necessário)
DROP TABLE IF EXISTS public.parceiros CASCADE;

-- 2️⃣ CRIAR TABELA PARCEIROS (versão limpa)
CREATE TABLE public.parceiros (
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
    status TEXT DEFAULT 'pendente',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3️⃣ CRIAR FUNÇÃO UPDATE_UPDATED_AT (se não existir)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4️⃣ CRIAR TRIGGER PARA UPDATED_AT
CREATE TRIGGER update_parceiros_updated_at 
    BEFORE UPDATE ON public.parceiros 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5️⃣ CONFIGURAR PERMISSÕES RLS
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;

-- Remover policies antigas (se existirem)
DROP POLICY IF EXISTS "Enable all operations for anonymous users" ON public.parceiros;
DROP POLICY IF EXISTS "Allow anonymous access" ON public.parceiros;
DROP POLICY IF EXISTS "parceiros_policy" ON public.parceiros;

-- Criar policy correta
CREATE POLICY "parceiros_full_access" ON public.parceiros
    FOR ALL 
    TO anon, authenticated 
    USING (true) 
    WITH CHECK (true);

-- 6️⃣ CRIAR ÍNDICES
CREATE INDEX IF NOT EXISTS idx_parceiros_session_id ON public.parceiros(session_id);
CREATE INDEX IF NOT EXISTS idx_parceiros_created_at ON public.parceiros(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_parceiros_status ON public.parceiros(status);
CREATE INDEX IF NOT EXISTS idx_parceiros_email ON public.parceiros(email);

-- 7️⃣ FUNÇÃO DE ESTATÍSTICAS
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

-- 8️⃣ TESTE DE INSERÇÃO DIRETA
INSERT INTO public.parceiros (
    session_id, nome, email, telefone, cidade, 
    tempo_home_equity, perfil_cliente, ramo_atuacao, origem, mensagem
) VALUES (
    'test-session-' || extract(epoch from now())::text,
    'Teste SQL',
    'teste@sql.com',
    '11999999999',
    'São Paulo',
    '1-2',
    'pf',
    'correspondente',
    'google',
    'Teste direto do SQL - se você está vendo este registro, a tabela está funcionando!'
);

-- 9️⃣ VERIFICAÇÕES FINAIS
-- Verificar se a tabela foi criada
SELECT 'Tabela criada com sucesso!' as status, COUNT(*) as total_colunas
FROM information_schema.columns 
WHERE table_name = 'parceiros' AND table_schema = 'public';

-- Verificar se há dados
SELECT 'Dados inseridos com sucesso!' as status, COUNT(*) as total_registros
FROM public.parceiros;

-- Verificar permissões
SELECT 'Permissões configuradas!' as status, COUNT(*) as total_policies
FROM pg_policies 
WHERE tablename = 'parceiros';

-- Testar função de estatísticas
SELECT * FROM get_parceiros_stats();

-- ============================================
-- ✅ SE CHEGOU ATÉ AQUI SEM ERROS:
-- ============================================
-- 
-- ✅ Tabela criada corretamente
-- ✅ Permissões configuradas
-- ✅ Função de estatísticas funcionando
-- ✅ Teste de inserção realizado
-- 
-- 🚀 AGORA TESTE O FORMULÁRIO!
--