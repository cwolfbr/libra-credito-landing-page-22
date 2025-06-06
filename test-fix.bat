@echo off
echo ============================================
echo  FIX APLICADO - TESTE DE FUNCIONALIDADE
echo ============================================
echo.

echo [1/3] Testando build do projeto...
npm run build
if errorlevel 1 (
    echo ❌ ERRO: Build ainda falha - verifique console acima
    echo.
    echo Tentando limpeza do cache...
    echo Deletando node_modules...
    rmdir /s /q node_modules 2>nul
    echo Deletando package-lock.json...
    del package-lock.json 2>nul
    echo.
    echo Reinstalando dependencias...
    npm install
    echo.
    echo Tentando build novamente...
    npm run build
    if errorlevel 1 (
        echo ❌ ERRO PERSISTENTE: Verifique erros acima
        pause
        exit /b 1
    )
)

echo ✅ Build executado com sucesso!
echo.

echo [2/3] Verificando arquivos corrigidos...
if exist "src\components\GlobalTracker.tsx" (
    echo ✅ GlobalTracker.tsx encontrado
) else (
    echo ❌ GlobalTracker.tsx não encontrado
)

if exist "src\pages\AdminDashboard.tsx" (
    echo ✅ AdminDashboard.tsx encontrado
) else (
    echo ❌ AdminDashboard.tsx não encontrado
)

if exist "src\lib\supabase.ts" (
    echo ✅ supabase.ts encontrado
) else (
    echo ❌ supabase.ts não encontrado
)

echo.

echo [3/3] Iniciando servidor de desenvolvimento...
echo ============================================
echo  PRONTO PARA TESTAR!
echo ============================================
echo.
echo 🧪 1. Teste completo: http://localhost:5173/test-supabase
echo 📊 2. Admin dashboard: http://localhost:5173/admin
echo 🧮 3. Simulacao: http://localhost:5173/simulacao
echo.
echo ⚠️  LEMBRE-SE: Execute o SQL no Supabase antes de testar!
echo.
echo Pressione qualquer tecla para iniciar o servidor...
pause >nul

npm run dev
