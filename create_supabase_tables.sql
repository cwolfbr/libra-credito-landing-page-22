-- ============================================
-- SCRIPT SQL PARA SUPABASE - LIBRA CRÉDITO
-- ============================================
-- 
-- Este script cria as tabelas necessárias para o sistema de tracking
-- e armazenamento de simulações da Libra Crédito
-- 
-- Execute este script no SQL Editor do Supabase Dashboard
--

-- 1. TABELA SIMULACOES
-- Armazena dados das simulações de crédito realizadas
CREATE TABLE IF NOT EXISTS public.simulacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    nome_completo TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    cidade TEXT NOT NULL,
    valor_emprestimo NUMERIC NOT NULL,
    valor_imovel NUMERIC NOT NULL,
    parcelas INTEGER NOT NULL,
    tipo_amortizacao TEXT NOT NULL CHECK (tipo_amortizacao IN ('SAC', 'PRICE')),
    parcela_inicial NUMERIC,
    parcela_final NUMERIC,
    ip_address TEXT,
    user_agent TEXT,
    status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'interessado', 'contatado', 'finalizado')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABELA USER_JOURNEY
-- Armazena dados completos da jornada do usuário
CREATE TABLE IF NOT EXISTS public.user_journey (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    referrer TEXT,
    landing_page TEXT NOT NULL,
    pages_visited JSONB DEFAULT '[]'::jsonb,
    time_on_site INTEGER DEFAULT 0,
    device_info JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_simulacoes_session_id ON public.simulacoes(session_id);
CREATE INDEX IF NOT EXISTS idx_simulacoes_created_at ON public.simulacoes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_simulacoes_status ON public.simulacoes(status);
CREATE INDEX IF NOT EXISTS idx_simulacoes_cidade ON public.simulacoes(cidade);
CREATE INDEX IF NOT EXISTS idx_user_journey_session_id ON public.user_journey(session_id);
CREATE INDEX IF NOT EXISTS idx_user_journey_created_at ON public.user_journey(created_at DESC);

-- 4. TRIGGERS PARA UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_simulacoes_updated_at 
    BEFORE UPDATE ON public.simulacoes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_journey_updated_at 
    BEFORE UPDATE ON public.user_journey 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. POLÍTICAS RLS (Row Level Security)
ALTER TABLE public.simulacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_journey ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT, SELECT, UPDATE para anonymous role
CREATE POLICY "Enable all operations for anonymous users" ON public.simulacoes
    FOR ALL USING (true);

CREATE POLICY "Enable all operations for anonymous users" ON public.user_journey
    FOR ALL USING (true);

-- 6. FUNÇÃO PARA ESTATÍSTICAS
CREATE OR REPLACE FUNCTION get_simulacao_stats()
RETURNS TABLE (
    total_simulacoes BIGINT,
    simulacoes_hoje BIGINT,
    simulacoes_semana BIGINT,
    simulacoes_mes BIGINT,
    valor_total_emprestimos NUMERIC,
    cidade_mais_ativa TEXT,
    conversao_rate DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total_simulacoes,
        COUNT(CASE WHEN DATE(created_at) = CURRENT_DATE THEN 1 END)::BIGINT as simulacoes_hoje,
        COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END)::BIGINT as simulacoes_semana,
        COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END)::BIGINT as simulacoes_mes,
        COALESCE(SUM(valor_emprestimo), 0) as valor_total_emprestimos,
        (SELECT cidade FROM public.simulacoes GROUP BY cidade ORDER BY COUNT(*) DESC LIMIT 1) as cidade_mais_ativa,
        CASE 
            WHEN COUNT(*) > 0 THEN ROUND((COUNT(CASE WHEN status IN ('interessado', 'contatado', 'finalizado') THEN 1 END) * 100.0) / COUNT(*), 2)
            ELSE 0
        END as conversao_rate
    FROM public.simulacoes;
END;
$$ LANGUAGE plpgsql;

-- 7. VIEW PARA RELATÓRIOS
CREATE OR REPLACE VIEW public.simulacoes_dashboard AS
SELECT 
    s.id,
    s.created_at,
    s.nome_completo,
    s.email,
    s.telefone,
    s.cidade,
    s.valor_emprestimo,
    s.valor_imovel,
    s.parcelas,
    s.tipo_amortizacao,
    s.status,
    ROUND((s.valor_emprestimo::DECIMAL / s.valor_imovel::DECIMAL) * 100, 2) as ltv_ratio,
    uj.utm_source,
    uj.utm_campaign,
    uj.referrer,
    uj.time_on_site,
    (uj.device_info->>'device_type') as device_type,
    (uj.device_info->>'browser') as browser
FROM public.simulacoes s
LEFT JOIN public.user_journey uj ON s.session_id = uj.session_id
ORDER BY s.created_at DESC;

-- 8. FUNÇÃO PARA LIMPEZA DE DADOS ANTIGOS (LGPD)
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Remove dados de jornada de usuário com mais de 2 anos
    DELETE FROM public.user_journey 
    WHERE created_at < NOW() - INTERVAL '2 years';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Log da limpeza (opcional)
    INSERT INTO public.data_cleanup_log (table_name, deleted_count, cleanup_date)
    VALUES ('user_journey', deleted_count, NOW());
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- 9. TABELA DE LOG DE LIMPEZA (opcional)
CREATE TABLE IF NOT EXISTS public.data_cleanup_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    table_name TEXT NOT NULL,
    deleted_count INTEGER NOT NULL,
    cleanup_date TIMESTAMPTZ DEFAULT NOW()
);

-- 10. COMENTÁRIOS NAS TABELAS
COMMENT ON TABLE public.simulacoes IS 'Armazena simulações de crédito com garantia de imóvel';
COMMENT ON TABLE public.user_journey IS 'Tracking completo da jornada do usuário no site';
COMMENT ON COLUMN public.simulacoes.session_id IS 'ID único da sessão do usuário';
COMMENT ON COLUMN public.simulacoes.valor_emprestimo IS 'Valor solicitado para empréstimo';
COMMENT ON COLUMN public.simulacoes.valor_imovel IS 'Valor do imóvel usado como garantia';
COMMENT ON COLUMN public.user_journey.pages_visited IS 'Array JSON com páginas visitadas e timestamps';
COMMENT ON COLUMN public.user_journey.device_info IS 'Informações do dispositivo (browser, OS, resolução)';

-- ============================================
-- INSTRUÇÕES DE USO:
-- ============================================
-- 
-- 1. Copie este script completo
-- 2. Acesse o Supabase Dashboard (https://app.supabase.com)
-- 3. Vá em SQL Editor
-- 4. Cole e execute este script
-- 5. Verifique se todas as tabelas foram criadas
-- 
-- QUERIES ÚTEIS PARA TESTE:
-- 
-- -- Ver todas as simulações
-- SELECT * FROM public.simulacoes ORDER BY created_at DESC;
-- 
-- -- Ver estatísticas
-- SELECT * FROM get_simulacao_stats();
-- 
-- -- Ver dashboard completo
-- SELECT * FROM public.simulacoes_dashboard LIMIT 10;
-- 
-- -- Ver jornadas de usuário
-- SELECT session_id, utm_source, landing_page, time_on_site 
-- FROM public.user_journey ORDER BY created_at DESC;
--
