/**
 * Script de teste para integração com Ploomes
 * 
 * Execute com: node teste-ploomes.js
 */

const API_URL = 'https://api-ploomes.vercel.app/cadastro/online/env';

// Dados de teste
const payloadTeste = {
  cidade: "São Paulo - SP",
  valorDesejadoEmprestimo: 250000.00,
  valorImovelGarantia: 600000.00,
  quantidadeParcelas: 120,
  tipoAmortizacao: "PRICE",
  valorParcelaCalculada: 4500.50,
  nomeCompleto: "Teste Integração",
  email: `teste${Date.now()}@libracredito.com`, // Email único para evitar duplicidade
  telefone: "11999999999",
  imovelProprio: "Imóvel próprio",
  aceitaPolitica: true
};

console.log('🧪 Testando integração com Ploomes...\n');
console.log('📤 Payload de teste:', JSON.stringify(payloadTeste, null, 2));
console.log('\n-----------------------------------\n');

// Função para testar a API
async function testarPloomes() {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloadTeste)
    });

    const resultado = await response.json();
    
    console.log('📥 Status HTTP:', response.status);
    console.log('📥 Resposta:', JSON.stringify(resultado, null, 2));
    
    if (resultado.status) {
      console.log('\n✅ SUCESSO: Lead cadastrado no Ploomes!');
    } else {
      console.log('\n⚠️  AVISO:', resultado.msg);
    }
    
    // Teste de duplicidade (executar novamente com mesmo email)
    console.log('\n\n🔄 Testando duplicidade (mesmo email)...\n');
    
    const response2 = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloadTeste)
    });
    
    const resultado2 = await response2.json();
    console.log('📥 Resposta duplicidade:', JSON.stringify(resultado2, null, 2));
    
    if (!resultado2.status && resultado2.msg.includes('7 dias')) {
      console.log('\n✅ Bloqueio de duplicidade funcionando corretamente!');
    }
    
  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
  }
}

// Testes de validação de campos
console.log('🧪 Testando validações de campos...\n');

// Teste com valor monetário formatado (deve dar erro)
async function testarValorFormatado() {
  const payloadInvalido = {
    ...payloadTeste,
    valorDesejadoEmprestimo: "R$ 250.000,00", // Formato inválido
    email: `teste-formato${Date.now()}@libracredito.com`
  };
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloadInvalido)
    });
    
    const resultado = await response.json();
    console.log('📥 Teste valor formatado:', resultado.status ? '❌ Aceitou valor formatado' : '✅ Rejeitou valor formatado');
  } catch (error) {
    console.log('✅ Rejeitou valor formatado (erro esperado)');
  }
}

// Executar testes
(async () => {
  await testarPloomes();
  await testarValorFormatado();
  
  console.log('\n\n✅ Testes concluídos!');
})();
