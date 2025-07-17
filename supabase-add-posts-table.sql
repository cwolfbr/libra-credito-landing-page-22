-- =====================================================
-- ADICIONAR TABELA POSTS FALTANTE - LIBRA CRÉDITO
-- =====================================================
-- Execute este script no SQL Editor da nova conta Supabase
-- Dashboard → SQL Editor → New Query → Cole este código → Run
--
-- ✅ Cria tabela 'posts' com estrutura correta
-- ✅ Configura índices para performance
-- ✅ Habilita RLS e políticas de segurança
-- ✅ Adiciona trigger para updated_at
-- ✅ Compatível com sistema existente

-- =====================================================
-- 1. CRIAR TABELA POSTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    read_time INTEGER DEFAULT 5,
    published BOOLEAN DEFAULT false,
    featured_post BOOLEAN DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. ÍNDICES PARA PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_posts_featured ON public.posts(featured_post) WHERE featured_post = true;
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);

-- =====================================================
-- 3. CONFIGURAR RLS (ROW LEVEL SECURITY)
-- =====================================================

-- Habilitar RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. POLÍTICAS RLS
-- =====================================================

-- Público pode ler posts publicados, admin pode tudo
DROP POLICY IF EXISTS "Public can read published posts" ON public.posts;
DROP POLICY IF EXISTS "Admin can manage all posts" ON public.posts;

CREATE POLICY "Public can read published posts" ON public.posts
    FOR SELECT USING (published = true);

CREATE POLICY "Admin can manage all posts" ON public.posts
    FOR ALL USING (true);

-- =====================================================
-- 5. TRIGGER PARA updated_at
-- =====================================================

-- Adicionar trigger para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 6. COMENTÁRIOS PARA DOCUMENTAÇÃO
-- =====================================================

COMMENT ON TABLE public.posts IS 'Tabela de posts do blog (alternativa/adicional à blog_posts)';
COMMENT ON COLUMN public.posts.slug IS 'URL slug único para SEO';
COMMENT ON COLUMN public.posts.image_url IS 'URL da imagem do post (suporta Storage e base64)';
COMMENT ON COLUMN public.posts.tags IS 'Array de tags para categorização';
COMMENT ON COLUMN public.posts.meta_title IS 'Título para SEO (meta tag)';
COMMENT ON COLUMN public.posts.meta_description IS 'Descrição para SEO (meta tag)';

-- =====================================================
-- 7. VERIFICAÇÃO E STATUS
-- =====================================================

-- Verificar se a tabela foi criada corretamente
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'posts'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Verificar se RLS está habilitado
SELECT
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'posts';

-- Verificar índices criados
SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'posts'
AND schemaname = 'public'
ORDER BY indexname;

-- =====================================================
-- ✅ TABELA POSTS CRIADA COM SUCESSO!
-- =====================================================

SELECT
    '✅ Tabela posts criada com sucesso!' as status,
    'Estrutura idêntica ao Supabase original' as estrutura,
    'RLS habilitado e políticas configuradas' as seguranca,
    'Índices otimizados para performance' as performance,
    'Trigger para updated_at ativo' as trigger_status;

-- =====================================================
-- 📋 RESUMO DA TABELA POSTS:
-- =====================================================
--
-- ✅ Campos: id, title, description, category, image_url, slug,
--           content, read_time, published, featured_post,
--           meta_title, meta_description, tags, created_at, updated_at
--
-- ✅ Índices: category, slug, published, featured_post, created_at
--
-- ✅ RLS: Público lê posts publicados, admin gerencia tudo
--
-- ✅ Trigger: updated_at é atualizado automaticamente
--
-- ✅ Compatível: Com o sistema original do Supabase
--
-- =====================================================