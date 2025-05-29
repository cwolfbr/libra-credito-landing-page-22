
import axios from 'axios';

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
  console.log('Payload antes do envio:', payload);
  
  // Garantir que os valores numéricos estão corretos
  const formattedPayload = {
    vlr_imovel: Number(payload.vlr_imovel),
    valor_solicitado: Number(payload.valor_solicitado),
    juros: Number(payload.juros),
    numero_parcelas: Number(payload.numero_parcelas),
    carencia: Number(payload.carencia),
    amortizacao: payload.amortizacao
  };

  console.log('Payload formatado para envio:', formattedPayload);

  const { data } = await axios.post<SimulationResponse>(
    'https://api-calculos.vercel.app/simulacao',
    formattedPayload,
    { 
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000 // 30 segundos timeout
    }
  );

  console.log('Resposta bruta da API:', data);
  return data;
};
