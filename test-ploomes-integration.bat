@echo off
echo ====================================
echo Testando Integracao com Ploomes CRM
echo ====================================
echo.

echo 1. Testando API diretamente...
echo.
node teste-ploomes.js

echo.
echo ====================================
echo.
echo 2. Para testar no sistema completo:
echo.
echo   a) Execute: npm run dev
echo   b) Acesse: http://localhost:5173/simulacao
echo   c) Complete uma simulacao
echo   d) Preencha o formulario de contato
echo   e) Verifique o console (F12) para logs
echo.
echo 3. Verifique no Supabase:
echo   - Simulacoes com status 'integrado_crm'
echo.
echo ====================================
pause
