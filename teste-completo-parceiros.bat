@echo off
cls
echo.
echo ================================================
echo 🚀 TESTE RÁPIDO - FORMULÁRIO DE PARCEIROS
echo ================================================
echo.
echo 🎯 AGORA COM FERRAMENTAS DE DEBUG AVANÇADAS!
echo.

echo 📋 O QUE FOI ADICIONADO:
echo ✅ Debug detalhado no formulário React
echo ✅ Botões de debug direto na página
echo ✅ Ferramenta de debug HTML independente
echo ✅ Logs detalhados em cada etapa
echo ✅ Preenchimento automático para teste
echo.

echo 🔧 FERRAMENTAS DISPONÍVEIS:
echo.
echo 1️⃣ PÁGINA DE DEBUG INDEPENDENTE:
echo    📄 debug-formulario-parceiros.html
echo    🧪 Testa inserção direta no Supabase
echo    🔍 Diagnóstico completo automático
echo.
echo 2️⃣ BOTÕES DE DEBUG NO FORMULÁRIO:
echo    🔍 Debug Console - Mostra estado atual
echo    🛠️ Debug Completo - Abre ferramenta externa
echo    ⚡ Auto-preencher - Preenche dados de teste
echo.
echo 3️⃣ LOGS DETALHADOS:
echo    📊 Console do navegador (F12)
echo    🔍 Estado do sessionId em tempo real
echo    📝 Cada etapa do envio documentada
echo.

echo ⏰ Aguarde... Iniciando servidor de desenvolvimento...
timeout /t 3 /nobreak >nul

echo.
echo 🌐 Abrindo ferramentas de debug...
start debug-formulario-parceiros.html
timeout /t 2 /nobreak >nul

echo.
echo 🚀 Iniciando servidor...
echo.
echo ================================================
echo 📋 INSTRUÇÕES PARA TESTAR:
echo ================================================
echo.
echo 1️⃣ PRIMEIRA OPÇÃO - Teste Independente:
echo    🔧 Use a página debug-formulario-parceiros.html
echo    🧪 Execute "Diagnóstico Completo"
echo    📝 Teste o formulário simplificado
echo.
echo 2️⃣ SEGUNDA OPÇÃO - Teste no App React:
echo    🌐 Acesse: http://localhost:5173/parceiros
echo    ⚡ Clique em "Auto-preencher" 
echo    🔍 Clique em "Debug Console"
echo    📝 Envie o formulário
echo    👁️ Observe logs no console (F12)
echo.
echo 3️⃣ TERCEIRA OPÇÃO - Debug Manual:
echo    🛠️ Clique em "Debug Completo"
echo    🔍 Execute testes específicos
echo    📊 Analise resultados detalhados
echo.
echo ================================================
echo 🎯 COM ESSAS FERRAMENTAS, VAMOS DESCOBRIR
echo    EXATAMENTE ONDE ESTÁ O PROBLEMA!
echo ================================================

npm run dev
