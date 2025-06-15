/**
 * Calculadora de empréstimos com sistemas SAC e PRICE
 * 
 * @description Implementa cálculos financeiros para simulação de crédito
 * sem dependência de APIs externas. Suporta tanto SAC quanto PRICE.
 */

export interface LoanCalculationResult {
  parcelaSac: {
    inicial: number;
    final: number;
  };
  parcelaPrice: number;
  valorTotal: {
    sac: number;
    price: number;
  };
  jurosTotal: {
    sac: number;
    price: number;
  };
  taxaJurosEfetiva: number;
}

/**
 * Calcula empréstimo usando Sistema SAC (Sistema de Amortização Constante)
 * Na SAC, a amortização é constante e os juros decrescem
 */
function calculateSAC(principal: number, taxaJuros: number, parcelas: number): {
  parcelaInicial: number;
  parcelaFinal: number;
  valorTotal: number;
  jurosTotal: number;
} {
  const amortizacao = principal / parcelas;
  const jurosPrimeiraParcela = principal * taxaJuros;
  const jurosUltimaParcela = amortizacao * taxaJuros;
  
  const parcelaInicial = amortizacao + jurosPrimeiraParcela;
  const parcelaFinal = amortizacao + jurosUltimaParcela;
  
  // Soma dos juros em PA: Sn = n * (primeiro + último) / 2
  const jurosTotal = parcelas * (jurosPrimeiraParcela + jurosUltimaParcela) / 2;
  const valorTotal = principal + jurosTotal;
  
  return {
    parcelaInicial,
    parcelaFinal,
    valorTotal,
    jurosTotal
  };
}

/**
 * Calcula empréstimo usando Tabela PRICE (Sistema Francês)
 * Na PRICE, as parcelas são constantes
 */
function calculatePRICE(principal: number, taxaJuros: number, parcelas: number): {
  parcela: number;
  valorTotal: number;
  jurosTotal: number;
} {
  // Fórmula: PMT = PV * [i * (1 + i)^n] / [(1 + i)^n - 1]
  const fatorJuros = Math.pow(1 + taxaJuros, parcelas);
  const parcela = principal * (taxaJuros * fatorJuros) / (fatorJuros - 1);
  
  const valorTotal = parcela * parcelas;
  const jurosTotal = valorTotal - principal;
  
  return {
    parcela,
    valorTotal,
    jurosTotal
  };
}

/**
 * Calcula empréstimo com ambos os sistemas
 * 
 * @param valorEmprestimo Valor do empréstimo solicitado
 * @param taxaJurosMensal Taxa de juros mensal (ex: 0.0119 para 1.19%)
 * @param numeroParcelas Número de parcelas (36 a 180)
 * @returns Resultado com cálculos SAC e PRICE
 */
export function calculateLoan(
  valorEmprestimo: number, 
  taxaJurosMensal: number, 
  numeroParcelas: number
): LoanCalculationResult {
  // Aplicar taxa de custo operacional (11% sobre o valor)
  const custoOperacional = valorEmprestimo * 0.11;
  const valorComCusto = valorEmprestimo + custoOperacional;
  
  // Calcular SAC
  const sacResult = calculateSAC(valorComCusto, taxaJurosMensal, numeroParcelas);
  
  // Calcular PRICE
  const priceResult = calculatePRICE(valorComCusto, taxaJurosMensal, numeroParcelas);
  
  return {
    parcelaSac: {
      inicial: sacResult.parcelaInicial,
      final: sacResult.parcelaFinal
    },
    parcelaPrice: priceResult.parcela,
    valorTotal: {
      sac: sacResult.valorTotal,
      price: priceResult.valorTotal
    },
    jurosTotal: {
      sac: sacResult.jurosTotal,
      price: priceResult.jurosTotal
    },
    taxaJurosEfetiva: taxaJurosMensal
  };
}

/**
 * Obtém configuração de taxa de juros do painel admin
 * Fallback para 1.19% a.m. se não configurado
 */
export function getInterestRate(): number {
  try {
    const config = localStorage.getItem('libra_simulation_config');
    if (config) {
      const parsed = JSON.parse(config);
      return parsed.juros ? parsed.juros / 100 : 0.0119; // Converte % para decimal
    }
  } catch (error) {
    console.warn('Erro ao obter configuração de juros:', error);
  }
  
  // Fallback padrão: 1.19% a.m.
  return 0.0119;
}

/**
 * Valida se os parâmetros de cálculo estão dentro dos limites
 */
export function validateLoanParameters(
  valorEmprestimo: number,
  numeroParcelas: number
): { valid: boolean; error?: string } {
  if (valorEmprestimo <= 0) {
    return { valid: false, error: 'Valor do empréstimo deve ser maior que zero' };
  }
  
  if (numeroParcelas < 36 || numeroParcelas > 180) {
    return { valid: false, error: 'Número de parcelas deve estar entre 36 e 180 meses' };
  }
  
  return { valid: true };
}