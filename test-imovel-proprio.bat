@echo off
echo ====================================
echo Testando implementacao Imovel Proprio
echo ====================================
echo.

echo 1. Instalando dependencias...
call npm install

echo.
echo 2. Fazendo build...
call npm run build

echo.
echo 3. Iniciando servidor de desenvolvimento...
echo.
echo IMPORTANTE: Teste os seguintes cenarios:
echo - Formulario desktop: enviar sem selecionar opcao (deve dar erro)
echo - Formulario desktop: selecionar "Imovel Proprio" e enviar
echo - Formulario desktop: selecionar "Imovel de terceiro" e enviar
echo - Formulario mobile: testar mesmos cenarios
echo.
echo Abrindo navegador em http://localhost:5173/simulacao
echo.
start http://localhost:5173/simulacao
call npm run dev
