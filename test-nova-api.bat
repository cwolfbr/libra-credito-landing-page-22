@echo off
echo ========================================
echo TESTE DA NOVA API COM CIDADE
echo ========================================

echo.
echo 1. Verificando se o projeto compila...
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ✗ ERRO: Projeto nao compila!
    echo Verifique os erros acima
    pause
    exit /b 1
)

echo ✓ Projeto compila com sucesso!

echo.
echo 2. Iniciando servidor de desenvolvimento...
echo.
echo ========================================
echo TESTE MANUAL NECESSARIO:
echo ========================================
echo.
echo 1. Acesse http://localhost:5173/simulacao
echo 2. Preencha o formulario com:
echo    - Cidade: "Sao Paulo - SP"
echo    - Valor do emprestimo: R$ 200.000
echo    - Valor do imovel: R$ 500.000
echo    - Parcelas: 120
echo    - Amortizacao: SAC
echo.
echo 3. Clique em CALCULAR
echo.
echo 4. Verifique se:
echo    - A cidade esta sendo enviada na requisicao
echo    - Mensagens de erro da API sao exibidas adequadamente
echo    - O componente de erro tem botao "Tentar Novamente"
echo.
echo ========================================

npm run dev
