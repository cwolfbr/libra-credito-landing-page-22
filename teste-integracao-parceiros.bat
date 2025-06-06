@echo off
echo =========================================
echo 🧪 TESTE DE INTEGRAÇÃO - PARCEIROS
echo =========================================
echo.

echo ✅ Verificando estrutura de arquivos...
echo.

REM Verificar se os arquivos principais existem
if exist "src\pages\Parceiros.tsx" (
    echo ✅ Parceiros.tsx - OK
) else (
    echo ❌ Parceiros.tsx - FALTANDO
    goto :error
)

if exist "src\services\partnersService.ts" (
    echo ✅ partnersService.ts - OK
) else (
    echo ❌ partnersService.ts - FALTANDO
    goto :error
)

if exist "src\pages\AdminDashboard.tsx" (
    echo ✅ AdminDashboard.tsx - OK
) else (
    echo ❌ AdminDashboard.tsx - FALTANDO
    goto :error
)

if exist "add_parceiros_table.sql" (
    echo ✅ add_parceiros_table.sql - OK
) else (
    echo ❌ add_parceiros_table.sql - FALTANDO
    goto :error
)

echo.
echo ✅ Iniciando servidor de desenvolvimento...
echo.

REM Instalar dependências se necessário
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    npm install
)

echo 🚀 Iniciando servidor...
echo.
echo 📋 CHECKLIST DE TESTES:
echo.
echo 1. 🌐 Acesse http://localhost:5173/parceiros
echo    - Preencha o formulário de parceria
echo    - Teste todos os campos obrigatórios
echo    - Verifique loading state ao enviar
echo    - Confirme mensagem de sucesso
echo.
echo 2. 👨‍💼 Acesse http://localhost:5173/admin
echo    - Clique na aba "Parceiros"
echo    - Verifique se os dados aparecem
echo    - Teste filtros por nome e status
echo    - Teste mudança de status
echo    - Teste exportação CSV
echo.
echo 3. 🗄️ Verifique no Supabase:
echo    - Dashboard: https://app.supabase.com
echo    - SQL Editor: SELECT * FROM parceiros;
echo    - Estatísticas: SELECT * FROM get_parceiros_stats();
echo.
echo =========================================
echo 🎯 TUDO PRONTO! EXECUTE OS TESTES ACIMA
echo =========================================

npm run dev

goto :end

:error
echo.
echo ❌ ERRO: Arquivos necessários não encontrados!
echo Execute as integrações antes de testar.
pause
exit /b 1

:end
pause
