@echo off
echo 🔍 DEBUG - VERIFICANDO IMAGENS E COMPONENTES
echo ==========================================

echo 📁 Verificando estrutura de arquivos...
if exist "public\images\video-thumbnail.jpg" (
    echo ✅ video-thumbnail.jpg encontrado
) else (
    echo ❌ video-thumbnail.jpg não encontrado
)

if exist "public\images\video-thumbnail.webp" (
    echo ✅ video-thumbnail.webp encontrado
) else (
    echo ❌ video-thumbnail.webp não encontrado
)

echo.
echo 📋 Listando arquivos na pasta images:
dir "public\images\*.jpg" /b 2>nul
dir "public\images\*.webp" /b 2>nul

echo.
echo 🔨 Testando build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ BUILD FUNCIONANDO!
    echo.
    echo 🎯 IMAGENS CONFIGURADAS:
    echo    • Arquivo JPG: video-thumbnail.jpg (principal)
    echo    • Arquivo WebP: video-thumbnail.webp (otimizado)
    echo    • Preload: Configurado para ambos
    echo    • Component: OptimizedYouTube com fallback
    echo.
    echo 🌐 Para testar localmente:
    echo    npm run preview
    echo.
    echo 📊 Para deploy:
    echo    git add .
    echo    git commit -m "fix: optimize video thumbnail images"
    echo    git push origin main
    echo.
    echo 🎯 A imagem deve aparecer agora!
) else (
    echo ❌ Erro no build - verificar console acima
)

echo.
pause
