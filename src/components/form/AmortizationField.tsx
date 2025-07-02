
import React from 'react';
import { Calculator } from 'lucide-react';

interface AmortizationFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const AmortizationField: React.FC<AmortizationFieldProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-libra-light p-1.5 rounded-full flex-shrink-0">
        <Calculator className="w-4 h-4 text-green-500" />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-libra-navy mb-1">
          Escolha a Amortização
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="PRICE"
              checked={value === 'PRICE'}
              onChange={(e) => onChange(e.target.value)}
              className="text-green-500"
            />
            <span className="text-xs">PRICE</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="SAC"
              checked={value === 'SAC'}
              onChange={(e) => onChange(e.target.value)}
              className="text-green-500"
            />
            <span className="text-xs">SAC</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AmortizationField;
