@echo off
echo ========================================
echo TESTE FINAL - SIMULACAO INTELIGENTE
echo ========================================

echo.
echo 1. Limpando e compilando projeto...
if exist dist rmdir /s /q dist
npm install
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
echo CENARIOS DE TESTE IMPLEMENTADOS:
echo ========================================
echo.
echo 1. LIMITE 30%% GERAL:
echo    Cidade: "Guaxupe - MG"
echo    Imovel: R$ 500.000
echo    Emprestimo: R$ 200.000 (acima de 30%%)
echo    Resultado: Mensagem azul + botao ajustar
echo.
echo 2. LIMITE 30%% RURAL:
echo    Cidade: "Jacui - MG"  
echo    Imovel: R$ 500.000
echo    Emprestimo: R$ 200.000 (acima de 30%%)
echo    Resultado: Mensagem verde + checkbox rural + botao
echo.
echo 3. NAO REALIZAMOS:
echo    Cidade: "Ribeira do Pombal - BA"
echo    Qualquer valor
echo    Resultado: Mensagem vermelha informativa
echo.
echo 4. FUNCIONAMENTO NORMAL:
echo    Cidade: "Sao Paulo - SP"
echo    Valores dentro dos limites
echo    Resultado: Simulacao normal com parcelas
echo.
echo ========================================
echo FUNCIONALIDADES IMPLEMENTADAS:
echo ========================================
echo.
echo ✓ Deteccao automatica de padroes de mensagem
echo ✓ Componentes visuais especificos para cada caso
echo ✓ Botao "Ajustar" que calcula automaticamente 30%%
echo ✓ Checkbox para confirmar imovel rural
echo ✓ Mensagens contextuais e educativas
echo ✓ Botoes para tentar outra cidade
echo ✓ Manutencao de valores para facilitar reajustes
echo.
echo ========================================

echo.
echo Iniciando servidor para teste...
echo Acesse: http://localhost:5173/simulacao
echo.
npm run dev
