// Script para testar a nova API manualmente no console do navegador

// 1. Teste com dados válidos
const testeComDadosValidos = async () => {
  const payload = {
    vlr_imovel: 500000.0,
    valor_solicitado: 200000.0,
    juros: 1.09,
    carencia: 2,
    amortizacao: "SAC",
    numero_parcelas: 120,
    cidade: "São Paulo - SP"
  };

  console.log('📤 Enviando payload:', payload);

  try {
    const response = await fetch('https://api-calculos.vercel.app/simulacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('📥 Resposta recebida:', data);

    if (data.parcelas) {
      console.log('✅ Sucesso! Dados de parcelas recebidos');
    } else if (data.message || data.erro || data.error) {
      console.log('⚠️ API retornou mensagem:', data.message || data.erro || data.error);
    } else {
      console.log('❓ Resposta inesperada da API');
    }
  } catch (error) {
    console.error('❌ Erro na requisição:', error);
  }
};

// 2. Teste com cidade que pode gerar erro
const testeComCidadeProblemática = async () => {
  const payload = {
    vlr_imovel: 500000.0,
    valor_solicitado: 200000.0,
    juros: 1.09,
    carencia: 2,
    amortizacao: "SAC",
    numero_parcelas: 120,
    cidade: "Cidade Inexistente - ZZ"
  };

  console.log('📤 Testando com cidade problemática:', payload);

  try {
    const response = await fetch('https://api-calculos.vercel.app/simulacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('📥 Resposta para cidade problemática:', data);
  } catch (error) {
    console.error('❌ Erro na requisição:', error);
  }
};

// 3. Teste sem campo cidade
const testeSemCidade = async () => {
  const payload = {
    vlr_imovel: 500000.0,
    valor_solicitado: 200000.0,
    juros: 1.09,
    carencia: 2,
    amortizacao: "SAC",
    numero_parcelas: 120
    // cidade omitida propositalmente
  };

  console.log('📤 Testando sem campo cidade:', payload);

  try {
    const response = await fetch('https://api-calculos.vercel.app/simulacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('📥 Resposta sem cidade:', data);
  } catch (error) {
    console.error('❌ Erro na requisição:', error);
  }
};

// Como usar:
// 1. Abra o console do navegador (F12)
// 2. Cole este script
// 3. Execute: testeComDadosValidos()
// 4. Execute: testeComCidadeProblemática()
// 5. Execute: testeSemCidade()

console.log('🔧 Scripts de teste carregados!');
console.log('Execute: testeComDadosValidos()');
console.log('Execute: testeComCidadeProblemática()');
console.log('Execute: testeSemCidade()');
