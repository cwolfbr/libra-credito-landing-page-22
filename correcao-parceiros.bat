@echo off
echo =========================================
echo 🔧 CORREÇÃO AUTOMÁTICA - PARCEIROS
echo =========================================
echo.

echo 🔍 Verificando problemas...
echo.

REM Verificar se os arquivos necessários existem
echo ✅ Verificando arquivos...
if not exist "src\pages\Parceiros.tsx" (
    echo ❌ Arquivo Parceiros.tsx não encontrado!
    goto :error
)
if not exist "src\services\partnersService.ts" (
    echo ❌ Arquivo partnersService.ts não encontrado!
    goto :error
)
if not exist "src\lib\supabase.ts" (
    echo ❌ Arquivo supabase.ts não encontrado!
    goto :error
)
echo ✅ Todos os arquivos estão presentes.
echo.

echo 🛠️ Iniciando processo de correção...
echo.

echo 📋 INSTRUÇÕES PARA CORRIGIR O ERRO:
echo.
echo 1️⃣ PRIMEIRA COISA A FAZER:
echo    🌐 Abra: https://app.supabase.com
echo    📝 Faça login na sua conta
echo    🎯 Selecione o projeto: libra-credito
echo.
echo 2️⃣ EXECUTE O SCRIPT SQL:
echo    📝 Clique em "SQL Editor" no menu lateral
echo    ➕ Clique em "+ New query"
echo    📋 Cole o script SQL que será exibido abaixo
echo    ▶️ Clique em "Run" para executar
echo.
echo 3️⃣ SCRIPT SQL PARA EXECUTAR:
echo.
echo ============================================
echo -- COPIE E COLE ESTE SCRIPT NO SUPABASE --
echo ============================================
echo.
echo -- 1. TABELA PARCEIROS
echo CREATE TABLE IF NOT EXISTS public.parceiros (
echo     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
echo     session_id TEXT NOT NULL,
echo     nome TEXT NOT NULL,
echo     email TEXT NOT NULL,
echo     telefone TEXT NOT NULL,
echo     cidade TEXT NOT NULL,
echo     cnpj TEXT,
echo     tempo_home_equity TEXT NOT NULL,
echo     perfil_cliente TEXT NOT NULL,
echo     ramo_atuacao TEXT NOT NULL,
echo     origem TEXT NOT NULL,
echo     mensagem TEXT,
echo     ip_address TEXT,
echo     user_agent TEXT,
echo     status TEXT DEFAULT 'pendente',
echo     created_at TIMESTAMPTZ DEFAULT NOW(),
echo     updated_at TIMESTAMPTZ DEFAULT NOW()
echo );
echo.
echo -- 2. ÍNDICES
echo CREATE INDEX IF NOT EXISTS idx_parceiros_session_id ON public.parceiros(session_id);
echo CREATE INDEX IF NOT EXISTS idx_parceiros_created_at ON public.parceiros(created_at DESC);
echo CREATE INDEX IF NOT EXISTS idx_parceiros_status ON public.parceiros(status);
echo CREATE INDEX IF NOT EXISTS idx_parceiros_email ON public.parceiros(email);
echo.
echo -- 3. TRIGGER
echo CREATE TRIGGER update_parceiros_updated_at 
echo     BEFORE UPDATE ON public.parceiros 
echo     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
echo.
echo -- 4. PERMISSÕES
echo ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;
echo CREATE POLICY "Enable all operations for anonymous users" ON public.parceiros FOR ALL USING (true);
echo.
echo -- 5. FUNÇÃO DE ESTATÍSTICAS
echo CREATE OR REPLACE FUNCTION get_parceiros_stats()
echo RETURNS TABLE (
echo     total_parceiros BIGINT,
echo     pendentes BIGINT,
echo     aprovados BIGINT,
echo     rejeitados BIGINT,
echo     parceiros_mes BIGINT,
echo     origem_mais_comum TEXT
echo ) AS $$ 
echo BEGIN
echo     RETURN QUERY
echo     SELECT 
echo         COUNT(*)::BIGINT as total_parceiros,
echo         COUNT(CASE WHEN status = 'pendente' THEN 1 END)::BIGINT as pendentes,
echo         COUNT(CASE WHEN status = 'aprovado' THEN 1 END)::BIGINT as aprovados,
echo         COUNT(CASE WHEN status = 'rejeitado' THEN 1 END)::BIGINT as rejeitados,
echo         COUNT(CASE WHEN created_at ^>= CURRENT_DATE - INTERVAL '30 days' THEN 1 END)::BIGINT as parceiros_mes,
echo         (SELECT origem FROM public.parceiros GROUP BY origem ORDER BY COUNT(*) DESC LIMIT 1) as origem_mais_comum
echo     FROM public.parceiros;
echo END;
echo $$ LANGUAGE plpgsql;
echo.
echo ============================================
echo.
echo 4️⃣ VERIFICAR SE DEU CERTO:
echo    🔍 No Supabase, execute: SELECT * FROM parceiros LIMIT 5;
echo    ✅ Se não der erro, a tabela foi criada com sucesso!
echo.
echo 5️⃣ TESTAR O FORMULÁRIO:
echo    🌐 Volte para http://localhost:5173/parceiros
echo    📝 Preencha o formulário novamente
echo    ✅ Agora deve funcionar perfeitamente!
echo.
echo =========================================
echo 🎯 RESUMO DO QUE FAZER:
echo =========================================
echo 1. Acesse: https://app.supabase.com
echo 2. Vá em SQL Editor
echo 3. Execute o script SQL acima
echo 4. Teste o formulário novamente
echo.
echo 📞 Se ainda não funcionar:
echo - Abra o arquivo: debug-parceiros.html
echo - Execute os testes de diagnóstico
echo - Verifique o console do navegador (F12)
echo.

echo 🚀 Abrindo arquivo de debug automaticamente...
start debug-parceiros.html

echo.
echo ✅ CORREÇÃO PREPARADA!
echo Execute o script SQL no Supabase e teste novamente.
echo.
pause
goto :end

:error
echo.
echo ❌ ERRO: Arquivos necessários não encontrados!
echo Certifique-se de estar na pasta correta do projeto.
pause
exit /b 1

:end
