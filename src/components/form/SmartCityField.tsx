import React, { useState, useEffect, useRef } from 'react';
import { MapPin, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getCityLtv, validateLoanForCity, LTV_CONFIG, LtvValidationResult } from '@/data/cityLtvData';

interface IBGECity {
  id: number;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string;
        nome: string;
      };
    };
  };
}

interface SmartCityFieldProps {
  value: { cidade: string; uf: string } | null;
  onChange: (city: { cidade: string; uf: string } | null) => void;
  loanAmount?: number;
  guaranteeAmount?: number;
  isRural?: boolean;
  onValidationChange?: (validation: LtvValidationResult | null) => void;
}

const SmartCityField: React.FC<SmartCityFieldProps> = ({
  value,
  onChange,
  loanAmount = 0,
  guaranteeAmount = 0,
  isRural = false,
  onValidationChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<IBGECity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [validation, setValidation] = useState<LtvValidationResult | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Sincronizar input com valor selecionado
  useEffect(() => {
    if (value) {
      setSearchTerm(`${value.cidade} - ${value.uf}`);
    } else {
      setSearchTerm('');
    }
  }, [value]);

  // Buscar cidades na API do IBGE
  const searchCities = async (term: string) => {
    if (term.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome`
      );
      const cities: IBGECity[] = await response.json();
      
      const filtered = cities.filter(city =>
        city.nome.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 10);

      setSuggestions(filtered);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce da busca
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (searchTerm && searchTerm.length >= 3 && !searchTerm.includes(' - ')) {
        searchCities(searchTerm);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Validar LTV quando cidade, valores ou tipo de imóvel mudam
  useEffect(() => {
    if (value && loanAmount > 0 && guaranteeAmount > 0) {
      const validation = validateLoanForCity(
        value.cidade,
        value.uf,
        loanAmount,
        guaranteeAmount,
        isRural
      );
      setValidation(validation);
      onValidationChange?.(validation);
    } else {
      setValidation(null);
      onValidationChange?.(null);
    }
  }, [value, loanAmount, guaranteeAmount, isRural, onValidationChange]);

  const handleCitySelect = (city: IBGECity) => {
    const selectedCity = {
      cidade: city.nome,
      uf: city.microrregiao.mesorregiao.UF.sigla
    };
    
    onChange(selectedCity);
    setSearchTerm(`${city.nome} - ${city.microrregiao.mesorregiao.UF.sigla}`);
    setShowSuggestions(false);

    // Validar imediatamente após seleção
    const cityLtv = getCityLtv(city.nome, city.microrregiao.mesorregiao.UF.sigla);
    if (!cityLtv) {
      setValidation({
        isValid: false,
        error: "Esta cidade não está em nossa área de cobertura"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    
    // Se o usuário está digitando, limpar a seleção atual
    if (!newValue.includes(' - ')) {
      onChange(null);
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Pequeno delay para permitir clique nas sugestões
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const getValidationIcon = () => {
    if (!validation) return null;
    
    if (validation.isValid) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (validation.error?.includes("rural")) {
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getValidationMessage = () => {
    if (!validation) return null;

    const cityData = value ? getCityLtv(value.cidade, value.uf) : null;
    const ltvConfig = cityData ? LTV_CONFIG[cityData.ltv as keyof typeof LTV_CONFIG] : null;

    if (validation.isValid && ltvConfig) {
      return (
        <div className="text-green-700 text-sm">
          ✅ {ltvConfig.description}
          {validation.currentLtv && ` (LTV atual: ${validation.currentLtv.toFixed(1)}%)`}
        </div>
      );
    }

    if (!validation.isValid) {
      return (
        <div className="text-red-700 text-sm">
          ❌ {validation.error}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <div className="bg-libra-light p-1.5 rounded-full mt-0.5">
          <MapPin className="w-4 h-4 text-libra-blue" />
        </div>
        <div className="flex-1 relative">
          <label className="block text-xs font-medium text-libra-navy mb-1">
            Digite a cidade do imóvel em garantia
          </label>
          
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => {
                if (!searchTerm.includes(' - ')) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={handleInputBlur}
              placeholder="Ex: São Paulo, Rio de Janeiro..."
              className="text-sm pr-10"
            />
            
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-libra-blue"></div>
              ) : (
                getValidationIcon()
              )}
            </div>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((city) => {
                const cityLtv = getCityLtv(city.nome, city.microrregiao.mesorregiao.UF.sigla);
                const ltvConfig = cityLtv ? LTV_CONFIG[cityLtv.ltv as keyof typeof LTV_CONFIG] : null;
                
                return (
                  <button
                    key={city.id}
                    type="button"
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleCitySelect(city);
                    }}
                  >
                    <span className="text-sm">
                      {city.nome} - {city.microrregiao.mesorregiao.UF.sigla}
                    </span>
                    {ltvConfig && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        ltvConfig.allowCalculation ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {cityLtv?.ltv === 0 ? 'Não atendido' : `LTV ${ltvConfig.maxLtv}%`}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Validation Message */}
      {getValidationMessage()}
    </div>
  );
};

export default SmartCityField;