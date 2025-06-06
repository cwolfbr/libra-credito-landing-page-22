
import React from 'react';

interface AmortizationFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const AmortizationField: React.FC<AmortizationFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-libra-navy">
        Escolha a Amortização
      </label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="PRICE"
            checked={value === 'PRICE'}
            onChange={(e) => onChange(e.target.value)}
            className="text-libra-blue"
          />
          <span className="text-xs">PRICE</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="SAC"
            checked={value === 'SAC'}
            onChange={(e) => onChange(e.target.value)}
            className="text-libra-blue"
          />
          <span className="text-xs">SAC</span>
        </label>
      </div>
    </div>
  );
};

export default AmortizationField;
