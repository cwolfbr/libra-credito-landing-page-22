// SCRIPT DE DEBUG AVANÇADO PARA A API
// Cole este script no console do navegador (F12) para testar diretamente

const testApiResponse = async (cidade) => {
  console.log(`🔍 TESTANDO API COM CIDADE: ${cidade}`);
  console.log('━'.repeat(50));
  
  const payload = {
    vlr_imovel: 5000000.0,
    valor_solicitado: 1000000.0,
    juros: 1.09,
    carencia: 2,
    amortizacao: "SAC",
    numero_parcelas: 36,
    cidade: cidade
  };

  console.log('📤 Payload enviado:', payload);

  try {
    console.log('🔄 Fazendo requisição...');
    
    const response = await fetch('https://api-calculos.vercel.app/simulacao', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('📡 Status da resposta:', response.status, response.statusText);
    console.log('📡 Headers da resposta:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error(`❌ Erro HTTP: ${response.status} - ${response.statusText}`);
      return;
    }

    const data = await response.json();
    
    console.log('📥 RESPOSTA COMPLETA:');
    console.log(JSON.stringify(data, null, 2));
    
    console.log('🔍 ANÁLISE DA RESPOSTA:');
    console.log('   Tipo:', typeof data);
    console.log('   É objeto?', typeof data === 'object' && data !== null);
    console.log('   É string?', typeof data === 'string');
    console.log('   É array?', Array.isArray(data));
    
    if (typeof data === 'object' && data !== null) {
      console.log('   Propriedades:', Object.keys(data));
      console.log('   Tem "parcelas"?', 'parcelas' in data);
      console.log('   Tem "message"?', 'message' in data);
      console.log('   Tem "erro"?', 'erro' in data);
      console.log('   Tem "error"?', 'error' in data);
      console.log('   Tem "msg"?', 'msg' in data);
      console.log('   Tem "mensagem"?', 'mensagem' in data);
      
      if (data.parcelas) {
        console.log('   Parcelas é array?', Array.isArray(data.parcelas));
        console.log('   Quantidade de parcelas:', data.parcelas?.length || 0);
        if (data.parcelas?.length > 0) {
          console.log('   Primeira parcela:', data.parcelas[0]);
        }
      }
    }
    
    // Testar nossa lógica de detecção
    console.log('🎯 TESTE DA NOSSA LÓGICA:');
    
    // Simular isErrorResponse
    const isError = (() => {
      if (typeof data === 'string') return true;
      if (data && typeof data === 'object') {
        if (data.parcelas && Array.isArray(data.parcelas) && data.parcelas.length > 0) return false;
        if (data.message || data.erro || data.error || data.msg || data.mensagem || data.detail || data.details) return true;
        return true;
      }
      return true;
    })();
    
    console.log('   É considerado erro?', isError);
    
    if (isError) {
      const errorMsg = (() => {
        if (typeof data === 'string') return data;
        if (data && typeof data === 'object') {
          return data.message || data.erro || data.error || data.msg || data.mensagem || data.detail || data.details || 'Mensagem não disponível para esta cidade';
        }
        return 'Resposta inválida da API';
      })();
      console.log('   Mensagem extraída:', errorMsg);
    }
    
  } catch (error) {
    console.error('❌ Erro na requisição:', error);
    console.error('   Tipo do erro:', error.constructor.name);
    console.error('   Mensagem:', error.message);
  }
  
  console.log('━'.repeat(50));
};

// Função para testar múltiplas cidades
const testMultipleCities = async () => {
  const cities = [
    'São Paulo - SP',           // Deve funcionar
    'Ribeira do Piauí - PI',    // Pode retornar mensagem
    'Rio de Janeiro - RJ',      // Deve funcionar  
    'Cidade Inexistente - ZZ'   // Deve dar erro
  ];
  
  for (const city of cities) {
    await testApiResponse(city);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa de 1s entre testes
  }
};

console.log('🔧 Scripts de debug carregados!');
console.log('');
console.log('Para testar uma cidade específica:');
console.log('  testApiResponse("Ribeira do Piauí - PI")');
console.log('');
console.log('Para testar múltiplas cidades:');
console.log('  testMultipleCities()');
