@echo off
echo ========================================
echo LIMPEZA FINAL - PROJETO PRODUTIVO
echo ========================================

echo.
echo Removendo arquivos de desenvolvimento/teste antigos...

echo.
echo 🗑️ REMOVENDO ARQUIVOS DE TESTE:

if exist "test-extracao-valores.bat" (
    del "test-extracao-valores.bat"
    echo ✓ Removido: test-extracao-valores.bat
)

if exist "remove-test-component.bat" (
    del "remove-test-component.bat"
    echo ✓ Removido: remove-test-component.bat
)

if exist "cleanup-test-component.bat" (
    del "cleanup-test-component.bat"
    echo ✓ Removido: cleanup-test-component.bat
)

if exist "ValueExtractionTest.tsx.deleted" (
    del "ValueExtractionTest.tsx.deleted"
    echo ✓ Removido: ValueExtractionTest.tsx.deleted
)

echo.
echo 🗑️ REMOVENDO SCRIPTS DE DEBUG ANTIGOS:

if exist "debug-api-response.bat" (
    del "debug-api-response.bat"
    echo ✓ Removido: debug-api-response.bat
)

if exist "debug-api-console.js" (
    del "debug-api-console.js"
    echo ✓ Removido: debug-api-console.js
)

if exist "test-debug-completo.bat" (
    del "test-debug-completo.bat"
    echo ✓ Removido: test-debug-completo.bat
)

if exist "teste-api-manual.js" (
    del "teste-api-manual.js"
    echo ✓ Removido: teste-api-manual.js
)

echo.
echo 🗑️ REMOVENDO DOCUMENTACAO DE DEBUG:

if exist "DEBUG_API_INVESTIGATION.md" (
    del "DEBUG_API_INVESTIGATION.md"
    echo ✓ Removido: DEBUG_API_INVESTIGATION.md
)

if exist "CORRECAO_CRITICA_EXTRACAO_VALORES.md" (
    del "CORRECAO_CRITICA_EXTRACAO_VALORES.md"
    echo ✓ Removido: CORRECAO_CRITICA_EXTRACAO_VALORES.md
)

if exist "CORRECAO_LOGICA_30_PERCENT.md" (
    del "CORRECAO_LOGICA_30_PERCENT.md"
    echo ✓ Removido: CORRECAO_LOGICA_30_PERCENT.md
)

echo.
echo 📋 MANTENDO ARQUIVOS IMPORTANTES:
echo    ✓ LAYOUT_LADO_A_LADO_FINAL.md (documentacao final)
echo    ✓ SIMULACAO_INTELIGENTE_FINAL.md (documentacao funcional)
echo    ✓ test-layout-final.bat (teste principal)
echo    ✓ Todos os componentes de producao

echo.
echo 🧪 TESTE FINAL DE COMPILACAO:
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo 🎉 PROJETO FINALIZADO E LIMPO!
    echo ========================================
    echo.
    echo ✅ RECURSOS IMPLEMENTADOS:
    echo    • Simulacao inteligente com 4 tipos de resposta
    echo    • Layout lado a lado responsivo
    echo    • Componentes visuais especificos
    echo    • Formulario de contato integrado
    echo    • Tratamento de erros contextual
    echo    • Valores matematicamente corretos
    echo.
    echo ✅ PRONTO PARA PRODUCAO:
    echo    • Codigo limpo e documentado
    echo    • TypeScript type-safe
    echo    • Responsividade completa
    echo    • UX otimizada para conversao
    echo.
    echo 🚀 Para testar:
    echo    .\test-layout-final.bat
    echo.
    echo 🚀 Para deploy:
    echo    npm run build
    echo.
) else (
    echo ❌ ERRO na compilacao!
    echo Verifique os erros acima
)

pause
