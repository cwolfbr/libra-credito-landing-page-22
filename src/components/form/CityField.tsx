
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import { fetchCities, City } from '@/services/ibgeApi';

interface CityFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const CityField: React.FC<CityFieldProps> = ({ value, onChange }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadCities = async () => {
      setLoading(true);
      try {
        const data = await fetchCities();
        setCities(data);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  return (
    <div className="flex items-start gap-2">
      <div className="bg-libra-light p-1.5 rounded-full mt-0.5">
        <MapPin className="w-4 h-4 text-libra-blue" />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-libra-navy mb-1">
          Selecione a cidade do imóvel a ser dado de garantia
        </label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Cidade/UF do imóvel a ser dado em Garantia" />
          </SelectTrigger>
          <SelectContent>
            {loading && (
              <SelectItem value="" disabled>
                Carregando...
              </SelectItem>
            )}
            {cities.map((c) => (
              <SelectItem
                key={`${c.nome}-${c.uf}`}
                value={`${c.nome}-${c.uf}`}
              >
                {c.nome}/{c.uf}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CityField;
