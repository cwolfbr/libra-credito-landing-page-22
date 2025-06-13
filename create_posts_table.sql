-- Criar tabela posts para o blog
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  read_time INTEGER NOT NULL DEFAULT 5,
  published BOOLEAN NOT NULL DEFAULT false,
  featured_post BOOLEAN NOT NULL DEFAULT false,
  meta_title VARCHAR(255),
  meta_description TEXT,
  tags TEXT[], -- Array de strings para tags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured_post);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at_trigger
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_posts_updated_at();

-- Habilitar RLS (Row Level Security) 
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura de posts publicados
CREATE POLICY "Allow public read access to published posts" ON posts
  FOR SELECT USING (published = true);

-- Política para permitir acesso total para operações admin (sem autenticação por enquanto)
CREATE POLICY "Allow all operations for service role" ON posts
  FOR ALL USING (true);

-- Comentários na tabela
COMMENT ON TABLE posts IS 'Tabela para armazenar posts do blog da Libra Crédito';
COMMENT ON COLUMN posts.id IS 'ID único do post (UUID)';
COMMENT ON COLUMN posts.title IS 'Título do post';
COMMENT ON COLUMN posts.description IS 'Descrição/resumo do post';
COMMENT ON COLUMN posts.category IS 'Categoria do post (home-equity, cgi, etc.)';
COMMENT ON COLUMN posts.image_url IS 'URL da imagem de capa do post';
COMMENT ON COLUMN posts.slug IS 'Slug único para URL amigável';
COMMENT ON COLUMN posts.content IS 'Conteúdo completo do post em HTML/Markdown';
COMMENT ON COLUMN posts.read_time IS 'Tempo estimado de leitura em minutos';
COMMENT ON COLUMN posts.published IS 'Se o post está publicado ou é rascunho';
COMMENT ON COLUMN posts.featured_post IS 'Se o post é destacado/featured';
COMMENT ON COLUMN posts.meta_title IS 'Título para SEO';
COMMENT ON COLUMN posts.meta_description IS 'Descrição para SEO';
COMMENT ON COLUMN posts.tags IS 'Array de tags relacionadas ao post';