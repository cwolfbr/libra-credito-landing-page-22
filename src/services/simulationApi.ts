/**
 * Interface para payload de simulação de crédito
 * 
 * @interface SimulationPayload
 * @description Define a estrutura de dados necessária para realizar uma simulação de crédito
 * 
 * @property {number} valor_solicitado - Valor do empréstimo solicitado (R$ 100.000 a R$ 5.000.000)
 * @property {number} vlr_imovel - Valor do imóvel em garantia (mínimo 2x valor solicitado)
 * @property {number} numero_parcelas - Quantidade de parcelas (36 a 180 meses)
 * @property {string} amortizacao - Sistema de amortização ('SAC' ou 'PRICE')
 * @property {number} juros - Taxa de juros mensal (em %)
 * @property {number} carencia - Período de carência em meses
 */
export interface SimulationPayload {
  valor_solicitado: number;
  vlr_imovel: number;
  numero_parcelas: number;
  amortizacao: string;
  juros: number;
  carencia: number;
}

/**
 * Interface para resposta da simulação
 * 
 * @interface ParcelaItem
 * @description Define a estrutura de uma parcela no resultado da simulação
 * 
 * @property {number[]} parcela - Array com valores da parcela normal
 * @property {number[]} [parcela_normal] - Array com valores da parcela sem carência
 * @property {number[]} [parcela_final] - Array com valores da parcela final
 */
export interface ParcelaItem {
  parcela: number[];
  parcela_normal?: number[];
  parcela_final?: number[];
}

export interface SimulationResponse {
  parcelas: ParcelaItem[];
}

export interface SimulationError {
  mensagem: string;
}

/**
 * Realiza simulação de crédito com garantia de imóvel
 * 
 * @async
 * @function simulateCredit
 * @description Envia requisição para API de simulação e processa o resultado
 * 
 * @param {SimulationPayload} payload - Dados para simulação
 * @returns {Promise<{parcelas: ParcelaItem[]}>} Resultado da simulação com valores das parcelas
 * 
 * @throws {Error} Se a API retornar erro ou dados inválidos
 * 
 * @example
 * ```typescript
 * const resultado = await simulateCredit({
 *   valor_solicitado: 200000,
 *   vlr_imovel: 500000,
 *   numero_parcelas: 120,
 *   amortizacao: 'SAC',
 *   juros: 1.19,
 *   carencia: 1
 * });
 * ```
 */
export const simulateCredit = async (payload: SimulationPayload): Promise<SimulationResponse | SimulationError> => {
  console.log('Payload enviado:', payload);
  
  // Formatar dados como números simples, não strings
  const formattedData = {
    vlr_imovel: Number(payload.vlr_imovel),
    valor_solicitado: Number(payload.valor_solicitado),
    juros: Number(payload.juros),
    numero_parcelas: Number(payload.numero_parcelas),
    carencia: Number(payload.carencia),
    amortizacao: payload.amortizacao
  };

  console.log('Dados formatados para envio:', formattedData);

  try {
    const response = await fetch('https://api-calculos.vercel.app/simulacao', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData)
    });

    const data = await response.json();
    console.log('Resposta completa da API:', JSON.stringify(data, null, 2));

    // Se a API retornou apenas { mensagem: "texto de erro" }
    if (data && typeof data === 'object' && 'mensagem' in data && Object.keys(data).length === 1) {
      return { mensagem: data.mensagem } as SimulationError;
    }

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
    }

    const resultadoFormatado: SimulationResponse = {
      parcelas: data.parcelas
    };

    return resultadoFormatado;
  } catch (error) {
    console.error('Erro na chamada da API:', error);
    throw error;
  }
};
