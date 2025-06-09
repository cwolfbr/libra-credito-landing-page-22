-- ================================================================
-- SCRIPT COMPATÍVEL SUPABASE - CORREÇÃO DE SEGURANÇA
-- ================================================================
-- 
-- 🔒 Versão corrigida para compatibilidade com Supabase
-- Execute SEÇÃO POR SEÇÃO no SQL Editor
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
-- SEÇÃO 5: CORRIGIR FUNÇÕES - get_simulacao_stats
-- ================================================================

CREATE OR REPLACE FUNCTION public.get_simulacao_stats()
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