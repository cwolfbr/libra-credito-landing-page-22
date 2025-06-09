-- ================================================================
-- SCRIPT SUPABASE - CORREÇÃO SEM ERROS
-- ================================================================
-- 
-- 🔒 Versão que remove funções existentes antes de recriar
-- Execute este arquivo COMPLETO no SQL Editor
--

-- ================================================================
-- SEÇÃO 1: CRIAR TABELA data_cleanup_log (se não existir)
-- ================================================================

CREATE TABLE IF NOT EXISTS public.data_cleanup_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    table_name TEXT NOT NULL,
    deleted_rows INTEGER DEFAULT 0,
    cleanup_date TIMESTAMPTZ DEFAULT NOW(),
    details TEXT
);

-- ================================================================
-- SEÇÃO 2: HABILITAR RLS
-- ================================================================

-- Habilitar RLS na tabela data_cleanup_log
ALTER TABLE public.data_cleanup_log ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- SEÇÃO 3: CRIAR POLÍTICAS RLS
-- ================================================================

-- Política para data_cleanup_log
DROP POLICY IF EXISTS "Permitir acesso service_role" ON public.data_cleanup_log;
CREATE POLICY "Permitir acesso service_role" ON public.data_cleanup_log
    FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Permitir logs público" ON public.data_cleanup_log;
CREATE POLICY "Permitir logs público" ON public.data_cleanup_log
    FOR SELECT USING (true);

-- ================================================================
-- SEÇÃO 4: RECRIAR VIEW (sem SECURITY INVOKER)
-- ================================================================

-- Recriar view simulacoes_dashboard (versão compatível)
DROP VIEW IF EXISTS public.simulacoes_dashboard;

CREATE VIEW public.simulacoes_dashboard AS
SELECT 
    s.id,
    s.nome_completo,
    s.email,
    s.telefone,
    s.cidade,
    s.valor_emprestimo,
    s.valor_imovel,
    s.parcelas,
    s.tipo_amortizacao,
    s.status,
    s.created_at,
    -- Calcular LTV
    ROUND((s.valor_emprestimo::numeric / NULLIF(s.valor_imovel::numeric, 0)) * 100, 2) as ltv_percent,
    -- Status formatado
    CASE 
        WHEN s.status = 'pendente' THEN 'Pendente'
        WHEN s.status = 'aprovado' THEN 'Aprovado'
        WHEN s.status = 'rejeitado' THEN 'Rejeitado'
        ELSE 'N/A'
    END as status_formatted
FROM public.simulacoes s
ORDER BY s.created_at DESC;

-- ================================================================
-- SEÇÃO 5: REMOVER E RECRIAR FUNÇÕES
-- ================================================================

-- Remover função get_simulacao_stats se existir
DROP FUNCTION IF EXISTS public.get_simulacao_stats();

