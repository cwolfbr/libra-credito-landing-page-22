@echo off
echo ========================================
echo VALIDACAO POS-RESTAURACAO
echo ========================================

echo.
echo 1. Verificando commit atual...
git log -1 --oneline

echo.
echo 2. Verificando arquivos principais...
if exist "src\App.tsx" (
    echo ✓ App.tsx encontrado
) else (
    echo ✗ App.tsx NAO encontrado
)

if exist "src\components" (
    echo ✓ Pasta components encontrada
) else (
    echo ✗ Pasta components NAO encontrada
)

if exist "package.json" (
    echo ✓ package.json encontrado
) else (
    echo ✗ package.json NAO encontrado
)

echo.
echo 3. Verificando status Git...
git status

echo.
echo 4. Instalando dependencias...
npm install

echo.
echo 5. Tentando build para verificar integridade...
npm run build

echo.
echo 6. Status final...
if %ERRORLEVEL% EQU 0 (
    echo ✓ BUILD SUCESSFUL - Projeto restaurado e funcionando!
    echo.
    echo Para iniciar o desenvolvimento:
    echo npm run dev
) else (
    echo ✗ BUILD FAILED - Verificar erros acima
)

echo.
pause
