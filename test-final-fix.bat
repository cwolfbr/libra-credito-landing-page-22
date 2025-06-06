@echo off
echo ============================================
echo  FIX FINAL - CORREÇÃO DO FORMULÁRIO CONTATO
echo ============================================
echo.

echo ✅ PROBLEMAS IDENTIFICADOS E CORRIGIDOS:
echo.
echo 1. Cliente Supabase incorreto no submitContactForm
echo 2. ID da simulação não estava sendo passado corretamente  
echo 3. Validações melhoradas com logs de debug
echo.

echo [1/3] Testando build...
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
echo [2/3] Iniciando servidor...
echo.
echo ============================================
echo  TESTE AGORA:
echo ============================================
echo.
echo 1. 🧮 Acesse: http://localhost:5173/simulacao
echo 2. 📝 Preencha apenas: cidade, valores, parcelas
echo 3. ✅ Clique "CALCULAR" 
echo 4. 📊 Veja o resultado
echo 5. 📝 Preencha nome, email, telefone
echo 6. ✅ Clique "SOLICITAR ANÁLISE"
echo 7. 🎉 Deve mostrar "Solicitação enviada com sucesso!"
echo.
echo 📊 Verifique no Supabase se os dados pessoais foram atualizados
echo.
echo ⚠️  Abra o Console do navegador (F12) para ver logs de debug
echo.

echo [3/3] Aguardando...
echo Pressione qualquer tecla para iniciar o servidor...
pause >nul

start "" "http://localhost:5173/simulacao"
npm run dev