-- Recriar função get_simulacao_stats
CREATE FUNCTION public.get_simulacao_stats()
RETURNS TABLE(
    total_simulacoes bigint,
    simulacoes_mes bigint,
    valor_medio numeric,
    ltv_medio numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::bigint as total_simulacoes,
        COUNT(CASE WHEN created_at >= date_trunc('month', CURRENT_DATE) THEN 1 END)::bigint as simulacoes_mes,
        ROUND(AVG(valor_emprestimo), 2) as valor_medio,
        ROUND(AVG(valor_emprestimo::numeric / NULLIF(valor_imovel::numeric, 0) * 100), 2) as ltv_medio
    FROM public.simulacoes
    WHERE created_at >= CURRENT_DATE - INTERVAL '12 months';
END;
$$;

-- Remover função cleanup_old_data se existir
DROP FUNCTION IF EXISTS public.cleanup_old_data();

-- Recriar função cleanup_old_data
CREATE FUNCTION public.cleanup_old_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    deleted_count integer;
BEGIN
    -- Limpar dados antigos (mais de 2 anos)
    DELETE FROM public.user_journey 
    WHERE created_at < NOW() - INTERVAL '2 years';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Log da limpeza
    INSERT INTO public.data_cleanup_log (table_name, deleted_rows, cleanup_date)
    VALUES ('user_journey', deleted_count, NOW());
    
    -- Limpar logs antigos de limpeza (mais de 1 ano)
    DELETE FROM public.data_cleanup_log 
    WHERE cleanup_date < NOW() - INTERVAL '1 year';
    
    RAISE NOTICE 'Limpeza concluída. % registros removidos de user_journey', deleted_count;
END;
$$;

-- Remover função update_updated_at_column se existir
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- Recriar função update_updated_at_column
CREATE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Remover função get_parceiros_stats se existir
DROP FUNCTION IF EXISTS public.get_parceiros_stats();

-- Recriar função get_parceiros_stats
CREATE FUNCTION public.get_parceiros_stats()
RETURNS TABLE(
    total_parceiros bigint,
    parceiros_mes bigint,
    por_ramo json,
    por_status json
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::bigint as total_parceiros,
        COUNT(CASE WHEN created_at >= date_trunc('month', CURRENT_DATE) THEN 1 END)::bigint as parceiros_mes,
        
        -- Estatísticas por ramo
        (SELECT json_object_agg(ramo_atuacao, count)
         FROM (
             SELECT ramo_atuacao, COUNT(*) as count
             FROM public.parceiros 
             WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
             GROUP BY ramo_atuacao
         ) t
        ) as por_ramo,
        
        -- Estatísticas por status
        (SELECT json_object_agg(status, count)
         FROM (
             SELECT status, COUNT(*) as count
             FROM public.parceiros 
             WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
             GROUP BY status
         ) t
        ) as por_status
        
    FROM public.parceiros
    WHERE created_at >= CURRENT_DATE - INTERVAL '12 months';
END;
$$;

-- ================================================================
-- SEÇÃO 6: CRIAR ÍNDICES PARA PERFORMANCE
-- ================================================================

-- Índices para simulacoes
CREATE INDEX IF NOT EXISTS idx_simulacoes_created_at ON public.simulacoes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_simulacoes_status ON public.simulacoes(status);
CREATE INDEX IF NOT EXISTS idx_simulacoes_email ON public.simulacoes(email);

-- Índices para parceiros  
CREATE INDEX IF NOT EXISTS idx_parceiros_created_at ON public.parceiros(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_parceiros_status ON public.parceiros(status);
CREATE INDEX IF NOT EXISTS idx_parceiros_ramo ON public.parceiros(ramo_atuacao);

-- Índices para user_journey
CREATE INDEX IF NOT EXISTS idx_user_journey_session ON public.user_journey(session_id);
CREATE INDEX IF NOT EXISTS idx_user_journey_created_at ON public.user_journey(created_at DESC);

-- ================================================================
-- SEÇÃO 7: POLÍTICAS RLS PARA OUTRAS TABELAS
-- ================================================================

-- Políticas para simulacoes
DROP POLICY IF EXISTS "Permitir inserção pública" ON public.simulacoes;
CREATE POLICY "Permitir inserção pública" ON public.simulacoes
    FOR INSERT WITH CHECK (true);

-- Políticas para parceiros
DROP POLICY IF EXISTS "Permitir inserção pública" ON public.parceiros;
CREATE POLICY "Permitir inserção pública" ON public.parceiros
    FOR INSERT WITH CHECK (true);

-- Políticas para user_journey
DROP POLICY IF EXISTS "Permitir acesso público" ON public.user_journey;
CREATE POLICY "Permitir acesso público" ON public.user_journey
    FOR ALL USING (true);

-- ================================================================
-- SEÇÃO 8: PERMISSÕES
-- ================================================================

-- Permissões para anon
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.simulacoes TO anon;
GRANT INSERT ON public.parceiros TO anon;
GRANT ALL ON public.user_journey TO anon;

-- Permissões para authenticated
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.simulacoes TO authenticated;
GRANT ALL ON public.parceiros TO authenticated;
GRANT ALL ON public.user_journey TO authenticated;

-- Permissões para service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- ================================================================
-- SEÇÃO 9: VERIFICAÇÃO FINAL
-- ================================================================

-- Verificar RLS habilitado
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    CASE WHEN rowsecurity THEN '✅ RLS Habilitado' ELSE '❌ RLS Desabilitado' END as status
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('simulacoes', 'parceiros', 'user_journey', 'data_cleanup_log')
ORDER BY tablename;

-- Verificar políticas
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;