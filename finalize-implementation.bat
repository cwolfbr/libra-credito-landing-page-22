@echo off
echo ========================================
echo LIMPEZA FINAL - REMOVENDO ARQUIVOS DEBUG
echo ========================================

echo.
echo Removendo arquivos temporarios de debug...

if exist "src\components\ApiDebugger.tsx" (
    del "src\components\ApiDebugger.tsx"
    echo ✓ Removido: ApiDebugger.tsx
) else (
    echo - ApiDebugger.tsx ja removido
)

if exist "debug-api-response.bat" (
    del "debug-api-response.bat"
    echo ✓ Removido: debug-api-response.bat
) else (
    echo - debug-api-response.bat ja removido
)

if exist "debug-api-console.js" (
    del "debug-api-console.js"
    echo ✓ Removido: debug-api-console.js
) else (
    echo - debug-api-console.js ja removido
)

if exist "teste-api-manual.js" (
    del "teste-api-manual.js"
    echo ✓ Removido: teste-api-manual.js
) else (
    echo - teste-api-manual.js ja removido
)

if exist "test-debug-completo.bat" (
    del "test-debug-completo.bat"
    echo ✓ Removido: test-debug-completo.bat
) else (
    echo - test-debug-completo.bat ja removido
)

if exist "DEBUG_API_INVESTIGATION.md" (
    del "DEBUG_API_INVESTIGATION.md"
    echo ✓ Removido: DEBUG_API_INVESTIGATION.md
) else (
    echo - DEBUG_API_INVESTIGATION.md ja removido
)

echo.
echo ========================================
echo ARQUIVOS MANTIDOS (IMPORTANTES):
echo ========================================
echo.
echo ✓ SIMULACAO_INTELIGENTE_FINAL.md (documentacao)
echo ✓ test-simulacao-inteligente.bat (teste final)
echo ✓ src/utils/apiMessageAnalyzer.ts (detector)
echo ✓ src/components/messages/ (componentes visuais)
echo ✓ src/components/ApiMessageDisplay.tsx (erros genericos)
echo.

echo ========================================
echo TESTE FINAL DE COMPILACAO
echo ========================================

npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ IMPLEMENTACAO CONCLUIDA COM SUCESSO!
    echo.
    echo ========================================
    echo RESUMO FINAL:
    echo ========================================
    echo.
    echo ✓ 4 padroes de mensagem detectados e tratados
    echo ✓ Componentes visuais especificos para cada caso
    echo ✓ Ajuste automatico de valores para 30%%
    echo ✓ Checkbox para confirmacao de imovel rural
    echo ✓ Interface elegante e contextual
    echo ✓ Codigo limpo e bem documentado
    echo.
    echo Para testar:
    echo   .\test-simulacao-inteligente.bat
    echo.
) else (
    echo.
    echo ❌ ERRO na compilacao final!
    echo Verifique os erros acima antes de continuar
)

pause
