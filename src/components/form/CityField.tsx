
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';

interface CityFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const CityField: React.FC<CityFieldProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-libra-light p-2 rounded-full mt-1">
        <MapPin className="w-5 h-5 text-libra-blue" />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-libra-navy mb-2">
          Selecione a cidade do imóvel a ser dado de garantia
        </label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Cidade/UF do imóvel a ser dado em Garantia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ribeirao-preto-sp">Ribeirão Preto/SP</SelectItem>
            <SelectItem value="sao-paulo-sp">São Paulo/SP</SelectItem>
            <SelectItem value="campinas-sp">Campinas/SP</SelectItem>
            <SelectItem value="santos-sp">Santos/SP</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CityField;
