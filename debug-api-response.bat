@echo off
echo ========================================
echo DEBUG DA RESPOSTA DA API
echo ========================================

echo.
echo 1. Compilando projeto...
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ✗ ERRO: Projeto nao compila!
    pause
    exit /b 1
)

echo ✓ Compilado com sucesso!

echo.
echo 2. Iniciando servidor...
echo.
echo ========================================
echo INSTRUCOES PARA DEBUG:
echo ========================================
echo.
echo 1. Acesse http://localhost:5173/simulacao
echo 2. Abra F12 (Console do navegador)
echo 3. Teste com a cidade "Ribeira do Piaui - PI"
echo 4. Preencha os outros campos:
echo    - Emprestimo: R$ 1.000.000
echo    - Garantia: R$ 5.000.000  
echo    - Parcelas: 36
echo    - Amortizacao: SAC
echo.
echo 5. Clique CALCULAR
echo 6. Observe no console:
echo    - "Resposta completa da API"
echo    - "Tipo da resposta" 
echo    - "Tem parcelas?"
echo    - Mensagem de erro capturada
echo.
echo ========================================

npm run dev
