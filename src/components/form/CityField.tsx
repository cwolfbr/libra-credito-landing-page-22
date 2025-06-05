import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import { fetchCities, City } from '@/services/ibgeApi';

interface CityFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const CityField: React.FC<CityFieldProps> = ({ value, onChange }) => {
  const [options, setOptions] = useState<City[]>([]);

  useEffect(() => {
    if (value.trim().length < 2) {
      setOptions([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetchCities(value)
        .then(setOptions)
        .catch(() => setOptions([]));
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex items-start gap-2">
      <div className="bg-libra-light p-1.5 rounded-full mt-0.5">
        <MapPin className="w-4 h-4 text-libra-blue" />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-libra-navy mb-1">
          Selecione a cidade do imóvel a ser dado de garantia
        </label>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cidade/UF do imóvel a ser dado em Garantia"
          list="city-options"
          className="text-sm"
        />
        <datalist id="city-options">
          {options.map((city) => (
            <option
              key={city.id}
              value={`${city.nome}/${city.microrregiao.mesorregiao.UF.sigla}`}
            />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default CityField;
