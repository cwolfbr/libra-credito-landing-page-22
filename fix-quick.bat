@echo off
echo 🚀 CORREÇÃO RÁPIDA - REMOVENDO LOOP INFINITO
echo ==========================================

echo 🗑️ Removendo node_modules problemático...
if exist node_modules rmdir /s /q node_modules

echo 📦 Reinstalando sem postinstall...
npm install --legacy-peer-deps --no-optional

echo 🔨 Testando build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ BUILD FUNCIONANDO!
    echo 🚀 Agora pode fazer o deploy!
) else (
    echo ❌ Ainda tem erro no build
    echo Verifique as mensagens acima
)

pause
