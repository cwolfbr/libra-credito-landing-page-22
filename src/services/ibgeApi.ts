export interface City {
  nome: string;
  uf: string;
}

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
  const response = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome'
  );

  if (!response.ok) {
    throw new Error('Falha ao buscar cidades');
  }

  const data: IBGECityResponse[] = await response.json();

  return data.map((cidade) => ({
    nome: cidade.nome,
    uf: cidade.microrregiao.mesorregiao.UF.sigla
  }));
};
