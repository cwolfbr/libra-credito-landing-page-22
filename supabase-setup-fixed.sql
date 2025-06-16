-- =====================================================
-- SCRIPT DE CONFIGURAÇÃO SUPABASE - LIBRA CRÉDITO (CORRIGIDO)
-- =====================================================
-- Execute este script no SQL Editor do Supabase
-- Dashboard → SQL Editor → New Query → Cole este código → Run

-- =====================================================
-- 1. CRIAR TABELA BLOG_POSTS (se não existir)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL,
    category VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    slug VARCHAR(200) UNIQUE NOT NULL,
    read_time INTEGER DEFAULT 5,
    published BOOLEAN DEFAULT false,
    featured_post BOOLEAN DEFAULT false,
    meta_title VARCHAR(200),
    meta_description VARCHAR(500),
    tags TEXT[], -- Array de strings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 2. CRIAR ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índice para busca por categoria
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_posts_category') THEN
        CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
    END IF;
END $$;

-- Índice para busca por slug (único)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_posts_slug') THEN
        CREATE UNIQUE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
    END IF;
END $$;

-- Índice para posts publicados
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_posts_published') THEN
        CREATE INDEX idx_blog_posts_published ON public.blog_posts(published) WHERE published = true;
    END IF;
END $$;

-- Índice para posts em destaque
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_posts_featured') THEN
        CREATE INDEX idx_blog_posts_featured ON public.blog_posts(featured_post) WHERE featured_post = true;
    END IF;
END $$;

-- Índice para ordenação por data
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_posts_created_at') THEN
        CREATE INDEX idx_blog_posts_created_at ON public.blog_posts(created_at DESC);
    END IF;
END $$;

-- =====================================================
-- 3. CONFIGURAR RLS (ROW LEVEL SECURITY)
-- =====================================================

-- Habilitar RLS na tabela
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes (se existirem)
DROP POLICY IF EXISTS "Public can read published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can read all blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can delete blog posts" ON public.blog_posts;

-- Criar políticas
CREATE POLICY "Public can read published blog posts" ON public.blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Admin can read all blog posts" ON public.blog_posts
    FOR SELECT USING (true);

CREATE POLICY "Admin can insert blog posts" ON public.blog_posts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can update blog posts" ON public.blog_posts
    FOR UPDATE USING (true);

CREATE POLICY "Admin can delete blog posts" ON public.blog_posts
    FOR DELETE USING (true);

-- =====================================================
-- 4. CRIAR FUNÇÃO PARA ATUALIZAR updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- 5. CRIAR TRIGGER PARA updated_at
-- =====================================================

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 6. CRIAR FUNÇÃO PARA GERAR SLUG ÚNICO
-- =====================================================

