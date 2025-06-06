@echo off
echo ========================================
echo TESTE COMPLETO - API COM DEBUG AVANCADO
echo ========================================

echo.
echo 1. Limpando builds antigos...
if exist dist rmdir /s /q dist

echo.
echo 2. Instalando dependencias (se necessario)...
npm install

echo.
echo 3. Verificando compilacao...
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
echo FERRAMENTAS DE DEBUG DISPONIVEIS:
echo ========================================
echo.
echo 1. PAINEL VISUAL NA PAGINA:
echo    - Acesse http://localhost:5173/simulacao
echo    - Role para baixo e vera "Debug da API"
echo    - Clique nos botoes para testar cidades
echo.
echo 2. CONSOLE DO NAVEGADOR (F12):
echo    - Cole o conteudo de debug-api-console.js
echo    - Execute: testApiResponse("Ribeira do Piaui - PI")
echo.
echo 3. LOGS DETALHADOS:
echo    - Abra F12 ^ Console
echo    - Faca uma simulacao normal
echo    - Observe os logs detalhados da API
echo.
echo ========================================
echo CIDADES PARA TESTAR:
echo ========================================
echo.
echo ✓ Sao Paulo - SP (deve funcionar)
echo ? Ribeira do Piaui - PI (problema atual)
echo ✓ Rio de Janeiro - RJ (deve funcionar)
echo ✗ Cidade Inexistente - ZZ (deve dar erro)
echo.
echo ========================================

echo.
echo Iniciando servidor de desenvolvimento...
npm run dev
