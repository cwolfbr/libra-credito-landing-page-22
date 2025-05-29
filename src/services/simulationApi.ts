
export interface SimulationPayload {
  valor_solicitado: number;
  vlr_imovel: number;
  numero_parcelas: number;
  amortizacao: string;
  juros: number;
  carencia: number;
}

export interface SimulationResponse {
  parcelas: Array<{
    parcela: number[];
  }>;
}

export const simulateCredit = async (payload: SimulationPayload): Promise<SimulationResponse> => {
  console.log('Payload original:', payload);
  
  // Formatar dados exatamente como no exemplo fornecido
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

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Resposta completa da API:', JSON.stringify(data, null, 2));
    
    return data;
  } catch (error) {
    console.error('Erro na chamada da API:', error);
    throw error;
  }
};
