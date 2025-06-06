@echo off
echo ========================================
echo TESTE DA CORRECAO - LOGICA 30%% IMOVEL
echo ========================================

echo.
echo 1. Compilando projeto com correcoes...
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ✗ ERRO: Projeto nao compila!
    echo Verifique os erros de TypeScript acima
    pause
    exit /b 1
)

echo ✓ Projeto compila com sucesso!

echo.
echo ========================================
echo CENARIOS DE TESTE CORRIGIDOS:
echo ========================================
echo.
echo 📋 TESTE 1 - LIMITE 30%% GERAL:
echo    Cidade: "Guaxupe - MG"
echo    Valor do IMOVEL: R$ 200.000
echo    Valor do EMPRESTIMO: R$ 100.000 (acima de 30%%)
echo    ✓ ESPERADO: "Maximo para emprestimo (30%%): R$ 60.000"
echo    ✓ BOTAO: "Ajustar para R$ 60.000"
echo    ✓ ACAO: Ajusta campo EMPRESTIMO para R$ 60.000
echo.
echo 📋 TESTE 2 - LIMITE 30%% RURAL:
echo    Cidade: "Jacui - MG"
echo    Valor do IMOVEL: R$ 200.000  
echo    Valor do EMPRESTIMO: R$ 100.000 (acima de 30%%)
echo    ✓ ESPERADO: "Maximo para emprestimo (30%%): R$ 60.000"
echo    ✓ CHECKBOX: Confirmar imovel rural
echo    ✓ BOTAO: "Continuar com R$ 60.000"
echo    ✓ ACAO: Ajusta campo EMPRESTIMO para R$ 60.000
echo.
echo 📋 TESTE 3 - VALIDACAO LOGICA:
echo    Valor do IMOVEL: R$ 500.000
echo    30%% do IMOVEL = R$ 150.000
echo    Se EMPRESTIMO for R$ 200.000 (acima do limite)
echo    ✓ ESPERADO: Botao "Ajustar para R$ 150.000"
echo    ✓ ACAO: Campo emprestimo vira R$ 150.000
echo.
echo ========================================
echo LOGICA CORRIGIDA:
echo ========================================
echo.
echo ❌ ANTES (ERRADO):
echo    - Calculava 30%% do valor do EMPRESTIMO
echo    - Ajustava campo IMOVEL
echo    - Mostrava valores invertidos
echo.
echo ✅ AGORA (CORRETO):
echo    - Calcula 30%% do valor do IMOVEL
echo    - Ajusta campo EMPRESTIMO  
echo    - Mostra "Maximo para emprestimo (30%%): R$ X"
echo    - Botao "Ajustar para R$ X" modifica emprestimo
echo.
echo ========================================

echo.
echo Iniciando servidor para teste...
echo Acesse: http://localhost:5173/simulacao
echo.
npm run dev
