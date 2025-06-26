
import React from 'react';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';

interface LoanAmountFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const LoanAmountField: React.FC<LoanAmountFieldProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-libra-light p-1.5 rounded-full flex-shrink-0">
        <DollarSign className="w-4 h-4 text-libra-blue" />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-libra-navy mb-1">
          Digite o valor desejado do Empréstimo
        </label>
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="300"
            className="text-sm pr-20"
            inputMode="numeric"
          />
          {value && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
              = R$ {Number(value).toLocaleString('pt-BR')}.000
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Digite em milhares • Entre 100 e 5.000
        </p>
      </div>
    </div>
  );
};

export default LoanAmountField;
