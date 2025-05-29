
import React from 'react';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';

interface LoanAmountFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const LoanAmountField: React.FC<LoanAmountFieldProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-libra-light p-2 rounded-full mt-1">
        <DollarSign className="w-5 h-5 text-libra-blue" />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-libra-navy mb-2">
          Digite o valor desejado do Empréstimo
        </label>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="R$ 75.000,00"
          className="text-lg"
        />
      </div>
    </div>
  );
};

export default LoanAmountField;
