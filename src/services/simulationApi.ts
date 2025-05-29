
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
  console.log('Payload enviado:', payload);

  const { data } = await axios.post<SimulationResponse>(
    'https://api-calculos.vercel.app/simulacao',
    payload,
    { headers: { 'Content-Type': 'application/json' } }
  );

  console.log('Resposta da API:', data);
  return data;
};
