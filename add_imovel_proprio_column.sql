-- ============================================
-- SCRIPT SQL PARA ADICIONAR CAMPO IMOVEL_PROPRIO
-- ============================================
-- 
-- Este script adiciona o campo imovel_proprio na tabela simulacoes
-- para identificar se o imóvel usado como garantia é próprio ou de terceiro
--

-- 1. ADICIONAR COLUNA NA TABELA
ALTER TABLE public.simulacoes 
ADD COLUMN IF NOT EXISTS imovel_proprio TEXT 
CHECK (imovel_proprio IN ('proprio', 'terceiro'));

-- 2. ADICIONAR COMENTÁRIO NA COLUNA
COMMENT ON COLUMN public.simulacoes.imovel_proprio 
IS 'Indica se o imóvel usado como garantia é próprio ou de terceiro';

-- 3. (OPCIONAL) SE QUISER LIMPAR DADOS ANTIGOS COMO MENCIONADO
-- CUIDADO: Isso irá deletar TODOS os dados existentes!
-- Descomente as linhas abaixo apenas se tiver certeza:
-- TRUNCATE TABLE public.simulacoes CASCADE;
-- TRUNCATE TABLE public.user_journey CASCADE;

-- 4. ATUALIZAR A VIEW DO DASHBOARD PARA INCLUIR O NOVO CAMPO
DROP VIEW IF EXISTS public.simulacoes_dashboard;

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
    s.imovel_proprio,
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

-- 5. CRIAR ÍNDICE PARA MELHOR PERFORMANCE EM RELATÓRIOS
CREATE INDEX IF NOT EXISTS idx_simulacoes_imovel_proprio 
ON public.simulacoes(imovel_proprio);

-- 6. FUNÇÃO PARA ESTATÍSTICAS INCLUINDO O NOVO CAMPO
CREATE OR REPLACE FUNCTION get_simulacao_stats_v2()
RETURNS TABLE (
    total_simulacoes BIGINT,
    simulacoes_hoje BIGINT,
    simulacoes_semana BIGINT,
    simulacoes_mes BIGINT,
    valor_total_emprestimos NUMERIC,
    cidade_mais_ativa TEXT,
    conversao_rate DECIMAL,
    imoveis_proprios BIGINT,
    imoveis_terceiros BIGINT,
    percentual_proprios DECIMAL
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
        END as conversao_rate,
        COUNT(CASE WHEN imovel_proprio = 'proprio' THEN 1 END)::BIGINT as imoveis_proprios,
        COUNT(CASE WHEN imovel_proprio = 'terceiro' THEN 1 END)::BIGINT as imoveis_terceiros,
        CASE 
            WHEN COUNT(CASE WHEN imovel_proprio IS NOT NULL THEN 1 END) > 0 
            THEN ROUND((COUNT(CASE WHEN imovel_proprio = 'proprio' THEN 1 END) * 100.0) / COUNT(CASE WHEN imovel_proprio IS NOT NULL THEN 1 END), 2)
            ELSE 0
        END as percentual_proprios
    FROM public.simulacoes;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- INSTRUÇÕES DE USO:
-- ============================================
-- 
-- 1. Copie este script completo
-- 2. Acesse o Supabase Dashboard
-- 3. Vá em SQL Editor
-- 4. Cole e execute este script
-- 
-- PARA LIMPAR DADOS ANTIGOS (OPCIONAL):
-- Se você quiser começar do zero com os dados:
-- 1. Descomente as linhas TRUNCATE acima
-- 2. Execute o script
-- 3. CUIDADO: Isso apagará TODOS os dados!
--
-- QUERIES ÚTEIS:
-- 
-- -- Ver estatísticas incluindo imóveis próprios vs terceiros
-- SELECT * FROM get_simulacao_stats_v2();
-- 
-- -- Ver simulações agrupadas por tipo de imóvel
-- SELECT imovel_proprio, COUNT(*) as total 
-- FROM public.simulacoes 
-- WHERE imovel_proprio IS NOT NULL
-- GROUP BY imovel_proprio;
--
