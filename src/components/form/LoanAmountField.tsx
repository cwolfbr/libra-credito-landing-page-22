
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
        <DollarSign className="w-4 h-4 text-green-500" />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-libra-navy mb-1">
          Digite o valor desejado do Empréstimo
        </label>
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="R$ 300.000"
            className="text-sm"
            inputMode="numeric"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Digite o valor completo • Entre R$ 100.000 e R$ 5.000.000
        </p>
      </div>
    </div>
  );
};

export default LoanAmountField;
