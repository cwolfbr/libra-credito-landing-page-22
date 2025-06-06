-- ============================================
-- SCRIPT ADICIONAL - TABELA PARCEIROS
-- ============================================
-- 
-- Execute este script no SQL Editor do Supabase
-- APÓS ter executado o script principal de criação das tabelas
--

-- 1. TABELA PARCEIROS
-- Armazena solicitações de parceria
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

-- 7. COMENTÁRIOS
COMMENT ON TABLE public.parceiros IS 'Armazena solicitações de parceria da Libra Crédito';
COMMENT ON COLUMN public.parceiros.session_id IS 'ID único da sessão do usuário';
COMMENT ON COLUMN public.parceiros.tempo_home_equity IS 'Tempo de experiência com Home Equity';
COMMENT ON COLUMN public.parceiros.perfil_cliente IS 'Tipo de cliente que atende (PF/PJ/Ambos)';
COMMENT ON COLUMN public.parceiros.ramo_atuacao IS 'Área de atuação do parceiro';

-- ============================================
-- INSTRUÇÕES:
-- ============================================
-- 
-- 1. Execute este script no Supabase SQL Editor
-- 2. Verifique se a tabela foi criada:
--    SELECT * FROM public.parceiros LIMIT 5;
-- 3. Teste as estatísticas:
--    SELECT * FROM get_parceiros_stats();
--
