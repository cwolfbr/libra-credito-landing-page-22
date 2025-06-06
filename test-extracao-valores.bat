@echo off
echo ========================================
echo TESTE DA CORRECAO - EXTRACAO DE VALORES
echo ========================================

echo.
echo 🐛 PROBLEMA IDENTIFICADO:
echo    API retorna: "600000.0"
echo    Codigo fazia: "600000.0".replace(/[.,]/g, '') = "6000000" 
echo    Resultado: R$ 6.000.000 (10x maior!)
echo.
echo ✅ CORRECAO IMPLEMENTADA:
echo    Nova funcao extractMonetaryValue()
echo    Lida com formatos: "600000.0", "600.000,00", "600,000.00"
echo    Resultado correto: R$ 600.000
echo.

echo 1. Compilando projeto com correcao...
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
echo TESTE MATEMATICO CORRETO:
echo ========================================
echo.
echo 📊 CENARIO PROBLEMATICO:
echo    Imovel: R$ 2.000.000
echo    Emprestimo tentado: R$ 1.000.000 (acima de 30%%)
echo    30%% do imovel: R$ 600.000
echo.
echo ❌ ANTES (ERRADO):
echo    Mostrava: "Maximo para emprestimo: R$ 6.000.000"
echo    (10x maior que o correto!)
echo.
echo ✅ AGORA (CORRETO):
echo    Deve mostrar: "Maximo para emprestimo: R$ 600.000"
echo    Botao: "Continuar com R$ 600.000"
echo.
echo ========================================
echo TESTES ESPECIFICOS:
echo ========================================
echo.
echo 🟢 TESTE 1 - JACUI MG (RURAL):
echo    Cidade: "Jacui - MG"
echo    Imovel: R$ 2.000.000
echo    Emprestimo: R$ 1.000.000
echo    ✓ ESPERADO: "Maximo para emprestimo: R$ 600.000"
echo    ✓ BOTAO: "Continuar com R$ 600.000"
echo.
echo 🔵 TESTE 2 - GUAXUPE MG (GERAL):
echo    Cidade: "Guaxupe - MG"  
echo    Imovel: R$ 500.000
echo    Emprestimo: R$ 200.000
echo    ✓ ESPERADO: "Maximo para emprestimo: R$ 150.000"
echo    ✓ BOTAO: "Ajustar para R$ 150.000"
echo.
echo 📊 TESTE 3 - VALORES PEQUENOS:
echo    Imovel: R$ 200.000
echo    30%% = R$ 60.000
echo    ✓ DEVE MOSTRAR: R$ 60.000 (nao R$ 600.000!)
echo.
echo ========================================
echo COMPONENTE DE TESTE INCLUIDO:
echo ========================================
echo.
echo Na pagina, voce vera um painel amarelo
echo "Teste de Extracao de Valores" que mostra:
echo.
echo ✓ extractMonetaryValue("600000.0") = 600.000
echo ✓ extractMonetaryValue("600.000,00") = 600.000  
echo ✓ extractMonetaryValue("600,000.00") = 600.000
echo.
echo Se todos estiverem com ✅, a correcao funcionou!
echo.
echo ========================================

echo.
echo Iniciando servidor...
echo Acesse: http://localhost:5173/simulacao
echo.
npm run dev
