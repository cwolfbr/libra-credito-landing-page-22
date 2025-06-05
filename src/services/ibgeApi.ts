export interface City {
  id: number;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string;
      };
    };
  };
}

export const fetchCities = async (query: string): Promise<City[]> => {
  if (!query) return [];
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios?nome=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erro ao buscar cidades');
  }
  const data: City[] = await response.json();
  // A API retorna todas as cidades correspondentes, que podem ser mais de 5 mil
  // Entradas. Para evitar travamentos no navegador, limitamos as primeiras 20
  // opções.
  return data.slice(0, 20);
};