CREATE OR REPLACE FUNCTION public.generate_unique_slug(title_text TEXT, existing_id UUID DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    -- Converter título para slug
    base_slug := lower(trim(title_text));
    base_slug := regexp_replace(base_slug, '[áàâãäå]', 'a', 'g');
    base_slug := regexp_replace(base_slug, '[éèêë]', 'e', 'g');
    base_slug := regexp_replace(base_slug, '[íìîï]', 'i', 'g');
    base_slug := regexp_replace(base_slug, '[óòôõö]', 'o', 'g');
    base_slug := regexp_replace(base_slug, '[úùûü]', 'u', 'g');
    base_slug := regexp_replace(base_slug, '[ç]', 'c', 'g');
    base_slug := regexp_replace(base_slug, '[^a-z0-9\s-]', '', 'g');
    base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
    base_slug := regexp_replace(base_slug, '-+', '-', 'g');
    base_slug := trim(base_slug, '-');
    
    final_slug := base_slug;
    
    -- Verificar se slug existe (excluindo o próprio post se estiver atualizando)
    WHILE EXISTS (
        SELECT 1 FROM public.blog_posts 
        WHERE slug = final_slug 
        AND (existing_id IS NULL OR id != existing_id)
    ) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 7. INSERIR CATEGORIAS VÁLIDAS (para referência)
-- =====================================================

-- Criar tabela de categorias (opcional, para controle)
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Inserir categorias padrão
INSERT INTO public.blog_categories (id, name, description, icon) VALUES
    ('home-equity', 'Home Equity', 'Crédito com garantia de imóvel - melhores condições', 'Home'),
    ('cgi', 'Capital de Giro', 'Soluções inteligentes para capital de giro empresarial', 'TrendingUp'),
    ('consolidacao', 'Consolidação de Dívidas', 'Organize suas finanças e reduza juros', 'Wallet'),
    ('credito-rural', 'Crédito Rural', 'Financiamento para propriedades rurais e agronegócio', 'Building'),
    ('documentacao', 'Documentação', 'Guias sobre documentos e regularização', 'FileText'),
    ('score-credito', 'Score e Crédito', 'Dicas para melhorar seu score e análise de crédito', 'CreditCard'),
    ('educacao-financeira', 'Educação Financeira', 'Conhecimento para decisões financeiras conscientes', 'BookOpen'),
    ('reformas', 'Projetos/Reformas', 'Realize seus projetos com as melhores condições', 'Home')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon;

-- =====================================================
-- 8. VERIFICAR/CRIAR OUTRAS TABELAS NECESSÁRIAS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.simulacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    nome_completo VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    valor_emprestimo DECIMAL(15,2) NOT NULL,
    valor_imovel DECIMAL(15,2) NOT NULL,
    parcelas INTEGER NOT NULL,
    tipo_amortizacao VARCHAR(50) NOT NULL,
    parcela_inicial DECIMAL(15,2),
    parcela_final DECIMAL(15,2),
    imovel_proprio VARCHAR(20) CHECK (imovel_proprio IN ('proprio', 'terceiro')),
    ip_address INET,
    user_agent TEXT,
    status VARCHAR(50) DEFAULT 'novo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.parceiros (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    cnpj VARCHAR(20),
    tempo_home_equity VARCHAR(50) NOT NULL,
    perfil_cliente VARCHAR(100) NOT NULL,
    ramo_atuacao VARCHAR(100) NOT NULL,
    origem VARCHAR(100) NOT NULL,
    mensagem TEXT,
    ip_address INET,
    user_agent TEXT,
    status VARCHAR(50) DEFAULT 'pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.user_journey (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_term VARCHAR(100),
    utm_content VARCHAR(100),
    referrer VARCHAR(500),
    landing_page VARCHAR(500) NOT NULL,
    pages_visited JSONB DEFAULT '[]'::jsonb,
    time_on_site INTEGER,
    device_info JSONB,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- =====================================================
-- 9. HABILITAR RLS PARA OUTRAS TABELAS
-- =====================================================

ALTER TABLE public.simulacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes para outras tabelas
DROP POLICY IF EXISTS "Admin can manage simulacoes" ON public.simulacoes;
DROP POLICY IF EXISTS "Public can insert simulacoes" ON public.simulacoes;
DROP POLICY IF EXISTS "Admin can manage parceiros" ON public.parceiros;
DROP POLICY IF EXISTS "Public can insert parceiros" ON public.parceiros;
DROP POLICY IF EXISTS "Admin can manage user_journey" ON public.user_journey;
DROP POLICY IF EXISTS "Public can manage own user_journey" ON public.user_journey;
DROP POLICY IF EXISTS "Public can read blog_categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Admin can manage blog_categories" ON public.blog_categories;

-- Criar políticas para simulacoes
CREATE POLICY "Admin can manage simulacoes" ON public.simulacoes
    FOR ALL USING (true);

CREATE POLICY "Public can insert simulacoes" ON public.simulacoes
    FOR INSERT WITH CHECK (true);

-- Criar políticas para parceiros
CREATE POLICY "Admin can manage parceiros" ON public.parceiros
    FOR ALL USING (true);

CREATE POLICY "Public can insert parceiros" ON public.parceiros
    FOR INSERT WITH CHECK (true);

-- Criar políticas para user_journey
CREATE POLICY "Admin can manage user_journey" ON public.user_journey
    FOR ALL USING (true);

CREATE POLICY "Public can manage own user_journey" ON public.user_journey
    FOR ALL USING (true);

-- Criar políticas para categorias
CREATE POLICY "Public can read blog_categories" ON public.blog_categories
    FOR SELECT USING (true);

CREATE POLICY "Admin can manage blog_categories" ON public.blog_categories
    FOR ALL USING (true);

-- =====================================================
-- 10. CONFIGURAÇÕES FINAIS E VERIFICAÇÕES
-- =====================================================

-- Comentários para documentação
COMMENT ON TABLE public.blog_posts IS 'Posts do blog da Libra Crédito';
COMMENT ON TABLE public.blog_categories IS 'Categorias dos posts do blog';
COMMENT ON TABLE public.simulacoes IS 'Simulações de crédito realizadas pelos usuários';
COMMENT ON TABLE public.parceiros IS 'Cadastros de parceiros interessados';
COMMENT ON TABLE public.user_journey IS 'Jornada dos usuários no site';

-- Verificar se tudo foi criado corretamente
SELECT 
    'blog_posts' as tabela,
    COUNT(*) as total_registros
FROM public.blog_posts
UNION ALL
SELECT 
    'blog_categories' as tabela,
    COUNT(*) as total_registros  
FROM public.blog_categories
UNION ALL
SELECT 
    'simulacoes' as tabela,
    COUNT(*) as total_registros
FROM public.simulacoes
UNION ALL
SELECT 
    'parceiros' as tabela,
    COUNT(*) as total_registros
FROM public.parceiros
UNION ALL
SELECT 
    'user_journey' as tabela,
    COUNT(*) as total_registros
FROM public.user_journey;

-- =====================================================
-- SCRIPT CONCLUÍDO ✅
-- =====================================================

SELECT 'Script executado com sucesso! ✅' as status;