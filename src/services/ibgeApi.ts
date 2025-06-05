export interface City {
  nome: string;
  uf: string;
}

import axios from 'axios';

/**
 * Busca a lista de cidades do Brasil via API do IBGE
 *
 * @returns {Promise<City[]>} Array com nome da cidade e sigla do estado
 */

interface IBGECityResponse {
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string;
      };
    };
  };
}

export const fetchCities = async (): Promise<City[]> => {
  const { data } = await axios.get<IBGECityResponse[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios'
  );

  return data.map((cidade) => ({
    nome: cidade.nome,
    uf: cidade.microrregiao.mesorregiao.UF.sigla
  }));
};
