import cityData from '../../LTV_Cidades.json';

// Interfaces... (as mesmas de antes)
export interface CityLtvData {
  'CIDADE - UF': string;
  LTV: number;
}

export interface CityValidationResult {
  found: boolean;
  city?: string;
  ltv?: number;
  status: 'not_found' | 'not_working' | 'rural_only' | 'ltv_30' | 'success';
  message: string;
  allowCalculation: boolean;
}

// Armazena os dados das cidades em cache para evitar múltiplas cargas
let cachedCityData: CityLtvData[] | null = null;

async function getCityData(): Promise<CityLtvData[]> {
  if (cachedCityData) {
    return cachedCityData;
  }
  // Em um ambiente de produção, o JSON pode ser servido de um CDN
  // e o fetch seria para uma URL externa.
  // const response = await fetch('/LTV_Cidades.json');
  // const data = await response.json();
  cachedCityData = cityData;
  return cityData;
}

export async function getAllCities(): Promise<string[]> {
  const data = await getCityData();
  return data.map(item => item['CIDADE - UF']);
}

export async function searchCities(searchTerm: string): Promise<string[]> {
  if (!searchTerm || searchTerm.length < 2) return [];
  const term = searchTerm.toLowerCase();
  const cities = await getAllCities();
  return cities.filter(city => city.toLowerCase().includes(term)).slice(0, 10);
}

export async function validateCity(cityName: string): Promise<CityValidationResult> {
  if (!cityName || cityName.trim() === '') {
    return {
      found: false,
      status: 'not_found',
      message: 'Por favor, selecione uma cidade',
      allowCalculation: false,
    };
  }

  const data = await getCityData();
  const cityInfo = data.find(
    item => item['CIDADE - UF'].toLowerCase() === cityName.toLowerCase()
  );

  if (!cityInfo) {
    return {
      found: false,
      status: 'not_found',
      message: 'Cidade não encontrada em nossa base de dados',
      allowCalculation: false,
    };
  }

  const { LTV } = cityInfo;

  switch (LTV) {
    case 0:
      return {
        found: true,
        city: cityInfo['CIDADE - UF'],
        ltv: LTV,
        status: 'not_working',
        message: 'Infelizmente ainda não trabalhamos nesta cidade...',
        allowCalculation: false,
      };
    case 1:
      return {
        found: true,
        city: cityInfo['CIDADE - UF'],
        ltv: LTV,
        status: 'rural_only',
        message: 'Para esta cidade, trabalhamos apenas com imóveis rurais...',
        allowCalculation: false,
      };
    case 30:
      return {
        found: true,
        city: cityInfo['CIDADE - UF'],
        ltv: LTV,
        status: 'ltv_30',
        message: 'Para esta cidade, o LTV máximo é de 30%...',
        allowCalculation: true,
      };
    case 50:
      return {
        found: true,
        city: cityInfo['CIDADE - UF'],
        ltv: LTV,
        status: 'success',
        message: 'Cidade válida para simulação.',
        allowCalculation: true,
      };
    default:
      return {
        found: true,
        city: cityInfo['CIDADE - UF'],
        ltv: LTV,
        status: 'not_found',
        message: 'Configuração de LTV não reconhecida.',
        allowCalculation: false,
      };
  }
}

export async function validateLTV(
  valorEmprestimo: number,
  valorImovel: number,
  cityName: string
): Promise<{ valid: boolean; message: string; suggestedLoanAmount?: number }> {
  const cityValidation = await validateCity(cityName);
  
  if (!cityValidation.found || !cityValidation.allowCalculation) {
    return {
      valid: false,
      message: cityValidation.message,
    };
  }

  const ltvSolicitado = (valorEmprestimo / valorImovel) * 100;
  const ltvMaximo = cityValidation.ltv!;

  if (ltvSolicitado > ltvMaximo) {
    const valorMaximoEmprestimo = Math.floor((valorImovel * ltvMaximo) / 100);
    return {
      valid: false,
      message: `O valor solicitado excede o LTV máximo de ${ltvMaximo}%...`,
      suggestedLoanAmount: valorMaximoEmprestimo,
    };
  }

  return {
    valid: true,
    message: 'LTV dentro do limite permitido.',
  };
}

export async function getCityInfo(cityName: string): Promise<CityLtvData | null> {
  const data = await getCityData();
  return data.find(
    item => item['CIDADE - UF'].toLowerCase() === cityName.toLowerCase()
  ) || null;
}

export async function getCityStats() {
  const cities = await getCityData();
  const stats = {
    total: cities.length,
    notWorking: cities.filter(c => c.LTV === 0).length,
    ruralOnly: cities.filter(c => c.LTV === 1).length,
    ltv30: cities.filter(c => c.LTV === 30).length,
    ltv50: cities.filter(c => c.LTV === 50).length,
  };

  return {
    ...stats,
    workingCities: stats.ltv30 + stats.ltv50,
    coverage: ((stats.ltv30 + stats.ltv50) / stats.total * 100).toFixed(1),
  };
}