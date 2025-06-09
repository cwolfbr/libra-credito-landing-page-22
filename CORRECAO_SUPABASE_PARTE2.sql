-- ================================================================
-- PARTE 2: CORREÇÃO FUNÇÕES E ÍNDICES
-- ================================================================

-- ================================================================
-- SEÇÃO 6: CORRIGIR FUNÇÃO cleanup_old_data
-- ================================================================

CREATE OR REPLACE FUNCTION public.cleanup_old_data()
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

-- ================================================================
-- SEÇÃO 7: CORRIGIR FUNÇÃO update_updated_at_column
-- ================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
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

-- ================================================================
-- SEÇÃO 8: CORRIGIR FUNÇÃO get_parceiros_stats
-- ================================================================

CREATE OR REPLACE FUNCTION public.get_parceiros_stats()
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
-- SEÇÃO 9: CRIAR ÍNDICES PARA PERFORMANCE
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