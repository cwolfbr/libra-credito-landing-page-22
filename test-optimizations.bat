@echo off
echo 🎯 TESTANDO OTIMIZAÇÕES FINAIS DE PERFORMANCE
echo ============================================

echo 📦 Instalando dependências...
npm install

echo 🔨 Testando build otimizado...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ BUILD OTIMIZADO FUNCIONANDO!
    echo 🌟 PRINCIPAIS OTIMIZAÇÕES APLICADAS:
    echo    - Preload da imagem LCP ^(YouTube thumbnail^)
    echo    - Resource hints otimizados
    echo    - Schema markup para SEO
    echo    - Chunks otimizados para cache
    echo    - Headers de cache configurados
    echo.
    echo 🚀 PRONTO PARA COMMIT E DEPLOY!
    echo    Expectativa: Performance 92-95 pontos
) else (
    echo ❌ Erro no build - verifique as mensagens acima
)

pause
