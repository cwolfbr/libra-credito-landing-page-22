-- ================================================================
-- PARTE 3: POLÍTICAS RLS E PERMISSÕES
-- ================================================================

-- ================================================================
-- SEÇÃO 10: POLÍTICAS RLS PARA OUTRAS TABELAS
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
-- SEÇÃO 11: PERMISSÕES
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
-- SEÇÃO 12: VERIFICAÇÃO FINAL
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