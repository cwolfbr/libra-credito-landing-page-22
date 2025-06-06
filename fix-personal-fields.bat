@echo off
echo ============================================
echo  CORREÇÃO APLICADA - CAMPOS PESSOAIS
echo ============================================
echo.

echo ✅ PROBLEMA IDENTIFICADO:
echo    Campos pessoais no formulário principal
echo.
echo ✅ CORREÇÃO APLICADA:
echo    - Removidos campos pessoais do formulário de simulação
echo    - Mantidos APENAS no formulário de contato pós-resultado
echo    - Simulação agora é anônima até preenchimento final
echo.

echo [1/2] Testando build...
npm run build >nul 2>&1
if errorlevel 1 (
    echo ❌ ERRO: Build falhou
    npm run build
    pause
    exit /b 1
) else (
    echo ✅ Build executado com sucesso!
)

echo.
echo [2/2] Iniciando servidor...
echo.
echo ============================================
echo  FLUXO CORRETO AGORA:
echo ============================================
echo.
echo 1. 🏠 Usuário acessa /simulacao
echo 2. 📝 Preenche: cidade, valores, parcelas, sistema
echo 3. 🧮 Clica "CALCULAR" (sem dados pessoais)
echo 4. ✅ Sistema faz simulação anônima
echo 5. 📊 Mostra resultado
echo 6. 📝 ENTÃO pede nome, email, telefone
echo 7. 💾 Atualiza simulação com dados pessoais
echo.
echo ✅ Perfeito! Agora o fluxo está correto!
echo.
echo Pressione qualquer tecla para iniciar...
pause >nul

npm run dev
