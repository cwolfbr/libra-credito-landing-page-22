-- ============================================
-- SCRIPT SQL PARA CORRIGIR ERRO DE PARCEIROS
-- ============================================
-- 
-- 🎯 OBJETIVO: Criar a tabela "parceiros" no Supabase
-- 📍 ONDE EXECUTAR: SQL Editor do Supabase Dashboard
-- ⏰ QUANDO: ANTES de testar o formulário de parceiros
--

-- 1️⃣ CRIAR TABELA PARCEIROS
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

-- 2️⃣ CRIAR ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_parceiros_session_id ON public.parceiros(session_id);
CREATE INDEX IF NOT EXISTS idx_parceiros_created_at ON public.parceiros(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_parceiros_status ON public.parceiros(status);
CREATE INDEX IF NOT EXISTS idx_parceiros_email ON public.parceiros(email);

-- 3️⃣ CRIAR TRIGGER PARA UPDATED_AT
CREATE TRIGGER update_parceiros_updated_at 
    BEFORE UPDATE ON public.parceiros 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4️⃣ CONFIGURAR PERMISSÕES (RLS)
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for anonymous users" ON public.parceiros
    FOR ALL USING (true);

-- 5️⃣ CRIAR FUNÇÃO DE ESTATÍSTICAS
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

-- 6️⃣ CRIAR VIEW PARA DASHBOARD
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

-- ============================================
-- 🧪 TESTE SE DEU CERTO
-- ============================================

-- Verificar se a tabela foi criada
SELECT COUNT(*) as total_colunas 
FROM information_schema.columns 
WHERE table_name = 'parceiros' AND table_schema = 'public';

-- Testar inserção de dados (opcional)
-- INSERT INTO public.parceiros (
--     session_id, nome, email, telefone, cidade, 
--     tempo_home_equity, perfil_cliente, ramo_atuacao, origem
-- ) VALUES (
--     'test-session', 'Teste', 'teste@email.com', '11999999999', 'São Paulo',
--     '1-2', 'pf', 'correspondente', 'google'
-- );

-- Testar função de estatísticas
SELECT * FROM get_parceiros_stats();

-- ✅ Se chegou até aqui sem erros, está tudo funcionando!
-- 🚀 Agora pode testar o formulário em /parceiros

-- ============================================
-- 📝 COMENTÁRIOS FINAIS
-- ============================================
-- 
-- ✅ Tabela criada com sucesso
-- ✅ Índices configurados para performance
-- ✅ Triggers para controle de timestamps
-- ✅ Permissões RLS configuradas
-- ✅ Função de estatísticas disponível
-- ✅ View para dashboard criada
-- 
-- 🎯 Próximo passo: Teste o formulário!
--